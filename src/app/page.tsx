"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Plus, Search, Trash2, PanelLeftClose, PanelLeftOpen, 
  Send, Image as ImageIcon, X, Sparkles, Brain, Zap,
  Share2, Copy, Check, MessageSquare, Key
} from 'lucide-react';
import { ChatMessageMarkdown } from '@/components/chat/ChatMessageMarkdown';
import { GeminiStarIcon } from '@/components/chat/GeminiStarIcon';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  images?: string[];
  isDeepReasoning?: boolean;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}

const STORAGE_KEY = 'fumi_ai_standalone_sessions_v1';

export default function FumiStandaloneChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMode, setChatMode] = useState<'adaptive' | 'fast' | 'thinking'>('adaptive');
  const [attachedImages, setAttachedImages] = useState<Array<{ base64: string; mimeType: string }>>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialisation et chargement des sessions depuis localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed);
          setActiveSessionId(parsed[0].id);
          return;
        }
      }
    } catch (e) {
      console.warn("Storage load error:", e);
    }
    createNewSession();
  }, []);

  // Sauvegarde persistante des sessions
  useEffect(() => {
    if (sessions.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
      } catch (e) {}
    }
  }, [sessions]);

  // Défilement automatique
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessions, activeSessionId, isLoading]);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  function createNewSession() {
    const newId = `sess_${Date.now()}`;
    const newSess: ChatSession = {
      id: newId,
      title: 'Nouvelle discussion',
      messages: [],
      timestamp: Date.now()
    };
    setSessions(prev => [newSess, ...prev]);
    setActiveSessionId(newId);
    setInputMessage('');
    setAttachedImages([]);
    setSidebarOpen(false);
  }

  function deleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    const filtered = sessions.filter(s => s.id !== id);
    if (filtered.length === 0) {
      createNewSession();
    } else {
      setSessions(filtered);
      if (activeSessionId === id) {
        setActiveSessionId(filtered[0].id);
      }
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).slice(0, 5).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = reader.result as string;
        const mimeType = file.type || 'image/jpeg';
        const base64 = res.includes(',') ? res.split(',')[1] : res;
        setAttachedImages(prev => [...prev.slice(0, 4), { base64, mimeType }]);
      };
      reader.readAsDataURL(file);
    });
  };

  async function handleSendMessage(customPrompt?: string) {
    const textToSend = (customPrompt || inputMessage).trim();
    if (!textToSend && attachedImages.length === 0) return;
    if (isLoading) return;

    const userImages = attachedImages.map(img => `data:${img.mimeType};base64,${img.base64}`);
    const newUserMsg: Message = {
      role: 'user',
      content: textToSend,
      images: userImages.length > 0 ? userImages : undefined
    };

    const currentMessages = activeSession ? [...activeSession.messages, newUserMsg] : [newUserMsg];

    // Mise à jour de la session avec le message utilisateur
    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        const title = s.messages.length === 0 ? textToSend.slice(0, 35) : s.title;
        return { ...s, title, messages: currentMessages, timestamp: Date.now() };
      }
      return s;
    }));

    setInputMessage('');
    setAttachedImages([]);
    setIsLoading(true);

    try {
      const historyForApi = currentMessages.slice(-6).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          sessionId: activeSessionId,
          payload: {
            question: textToSend,
            images: attachedImages,
            history: historyForApi,
            chatMode
          }
        })
      });

      const data = await res.json();
      const aiResponse = data?.result || "Désolée, je n'ai pas pu générer de réponse pour l'instant.";

      const newAiMsg: Message = {
        role: 'assistant',
        content: aiResponse,
        isDeepReasoning: data?.isDeepReasoning
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return { ...s, messages: [...currentMessages, newAiMsg], timestamp: Date.now() };
        }
        return s;
      }));
    } catch (err: any) {
      const errMsg: Message = {
        role: 'assistant',
        content: `Une fluctuation réseau est survenue. Veuillez me relancer d'ici un instant ! (${err?.message || 'Erreur'})`
      };
      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return { ...s, messages: [...currentMessages, errMsg] };
        }
        return s;
      }));
    } finally {
      setIsLoading(false);
    }
  }

  const filteredSessions = sessions.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-[#0f0d0b] text-[#fcfaf5]">
      {/* SIDEBAR DESKTOP & MOBILE DRAWER */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#181512] border-r border-[#2d2720] flex flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* En-tête Sidebar */}
        <div className="p-4 border-b border-[#2d2720] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d1984b] to-[#a26131] flex items-center justify-center p-0.5">
              <img src="/images/fumi/fumi_avatar.png" alt="Fumi" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-wide text-[#fcfaf5]">FUMI AI</h1>
              <span className="text-[10px] text-[#dab372] uppercase font-semibold">Souveraine & Polyvalente</span>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 text-stone-400 hover:text-white"
            aria-label="Fermer le menu"
          >
            <PanelLeftClose size={20} />
          </button>
        </div>

        {/* Bouton Nouvelle Discussion */}
        <div className="p-3">
          <button
            onClick={createNewSession}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#c27e3c] to-[#d1984b] text-stone-950 font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-md"
          >
            <Plus size={18} />
            <span>Nouvelle discussion</span>
          </button>
        </div>

        {/* Barre de Recherche */}
        <div className="px-3 pb-2">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#110e0c] border border-[#2d2720] rounded-lg py-1.5 pl-9 pr-3 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#d1984b]"
            />
          </div>
        </div>

        {/* Liste des discussions */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {filteredSessions.map((s) => (
            <div
              key={s.id}
              onClick={() => {
                setActiveSessionId(s.id);
                setSidebarOpen(false);
              }}
              className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                s.id === activeSessionId
                  ? 'bg-[#2a231b] text-[#fcfaf5] font-medium border border-[#d1984b]/30'
                  : 'text-stone-400 hover:bg-[#1f1a15] hover:text-stone-200'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <MessageSquare size={14} className="shrink-0 text-[#d1984b]" />
                <span className="truncate">{s.title || 'Discussion sans titre'}</span>
              </div>
              <button
                onClick={(e) => deleteSession(s.id, e)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
                title="Supprimer"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer Sidebar */}
        <div className="p-3 border-t border-[#2d2720] text-[11px] text-stone-500 text-center">
          Fumi AI Core v1.0 • AZAVA Sarl
        </div>
      </aside>

      {/* OVERLAY MOBILE LORSQUE LE MENU EST OUVERT */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden"
        />
      )}

      {/* ZONE PRINCIPALE DE CONVERSATION */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-[#0f0d0b]">
        {/* HEADER SUPÉRIEUR */}
        <header className="h-14 border-b border-[#241f19] px-4 flex items-center justify-between shrink-0 bg-[#14110e]/80 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800/50"
              aria-label="Ouvrir le menu"
            >
              <PanelLeftOpen size={20} />
            </button>
            <div className="flex items-center gap-2 truncate">
              <span className="font-semibold text-sm text-[#fcfaf5] truncate">
                {activeSession?.title || 'FUMI AI'}
              </span>
            </div>
          </div>

          {/* SÉLECTEUR DE MODE DE RAISONNEMENT */}
          <div className="flex items-center gap-1 bg-[#1a1612] p-1 rounded-xl border border-[#2d2720]">
            <button
              onClick={() => setChatMode('fast')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                chatMode === 'fast'
                  ? 'bg-[#d1984b] text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Mode Rapide"
            >
              <Zap size={13} />
              <span className="hidden sm:inline">Rapide</span>
            </button>

            <button
              onClick={() => setChatMode('adaptive')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                chatMode === 'adaptive'
                  ? 'bg-[#d1984b] text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Mode Adaptatif"
            >
              <Sparkles size={13} />
              <span className="hidden sm:inline">Adaptatif</span>
            </button>

            <button
              onClick={() => setChatMode('thinking')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                chatMode === 'thinking'
                  ? 'bg-[#d1984b] text-stone-950 shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Réflexion Profonde"
            >
              <Brain size={13} />
              <span className="hidden sm:inline">Réflexion</span>
            </button>
          </div>

          <Link
            href="/keys"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#201a14] hover:bg-[#2c2319] text-[#dab372] border border-[#d1984b]/30 text-xs font-semibold transition-all ml-2 shrink-0"
            title="Portail Développeur & Clés API"
          >
            <Key size={13} />
            <span className="hidden sm:inline">Clés API</span>
          </Link>
        </header>

        {/* ZONE DES MESSAGES */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-6 space-y-6">
          {(!activeSession || activeSession.messages.length === 0) ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4 py-8">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#d1984b] via-[#a26131] to-[#dab372] shadow-xl shadow-[#d1984b]/10 mb-4 animate-bounce">
                <img 
                  src="/images/fumi/fumi_avatar.png" 
                  alt="FUMI AI" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#fcfaf5] mb-2 tracking-tight">
                Que bâtissons-nous aujourd'hui ?
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mb-8 max-w-md">
                Je suis <strong className="text-[#dab372]">FUMI</strong>, l'intelligence souveraine africaine. Je programme, raisonne, calcule et maîtrise les sciences comme nos traditions ancestrales.
              </p>

              {/* Suggestions rapides */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full text-left">
                {[
                  { title: "Programmation de pointe", prompt: "Écris une fonction TypeScript propre pour un système de cache LRU sécurisé avec tests." },
                  { title: "Calcul & Mathématiques", prompt: "Démontre et résous pas à pas l'équation de diffusion thermique avec formule LaTeX." },
                  { title: "Sagesse & Fêzan du Jour", prompt: "Quel est le signe et l'énergie du calendrier Fêzan aujourd'hui et quels sont ses conseils ?" },
                  { title: "Économie & Vision Afrique", prompt: "Analyse les opportunités de souveraineté technologique et d'IA générative pour l'Afrique de l'Ouest." },
                ].map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sug.prompt)}
                    className="p-3.5 rounded-2xl bg-[#171410] border border-[#2b241c] hover:border-[#d1984b]/50 hover:bg-[#1e1914] text-xs transition-all text-stone-300 group"
                  >
                    <div className="font-semibold text-stone-200 group-hover:text-[#dab372] mb-1">{sug.title}</div>
                    <div className="text-stone-500 line-clamp-2">{sug.prompt}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {activeSession.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full shrink-0 overflow-hidden mt-1 border border-[#d1984b]/40">
                      <img src="/images/fumi/fumi_avatar.png" alt="Fumi" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3.5 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#a26131] to-[#c27e3c] text-white shadow-md'
                      : 'bg-[#181410] border border-[#2d261e] text-[#fcfaf5]'
                  }`}>
                    {/* Images jointes */}
                    {msg.images && msg.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {msg.images.map((img, i) => (
                          <img key={i} src={img} alt="Pièce jointe" className="max-h-48 rounded-xl object-cover border border-white/20" />
                        ))}
                      </div>
                    )}

                    {/* Contenu Markdown & LaTeX */}
                    <div className="text-sm leading-relaxed overflow-x-auto">
                      <ChatMessageMarkdown content={msg.content} />
                    </div>

                    {/* Barre d'action sous la réponse FUMI */}
                    {msg.role === 'assistant' && (
                      <div className="mt-3 pt-2 border-t border-[#262018] flex items-center justify-between text-xs text-stone-500">
                        <span className="text-[10px] text-[#dab372]">FUMI Souveraine</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(msg.content);
                            setCopiedId(index);
                            setTimeout(() => setCopiedId(null), 2000);
                          }}
                          className="flex items-center gap-1 hover:text-stone-300 transition-colors"
                        >
                          {copiedId === index ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                          <span className="text-[10px]">{copiedId === index ? 'Copié' : 'Copier'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3.5 items-center text-stone-400 text-xs">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#d1984b]/40 animate-pulse">
                    <img src="/images/fumi/fumi_avatar.png" alt="Fumi" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-2 bg-[#181410] px-4 py-2.5 rounded-2xl border border-[#2d261e]">
                    <Sparkles size={14} className="text-[#d1984b] animate-spin" />
                    <span>FUMI réfléchit avec sagesse et rigueur...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* INPUT BAR (MOBILE-FIRST) */}
        <div className="p-3 sm:p-4 border-t border-[#241f19] bg-[#14110e]/90 backdrop-blur-md shrink-0">
          <div className="max-w-3xl mx-auto">
            {/* Aperçu des images attachées */}
            {attachedImages.length > 0 && (
              <div className="flex gap-2 mb-2 p-2 bg-[#1a1612] rounded-xl border border-[#2d2720] overflow-x-auto">
                {attachedImages.map((img, idx) => (
                  <div key={idx} className="relative shrink-0">
                    <img 
                      src={`data:${img.mimeType};base64,${img.base64}`} 
                      alt="Attaché" 
                      className="w-14 h-14 object-cover rounded-lg border border-[#d1984b]/30" 
                    />
                    <button
                      onClick={() => setAttachedImages(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-0.5 shadow-md"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-end gap-2 bg-[#1c1813] border border-[#332b21] rounded-2xl p-2 focus-within:border-[#d1984b] transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageSelect}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-stone-400 hover:text-[#dab372] rounded-xl transition-colors shrink-0"
                title="Ajouter une image"
              >
                <ImageIcon size={19} />
              </button>

              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Posez une question, écrivez du code ou demandez conseil..."
                rows={1}
                className="flex-1 bg-transparent text-sm text-[#fcfaf5] placeholder-stone-500 focus:outline-none resize-none max-h-36 py-1.5 min-w-0"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={isLoading || (!inputMessage.trim() && attachedImages.length === 0)}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#c27e3c] to-[#d1984b] text-stone-950 font-bold hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 transition-all shrink-0"
                aria-label="Envoyer"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-[10px] text-stone-500 text-center mt-2">
              FUMI est une IA souveraine indépendante. Vérifiez les informations importantes.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
