"use client";

import { Menu, SquarePen, MoreVertical } from "lucide-react";

type ChatMobileHeaderProps = {
  historyOpen: boolean;
  onToggleSidebar: () => void;
  onNewSession: () => void;
  onOptionsClick?: (e: React.MouseEvent) => void;
  hasMessages?: boolean;
  modelName?: string;
};

export function ChatMobileHeader({
  historyOpen,
  onToggleSidebar,
  onNewSession,
  onOptionsClick,
  hasMessages = false,
  modelName = "Fumi AI",
}: ChatMobileHeaderProps) {
  return (
    <header className="lg:hidden shrink-0 sticky top-0 h-13 px-4 flex items-center justify-between bg-white border-b border-stone-100 z-30">
      {/* Menu Hamburger */}
      <button
        type="button"
        onClick={onToggleSidebar}
        className="p-2 -ml-2 text-stone-700 hover:text-brand-950 hover:bg-brand-50 rounded-full transition-colors active:scale-95 cursor-pointer"
        aria-label="Ouvrir le menu"
      >
        <Menu size={22} strokeWidth={2} />
      </button>

      <div className="flex items-center gap-1">
        {/* Bouton Nouvelle discussion (Crayon) */}
        <button
          type="button"
          onClick={onNewSession}
          className="p-2 text-stone-700 hover:text-brand-950 hover:bg-brand-50 rounded-full transition-colors active:scale-95 cursor-pointer"
          aria-label="Nouvelle discussion"
        >
          <SquarePen size={20} strokeWidth={1.8} />
        </button>

        {/* Menu 3 points (Capture 2 : fonctionne exactement comme les 3 points devant les conversations) */}
        {hasMessages && (
          <button
            type="button"
            onClick={onOptionsClick}
            className="p-2 text-stone-700 hover:text-brand-950 hover:bg-brand-50 rounded-full transition-colors active:scale-95 cursor-pointer"
            aria-label="Options de la discussion"
            title="Options de la discussion"
          >
            <MoreVertical size={19} strokeWidth={1.8} />
          </button>
        )}
      </div>
    </header>
  );
}

