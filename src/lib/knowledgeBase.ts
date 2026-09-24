import * as fs from 'fs';
import * as path from 'path';
import { THE_16_MEJI_SIGNS } from '@/lib/faSigns';

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'african_wisdom' | 'science_tech' | 'custom_docs';
  content: string;
}

/**
 * Connaissance Authentique & Infaillible des 16 Signes Mères du Fâ (Dugbê / Odù Meji)
 * Issu de la tradition séculaire Vodun & Fâ du Dahomey / Bénin
 */
export function getAuthentic16MejiPrompt(): string {
  const mejiList = THE_16_MEJI_SIGNS.map((s, idx) => {
    const traceNotation = s.lines.map(l => `${l.left} ${l.right}`).join(' / ');
    return `${idx + 1}. **${s.nameFon}** (en Yoruba / Ifá : *${s.nameYoruba}*)\n   • Tracé binaire sacré : \`${traceNotation}\`\n   • Élément & Nature : ${s.rightRoot.element} (${s.rightRoot.nature})\n   • Signification : ${s.rightRoot.meaning}\n   • Divinité(s) associée(s) : ${s.rightRoot.divinity}`;
  }).join('\n\n');

  const mejiTable = [
    "| N° | Signe du Fâ (Dugbê) | Nom Ifá (Yoruba) | Tracé Sacré | Élément & Nature | Signification & Attributs Cosmiques |",
    "| :---: | :--- | :--- | :---: | :--- | :--- |",
    ...THE_16_MEJI_SIGNS.map((s, idx) => {
      const traceNotation = s.lines.map(l => `${l.left} ${l.right}`).join(' / ');
      return `| ${idx + 1} | **${s.nameFon}** | *${s.nameYoruba}* | \`${traceNotation}\` | ${s.rightRoot.element} | ${s.rightRoot.meaning} |`;
    })
  ].join('\n');

  return `=== VÉRITÉ SACRÉE DU FÂ : LES 16 SIGNES MÈRES (DUGBÊ / ODÙ MEJI) ===
Les 16 Signes Mères du Fâ (ou Odù Majeurs) sont la matrice universelle du Fâ à partir de laquelle dérivent les 240 signes secondaires (total : 256 Du).
Chaque signe se compose de 4 niveaux verticaux avec 2 colonnes jumelles : I désigne un trait simple, II désigne un trait double.

RÈGLE D'OR DE PRÉSENTATION PÉDAGOGIQUE (EXCELLENCE & CLARTÉ VISUELLE) :
1. PRÉSENTATION PRIORITAIRE (MODÈLE D'EXCELLENCE DE RÉFÉRENCE) :
   - Lorsque l'utilisateur demande les 16 signes du Fâ ou une initiation, PRÉSENTE EN PRIORITÉ LA LISTE NUMÉROTÉE DÉTAILLÉE (1 à 16) comme ci-dessous.
   - Chaque signe de la liste doit comporter :
     • Le titre numéroté : « 1. **Gbê-Mêdjì** (en Yoruba / Ifá : *Eji-Ogbe*) »
     • La ligne du tracé binaire : « • Tracé binaire sacré : \`I I / I I / I I / I I\` »
     • « • Élément & Nature : ... »
     • « • Signification : ... »

2. RÈGLE STRICTE SUR LES TABLEAUX :
   - Si tu utilises un tableau ou si l'utilisateur en demande un :
     • Dans la colonne « Tracé Sacré », utilise TOUJOURS des slashes : \`I I / I I / I I / I I\` (jamais de barres '|' dans les cellules).

Liste ordonnée canonique de référence :
${mejiList}

Tableau de synthèse :
${mejiTable}`;
}

/**
 * Charge les documents déposés dans le dossier 'knowledge/'
 */
export function loadLocalKnowledgeDocuments(): KnowledgeDocument[] {
  const docs: KnowledgeDocument[] = [];
  const knowledgeDir = path.join(process.cwd(), 'knowledge');

  if (!fs.existsSync(knowledgeDir)) {
    return docs;
  }

  try {
    const files = fs.readdirSync(knowledgeDir);
    for (const file of files) {
      if (file.startsWith('.') || file.toLowerCase() === 'readme.md') continue;

      const fullPath = path.join(knowledgeDir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isFile()) {
        const ext = path.extname(file).toLowerCase();
        if (['.txt', '.md', '.markdown', '.json', '.csv'].includes(ext)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content && content.trim()) {
            docs.push({
              id: `local-${file}`,
              title: file,
              category: 'custom_docs',
              content: content.trim().slice(0, 15000)
            });
          }
        }
      }
    }
  } catch (err) {
    console.warn("[KnowledgeBase] Notice lecture knowledge:", err);
  }

  return docs;
}

/**
 * Moteur RAG Intelligent : extrait le contexte le plus pertinent selon la question
 */
export async function getRelevantKnowledgeAsync(query: string): Promise<string> {
  if (!query || typeof query !== 'string') return '';
  const qLower = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const parts: string[] = [];

  // Détection des questions sur les 16 signes ou les signes du Fâ
  const isFaSignsQuery = 
    qLower.includes('signe') || 
    qLower.includes('signes') || 
    qLower.includes('meji') || 
    qLower.includes('medji') || 
    qLower.includes('dugbe') || 
    qLower.includes('odu') || 
    qLower.includes('kpoli') ||
    qLower.includes('fa ') ||
    qLower.includes('mere');

  if (isFaSignsQuery) {
    parts.push(getAuthentic16MejiPrompt());
  }

  // Documents personnalisés locaux
  const localDocs = loadLocalKnowledgeDocuments();
  if (localDocs.length > 0) {
    const matchedDocs: string[] = [];
    const queryWords = qLower.split(/\s+/).filter(w => w.length > 2);
    for (const doc of localDocs) {
      const docLower = doc.content.toLowerCase();
      const hasMatch = queryWords.some(w => docLower.includes(w) || doc.title.toLowerCase().includes(w));
      if (hasMatch) {
        matchedDocs.push(`--- DOCUMENT : ${doc.title} ---\n${doc.content.slice(0, 4000)}`);
      }
    }
    if (matchedDocs.length > 0) {
      parts.push(`=== BASE DE DOCUMENTS RAG LOCALE ===\n${matchedDocs.join('\n\n')}`);
    }
  }

  if (parts.length === 0) return '';
  return `\n\n${parts.join('\n\n')}\n`;
}
