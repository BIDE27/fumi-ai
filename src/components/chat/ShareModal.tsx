"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, Share2, X, MessageSquare, Send, ExternalLink, Loader2 } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionTitle: string;
  shareUrl: string;
  isLoading?: boolean;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  sessionTitle,
  shareUrl,
  isLoading = false,
}) => {
  const [copied, setCopied] = useState(false);

  // Verrouillage du scroll en arrière-plan (Compatibilité iOS & Android)
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cleanTitle = sessionTitle.trim() || "Discussion Fumi";

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback pour navigateurs plus anciens
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (e) {}
      document.body.removeChild(textArea);
    }
  };

  const handleNativeShare = async () => {
    if (!shareUrl) return;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: cleanTitle,
          url: shareUrl,
        });
      } catch (err: any) {
        if (err.name !== "AbortError") {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`« ${cleanTitle} » — Fumi IA`)}`;

  return (
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop sombre avec flou Safari */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        style={{ WebkitBackdropFilter: "blur(4px)" }}
      />

      {/* Panneau Bottom-Sheet sur mobile / Modale centrée sur desktop */}
      <div
        className="relative w-full sm:max-w-md bg-stone-950 text-white rounded-t-3xl sm:rounded-3xl border border-stone-800 shadow-2xl p-5 sm:p-6 z-10 animate-in slide-in-from-bottom-5 duration-200"
        style={{
          paddingBottom: "max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 1.25rem))",
          touchAction: "manipulation",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Poignée de glissement sur mobile */}
        <div className="w-12 h-1.5 bg-stone-700 rounded-full mx-auto mb-4 sm:hidden" />

        {/* En-tête */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-500 border border-amber-500/30 flex items-center justify-center">
              <Share2 size={18} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-100">
                Partager la discussion
              </h3>
              <p className="text-xs text-stone-400">
                Un instantané public et sécurisé est généré
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Zone URL du lien partagé */}
        <div className="mb-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-3 text-xs sm:text-sm font-mono text-stone-300 break-all select-all flex items-center justify-between gap-2">
            {isLoading ? (
              <div className="flex items-center gap-2 text-stone-400 py-1">
                <Loader2 size={16} className="animate-spin text-amber-500" />
                <span>Génération du lien sécurisé...</span>
              </div>
            ) : (
              <span>{shareUrl || "Génération en cours..."}</span>
            )}
          </div>
        </div>

        {/* Boutons d'action principaux : Copier & Partage natif (Capture 2) */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <button
            type="button"
            onClick={handleCopy}
            disabled={isLoading || !shareUrl}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all cursor-pointer border ${
              copied
                ? "bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-900/30"
                : "bg-stone-900 hover:bg-stone-800 text-stone-200 border-stone-800 hover:border-stone-700"
            }`}
          >
            {copied ? (
              <>
                <Check size={18} className="text-white" />
                <span>Copié !</span>
              </>
            ) : (
              <>
                <Copy size={18} className="text-amber-400" />
                <span>Copier</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            disabled={isLoading || !shareUrl}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 hover:border-stone-700 transition-all cursor-pointer"
          >
            <Share2 size={18} className="text-amber-400" />
            <span>Partager</span>
          </button>
        </div>

        {/* Carte de prévisualisation du titre (Capture 2) */}
        <div className="mb-5 bg-stone-900/70 border border-stone-800 rounded-2xl p-4 flex flex-col gap-1.5">
          <span className="text-[11px] uppercase tracking-wider text-amber-500 font-semibold">
            Aperçu pour le destinataire
          </span>
          <div className="border border-stone-700/80 rounded-xl px-4 py-3 bg-stone-950/80 text-sm font-medium text-stone-100 line-clamp-2">
            {cleanTitle}
          </div>
        </div>

        {/* Partage direct vers WhatsApp & Réseaux sociaux (Capture 2 & 3) */}
        <div>
          <span className="text-xs text-stone-400 font-medium block mb-2.5">
            Partage direct rapide :
          </span>
          <div className="flex items-center gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              WhatsApp
            </a>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-600/15 hover:bg-sky-600/25 border border-sky-500/30 text-sky-400 text-xs sm:text-sm font-semibold transition-colors"
            >
              <Send size={14} />
              Telegram
            </a>

            <button
              type="button"
              onClick={() => {
                if (shareUrl) {
                  window.open(shareUrl, "_blank");
                }
              }}
              className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 transition-colors"
              title="Ouvrir la page"
            >
              <ExternalLink size={16} />
            </button>
          </div>
        </div>

        {/* Note de sécurité */}
        <p className="text-[11px] text-stone-500 text-center mt-4">
          🔒 Seuls les messages actuels sont partagés. Vos autres conversations et votre compte restent strictement privés.
        </p>
      </div>
    </div>
  );
};
