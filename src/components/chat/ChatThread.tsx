"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { 
  Plus, Mic, Send, ChevronDown, X, Square, Brain, Zap, Sparkles, Maximize2, ArrowUp,
  Crown, BookOpen, Compass, Shield, Flame, ArrowUpRight, MessageSquareText,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { GeminiStarIcon, FumiAvatar, FumiLogo, FumiLettre } from "./GeminiStarIcon";
import { getFumiGreeting, getFumiProactiveCards, type FumiProactiveCard } from "@/lib/fumiGreetings";

export interface AttachedImagePreview {
  id: string;
  url: string;
}

type ChatThreadProps = {
  sessionId?: string;
  messages: ReactNode;
  messageCount: number;
  hasMessages: boolean;
  chatInput: string;
  isTyping: boolean;
  userName?: string;
  modelName?: string;
  chatMode?: 'adaptive' | 'fast' | 'thinking';
  selectedImages?: AttachedImagePreview[];
  onRemoveImage?: (id: string) => void;
  onClearAllImages?: () => void;
  onPasteImages?: (files: File[]) => void;
  selectedImagePreview?: string | null;
  onClearImage?: () => void;
  isListening?: boolean;
  lastMessageRole?: 'user' | 'ai';
  sidebarCollapsed?: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onPickImage?: () => void;
  onToggleVoice?: () => void;
  onStopTyping?: () => void;
  onSelectChatMode?: (mode: 'adaptive' | 'fast' | 'thinking') => void;
  onPreviewImage?: (url: string) => void;
  onQuickPrompt?: (promptText: string) => void;
  onNavigate?: (url: string) => void;
};

function ChatModeDropdownMenu({
  chatMode = 'adaptive',
  modelName = 'Adaptatif',
  onSelectChatMode,
}: {
  chatMode?: 'adaptive' | 'fast' | 'thinking';
  modelName?: string;
  onSelectChatMode?: (mode: 'adaptive' | 'fast' | 'thinking') => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const displayLabel = chatMode === 'thinking' ? 'Réfléchir' : chatMode === 'fast' ? 'Rapide' : 'Adaptatif';

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className={`flex items-center gap-1.5 font-medium text-xs py-1 px-2 sm:px-2.5 rounded-full transition-all cursor-pointer select-none ${
          chatMode === 'thinking'
            ? 'bg-amber-100 text-amber-950 border border-amber-300/90 shadow-2xs font-semibold'
            : chatMode === 'fast'
            ? 'bg-stone-100 text-stone-800 border border-stone-200/80 hover:bg-stone-200/70'
            : 'bg-brand-50/90 text-brand-950 border border-brand-200/70 hover:bg-brand-100/80'
        }`}
        title="Changer le mode de réponse de Fumi"
        aria-label="Mode de réflexion Fumi"
        aria-expanded={isOpen}
      >
        {chatMode === 'thinking' ? (
          <Brain size={13} className="text-amber-700 shrink-0" />
        ) : chatMode === 'fast' ? (
          <Zap size={13} className="text-stone-600 shrink-0" />
        ) : (
          <Sparkles size={13} className="text-brand-700 shrink-0" />
        )}
        <span className="truncate max-w-[85px] sm:max-w-none">
          {displayLabel}
        </span>
        <ChevronDown size={12} className={`text-stone-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2.5 w-64 sm:w-72 bg-white rounded-2xl shadow-xl border border-stone-200/90 p-1.5 z-50 animate-scaleIn text-left">
          <div className="px-3 py-1.5 border-b border-stone-100 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-mono">
              Mode de réponse
            </span>
          </div>

          {/* Option 1 : Adaptatif (Par défaut) */}
          <button
            type="button"
            onClick={() => {
              onSelectChatMode?.('adaptive');
              setIsOpen(false);
            }}
            className={`w-full flex items-start gap-2.5 p-2 rounded-xl transition-all text-left cursor-pointer ${
              chatMode === 'adaptive'
                ? 'bg-brand-50 text-brand-950 border border-brand-200/80 font-medium'
                : 'hover:bg-stone-50 text-stone-800'
            }`}
          >
            <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${chatMode === 'adaptive' ? 'bg-brand-200/70 text-brand-900' : 'bg-stone-100 text-stone-600'}`}>
              <Sparkles size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-900">Adaptatif</span>
                <span className="text-[10px] bg-brand-200/70 text-brand-900 font-semibold px-1.5 py-0.2 rounded-full">Défaut</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                S'adapte naturellement selon la complexité de chaque question.
              </p>
            </div>
          </button>

          {/* Option 2 : Rapide */}
          <button
            type="button"
            onClick={() => {
              onSelectChatMode?.('fast');
              setIsOpen(false);
            }}
            className={`w-full flex items-start gap-2.5 p-2 rounded-xl transition-all text-left cursor-pointer mt-1 ${
              chatMode === 'fast'
                ? 'bg-stone-100 text-stone-950 border border-stone-300 font-medium'
                : 'hover:bg-stone-50 text-stone-800'
            }`}
          >
            <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${chatMode === 'fast' ? 'bg-stone-300 text-stone-900' : 'bg-stone-100 text-stone-600'}`}>
              <Zap size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-stone-900 block">Rapide</span>
              <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                Réponses directes et instantanées pour le quotidien.
              </p>
            </div>
          </button>

          {/* Option 3 : Réfléchir */}
          <button
            type="button"
            onClick={() => {
              onSelectChatMode?.('thinking');
              setIsOpen(false);
            }}
            className={`w-full flex items-start gap-2.5 p-2 rounded-xl transition-all text-left cursor-pointer mt-1 ${
              chatMode === 'thinking'
                ? 'bg-amber-50 text-amber-950 border border-amber-300 font-medium'
                : 'hover:bg-amber-50/50 text-stone-800'
            }`}
          >
            <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${chatMode === 'thinking' ? 'bg-amber-200 text-amber-900' : 'bg-stone-100 text-amber-700'}`}>
              <Brain size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-amber-950 block">Réfléchir</span>
              <p className="text-[11px] text-amber-800/80 leading-tight mt-0.5">
                Analyse méthodique et raisonnement approfondi pas à pas.
              </p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

function ChatUnifiedInputCard({
  chatInput,
  onInputChange,
  onSubmit,
  onPickImage,
  onClearImage,
  onRemoveImage,
  onPasteImages,
  onPreviewImage,
  selectedImagePreview,
  selectedImages,
  chatMode = 'adaptive',
  modelName = 'Adaptatif',
  onSelectChatMode,
  isTyping,
  onStopTyping,
  isListening,
  onToggleVoice,
  placeholder,
}: {
  chatInput: string;
  onInputChange: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
  onPickImage?: () => void;
  onClearImage?: () => void;
  onRemoveImage?: (id: string) => void;
  onPasteImages?: (files: File[]) => void;
  onPreviewImage?: (url: string) => void;
  selectedImagePreview?: string | null;
  selectedImages?: AttachedImagePreview[];
  chatMode?: 'adaptive' | 'fast' | 'thinking';
  modelName?: string;
  onSelectChatMode?: (mode: 'adaptive' | 'fast' | 'thinking') => void;
  isTyping: boolean;
  onStopTyping?: () => void;
  isListening?: boolean;
  onToggleVoice?: () => void;
  placeholder?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-ajustement dynamique fluide de la hauteur du textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollH = textarea.scrollHeight;
      const targetH = Math.min(scrollH, 160);
      textarea.style.height = `${targetH}px`;
    }
  }, [chatInput]);

  const attachedImages: AttachedImagePreview[] = (selectedImages && selectedImages.length > 0)
    ? selectedImages
    : (selectedImagePreview ? [{ id: 'single', url: selectedImagePreview }] : []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if ((chatInput.trim() || attachedImages.length > 0) && !isTyping) {
        const form = (e.target as HTMLElement).closest('form');
        if (form) {
          form.requestSubmit();
        } else {
          onSubmit(e as any);
        }
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items || items.length === 0) return;
    const imageFiles: File[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          imageFiles.push(file);
        }
      }
    }
    if (imageFiles.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      onPasteImages?.(imageFiles);
    }
  };

  const hasContent = Boolean(chatInput.trim() || attachedImages.length > 0);

  // STRUCTURE UNIFIÉE STYLE GEMINI CHAT (Capture 3) : TEXTAREA PLEINE LARGEUR EN HAUT, BOUTONS D'ACTION EN BAS
  return (
    <form
      onSubmit={onSubmit}
      onPaste={handlePaste}
      style={{ borderRadius: '30px' }}
      className="w-full bg-white rounded-[28px] sm:rounded-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-stone-200/90 p-3.5 sm:p-4 flex flex-col transition-all focus-within:border-stone-400 focus-within:shadow-[0_6px_30px_rgba(0,0,0,0.12)] text-left gemini-input-card"
    >
      {/* 1. Miniatures photos intégrées si présentes (jusqu'à 5 photos) avec croix de suppression et zoom au clic */}
      {attachedImages.length > 0 && (
        <div className="flex items-center gap-2.5 overflow-x-auto py-1 mb-2.5 max-w-full scrollbar-thin">
          {attachedImages.map((img, idx) => (
            <div key={img.id || idx} className="relative group shrink-0">
              <div
                onClick={() => onPreviewImage?.(img.url)}
                className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-2xs transition-transform group-hover:scale-[1.02] cursor-pointer"
                title="Cliquer pour voir l'image en grand"
              >
                <img
                  src={img.url}
                  alt={`Photo jointe ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                  <Maximize2 size={15} className="text-white drop-shadow-xs" />
                </div>
              </div>

              {/* Croix pour supprimer l'image du champ (en haut à droite de la miniature) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onRemoveImage) {
                    onRemoveImage(img.id);
                  } else {
                    onClearImage?.();
                  }
                }}
                style={{ top: '6px', right: '6px' }}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-stone-900/85 hover:bg-black text-white flex items-center justify-center transition-all active:scale-90 shadow-md cursor-pointer z-20 border border-white/40 touch-manipulation"
                title="Supprimer cette photo"
                aria-label="Supprimer la photo"
              >
                <X size={13} strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 2. Zone de texte PLEINE LARGEUR (Capture 3 : le texte utilise toute la largeur sans être bridé par les boutons) */}
      <textarea
        ref={textareaRef}
        value={chatInput}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder={
          attachedImages.length > 1
            ? `Posez votre question sur ces ${attachedImages.length} photos...`
            : attachedImages.length === 1
            ? "Posez votre question sur cette photo..."
            : (placeholder || "Demander à Fumi...")
        }
        className="w-full bg-transparent text-stone-900 placeholder:text-stone-400 text-sm sm:text-[15px] outline-none resize-none overflow-y-auto max-h-36 leading-relaxed py-1 px-1"
      />

      {/* 3. Barre d'actions inférieure (Capture 3 : bouton + à gauche, mode/micro/envoi alignés à droite) */}
      <div className="flex items-center justify-between pt-2.5 mt-0.5 select-none">
        {/* Bouton + sur la gauche pour joindre jusqu'à 5 photos */}
        <button
          type="button"
          onClick={onPickImage}
          disabled={attachedImages.length >= 5}
          className={`p-1.5 sm:p-2 -ml-1 sm:-ml-1.5 rounded-full transition-colors shrink-0 ${
            attachedImages.length >= 5 
              ? 'text-stone-300 cursor-not-allowed' 
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 cursor-pointer'
          }`}
          title={attachedImages.length >= 5 ? "Maximum de 5 photos atteint" : `Ajouter des photos (${attachedImages.length}/5)`}
          aria-label="Ajouter une photo"
        >
          <Plus size={20} strokeWidth={2} />
        </button>

        {/* Boutons d'action sur la droite : Mode (Adaptatif) + Micro / Stop + Bouton Envoyer */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <ChatModeDropdownMenu
            chatMode={chatMode}
            modelName={modelName}
            onSelectChatMode={onSelectChatMode}
          />

          {isTyping ? (
            <button
              type="button"
              onClick={onStopTyping}
              className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-90 animate-scaleIn shrink-0"
              title="Arrêter la réponse"
              aria-label="Arrêter la réponse"
            >
              <Square size={13} className="fill-white text-white" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onToggleVoice}
              className={`p-1.5 sm:p-2 rounded-full transition-all cursor-pointer ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse shadow-md ring-2 ring-red-300' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
              title={isListening ? "Arrêter l'écoute vocale" : "Entrée vocale (parler à Fumi)"}
              aria-label="Entrée vocale"
            >
              <Mic size={19} strokeWidth={2} />
            </button>
          )}

          {hasContent && (
            <button
              type="submit"
              disabled={isTyping}
              className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-brand-900 hover:bg-brand-950 active:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 disabled:opacity-40 shrink-0 animate-scaleIn"
              title="Envoyer"
              aria-label="Envoyer"
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function renderBadgeIcon(icon: FumiProactiveCard['badgeIcon']) {
  switch (icon) {
    case 'crown':
      return <Crown size={12} className="text-amber-700 shrink-0" />;
    case 'book':
      return <BookOpen size={12} className="text-amber-700 shrink-0" />;
    case 'compass':
      return <Compass size={12} className="text-amber-700 shrink-0" />;
    case 'shield':
      return <Shield size={12} className="text-amber-700 shrink-0" />;
    case 'flame':
      return <Flame size={12} className="text-amber-700 shrink-0" />;
    case 'sparkles':
    default:
      return <Sparkles size={12} className="text-amber-700 shrink-0" />;
  }
}

export function ChatThread({
  sessionId,
  messages,
  messageCount,
  hasMessages,
  chatInput,
  isTyping,
  userName = "Initié",
  modelName = "Adaptatif",
  chatMode = 'adaptive',
  selectedImagePreview,
  selectedImages,
  onRemoveImage,
  onClearAllImages,
  onPasteImages,
  isListening = false,
  lastMessageRole,
  sidebarCollapsed = false,
  onInputChange,
  onSubmit,
  onPickImage,
  onClearImage,
  onToggleVoice,
  onStopTyping,
  onSelectChatMode,
  onPreviewImage,
  onQuickPrompt,
  onNavigate,
}: ChatThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastSessionIdRef = useRef<string | undefined>(sessionId);
  const isInitialSessionLoadRef = useRef<boolean>(true);

  // Salutation dynamique et cartes proactives calculées par session
  const greeting = useMemo(() => getFumiGreeting(userName, sessionId), [userName, sessionId]);
  const proactiveCards = useMemo(() => getFumiProactiveCards(), []);

  // Détection du contenu actif dans le champ de saisie (texte tapé ou photo jointe)
  const hasInputContent = Boolean(
    (chatInput && chatInput.trim().length > 0) ||
    (selectedImages && selectedImages.length > 0) ||
    Boolean(selectedImagePreview)
  );

  // Détecte le changement de session pour forcer un affichage direct sans effet de scroll
  useEffect(() => {
    if (sessionId !== lastSessionIdRef.current) {
      lastSessionIdRef.current = sessionId;
      isInitialSessionLoadRef.current = true;
    }
  }, [sessionId]);

  // Aligne le conteneur pour que le dernier message utilisateur soit parfaitement visible en haut (Capture 1)
  const alignToLatestUser = (behavior: ScrollBehavior = 'auto') => {
    const container = scrollRef.current;
    if (!container) return;

    const userElements = container.querySelectorAll('[data-role="user"]');
    const latestUser = userElements[userElements.length - 1] as HTMLElement | undefined;

    if (latestUser) {
      const containerRect = container.getBoundingClientRect();
      const userRect = latestUser.getBoundingClientRect();
      const relativeTop = userRect.top - containerRect.top + container.scrollTop;

      // Marge agréable de 20px au-dessus de la bulle utilisateur (Capture 1)
      const targetScrollTop = Math.max(0, relativeTop - 20);
      if (behavior === 'auto') {
        container.scrollTop = targetScrollTop;
      } else {
        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      }
    } else if (bottomAnchorRef.current) {
      if (behavior === 'auto') {
        container.scrollTop = container.scrollHeight;
      } else {
        bottomAnchorRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  };

  // Gestion du positionnement : direct sans animation au chargement / rafraîchissement, ou doux lors de nouveaux messages
  useEffect(() => {
    if (!hasMessages) return;

    // 1. Si rafraîchissement (F5), retour sur la page ou changement de session :
    // Affichage immédiat à l'écran sans aucun effet de scroll vers le bas
    if (isInitialSessionLoadRef.current) {
      isInitialSessionLoadRef.current = false;
      alignToLatestUser('auto');
      const immediateTimer = setTimeout(() => {
        alignToLatestUser('auto');
      }, 25);
      return () => clearTimeout(immediateTimer);
    }

    // 2. Si frappe / recherche / nouvelle question envoyée :
    if (isTyping) {
      const t = setTimeout(() => {
        alignToLatestUser('smooth');
      }, 40);
      return () => clearTimeout(t);
    }

    // 3. Lorsque Fumi donne sa réponse ou termine :
    // On maintient impérativement le dernier message de l'utilisateur visible à l'écran (Capture 1)
    if (lastMessageRole === 'ai') {
      const t = setTimeout(() => {
        alignToLatestUser('smooth');
      }, 40);
      return () => clearTimeout(t);
    }
  }, [messageCount, isTyping, hasMessages, lastMessageRole, sessionId]);

  return (
    <div className="relative flex flex-1 flex-col min-h-0 h-full overflow-hidden bg-gradient-to-b from-white via-brand-50/40 to-brand-100/30">
      {/* Zone de conversation ou d'accueil */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain px-4 sm:px-6 md:px-12 pt-6 md:pt-10 space-y-6 tradition-scrollbar"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {!hasMessages ? (
          /* ================= ÉTAT D'ACCUEIL VIDE PERSONNALISÉ & VIVANT ================= */
          <div className="flex flex-col items-center text-center px-0 sm:px-4 pt-1 sm:pt-3 pb-28 sm:pb-36 lg:pb-8 max-w-4xl mx-auto w-full">
            {/* Mascotte Fumi officielle & Typographie fumi_lettre */}
            <div className="mb-2 sm:mb-3 flex flex-col items-center justify-center gap-1 select-none px-4">
              <FumiAvatar size={54} className="sm:w-16 sm:h-16 hover:scale-105 transition-transform duration-300" />
              <FumiLettre height={22} className="sm:h-7" />
            </div>

            {/* Titre dynamique personnalisé (Mobile & Desktop) */}
            <div className="space-y-1 mb-3 sm:mb-4 max-w-2xl px-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-brand-950 tracking-tight leading-tight">
                {greeting.headline}
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 leading-snug font-normal max-w-md mx-auto">
                {greeting.subline}
              </p>
            </div>

            {/* CAPSULES PROACTIVES D'ACTION & DÉCOUVERTE (Disparaissent dès qu'on tape du texte ou qu'on ajoute une image) */}
            {!hasInputContent && (
              <div className="w-full max-w-3xl mb-3 sm:mb-5 transition-all duration-300 animate-fadeIn">
                <div className="flex items-center justify-between mb-2 px-4 sm:px-2">
                  <div className="flex items-center gap-1.5 text-stone-700 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider min-w-0">
                    <Sparkles size={12} className="text-amber-600 shrink-0" />
                    <span className="truncate">Suggestions proactives &amp; Secrets du Fâ</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[10px] text-stone-400 font-medium whitespace-nowrap">
                      Faites défiler →
                    </span>
                    {/* Boutons de navigation horizontale pour PC / tablette */}
                    <div className="hidden sm:flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => carouselRef.current?.scrollBy({ left: -302, behavior: 'smooth' })}
                        className="w-6 h-6 rounded-full bg-white border border-stone-200 hover:bg-stone-50 flex items-center justify-center text-stone-600 shadow-2xs cursor-pointer transition-colors"
                        title="Précédent"
                      >
                        <ChevronLeft size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => carouselRef.current?.scrollBy({ left: 302, behavior: 'smooth' })}
                        className="w-6 h-6 rounded-full bg-white border border-stone-200 hover:bg-stone-50 flex items-center justify-center text-stone-600 shadow-2xs cursor-pointer transition-colors"
                        title="Suivant"
                      >
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Conteneur Carrousel : bord à bord sur mobile (-mx-4 px-4), 2 cartes entières + début 3ème sur PC */}
                <div
                  ref={carouselRef}
                  className="flex gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar pb-2 pt-0.5 snap-x snap-mandatory text-left scroll-smooth -mx-4 sm:mx-0 px-4 sm:px-0 overscroll-x-contain"
                  style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
                >
                  {proactiveCards.map((card: FumiProactiveCard) => (
                    <div
                      key={card.id}
                      className="fumi-proactive-card snap-start bg-white/95 hover:bg-white border border-brand-200/90 hover:border-amber-400/90 rounded-2xl p-2.5 sm:p-3 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                      style={{
                        width: 'var(--fumi-card-width, 290px)',
                        minWidth: 'var(--fumi-card-width, 290px)',
                        maxWidth: 'var(--fumi-card-max-width, 290px)',
                        flex: '0 0 auto',
                      }}
                    >
                      <div className="space-y-1.5 min-w-0 w-full">
                        {/* Badge */}
                        <div className="flex items-center justify-between gap-1.5 min-w-0 w-full">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200/80 max-w-full min-w-0">
                            {renderBadgeIcon(card.badgeIcon)}
                            <span className="truncate">{card.badge}</span>
                          </span>
                        </div>

                        {/* Titre (visible sur 2 lignes sans coupure) */}
                        <h3 className="font-serif font-bold text-xs sm:text-[13px] text-stone-900 leading-snug group-hover:text-amber-950 transition-colors line-clamp-2 break-words">
                          {card.title}
                        </h3>
                      </div>

                      {/* Bouton d'action rapide pleine largeur */}
                      <div className="pt-2 mt-2 border-t border-stone-100 flex items-center w-full min-w-0">
                        <button
                          type="button"
                          onClick={() => {
                            if (card.actionType === 'navigate' && card.targetUrl) {
                              onNavigate?.(card.targetUrl);
                            } else if (card.actionType === 'prompt' && card.promptQuery) {
                              onQuickPrompt?.(card.promptQuery);
                            }
                          }}
                          className="w-full py-2 px-3 bg-brand-900 hover:bg-black active:scale-95 text-white rounded-xl text-[11px] font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer min-h-[38px] touch-manipulation"
                        >
                          {card.actionType === 'navigate' ? <ArrowUpRight size={13} className="shrink-0" /> : <MessageSquareText size={13} className="shrink-0" />}
                          <span className="truncate">{card.actionLabel}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* Espaceur discret garantissant le padding de fin sur mobile */}
                  <div className="w-1 shrink-0 sm:hidden" aria-hidden="true" />
                </div>
              </div>
            )}

            {/* PC : Champ de saisie placé AU-DESSOUS des suggestions (Capture 1) */}
            <div className="hidden lg:block w-full max-w-3xl px-2 mb-4">
              {/* Statut d'écoute vocale */}
              {isListening && (
                <div className="mb-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-medium w-fit animate-pulse mx-auto">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  <span>Fumi vous écoute... Parlez naturellement</span>
                </div>
              )}

              <ChatUnifiedInputCard
                chatInput={chatInput}
                onInputChange={onInputChange}
                onSubmit={onSubmit}
                onPickImage={onPickImage}
                onClearImage={onClearImage}
                onRemoveImage={onRemoveImage}
                onPasteImages={onPasteImages}
                onPreviewImage={onPreviewImage}
                selectedImagePreview={selectedImagePreview}
                selectedImages={selectedImages}
                chatMode={chatMode}
                modelName={modelName}
                onSelectChatMode={onSelectChatMode}
                isTyping={isTyping}
                onStopTyping={onStopTyping}
                isListening={isListening}
                onToggleVoice={onToggleVoice}
                placeholder={selectedImages && selectedImages.length > 0 ? (selectedImages.length > 1 ? `Posez votre question sur ces ${selectedImages.length} photos...` : "Posez votre question sur cette photo...") : (selectedImagePreview ? "Posez une question sur cette photo..." : "Demander à Fumi...")}
              />
              <p className="text-[11px] text-stone-400 text-center mt-2 font-normal select-none">
                Fumi est une IA et peut se tromper
              </p>
            </div>
          </div>
        ) : (
          /* ================= CONVERSATION EN COURS ================= */
          <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 pb-4">
            {messages}
            <div ref={bottomAnchorRef} className="h-4" />
          </div>
        )}

        {/* Espaceur inférieur pour que le dernier message soit 100% au-dessus de la barre flottante */}
        <div className="h-44 sm:h-52 w-full shrink-0 pointer-events-none" aria-hidden="true" />
      </div>

      {/* Voile protecteur doux pour un défilement propre des messages sous la barre */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-32 bg-gradient-to-t from-white via-white/90 to-transparent z-20" aria-hidden="true" />

      {/* ================= BARRE DE SAISIE CAPSULE FLOTTANTE ================= */}
      {/* Positionnement absolu confiné à 100% dans la zone de chat : impossible de déborder sur la sidebar */}
      <div className={`pointer-events-none absolute z-30 bottom-3 sm:bottom-5 inset-x-0 flex flex-col items-center px-4 sm:px-6 transition-all ${
        !hasMessages ? 'lg:hidden' : ''
      }`}>
        <div className="pointer-events-auto w-full max-w-3xl flex flex-col items-center">
          {/* Statut d'écoute vocale */}
          {isListening && (
            <div className="mb-2 flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-medium self-start animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>Écoute en cours... Parlez à Fumi</span>
            </div>
          )}

          <ChatUnifiedInputCard
            chatInput={chatInput}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            onPickImage={onPickImage}
            onClearImage={onClearImage}
            onRemoveImage={onRemoveImage}
            onPasteImages={onPasteImages}
            onPreviewImage={onPreviewImage}
            selectedImagePreview={selectedImagePreview}
            selectedImages={selectedImages}
            chatMode={chatMode}
            modelName={modelName}
            onSelectChatMode={onSelectChatMode}
            isTyping={isTyping}
            onStopTyping={onStopTyping}
            isListening={isListening}
            onToggleVoice={onToggleVoice}
            placeholder={selectedImages && selectedImages.length > 0 ? (selectedImages.length > 1 ? `Posez votre question sur ces ${selectedImages.length} photos...` : "Posez votre question sur cette photo...") : (selectedImagePreview ? "Posez votre question sur cette photo..." : "Demander à Fumi...")}
          />

          {/* Mention légale Fumi */}
          <p className="text-[11px] text-stone-400 text-center mt-2 font-normal select-none">
            Fumi est une IA et peut se tromper
          </p>
        </div>
      </div>
    </div>
  );
}
