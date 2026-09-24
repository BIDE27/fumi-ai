"use client";

import React, { memo } from 'react';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { 
  ExternalLink, 
  Sun, 
  Sparkles, 
  BookOpen, 
  ShoppingBag, 
  CalendarDays, 
  PhoneCall, 
  ArrowRight 
} from 'lucide-react';
import { PedagogicalViewer } from './PedagogicalViewer';
import { ALL_256_FA_SIGNS, FaSign } from '@/lib/faSigns';

const TableContext = React.createContext<boolean>(false);

/**
 * Analyse et extrait les 4 niveaux binaires d'un tracé sacré du Fâ
 */
export function parseFaTrace(raw: string): { left: 'I' | 'II'; right: 'I' | 'II' }[] | null {
  if (!raw || typeof raw !== 'string') return null;
  const cleaned = raw
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\\\|/g, '|')
    .replace(/[|/;,]/g, '\n')
    .trim();

  const lines = cleaned.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length !== 4) return null;

  const result: { left: 'I' | 'II'; right: 'I' | 'II' }[] = [];
  for (const line of lines) {
    const parts = line.split(/\s+/).filter(Boolean);
    if (parts.length !== 2) return null;
    const left = parts[0].toUpperCase();
    const right = parts[1].toUpperCase();
    if ((left === 'I' || left === 'II') && (right === 'I' || right === 'II')) {
      result.push({ left: left as 'I' | 'II', right: right as 'I' | 'II' });
    } else {
      return null;
    }
  }
  return result;
}

/**
 * Retrouve le signe du Fâ correspondant aux 4 niveaux binaires
 */
export function matchFaSignFromLines(lines: { left: 'I' | 'II'; right: 'I' | 'II' }[]): FaSign | undefined {
  if (!lines || lines.length !== 4) return undefined;
  return ALL_256_FA_SIGNS.find(s =>
    s.lines.every((l, idx) => l.left === lines[idx]?.left && l.right === lines[idx]?.right)
  );
}

/**
 * Badge visuel authentique affichant le tracé géomantique en 2 colonnes verticales de 4 niveaux
 */
interface FaSignVisualBadgeProps {
  lines?: { left: 'I' | 'II'; right: 'I' | 'II' }[];
  rawTrace?: string;
  compact?: boolean;
}

export function FaSignVisualBadge({ lines, rawTrace, compact = false }: FaSignVisualBadgeProps) {
  const parsedLines = lines || (rawTrace ? parseFaTrace(rawTrace) : null);
  if (!parsedLines || parsedLines.length !== 4) {
    return (
      <code className="font-mono text-xs text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
        {rawTrace}
      </code>
    );
  }

  const matched = matchFaSignFromLines(parsedLines);

  return (
    <span
      className={`inline-flex flex-col items-center justify-center align-middle ${
        compact 
          ? 'py-1 px-2 my-0.5 min-w-[50px] rounded-lg' 
          : 'py-2 px-3.5 my-1 min-w-[70px] rounded-xl'
      } bg-gradient-to-b from-amber-50/95 via-orange-50/60 to-amber-100/70 border border-amber-300/80 shadow-2xs select-none transition-all duration-150 hover:border-amber-400 hover:shadow-xs group`}
      title={matched ? `${matched.nameFon} (${matched.nameYoruba}) — Signe #${matched.order}` : 'Tracé géomantique sacré du Fâ'}
    >
      {/* Les deux colonnes géomantiques alignées (Dugbê / Odù) */}
      <span className={`flex flex-row items-center justify-center ${compact ? 'gap-2' : 'gap-3.5'} font-serif font-black`}>
        {/* Colonne Gauche (Osi / Dounon) */}
        <span className="flex flex-col items-center gap-0.5">
          {parsedLines.map((line, idx) => (
            <span
              key={`l-${idx}`}
              className={`${
                compact ? 'w-3 text-xs leading-none' : 'w-4 text-sm sm:text-base leading-tight'
              } text-center tracking-tight text-amber-950 font-bold`}
            >
              {line.left}
            </span>
          ))}
        </span>

        {/* Colonne Droite (Otun / Akouè) */}
        <span className="flex flex-col items-center gap-0.5">
          {parsedLines.map((line, idx) => (
            <span
              key={`r-${idx}`}
              className={`${
                compact ? 'w-3 text-xs leading-none' : 'w-4 text-sm sm:text-base leading-tight'
              } text-center tracking-tight text-amber-950 font-bold`}
            >
              {line.right}
            </span>
          ))}
        </span>
      </span>

      {/* Titre ou nom du signe si non-compact et identifié */}
      {matched && !compact && (
        <span className="text-[9.5px] font-bold tracking-tight text-amber-900/80 mt-1 pt-0.5 border-t border-amber-200/70 text-center truncate max-w-[80px]">
          {matched.nameFon}
        </span>
      )}
    </span>
  );
}

/**
 * Composant de code Markdown personnalisé gérant le SVG, les tracés du Fâ et le code classique
 */
function MarkdownCode({ 
  className, 
  children, 
  ...props 
}: React.ComponentPropsWithoutRef<'code'> & { className?: string }) {
  const isInTable = React.useContext(TableContext);
  const contentStr = String(children || '').trim();

  // 1. Détection des diagrammes ou SVG
  const isSvg = (className && (className.includes('language-svg') || className.includes('language-xml'))) || 
                contentStr.startsWith('<svg') || 
                (contentStr.includes('<svg') && contentStr.includes('</svg>'));

  if (isSvg) {
    return <PedagogicalViewer svgContent={contentStr} />;
  }

  // 2. Détection d'un tracé sacré du Fâ
  const cleanContent = contentStr.replace(/^['"`]+|['"`]+$/g, '').trim();
  if (cleanContent.startsWith('[FA_TRACE:') && cleanContent.endsWith(']')) {
    const raw = cleanContent.slice(10, -1);
    return <FaSignVisualBadge rawTrace={raw} compact={isInTable} />;
  }

  const parsedFaTrace = parseFaTrace(cleanContent);
  if (parsedFaTrace) {
    return <FaSignVisualBadge lines={parsedFaTrace} compact={isInTable} />;
  }

  // 3. Rendu inline ou bloc classique
  const isInline = !className && typeof children === 'string' && !children.includes('\n');
  if (isInline) {
    return (
      <code className="bg-brand-50 text-brand-900 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono border border-brand-200/60" {...props}>
        {children}
      </code>
    );
  }
  return (
    <pre className="bg-stone-900 text-stone-100 p-3.5 rounded-2xl overflow-x-auto text-xs sm:text-sm font-mono my-2.5 shadow-xs">
      <code {...props}>{children}</code>
    </pre>
  );
}

interface ChatMessageMarkdownProps {
  content: string;
  onNavigate?: (page: string, id?: string) => void;
  onPreviewImage?: (url: string) => void;
}

// Fonction utilitaire pour choisir l'icône appropriée selon la destination
function getRouteIcon(href: string) {
  const h = href.toLowerCase();
  if (h.includes('fezan') || h.includes('agenda')) {
    return <Sun size={13} className="text-amber-600 shrink-0" />;
  }
  if (h.includes('consultation')) {
    return <Sparkles size={13} className="text-amber-600 shrink-0" />;
  }
  if (h.includes('learning') || h.includes('formation') || h.includes('cours')) {
    return <BookOpen size={13} className="text-amber-600 shrink-0" />;
  }
  if (h.includes('store') || h.includes('boutique')) {
    return <ShoppingBag size={13} className="text-amber-600 shrink-0" />;
  }
  if (h.includes('event')) {
    return <CalendarDays size={13} className="text-amber-600 shrink-0" />;
  }
  if (h.includes('contact')) {
    return <PhoneCall size={13} className="text-amber-600 shrink-0" />;
  }
  if (h.includes('tofa') || h.includes('abonnement')) {
    return <Sparkles size={13} className="text-amber-600 shrink-0" />;
  }
  return <ArrowRight size={12} className="text-amber-600 shrink-0" />;
}

export const ChatMessageMarkdown = memo(function ChatMessageMarkdown({ 
  content, 
  onNavigate,
  onPreviewImage 
}: ChatMessageMarkdownProps) {
  const router = useRouter();

  if (!content) return null;

  let processed = content;

  // 1. Normaliser les liens markdown où un tag d'action est dans l'URL : [Texte]([ACTION_...])
  processed = processed
    .replace(/\(\[?ACTION_AGENDA(?::[^\]\)]*)?\]?\)/gi, '(/fezan)')
    .replace(/\(\[?ACTION_CONSULTATION(?::[^\]\)]*)?\]?\)/gi, '(/consultation)')
    .replace(/\(\[?ACTION_COURSE:all\]?\)/gi, '(/learning)')
    .replace(/\(\[?ACTION_COURSE:([^\]\)]*)\]?\)/gi, '(/learning?id=$1)')
    .replace(/\(\[?ACTION_COURSE\]?\)/gi, '(/learning)')
    .replace(/\(\[?ACTION_STORE:all\]?\)/gi, '(/store)')
    .replace(/\(\[?ACTION_STORE:([^\]\)]*)\]?\)/gi, '(/store?id=$1)')
    .replace(/\(\[?ACTION_STORE\]?\)/gi, '(/store)')
    .replace(/\(\[?ACTION_TOFA2026\]?\)/gi, '(/tofa-2026)')
    .replace(/\(\[?ACTION_SUBSCRIPTION\]?\)/gi, '(/abonnement)')
    .replace(/\(\[?ACTION_EVENT(?::[^\]\)]*)?\]?\)/gi, '(/events)')
    .replace(/\(\[?ACTION_CONTACT\]?\)/gi, '(/contact)');

  // 2. Transformer les balises d'action orphelines [ACTION_...] en liens markdown fonctionnels
  processed = processed
    .replace(/\[ACTION_AGENDA(?::today|:all)?\]/gi, '[☀️ Consulter le Calendrier Fêzan](/fezan)')
    .replace(/\[ACTION_CONSULTATION\]/gi, '[🔮 Réserver une Consultation du Fâ](/consultation)')
    .replace(/\[ACTION_COURSE:all\]/gi, '[📚 Explorer les Formations & Savoirs](/learning)')
    .replace(/\[ACTION_COURSE:([^\]]+)\]/gi, '[📚 Découvrir la Formation](/learning?id=$1)')
    .replace(/\[ACTION_COURSE\]/gi, '[📚 Explorer les Formations & Savoirs](/learning)')
    .replace(/\[ACTION_STORE:all\]/gi, '[🛍️ Visiter la Boutique Sacrée](/store)')
    .replace(/\[ACTION_STORE:([^\]]+)\]/gi, '[🛍️ Découvrir le Produit](/store?id=$1)')
    .replace(/\[ACTION_STORE\]/gi, '[🛍️ Visiter la Boutique Sacrée](/store)')
    .replace(/\[ACTION_TOFA2026\]/gi, '[✨ Consulter les Présages du Tofa 2026](/tofa-2026)')
    .replace(/\[ACTION_SUBSCRIPTION\]/gi, '[⭐ Voir les Formules d\'Abonnement](/abonnement)')
    .replace(/\[ACTION_EVENT(?::all)?\]/gi, '[📅 Découvrir les Événements & Rituels](/events)')
    .replace(/\[ACTION_CONTACT\]/gi, '[📞 Contacter notre Équipe](/contact)')
    .replace(/\[ACTION_HUMAN_HELP\]/gi, '');

  // Nettoyer les balises de diagramme pour l'affichage markdown (rendues par ailleurs en carte visuelle)
  processed = processed.replace(/\[ACTION_DIAGRAM:[^\]]*\]/gi, '').trim();

  // 2. Normalisation des formules LaTeX alternatives \( ... \) -> $ ... $ et \[ ... \] -> $$ ... $$
  processed = processed
    .replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$$')
    .replace(/\\\[([\s\S]*?)\\\]/g, '$$$$$1$$$$');

  // 3. Encapsuler automatiquement les balises SVG orphelines (hors code fences) dans des blocs ```svg
  // pour garantir leur rendu graphique interactif avec PedagogicalViewer
  processed = processed.replace(/(^|[^\`])(<svg[\s\S]*?<\/svg>)([^\`]|$)/gi, (match, p1, svg, p3) => {
    return `${p1}\n\n\`\`\`svg\n${svg}\n\`\`\`\n\n${p3}`;
  });

  // 4. Transformation et assainissement des tracés sacrés du Fâ en badges géomantiques visuels
  // 4.1 Normaliser TOUTE balise [FA_TRACE:...] déjà existante (remplacer les pipes internes par '/' et assurer l'encadrement en backticks)
  processed = processed.replace(
    /`?\[FA_TRACE:([^\]\n]+)\]`?/gi,
    (m, inner) => {
      const normalized = inner
        .replace(/<br\s*\/?>/gi, ' / ')
        .replace(/\\?\|/g, ' / ')
        .replace(/\s*\/\s*/g, ' / ')
        .trim();
      return `\`[FA_TRACE:${normalized}]\``;
    }
  );

  // 4.2 Convertir les tracés bruts d'une ligne (ex: I I | I I | I I | I I ou I I / I I...) en `[FA_TRACE:...]`
  // IMPORTANT : L'utilisation de '/' plutôt que '|' est ABSOLUMENT CRUCIALE pour ne jamais casser les cellules des tableaux Markdown !
  processed = processed.replace(
    /`?[ \t]*(?<!\[FA_TRACE:)\b(I{1,2}[ \t]+I{1,2}[ \t]*(?:\\?\||\/|<br\s*\/?>)[ \t]*I{1,2}[ \t]+I{1,2}[ \t]*(?:\\?\||\/|<br\s*\/?>)[ \t]*I{1,2}[ \t]+I{1,2}[ \t]*(?:\\?\||\/|<br\s*\/?>)[ \t]*I{1,2}[ \t]+I{1,2})\b[ \t]*(?!\])`?/gi,
    (match, tr) => {
      const normalized = tr
        .replace(/<br\s*\/?>/gi, ' / ')
        .replace(/\\?\|/g, ' / ')
        .replace(/\s*\/\s*/g, ' / ')
        .trim();
      return `\`[FA_TRACE:${normalized}]\``;
    }
  );

  // 4.3 Cas B : Tracés géomantiques en bloc de 4 lignes consécutives en texte brut
  processed = processed.replace(
    /(?:^|\n)[ \t]*(I{1,2}[ \t]+I{1,2})[ \t]*\n[ \t]*(I{1,2}[ \t]+I{1,2})[ \t]*\n[ \t]*(I{1,2}[ \t]+I{1,2})[ \t]*\n[ \t]*(I{1,2}[ \t]+I{1,2})(?=[ \t]*(?:\n|$))/g,
    (m, l1, l2, l3, l4) => `\n\`[FA_TRACE:${l1.trim()} / ${l2.trim()} / ${l3.trim()} / ${l4.trim()}]\`\n`
  );

  // 4.4 Nettoyer les doublons accidentels de balise ou de backticks
  processed = processed.replace(/``+\[FA_TRACE:/gi, '`[FA_TRACE:');
  processed = processed.replace(/\]``+/gi, ']`');

  // 4.5 Sécurité anti-fuite : nettoyer tout fragment de code résiduel '[FA_TRACE:...' qui n'aurait pas été fermé par ']'
  processed = processed.replace(/`?\[?FA_TRACE:([^\]\n]+)$/gim, (m, rest) => rest.trim());

  // 5. Auto-équilibrage de sécurité : fermer les balises markdown orphelines pour éviter d'afficher des astérisques ou du code cassé
  const doubleAsteriskMatches = processed.match(/\*\*/g);
  if (doubleAsteriskMatches && doubleAsteriskMatches.length % 2 !== 0) {
    processed += '**';
  }
  const backtickMatches = processed.match(/(?<!`)`(?!`)/g);
  if (backtickMatches && backtickMatches.length % 2 !== 0) {
    processed += '`';
  }

  return (
    <div className="prose prose-stone max-w-none text-stone-800 text-[15px] sm:text-base leading-relaxed space-y-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, { output: 'htmlAndMathml', throwOnError: false }]]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-brand-950 mt-4 mb-2 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg sm:text-xl font-bold font-serif text-brand-900 mt-3.5 mb-2 tracking-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base sm:text-lg font-bold font-serif text-brand-950 mt-3 mb-1.5">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-[15px] sm:text-base font-bold text-stone-900 mt-2 mb-1">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="leading-relaxed my-1.5 text-stone-800">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-stone-900">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-stone-800 font-serif">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="space-y-1.5 my-2 pl-5 list-disc marker:text-brand-600">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-1.5 my-2 pl-5 list-decimal marker:text-brand-700 font-medium">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed text-[15px] sm:text-base pl-1 text-stone-800">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-3 border-amber-500 bg-amber-50/60 pl-3.5 py-1.5 my-2.5 rounded-r-xl text-stone-800 italic text-sm sm:text-base">
              {children}
            </blockquote>
          ),
          code: MarkdownCode,
          table: ({ children }) => (
            <TableContext.Provider value={true}>
              <div className="overflow-x-auto my-3.5 rounded-2xl border border-amber-200/80 shadow-xs bg-white/80">
                <table className="min-w-full divide-y divide-amber-200/80 text-left text-xs sm:text-sm">
                  {children}
                </table>
              </div>
            </TableContext.Provider>
          ),
          thead: ({ children }) => (
            <thead className="bg-gradient-to-r from-amber-100/90 via-orange-50/80 to-amber-100/90 text-amber-950 font-bold uppercase tracking-wider text-[11px] font-serif border-b border-amber-200">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-3.5 py-2.5 border-b border-amber-200/80 font-bold text-brand-950 whitespace-nowrap">
              {children}
            </th>
          ),
          tr: ({ children }) => (
            <tr className="even:bg-amber-50/25 hover:bg-amber-50/50 transition-colors">
              {children}
            </tr>
          ),
          td: ({ children }) => (
            <td className="px-3.5 py-2.5 border-b border-amber-100/60 text-stone-800 align-middle">
              {children}
            </td>
          ),
          a: ({ href, children }) => {
            if (!href) return <span>{children}</span>;

            // Détection et traitement des routes internes vers l'application
            const isInternal = href.startsWith('/') || href.startsWith('#');

            if (isInternal) {
              return (
                <a 
                  href={href} 
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) {
                      const cleanPath = href.replace(/^\//, '');
                      const [page, query] = cleanPath.split('?');
                      const idParam = query ? new URLSearchParams(query).get('id') || undefined : undefined;
                      onNavigate(page, idParam);
                    } else {
                      try {
                        router.push(href);
                      } catch {
                        window.location.href = href;
                      }
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-0.5 my-0.5 mx-1 rounded-full bg-amber-50/90 hover:bg-amber-100 text-amber-950 border border-amber-300/80 font-semibold text-xs sm:text-sm cursor-pointer transition-all duration-150 hover:scale-[1.02] active:scale-95 shadow-2xs no-underline align-middle group"
                  title={`Accéder à : ${href}`}
                >
                  {getRouteIcon(href)}
                  <span className="underline decoration-amber-400 decoration-1 underline-offset-2 group-hover:text-amber-900">{children}</span>
                </a>
              );
            }

            // Liens externes (ex: Wikipédia, articles de presse, portails officiels)
            return (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 text-brand-700 hover:text-brand-900 underline font-medium transition-colors cursor-pointer"
              >
                <span>{children}</span>
                <ExternalLink size={11} className="inline opacity-70 shrink-0 ml-0.5" />
              </a>
            );
          },
          img: ({ src, alt }: any) => {
            if (!src) return null;
            return (
              <div 
                onClick={() => onPreviewImage?.(src)}
                className="my-3 rounded-2xl overflow-hidden border border-stone-200/90 shadow-md bg-stone-50 max-w-lg cursor-pointer group transition-all hover:shadow-lg active:scale-[0.99]"
                title="Cliquer pour agrandir l'image"
              >
                <img
                  src={src}
                  alt={alt || "Illustration Fumi"}
                  className="w-full h-auto object-cover max-h-96 transition-transform duration-200 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                {alt && (
                  <div className="p-2.5 bg-white/95 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                    <span className="font-medium text-brand-950 truncate">{alt}</span>
                    <span className="text-brand-800 font-semibold text-[11px] underline shrink-0 ml-2 group-hover:text-brand-950">
                      Agrandir 🔍
                    </span>
                  </div>
                )}
              </div>
            );
          },
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
});
