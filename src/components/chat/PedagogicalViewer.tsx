"use client";

import React, { useState, useMemo, useRef, useCallback } from 'react';
import { 
  ZoomIn, ZoomOut, Maximize2, Minimize2, 
  Download, Sparkles, Check, Copy
} from 'lucide-react';

interface PedagogicalViewerProps {
  svgContent: string;
  title?: string;
  className?: string;
}

/**
 * Assainit strictement le flux SVG pour interdire l'exécution de scripts malveillants (anti-XSS).
 */
function sanitizeSvg(rawSvg: string): string {
  if (!rawSvg) return '';

  let cleaned = rawSvg.trim();

  // Extraire la balise <svg ...>...</svg> si entourée de texte ou de balises markdown
  const svgMatch = cleaned.match(/<svg[\s\S]*?<\/svg>/i);
  if (svgMatch) {
    cleaned = svgMatch[0];
  }

  // 1. Suppression des balises dangereuses
  cleaned = cleaned.replace(/<(script|object|embed|iframe|foreignObject)[\s\S]*?<\/\1>/gi, '');
  cleaned = cleaned.replace(/<(script|object|embed|iframe|foreignObject)[^>]*>/gi, '');

  // 2. Suppression de tous les gestionnaires d'événements inline (onload, onclick, onmouseover...)
  cleaned = cleaned.replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  // 3. Neutralisation des liens javascript:
  cleaned = cleaned.replace(/(href|xlink:href)\s*=\s*["']?\s*javascript:[^"'>]*/gi, '$1="#"');

  // 4. S'assurer que le SVG a un viewBox pour un rendu responsive fluide
  if (!cleaned.includes('viewBox') && !cleaned.includes('viewbox')) {
    const widthMatch = cleaned.match(/width=["']?(\d+)/i);
    const heightMatch = cleaned.match(/height=["']?(\d+)/i);
    if (widthMatch && heightMatch) {
      cleaned = cleaned.replace(
        /<svg/i, 
        `<svg viewBox="0 0 ${widthMatch[1]} ${heightMatch[1]}"`
      );
    } else {
      cleaned = cleaned.replace(/<svg/i, '<svg viewBox="0 0 500 350"');
    }
  }

  // 5. Remplacer les dimensions absolues bloquantes par 100% pour que le conteneur gère la taille
  cleaned = cleaned.replace(/(<svg[^>]*)\swidth=["'][^"']*["']/i, '$1 width="100%"');
  cleaned = cleaned.replace(/(<svg[^>]*)\sheight=["'][^"']*["']/i, '$1 height="auto"');

  return cleaned;
}

/**
 * Détecte intelligemment le domaine et le titre pédagogique d'après le contenu du SVG.
 */
function detectDiagramMeta(svg: string, customTitle?: string): { category: string; icon: string; title: string } {
  const lower = svg.toLowerCase();

  // Extraction d'un titre inclus dans le SVG s'il existe
  const titleMatch = svg.match(/<title>([^<]+)<\/title>/i);
  const detectedTitle = customTitle || (titleMatch ? titleMatch[1].trim() : '');

  if (
    lower.includes('pythagore') || 
    lower.includes('hypoténuse') || 
    lower.includes('hypotenuse') || 
    lower.includes('triangle') || 
    lower.includes('thales') ||
    lower.includes('angle droit') ||
    lower.includes('géométrie') ||
    lower.includes('geometrie') ||
    lower.includes('polygone') ||
    lower.includes('cercle')
  ) {
    return {
      category: 'Géométrie',
      icon: '📐',
      title: detectedTitle || 'Figure Géométrique'
    };
  }

  if (
    lower.includes('circuit') || 
    lower.includes('résistance') || 
    lower.includes('resistance') || 
    lower.includes('pile') || 
    lower.includes('lampe') || 
    lower.includes('générateur') || 
    lower.includes('interrupteur') ||
    lower.includes('voltmètre') ||
    lower.includes('ampèremètre') ||
    lower.includes('courant') ||
    lower.includes('physique')
  ) {
    return {
      category: 'Physique & Électricité',
      icon: '⚡',
      title: detectedTitle || 'Schéma de Circuit Électrique'
    };
  }

  if (
    lower.includes('atome') || 
    lower.includes('électron') || 
    lower.includes('electron') || 
    lower.includes('proton') || 
    lower.includes('neutron') || 
    lower.includes('noyau') || 
    lower.includes('molécule') || 
    lower.includes('molecule') || 
    lower.includes('bohr') || 
    lower.includes('chimie')
  ) {
    return {
      category: 'Physique-Chimie',
      icon: '⚛️',
      title: detectedTitle || 'Modèle Atomique & Moléculaire'
    };
  }

  if (
    lower.includes('fonction') || 
    lower.includes('courbe') || 
    lower.includes('f(x)') || 
    lower.includes('repère') || 
    lower.includes('abscisse') || 
    lower.includes('ordonnée') || 
    lower.includes('graphe')
  ) {
    return {
      category: 'Graphe & Analyse',
      icon: '📈',
      title: detectedTitle || 'Courbe & Repère Cartésien'
    };
  }

  return {
    category: 'Illustration Pédagogique',
    icon: '🔬',
    title: detectedTitle || 'Schéma Pédagogique Fumi'
  };
}

export const PedagogicalViewer: React.FC<PedagogicalViewerProps> = ({
  svgContent,
  title: initialTitle,
  className = ''
}) => {
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sanitizedSvg = useMemo(() => sanitizeSvg(svgContent), [svgContent]);
  const meta = useMemo(() => detectDiagramMeta(sanitizedSvg, initialTitle), [sanitizedSvg, initialTitle]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.6));
  const handleResetZoom = () => setZoom(1);

  // Téléchargement propre du fichier SVG pour les devoirs de l'élève
  const handleDownload = useCallback(() => {
    try {
      const blob = new Blob([sanitizedSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const safeName = meta.title.toLowerCase().replace(/[^a-z0-9]/g, '_');
      link.download = `fumi_${safeName || 'schema'}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Erreur téléchargement SVG:", e);
    }
  }, [sanitizedSvg, meta.title]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(sanitizedSvg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  }, [sanitizedSvg]);

  if (!sanitizedSvg) return null;

  return (
    <>
      <div 
        ref={containerRef}
        className={`my-3.5 rounded-2xl border border-stone-200/90 bg-white shadow-xs overflow-hidden transition-all hover:shadow-md ${className}`}
      >
        {/* Barre d'en-tête du viewer pédagogique */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-stone-50/90 border-b border-stone-200/80 select-none">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base shrink-0" aria-hidden="true">{meta.icon}</span>
            <div className="truncate">
              <span className="text-xs font-bold text-stone-900 truncate block">
                {meta.title}
              </span>
              <span className="text-[10px] text-stone-500 font-medium tracking-wide uppercase font-mono">
                {meta.category} • Précision Fumi
              </span>
            </div>
          </div>

          {/* Outils interactifs : Zoom, Reset, Copier, Télécharger, Plein Écran */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 0.6}
              className="p-1 text-stone-600 hover:text-brand-900 hover:bg-stone-200/70 disabled:opacity-30 rounded-lg transition-colors cursor-pointer"
              title="Zoom arrière (-)"
              aria-label="Zoom arrière"
            >
              <ZoomOut size={15} />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="px-1.5 py-0.5 text-[11px] font-mono font-semibold text-stone-600 hover:text-brand-900 hover:bg-stone-200/70 rounded-lg transition-colors cursor-pointer"
              title="Réinitialiser le zoom (100%)"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 2.5}
              className="p-1 text-stone-600 hover:text-brand-900 hover:bg-stone-200/70 disabled:opacity-30 rounded-lg transition-colors cursor-pointer"
              title="Zoom avant (+)"
              aria-label="Zoom avant"
            >
              <ZoomIn size={15} />
            </button>

            <div className="h-3.5 w-px bg-stone-200 mx-1" aria-hidden="true" />

            <button
              type="button"
              onClick={handleDownload}
              className="p-1 text-stone-600 hover:text-brand-900 hover:bg-brand-50 rounded-lg transition-colors cursor-pointer"
              title="Télécharger la figure vectorielle (SVG)"
              aria-label="Télécharger"
            >
              <Download size={15} />
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="p-1 text-stone-600 hover:text-brand-900 hover:bg-brand-50 rounded-lg transition-colors cursor-pointer"
              title="Afficher en grand"
              aria-label="Agrandir"
            >
              <Maximize2 size={15} />
            </button>
          </div>
        </div>

        {/* Zone de rendu SVG avec zoom dynamique */}
        <div className="relative p-4 sm:p-6 bg-gradient-to-b from-stone-50/40 via-white to-stone-50/20 overflow-x-auto overflow-y-hidden flex items-center justify-center min-h-[220px]">
          <div 
            className="w-full flex items-center justify-center transition-transform duration-150 ease-out origin-center select-none max-w-full"
            style={{ transform: `scale(${zoom})` }}
            dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
          />
        </div>

        {/* Pied de carte informatif */}
        <div className="px-3.5 py-1.5 bg-stone-50/50 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 select-none">
          <span className="flex items-center gap-1">
            <Sparkles size={11} className="text-amber-500" />
            <span>Illustration vectorielle géométrique & scientifique</span>
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="hover:text-stone-700 transition-colors cursor-pointer flex items-center gap-1 font-mono text-[10px]"
          >
            {copied ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
            <span>{copied ? 'Copié' : 'SVG'}</span>
          </button>
        </div>
      </div>

      {/* Modal plein écran interactif */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-stone-200">
            {/* Header modal */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-stone-50 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{meta.icon}</span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900">{meta.title}</h3>
                  <p className="text-xs text-stone-500 font-mono uppercase">{meta.category} • Plein Écran</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-3 py-1.5 text-xs font-semibold bg-brand-50 text-brand-900 hover:bg-brand-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Télécharger</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 rounded-xl transition-colors cursor-pointer"
                  title="Fermer"
                >
                  <Minimize2 size={18} />
                </button>
              </div>
            </div>

            {/* Corps du SVG en plein écran */}
            <div className="flex-1 overflow-auto p-6 sm:p-10 flex items-center justify-center bg-stone-50/30 min-h-[350px]">
              <div 
                className="w-full max-w-2xl flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
