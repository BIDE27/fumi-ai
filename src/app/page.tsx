"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Plus, Search, Pin, PinOff, SquarePen, Pencil,
  Sparkles, X, Trash2, PanelLeftClose, PanelLeftOpen, MoreVertical, Check, Share2,
  Brain, Zap, Maximize2, Key, Volume2, VolumeX, Copy, MessageSquare
} from 'lucide-react';
import { ChatThread, AttachedImagePreview } from '@/components/chat/ChatThread';
import { ChatMessageMarkdown } from '@/components/chat/ChatMessageMarkdown';
import { ShareModal } from '@/components/chat/ShareModal';
import { FumiAvatar, FumiLogo, FumiLettre } from '@/components/chat/GeminiStarIcon';

interface Message {
  role: 'user' | 'ai';
  text: string;
  imageUrl?: string;
  imageUrls?: string[];
  chatMode?: 'adaptive' | 'fast' | 'thinking';
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
  isPinned?: boolean;
}

interface AttachedImageState {
  id: string;
  file: File;
  dataUrl: string;
  base64: string;
  mimeType: string;
}

const STORAGE_KEY = 'fumi_ai_sessions_v2';
const ACTIVE_SESSION_KEY = 'fumi_ai_active_session_id';

function generateSessionId() {
  return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

export default function FumiWebChatPage() {
  const [isClient, setIsClient] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMode, setChatMode] = useState<'adaptive' | 'fast' | 'thinking'>('adaptive');
  const [selectedImages, setSelectedImages] = useState<AttachedImageState[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxImageUrl, setLightboxImageUrl] = useState<string | null>(null);
  const [sessionToDelete, setSessionToDelete] = useState<ChatSession | null>(null);
  const [activeMenuSessionId, setActiveMenuSessionId] = useState<string | null>(null);
  const [renamingSessionId, setRenamingSessionId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSpeakingIndex, setIsSpeakingIndex] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const savedActiveId = localStorage.getItem(ACTIVE_SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed);
          const initialId = (savedActiveId && parsed.some(s => s.id === savedActiveId))
            ? savedActiveId
            : parsed[0].id;
          setCurrentSessionId(initialId);
          return;
        }
      }
    } catch (e) {
      console.warn("Storage load error:", e);
    }
    const freshId = generateSessionId();
    const freshSession: ChatSession = {
      id: freshId,
      title: "Nouvelle discussion",
      messages: [],
      timestamp: Date.now()
    };
    setSessions([freshSession]);
    setCurrentSessionId(freshId);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    if (sessions.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
      } catch (e) {}
    }
  }, [sessions, isClient]);

  useEffect(() => {
    if (!isClient || !currentSessionId) return;
    try {
      localStorage.setItem(ACTIVE_SESSION_KEY, currentSessionId);
    } catch (e) {}
  }, [currentSessionId, isClient]);

  const currentSession = useMemo(() => {
    return sessions.find(s => s.id === currentSessionId) || sessions[0];
  }, [sessions, currentSessionId]);

  const messages = currentSession?.messages || [];
  const hasUserMessages = messages.some(m => m.role === 'user');

  const startNewSession = useCallback(() => {
    // Si la session active est déjà vide (sans message), on reste dessus sans empiler de doublons
    if (currentSession && currentSession.messages.length === 0) {
      setSidebarOpen(false);
      setActiveMenuSessionId(null);
      return;
    }
    const newId = generateSessionId();
    const newSess: ChatSession = {
      id: newId,
      title: 'Nouvelle discussion',
      messages: [],
      timestamp: Date.now(),
      isPinned: false
    };
    setSessions(prev => [newSess, ...prev]);
    setCurrentSessionId(newId);
    setChatInput('');
    setSelectedImages([]);
    setSidebarOpen(false);
    setActiveMenuSessionId(null);
  }, [currentSession]);


  const confirmDeleteSession = () => {
    if (!sessionToDelete) return;
    const targetId = sessionToDelete.id;
    const remaining = sessions.filter(s => s.id !== targetId);
    if (remaining.length === 0) {
      startNewSession();
    } else {
      setSessions(remaining);
      if (currentSessionId === targetId) {
        setCurrentSessionId(remaining[0].id);
      }
    }
    setSessionToDelete(null);
    setActiveMenuSessionId(null);
  };

  const handleTogglePin = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => prev.map(s => {
      if (s.id === session.id) {
        return { ...s, isPinned: !s.isPinned };
      }
      return s;
    }));
    setActiveMenuSessionId(null);
  };

  const handleStartRename = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingSessionId(session.id);
    setRenameValue(session.title);
    setActiveMenuSessionId(null);
  };

  const handleSaveRename = (session: ChatSession) => {
    const trimmed = renameValue.trim();
    if (trimmed) {
      setSessions(prev => prev.map(s => {
        if (s.id === session.id) {
          return { ...s, title: trimmed };
        }
        return s;
      }));
    }
    setRenamingSessionId(null);
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    handleAddImageFiles(Array.from(files));
    e.target.value = '';
  };

  const handleAddImageFiles = (files: File[]) => {
    const validImageFiles = files.filter(f => f.type.startsWith('image/')).slice(0, 5 - selectedImages.length);
    if (validImageFiles.length === 0) return;

    validImageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const mimeType = file.type || 'image/jpeg';
        const base64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
        const newImg: AttachedImageState = {
          id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          file,
          dataUrl,
          base64,
          mimeType,
        };
        setSelectedImages(prev => [...prev.slice(0, 4), newImg]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (id: string) => {
    setSelectedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleClearAllImages = () => {
    setSelectedImages([]);
  };

  const handleToggleVoice = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("La reconnaissance vocale n'est pas supportée par votre navigateur.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'fr-FR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setChatInput(prev => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleStopTyping = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsTyping(false);
  };

  const handleSpeak = (text: string, index: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeakingIndex === index) {
      window.speechSynthesis.cancel();
      setIsSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/\[FA_TRACE:[^\]]+\]/g, '')
      .replace(/```[\s\S]*?```/g, 'bloc de code')
      .replace(/[*#_`>]/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fr-FR';
    utterance.rate = 1.05;
    utterance.onend = () => setIsSpeakingIndex(null);
    utterance.onerror = () => setIsSpeakingIndex(null);

    setIsSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyMessage = async (text: string, index: number) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    } catch {}
  };

  const submitQuery = async (customPrompt?: string) => {
    const textToSend = (customPrompt || chatInput).trim();
    if (!textToSend && selectedImages.length === 0) return;
    if (isTyping) return;

    const userImageUrls = selectedImages.map(img => img.dataUrl);
    const userImagesPayload = selectedImages.map(img => ({
      data: img.base64,
      mimeType: img.mimeType
    }));

    const newUserMsg: Message = {
      role: 'user',
      text: textToSend,
      imageUrls: userImageUrls.length > 0 ? userImageUrls : undefined,
      imageUrl: userImageUrls[0] || undefined
    };

    const targetSessionId = currentSessionId || generateSessionId();
    const existingMessages = currentSession?.messages || [];
    const updatedMessages = [...existingMessages, newUserMsg];

    setSessions(prev => prev.map(s => {
      if (s.id === targetSessionId) {
        const newTitle = s.messages.length === 0 ? textToSend.slice(0, 38) : s.title;
        return {
          ...s,
          title: newTitle,
          messages: updatedMessages,
          timestamp: Date.now()
        };
      }
      return s;
    }));

    setChatInput('');
    setSelectedImages([]);
    setIsTyping(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const historyForApi = updatedMessages.slice(-8).map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          action: 'chat',
          sessionId: targetSessionId,
          payload: {
            question: textToSend,
            history: historyForApi,
            chatMode,
            images: userImagesPayload.length > 0 ? userImagesPayload : undefined
          }
        })
      });

      if (!res.ok) {
        throw new Error(`Erreur serveur FUMI (${res.status})`);
      }

      const data = await res.json();
      const aiResponseText = data.result || "Désolée, je n'ai pas pu formuler de réponse à cet instant.";

      const newAiMsg: Message = {
        role: 'ai',
        text: aiResponseText,
        chatMode
      };

      setSessions(prev => prev.map(s => {
        if (s.id === targetSessionId) {
          return {
            ...s,
            messages: [...s.messages, newAiMsg],
            timestamp: Date.now()
          };
        }
        return s;
      }));
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      const errMsg: Message = {
        role: 'ai',
        text: `Une difficulté de connexion est survenue. Veuillez vérifier votre réseau et relancer votre demande. (${err?.message || 'Erreur'})`
      };
      setSessions(prev => prev.map(s => {
        if (s.id === targetSessionId) {
          return { ...s, messages: [...s.messages, errMsg] };
        }
        return s;
      }));
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuery();
  };

  const filteredSessions = useMemo(() => {
    return (sessions || [])
      .filter(s => s && s.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return (b.timestamp || 0) - (a.timestamp || 0);
      });
  }, [sessions, searchQuery]);

  if (!isClient) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#fcfaf5]">
        <div className="flex flex-col items-center gap-3">
          <FumiAvatar size={54} className="animate-pulse" />
          <span className="text-xs font-semibold text-brand-900 font-mono tracking-wider">Chargement de Fumi...</span>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full w-full bg-white text-stone-700 text-sm select-none border-r border-stone-200/80">
      {/* En-tête Sidebar */}
      <div className="p-4 pt-3.5 flex items-center justify-between bg-white shrink-0 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <FumiAvatar size={34} />
          <div className="flex flex-col">
            <span className="font-bold text-brand-950 text-base tracking-tight leading-none">Fumi AI</span>
            <span className="text-[10px] text-brand-700 font-semibold leading-none mt-1">Souveraine & Polyvalente</span>
          </div>
        </div>
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && window.innerWidth < 1024) setSidebarOpen(false);
            else setSidebarCollapsed(prev => !prev);
          }}
          className="p-1.5 text-stone-500 hover:text-black hover:bg-stone-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
          title="Replier le menu"
        >
          <span className="lg:hidden flex items-center justify-center">
            <X size={19} />
          </span>
          <span className="hidden lg:flex items-center justify-center">
            <PanelLeftClose size={19} strokeWidth={1.8} />
          </span>
        </button>
      </div>

      {/* Bouton Nouvelle discussion */}
      <div className="p-3 bg-white shrink-0">
        <button
          onClick={startNewSession}
          className="w-full text-left py-2.5 px-3.5 rounded-full bg-brand-100/70 hover:bg-brand-100 text-brand-950 font-semibold text-sm flex items-center gap-3 transition-colors cursor-pointer shadow-2xs border border-brand-200/60"
        >
          <SquarePen size={17} className="text-brand-700" />
          <span>Nouvelle discussion</span>
        </button>
      </div>

      {/* Barre de Recherche */}
      <div className="px-3 pb-2 bg-white shrink-0">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200/80 rounded-full py-1.5 pl-8 pr-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>
      </div>

      {/* Liste des discussions */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1 tradition-scrollbar">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((s) => {
            const isActive = s.id === currentSessionId;
            const isMenuOpen = activeMenuSessionId === s.id;
            const isRenaming = renamingSessionId === s.id;

            return (
              <div
                key={s.id}
                onClick={() => {
                  setCurrentSessionId(s.id);
                  setSidebarOpen(false);
                }}
                className={`group relative flex items-center justify-between p-2 rounded-2xl cursor-pointer text-xs transition-all ${
                  isActive
                    ? 'bg-brand-100/70 text-brand-950 font-semibold border border-brand-200/80 shadow-2xs'
                    : 'text-stone-700 hover:bg-stone-100/80 hover:text-stone-950'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1 pr-1">
                  {s.isPinned ? (
                    <Pin size={13} className="shrink-0 text-amber-700 fill-amber-700" />
                  ) : (
                    <MessageSquare size={13} className="shrink-0 text-brand-700 opacity-70" />
                  )}

                  {isRenaming ? (
                    <input
                      type="text"
                      value={renameValue}
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveRename(s);
                        if (e.key === 'Escape') setRenamingSessionId(null);
                      }}
                      onBlur={() => handleSaveRename(s)}
                      className="w-full bg-white border border-brand-300 rounded px-1.5 py-0.5 text-xs text-stone-900 outline-none"
                    />
                  ) : (
                    <span className="truncate">{s.title || 'Discussion sans titre'}</span>
                  )}
                </div>

                {/* Bouton d'options 3 points */}
                <div className="relative shrink-0 flex items-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuSessionId(prev => prev === s.id ? null : s.id);
                    }}
                    className={`p-1 rounded-full text-stone-400 hover:text-stone-800 transition-opacity ${
                      isActive || isMenuOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    title="Options"
                  >
                    <MoreVertical size={14} />
                  </button>

                  {/* Menu contextuel popup */}
                  {isMenuOpen && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-stone-200/90 py-1 z-50 animate-scaleIn text-left text-xs font-normal"
                    >
                      <button
                        onClick={(e) => handleTogglePin(s, e)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-stone-700 hover:bg-stone-50 text-left cursor-pointer"
                      >
                        {s.isPinned ? <PinOff size={13} /> : <Pin size={13} />}
                        <span>{s.isPinned ? 'Désépingler' : 'Épingler'}</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSessionId(s.id);
                          setIsShareModalOpen(true);
                          setActiveMenuSessionId(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-stone-700 hover:bg-stone-50 text-left cursor-pointer"
                      >
                        <Share2 size={13} />
                        <span>Partager</span>
                      </button>

                      <button
                        onClick={(e) => handleStartRename(s, e)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-stone-700 hover:bg-stone-50 text-left cursor-pointer"
                      >
                        <Pencil size={13} />
                        <span>Renommer</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSessionToDelete(s);
                          setActiveMenuSessionId(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 text-left"
                      >
                        <Trash2 size={13} />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="px-3 py-4 text-xs text-stone-400 text-center italic">
            Aucune discussion trouvée
          </div>
        )}
      </div>

      {/* Pied de Sidebar */}
      <div className="p-3 border-t border-stone-200/80 bg-white shrink-0">
        <Link
          href="/keys"
          className="flex items-center justify-between p-2 rounded-2xl hover:bg-brand-50 text-stone-800 hover:text-brand-950 transition-colors"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-900 flex items-center justify-center font-bold text-xs shrink-0 border border-brand-200">
              <Key size={15} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold truncate leading-tight">Clés API Fumi</span>
              <span className="text-[10px] text-brand-700 font-semibold leading-none mt-0.5">Accès Développeur</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 flex flex-col h-[100dvh] w-full overflow-hidden bg-white">
      {/* ================= BARRE SUPÉRIEURE GLOBALE ================= */}
      <header className="sticky top-0 shrink-0 h-14 md:h-16 bg-brand-50/95 backdrop-blur-md border-b border-brand-100 px-4 flex items-center justify-between z-40 select-none">
        {/* Gauche : Logo ou menu */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 -ml-1 text-stone-700 hover:text-brand-950 hover:bg-brand-100 rounded-full transition-colors"
            aria-label="Ouvrir le menu"
          >
            <PanelLeftOpen size={20} />
          </button>
          <FumiLogo height={28} className="md:h-8" />
          <span className="text-[10px] font-mono font-bold bg-brand-100 text-brand-900 border border-brand-300/80 px-1.5 py-0.5 rounded-md self-center shrink-0">
            IA
          </span>
        </div>

        {/* Droite : Bouton Nouveau chat + Partage */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs text-stone-500">
          <button
            type="button"
            onClick={startNewSession}
            className="flex items-center gap-1 px-3 py-1.5 bg-brand-100 hover:bg-brand-200 text-brand-950 font-semibold text-xs rounded-full transition-colors cursor-pointer shadow-2xs"
            title="Nouvelle discussion"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Nouveau chat</span>
          </button>

          {hasUserMessages && (
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-brand-100/70 rounded-full transition-colors cursor-pointer"
              title="Partager la discussion"
              aria-label="Partager"
            >
              <Share2 size={16} />
            </button>
          )}
        </div>
      </header>

      {/* ================= CORPS DE L'INTERFACE ================= */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* SIDEBAR PC */}
        {!sidebarCollapsed && (
          <aside className="hidden lg:flex w-72 shrink-0 flex-col bg-white">
            <SidebarContent />
          </aside>
        )}

        {/* DRAWER MOBILE */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-72 sm:w-80 max-w-[85vw] h-full bg-white shadow-2xl z-20 animate-slideRight flex flex-col overflow-hidden">
              <SidebarContent />
            </div>
          </div>
        )}

        {/* ZONE DE CONVERSATION PRINCIPALE */}
        <main className="flex-1 flex flex-col min-h-0 bg-white relative overflow-hidden">

          {/* Bouton de réouverture sidebar PC */}
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="hidden lg:flex absolute top-4 left-4 z-20 p-2 bg-white border border-stone-200 rounded-xl shadow-xs text-stone-600 hover:text-black hover:bg-stone-50 transition-colors"
              title="Afficher la barre latérale"
            >
              <PanelLeftOpen size={18} />
            </button>
          )}

          {/* ChatThread */}
          <ChatThread
            sessionId={currentSessionId}
            messageCount={messages.length}
            hasMessages={hasUserMessages}
            chatInput={chatInput}
            isTyping={isTyping}
            userName="Initié"
            modelName="Adaptatif"
            chatMode={chatMode}
            onSelectChatMode={(mode) => setChatMode(mode)}
            selectedImages={selectedImages.map(img => ({ id: img.id, url: img.dataUrl }))}
            onRemoveImage={handleRemoveImage}
            onClearAllImages={handleClearAllImages}
            onPasteImages={handleAddImageFiles}
            selectedImagePreview={selectedImages[0]?.dataUrl || null}
            onClearImage={handleClearAllImages}
            isListening={isListening}
            lastMessageRole={messages[messages.length - 1]?.role}
            sidebarCollapsed={sidebarCollapsed}
            onInputChange={setChatInput}
            onSubmit={handleChatSubmit}
            onPickImage={() => fileInputRef.current?.click()}
            onToggleVoice={handleToggleVoice}
            onStopTyping={handleStopTyping}
            onPreviewImage={setLightboxImageUrl}
            onQuickPrompt={(text) => submitQuery(text)}
            onNavigate={(url) => {}}
            messages={
              <div className="space-y-6 md:space-y-8">
                {messages.map((m, i) => {
                  if (m.role === 'ai' && !hasUserMessages) return null;

                  if (m.role === 'user') {
                    const imgs = (m.imageUrls && m.imageUrls.length > 0)
                      ? m.imageUrls
                      : (m.imageUrl ? [m.imageUrl] : []);

                    return (
                      <div 
                        key={i} 
                        data-role="user"
                        className="flex justify-end animate-slideUp scroll-mt-6"
                      >
                        <div className="bg-brand-900 text-white rounded-[24px] px-5 sm:px-6 py-3 sm:py-3.5 max-w-[85%] md:max-w-[75%] text-[15px] sm:text-base leading-relaxed font-normal shadow-xs space-y-2.5">
                          {/* Image unique */}
                          {imgs.length === 1 && (
                            <div 
                              onClick={() => setLightboxImageUrl(imgs[0])}
                              className="rounded-2xl overflow-hidden border border-white/20 shadow-2xs max-w-sm cursor-pointer group relative transition-transform hover:scale-[1.01]"
                              title="Cliquer pour agrandir"
                            >
                              <img 
                                src={imgs[0]} 
                                alt="Photo envoyée" 
                                className="w-full h-auto max-h-72 object-cover" 
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="p-2 bg-black/60 rounded-full text-white text-xs shadow-md">
                                  <Maximize2 size={16} />
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Grille d'images */}
                          {imgs.length > 1 && (
                            <div className={`grid gap-2 max-w-md ${
                              imgs.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'
                            }`}>
                              {imgs.map((url, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  onClick={() => setLightboxImageUrl(url)}
                                  className="aspect-square rounded-xl overflow-hidden border border-white/20 shadow-2xs cursor-pointer group relative transition-transform hover:scale-[1.02] bg-black/20"
                                  title={`Photo ${imgIdx + 1}`}
                                >
                                  <img
                                    src={url}
                                    alt={`Photo ${imgIdx + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {m.text && (
                            <p className="whitespace-pre-wrap">{m.text}</p>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // Message IA
                  return (
                    <div 
                      key={i} 
                      data-role="ai"
                      className="flex items-start gap-3 sm:gap-3.5 animate-slideUp scroll-mt-6"
                    >
                      <FumiAvatar size={34} className="mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0 text-stone-800 text-[15px] sm:text-base leading-relaxed space-y-3">
                        {/* Indicateur de mode IA */}
                        {m.chatMode && m.chatMode !== 'adaptive' && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-stone-100 border border-stone-200 text-stone-600 mb-1">
                            {m.chatMode === 'thinking' ? <Brain size={11} className="text-amber-700" /> : <Zap size={11} className="text-stone-600" />}
                            <span>{m.chatMode === 'thinking' ? 'Raisonnement approfondi' : 'Réponse rapide'}</span>
                          </div>
                        )}

                        {/* Rendu Markdown Professionnel */}
                        <ChatMessageMarkdown 
                          content={m.text} 
                          onPreviewImage={setLightboxImageUrl}
                        />

                        {/* Barre d'action inférieure de l'IA */}
                        <div className="flex items-center gap-2 pt-1 text-stone-400">
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(m.text, i)}
                            className="p-1.5 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                            title="Copier la réponse"
                            aria-label="Copier"
                          >
                            {copiedIndex === i ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSpeak(m.text, i)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isSpeakingIndex === i ? 'text-amber-700 bg-amber-50' : 'hover:text-stone-800 hover:bg-stone-100'
                            }`}
                            title={isSpeakingIndex === i ? "Arrêter la lecture" : "Écouter la réponse"}
                            aria-label="Écouter"
                          >
                            {isSpeakingIndex === i ? <VolumeX size={14} /> : <Volume2 size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Indicateur de chargement */}
                {isTyping && (
                  <div className="flex items-start gap-3 sm:gap-3.5 animate-fadeIn">
                    <FumiAvatar size={34} className="mt-0.5 shrink-0 animate-pulse" />
                    <div className="flex items-center gap-2">
                      {chatMode === 'thinking' ? (
                        <div className="flex items-center gap-2.5 text-xs sm:text-[13px] font-medium text-amber-950 bg-amber-50/90 border border-amber-200/80 px-3.5 py-2 rounded-2xl shadow-2xs">
                          <Brain size={16} className="text-amber-700 animate-pulse shrink-0" />
                          <span>Fumi réfléchit...</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping shrink-0" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 py-2.5 px-4 bg-stone-100/90 border border-stone-200/60 rounded-2xl shadow-2xs">
                          <span className="w-2 h-2 rounded-full bg-stone-500 animate-bounce" />
                          <span className="w-2 h-2 rounded-full bg-stone-500 animate-bounce [animation-delay:0.2s]" />
                          <span className="w-2 h-2 rounded-full bg-stone-500 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            }
          />

          {/* Input file caché */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelected}
            className="hidden"
            aria-hidden="true"
          />

          {/* Lightbox Modal */}
          {lightboxImageUrl && (
            <div 
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn cursor-zoom-out"
              onClick={() => setLightboxImageUrl(null)}
            >
              <div className="relative max-w-4xl max-h-[92vh] flex flex-col items-center cursor-default" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setLightboxImageUrl(null)}
                  className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                  title="Fermer"
                >
                  <X size={22} />
                </button>
                <img
                  src={lightboxImageUrl}
                  alt="Agrandissement"
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/15 animate-scaleIn select-none"
                />
              </div>
            </div>
          )}

          {/* Modal de Confirmation de Suppression */}
          {sessionToDelete && (
            <div 
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4 animate-fadeIn"
              onClick={() => setSessionToDelete(null)}
            >
              <div 
                className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-stone-100 space-y-4 animate-scaleIn cursor-default" 
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold text-stone-900 leading-snug">
                  Supprimer la discussion ?
                </h3>
                <p className="text-[13px] text-stone-600 leading-relaxed">
                  Cette action supprimera l&apos;historique de cette discussion Fumi.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSessionToDelete(null)}
                    className="py-2.5 px-4 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-sm transition-colors cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={confirmDeleteSession}
                    className="py-2.5 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-colors cursor-pointer"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Share Modal */}
          {isShareModalOpen && (
            <ShareModal
              isOpen={isShareModalOpen}
              onClose={() => setIsShareModalOpen(false)}
              sessionTitle={currentSession?.title || "Discussion Fumi"}
              shareUrl={typeof window !== 'undefined' ? window.location.href : ''}
            />
          )}
        </main>
      </div>
    </div>
  );
}
