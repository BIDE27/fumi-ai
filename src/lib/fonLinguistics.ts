import { FON_PRIORITY_LEXICON, FON_GRAMMAR_ESSENTIALS, FON_CULTURAL_BLESSINGS, FonTerm, SerialVerb } from '@/data/fon/fumiFonKnowledge';

const STOP_WORDS = new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'd', 'l', 'a', 'au', 'aux',
  'et', 'ou', 'mais', 'donc', 'car', 'ni', 'dans', 'en', 'sur', 'sous', 'par',
  'pour', 'avec', 'sans', 'ce', 'cet', 'cette', 'ces', 'mon', 'ton', 'son',
  'notre', 'votre', 'leur', 'mes', 'tes', 'ses', 'nos', 'vos', 'leurs',
  'je', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles',
  'me', 'te', 'se', 'que', 'qui', 'quoi', 'dont', 'est', 'sont', 'faire',
  'comment', 'pourquoi', 'quand', 'quel', 'quelle', 'quels', 'quelles'
]);

export interface FonMatchResult {
  terms: Array<{ fr: string; fon: string; cat: string }>;
  serialVerbs: SerialVerb[];
  grammarHint?: string;
  suggestedBlessing?: string;
}

/**
 * Analyse une requête utilisateur et extrait les références lexicales et grammaticales Fon pertinentes.
 */
export function getFonLinguisticContext(query: string): string {
  if (!query || typeof query !== 'string') return '';
  
  const clean = query.toLowerCase();
  const rawWords = clean.replace(/[^a-zà-ÿ0-9]/g, ' ').split(/\s+/).filter(w => w.length >= 3 && !STOP_WORDS.has(w));
  
  const matchedTerms: FonTerm[] = [];
  const matchedVerbs: SerialVerb[] = [];
  const seenStems = new Set<string>();

  for (const word of rawWords) {
    if (seenStems.has(word)) continue;
    seenStems.add(word);

    if (FON_PRIORITY_LEXICON[word]) {
      matchedTerms.push(FON_PRIORITY_LEXICON[word]);
    } else {
      const sub = word.slice(0, 5);
      if (sub.length >= 4 && FON_PRIORITY_LEXICON[sub]) {
        matchedTerms.push(FON_PRIORITY_LEXICON[sub]);
      }
    }

    for (const sv of FON_GRAMMAR_ESSENTIALS.serial_verbs) {
      if (sv.french.toLowerCase().includes(word) || sv.fon.toLowerCase().includes(word)) {
        if (!matchedVerbs.some(v => v.french === sv.french)) {
          matchedVerbs.push(sv);
        }
      }
    }

    if (matchedTerms.length >= 8 && matchedVerbs.length >= 4) break;
  }

  const isGreeting = /\b(salut|bonjour|bonsoir|kúdɔ̀|kudo|ganji|matin|réveil|reveil)\b/i.test(clean) || /à\s*fɔ́n/i.test(clean);
  const isSpiritual = /(fa|vodun|vodoun|dieu|mawu|kpoli|priere|benediction|sacrifice|esprit)/i.test(clean);
  const isHealth = /(tisane|maladie|remede|amasin|ventre|tete|guerir|plante|enceinte)/i.test(clean);

  if (matchedTerms.length === 0 && matchedVerbs.length === 0 && !isGreeting && !isSpiritual && !isHealth) {
    return '';
  }

  const sections: string[] = [];

  if (matchedTerms.length > 0) {
    const termLines = matchedTerms.slice(0, 6).map(t => `- ${t.fr} = ${t.fon} [${t.cat}]`).join('\n');
    sections.push(`[LEXIQUE FONGBÉ EXACT DU DICTIONNAIRE]\n${termLines}`);
  }

  if (matchedVerbs.length > 0) {
    const verbLines = matchedVerbs.slice(0, 4).map(v => `- ${v.french} = ${v.fon} (${v.literal})`).join('\n');
    sections.push(`[SYNTAXE VERBES SÉRIELS DU FONGBÉ - GÉRARD POIROT]\n${verbLines}`);
  }

  if (isGreeting) {
    sections.push(`[SALUTATION AUTHENTIQUE FON]\n- Formule : 'À fɔ́n ganjí à ?' (T'es-tu bien réveillé(e) ?), 'Kúdɔ̀ zǎnzǎn' (Bonjour matin), 'Kúdɔ̀ gbadanu' (Bonsoir).\n- Règle Poirot : Interrogation polie avec 'à ?' final.`);
  }

  if (isSpiritual || isGreeting) {
    const blessing = FON_CULTURAL_BLESSINGS[Math.floor(Math.random() * FON_CULTURAL_BLESSINGS.length)];
    sections.push(`[BÉNÉDICTION CULTURELLE RECOMMANDÉE]\n${blessing}`);
  }

  if (isHealth) {
    sections.push(`[CONSEIL TRADITIONNEL TISANES & SANTÉ]\n- Vocabulaire : Tisane/médicament = Amàsìn ; Feuilles = Amà ; Boire = Nù ; Guérir = Gbɔ̀.\n- Rappel déontologique : Toujours recommander l'avis d'un herboriste ou d'un praticien de santé reconnu.`);
  }

  return sections.join('\n\n');
}

/**
 * Nettoie une réponse de Fumi pour préparer un texte fluide pour la synthèse vocale (TTS).
 */
export function cleanTextForSpeech(text: string): string {
  if (!text) return '';
  return text
    .replace(/\[ACTION_[^\]]+\]/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\`\`\`[\s\S]*?\`\`\`/g, '')
    .replace(/\`([^\`]+)\`/g, '$1')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}
