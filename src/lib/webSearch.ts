/**
 * Module de Recherche Web Temps Réel pour Fumi
 * 100% Anonyme, Privé, Zéro Rétention de Données & Sans Clé API externe.
 * Interroge l'endpoint serveur DuckDuckGo avec un timeout strict de 3.5s.
 */

export interface SearchResultItem {
  title: string;
  url: string;
  snippet: string;
}

/**
 * Décode les entités HTML courantes sans dépendance externe
 */
function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Nettoie et extrait une URL propre à partir d'un lien DuckDuckGo (paramètre uddg)
 */
function cleanDuckDuckGoUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  if (rawUrl.includes('uddg=')) {
    const match = rawUrl.match(/uddg=([^&]+)/);
    if (match && match[1]) {
      try {
        return decodeURIComponent(match[1]);
      } catch (e) {
        return match[1];
      }
    }
  }
  if (rawUrl.startsWith('//')) {
    return 'https:' + rawUrl;
  }
  return rawUrl;
}

/**
 * Extrait les entités nommées (personnalités, dirigeants) depuis l'historique récent
 */
export function extractEntitiesFromHistory(history?: Array<{ role: string; text: string }>): string[] {
  if (!Array.isArray(history) || history.length === 0) return [];
  const entities: string[] = [];
  const stopwords = new Set([
    'bonjour', 'bonsoir', 'merci', 'fumi', 'fumi ai', 'fa', 'vodun', 'vodoun',
    'bénin', 'benin', 'république', 'gouvernement', 'afrique', 'france', 'paris',
    'ministre', 'ministère', 'président', 'présidence', 'état', 'etat', 'conseiller',
    'secrétaire', 'directeur', 'secteur', 'énergie', 'électricité', 'mines', 'eau'
  ]);

  for (let i = history.length - 1; i >= 0; i--) {
    const text = history[i]?.text || '';
    if (!text) continue;

    // 1. Nom avant fonction : "Aristide Medenou est le ministre de l'Économie..."
    const beforeTitleMatches = text.matchAll(/([A-ZÀ-ÖØ-ß][a-zA-ZÀ-öø-ÿ'-]+(?:\s+[A-ZÀ-ÖØ-ß][a-zA-ZÀ-öø-ÿ'-]+)+)\s+(?:est|a\s+été\s+nommé|devient|occupe\s+le\s+poste\s+de)\s+(?:le\s+|la\s+|un\s+)?(?:ministre|président|directeur|secrétaire|chef)/gi);
    for (const m of beforeTitleMatches) {
      const val = m[1].trim();
      const lower = val.toLowerCase();
      if (!stopwords.has(lower) && !entities.includes(val)) {
        entities.push(val);
      }
    }

    // 2. Termes en gras **Nom Prénom** (très fréquent dans les réponses de Fumi)
    const boldMatches = text.matchAll(/\*\*([A-ZÀ-ÖØ-ß][a-zA-ZÀ-öø-ÿ'-]+(?:\s+[A-ZÀ-ÖØ-ß][a-zA-ZÀ-öø-ÿ'-]+)+)\*\*/g);
    for (const m of boldMatches) {
      const val = m[1].trim();
      const lower = val.toLowerCase();
      if (!stopwords.has(lower) && !entities.includes(val)) {
        entities.push(val);
      }
    }

    // 3. Noms après titres ministériels ou civilités
    const titleMatches = text.matchAll(/(?:ministre(?:\s+[\w'’]+)*?\s+(?:est|nommé|:|nommé\s+en\s+tant\s+que)?\s*|monsieur\s+|m\.\s+|président\s+)([A-ZÀ-ÖØ-ß][a-zA-ZÀ-öø-ÿ'-]+(?:\s+[A-ZÀ-ÖØ-ß][a-zA-ZÀ-öø-ÿ'-]+)+)/gi);
    for (const m of titleMatches) {
      const val = m[1].trim();
      const lower = val.toLowerCase();
      if (!stopwords.has(lower) && !entities.includes(val)) {
        entities.push(val);
      }
    }

    // 4. Noms propres à majuscules
    const capMatches = text.matchAll(/\b([A-ZÀ-ÖØ-ß][a-zà-öø-ÿ'-]+(?:\s+[A-ZÀ-ÖØ-ß][a-zà-öø-ÿ'-]+)+)\b/g);
    for (const m of capMatches) {
      const val = m[1].trim();
      const lower = val.toLowerCase();
      if (!stopwords.has(lower) && val.length > 5 && !entities.includes(val)) {
        entities.push(val);
      }
    }

    if (entities.length >= 2) break;
  }

  return entities;
}

/**
 * Résout une question de suivi contextuelle (avec pronoms ou ellipses) en intégrant
 * l'entité ou le sujet discuté dans l'historique conversationnel récent.
 */
export function resolveContextualSearchQuery(query: string, history?: Array<{ role: string; text: string }>): string {
  if (!query || typeof query !== 'string') return '';
  const trimmed = query.trim();
  const lower = trimmed.toLowerCase();

  const isFollowUp = /\b(il|elle|lui|son|sa|ses|leur|leurs|celui-ci|celle-ci|ce dernier|cette dernière|d'où vient|qui est-il|qui est-elle|qui est-ce|c'est qui)\b/i.test(lower) ||
    /\b(parcours|biographie|carrière|formation|études|diplômes|cv|âge|age|date de naissance|mandat|fonctions|réalisations|actions|bilan|origine)\b/i.test(lower) ||
    /^et\s+(pour|le|la|les|ce|cette|au|en)\b/i.test(lower);

  if (!isFollowUp || !Array.isArray(history) || history.length === 0) {
    return trimmed;
  }

  const entities = extractEntitiesFromHistory(history);
  const primaryEntity = entities[0] || '';

  // Cas 1 : "Et le ministre de la justice ?" ou "Et pour la santé ?"
  if (/^et\s+/i.test(lower)) {
    const isBeninContext = history.some(h => (h.text || '').toLowerCase().includes('bénin') || (h.text || '').toLowerCase().includes('benin'));
    const topic = trimmed.replace(/^et\s+(pour\s+|le\s+|la\s+|l'|les\s+)?/i, '').replace(/[?]/g, '').trim();
    return `${topic} ${isBeninContext ? 'Bénin' : ''} actuel ministre gouvernement`.replace(/\s+/g, ' ').trim();
  }

  // Cas 2 : Question portant sur une personne déjà citée avec pronom / parcours / biographie
  if (primaryEntity) {
    let focus = '';
    if (/\b(parcours|carrière|études|formation|diplômes|cv)\b/i.test(lower)) {
      focus = 'parcours formation biographie carrière';
    } else if (/\b(âge|age|naissance|date de naissance)\b/i.test(lower)) {
      focus = 'date de naissance âge biographie';
    } else if (/\b(origine|nationalité|d'où vient)\b/i.test(lower)) {
      focus = 'origine biographie nationalité';
    } else if (/\b(réalisations|bilan|actions)\b/i.test(lower)) {
      focus = 'réalisations bilan carrière';
    } else {
      focus = 'biographie parcours';
    }
    return `${primaryEntity} ${focus}`.replace(/\s+/g, ' ').trim();
  }

  return trimmed;
}

/**
 * Répertoire des institutions constitutionnelles, administratives et régionales
 * majeures du Bénin et d'Afrique de l'Ouest avec leurs fiches Wikipédia officielles
 */
export const BENIN_AFRICA_INSTITUTIONS: Record<string, { officialTitle: string; ministerTitle?: string; keywords: string[] }> = {
  'cena': {
    officialTitle: 'Commission électorale nationale autonome (Bénin)',
    ministerTitle: 'Sacca Lafia',
    keywords: ['commission électorale nationale autonome', 'conseil électoral', 'sacca lafia', 'élections']
  },
  'haac': {
    officialTitle: 'Haute Autorité de l’audiovisuel et de la communication (Bénin)',
    ministerTitle: 'Édouard Loko',
    keywords: ['haute autorité de l audiovisuel', 'édouard loko', 'communication', 'médias']
  },
  'cour constitutionnelle': {
    officialTitle: 'Cour constitutionnelle (Bénin)',
    ministerTitle: 'Cossi Dorothé Sossa',
    keywords: ['cour constitutionnelle', 'sossa', 'cossi dorothé sossa', 'constitutionnel']
  },
  'cour suprême': {
    officialTitle: 'Cour suprême (Bénin)',
    ministerTitle: 'Victor Dassi Adossou',
    keywords: ['cour suprême', 'victor dassi adossou', 'magistrature']
  },
  'assemblée nationale': {
    officialTitle: 'Assemblée nationale (Bénin)',
    ministerTitle: 'Louis Vlavonou',
    keywords: ['assemblée nationale', 'parlement', 'louis vlavonou', 'députés']
  },
  'sénat': {
    officialTitle: 'Sénat (Bénin)',
    keywords: ['sénat bénin', 'chambre haute', 'parlement']
  },
  'ces': {
    officialTitle: 'Conseil économique et social (Bénin)',
    ministerTitle: 'Tabé Gbian',
    keywords: ['conseil économique et social', 'tabé gbian']
  },
  'médiateur de la république': {
    officialTitle: 'Médiateur de la République (Bénin)',
    ministerTitle: 'Pascal Essou',
    keywords: ['médiateur de la république', 'pascal essou']
  },
  'enseignement supérieur': {
    officialTitle: 'Ministère de l’Enseignement supérieur et de la Recherche scientifique (Bénin)',
    ministerTitle: 'Sèdami Mèdégan Fagla',
    keywords: ['enseignement supérieur', 'mesrs', 'sèdami mèdégan fagla', 'romarique mèdégan fagla', 'éléonore yayi ladékan', 'recherche scientifique']
  },
  'enseignement universitaire': {
    officialTitle: 'Ministère de l’Enseignement supérieur et de la Recherche scientifique (Bénin)',
    ministerTitle: 'Sèdami Mèdégan Fagla',
    keywords: ['enseignement supérieur', 'mesrs', 'sèdami mèdégan fagla', 'romarique mèdégan fagla', 'universitaire']
  },
  'mesrs': {
    officialTitle: 'Ministère de l’Enseignement supérieur et de la Recherche scientifique (Bénin)',
    ministerTitle: 'Sèdami Mèdégan Fagla',
    keywords: ['mesrs', 'sèdami mèdégan fagla', 'enseignement supérieur']
  },
  'économie': {
    officialTitle: 'Ministère de l’Économie et des Finances (Bénin)',
    ministerTitle: 'Aristide Médénou',
    keywords: ['économie et finances', 'mef', 'aristide médénou', 'romuald wadagni']
  },
  'finances': {
    officialTitle: 'Ministère de l’Économie et des Finances (Bénin)',
    ministerTitle: 'Aristide Médénou',
    keywords: ['ministère des finances', 'mef', 'aristide médénou', 'romuald wadagni']
  },
  'santé': {
    officialTitle: 'Ministère de la Santé (Bénin)',
    ministerTitle: 'Benjamin Hounkpatin',
    keywords: ['ministère de la santé', 'benjamin hounkpatin']
  },
  'justice': {
    officialTitle: 'Ministère de la Justice et de la Législation (Bénin)',
    ministerTitle: 'Yvon Détchénou',
    keywords: ['garde des sceaux', 'yvon détchénou', 'justice bénin']
  },
  'affaires étrangères': {
    officialTitle: 'Ministère des Affaires étrangères (Bénin)',
    ministerTitle: 'Shegun Bakari',
    keywords: ['affaires étrangères', 'shegun bakari']
  },
  'intérieur': {
    officialTitle: 'Ministère de l’Intérieur et de la Sécurité publique (Bénin)',
    ministerTitle: 'Alassane Seidou',
    keywords: ['ministre de l intérieur', 'alassane seidou', 'police républicaine']
  },
  'numérique': {
    officialTitle: 'Ministère du Numérique et de la Digitalisation (Bénin)',
    ministerTitle: 'Aurélie Adam Soulé Zoumarou',
    keywords: ['numérique', 'digitalisation', 'aurélie adam soulé']
  },
  'sports': {
    officialTitle: 'Ministère des Sports (Bénin)',
    ministerTitle: 'Benoît Dato',
    keywords: ['ministère des sports', 'benoît dato']
  },
  'bceao': {
    officialTitle: 'Banque centrale des États de l’Afrique de l’Ouest',
    ministerTitle: 'Jean-Claude Kassi Brou',
    keywords: ['banque centrale', 'uemoa', 'franc cfa', 'jean-claude kassi brou']
  },
  'uemoa': {
    officialTitle: 'Union économique et monétaire ouest-africaine',
    ministerTitle: 'Abdoulaye Diop',
    keywords: ['uemoa', 'commission uemoa', 'intégration']
  },
  'cedeao': {
    officialTitle: 'Communauté économique des États de l’Afrique de l’Ouest',
    ministerTitle: 'Omar Alieu Touray',
    keywords: ['cedeao', 'commission cedeao', 'sommet']
  }
};

/**
 * Détecte si la question de l'utilisateur nécessite obligatoirement une recherche web en direct
 * RÈGLE D'OR : 
 * - OUI pour tout fait politique, institutionnel, contemporain (2024-2027), d'actualité ou incertain.
 * - NON pour les salutations, culture Fâ/Vodun pure, guidage dans l'application, calculs ou langues.
 */
export function shouldTriggerWebSearch(query: string, history?: Array<{ role: string; text: string }>): boolean {
  if (!query || typeof query !== 'string') return false;
  const trimmed = query.trim();
  const lower = trimmed.toLowerCase();

  // A. EXCLUSIONS STRICTES (Ne jamais déclencher la recherche pour ces catégories limitées)
  // 1. Salutations et politesse pure (courtes)
  const isGreetingOnly = /^(bonjour|salut|coucou|bonsoir|kú àbɔ̀|kwábɔ̀|kwabo|woezɔ̃|bawo ni|hello|hi|à fɔ́n|comment tu vas|comment vas-tu|ça va|ca va|merci|a wànú kaka|bonne nuit|bonne journée|au revoir|à bientôt)\b/i.test(lower) && lower.length < 50;
  if (isGreetingOnly) return false;

  // 2. Guidage interne dans l'application ou services de la plateforme Fa & Vodun Connect
  const isAppGuidance = /\b(comment réserver|prendre rendez-vous|faire une consultation|consulter un bokonon|comment payer|moyen de paiement|boutique sacrée|acheter|prix des cours|tarifs|abonnement|comment fonctionne l'app|aide sur l'application|mon compte|se connecter|s'inscrire)\b/i.test(lower);
  if (isAppGuidance) return false;

  // 3. Culture Fâ, Vodun, spiritualité pure et cosmologie traditionnelle (sans recherche d'actualité ou contemporaine)
  const isPureTradition = /\b(signe du fâ|signe fâ|kpoli|kpo|ogbe|oyeku|iwori|idi|obara|okanran|irosun|owonrin|ogunda|osa|etura|irete|oturupon|otura|oshe|ofun|chapelet agumaga|fâté|plateau du fâ|légba|dan|hébiosso|sakpata|ogou|divinité|vodun|vodoun|conte traditionnel|légende traditionnelle|proverbe fon|proverbe yoruba|rituel traditionnel|bénédiction fon)\b/i.test(lower) &&
    !/\b(2024|2025|2026|2027|actuel|nouveau|ministre|président|politique|élection|nommé|gouvernement|qui est|c'est qui)\b/i.test(lower);
  if (isPureTradition) return false;

  // 4. Calculs arithmétiques basiques
  const isBasicMath = /^(\d+\s*[\+\-\*\/x]\s*\d+\s*=?)$/i.test(lower) || /^(calcule|combien font)\s+\d+\s*[\+\-\*\/x]\s*\d+/i.test(lower);
  if (isBasicMath) return false;

  // 5. Traduction pure de vocabulaire en langue locale
  const isLanguageTranslation = /^(traduis|comment on dit|comment dit-on|que veut dire le mot|signification du mot)\s+["'«]?[a-zA-ZÀ-ÿ\s]+["'»]?\s+(en fon|en mina|en yoruba|en français)$/i.test(lower);
  if (isLanguageTranslation) return false;

  // B. DÉCLENCHEURS UNIVERSELS : RECHERCHE ACTIVE DANS TOUS LES SENS !
  // Toute question sur une personne ("C'est qui X", "Qui est X"), une fonction ("Qui est le ministre de Y"),
  // une organisation, une entreprise, un événement ou un fait doit obligatoirement être vérifiée sur le web.
  return true;
}

/**
 * Distille intelligemment la requête pour le moteur de recherche
 * Transforme les phrases de conversation / contradiction en requêtes factuelles ciblées
 */
export function cleanSearchQuery(query: string): string {
  let cleaned = query.trim();

  // Si l'utilisateur conteste un fait (ex: "Ce n'est pas Patrice Talon en 2026...")
  if (/ce n'?est pas/i.test(cleaned)) {
    cleaned = cleaned
      .replace(/ce n'?est pas[^.]*\.?/gi, ' ')
      .replace(/fais (la|une)? recherche (et|pour)?/gi, ' ')
      .replace(/trouve (l'actuel|le nouveau)/gi, 'actuel ');
  }

  cleaned = cleaned
    // 1. Locutions de rectification / reformulation conversationnelle
    .replace(/^(je voulais dire|je veux dire|je parlais de|je voulais parler de|je parle de|je faisais allusion à|je fais référence à|non je veux dire|en fait|en réalité|au juste|au fait)\s+/i, '')
    // 2. Formules d'appel et de politesse
    .replace(/^(fumi\s*,?|bonjour\s*,?|salut\s*,?|s'il te plaît\s*,?|s'il vous plaît\s*,?)/i, '')
    // 3. Tournures interrogatives et demandes d'information (dans tous les sens : qui est, c'est qui, parle-moi de...)
    .replace(/^(c'est qui|qui est-ce qui|qui est-ce que|qui est|quel est|quelle est|qui sont|quels sont|quelles sont|c'est quoi|est-ce que|sais-tu qui est|connais-tu|que sais-tu sur|que peux-tu me dire sur|parle-moi de|parle moi de|parle-moi du|parle moi du)\s+/i, '')
    // 4. Demandes de recherche
    .replace(/^(dis-moi qui est|peux-tu me dire|dis-moi|peux-tu chercher|cherche|recherche|trouve|trouve-moi|donne-moi)\s+/i, '')
    // 5. Articles de début
    .replace(/^(le|la|l'|les|un|une|des|du|de la|de l')\s+/i, '')
    // 6. Synonymes administratifs et académiques au Bénin
    .replace(/\benseignement universitaire\b/gi, 'enseignement supérieur')
    // 7. Nettoyage de ponctuation et adverbes superflus
    .replace(/[?.,!;:«»"()]/g, ' ')
    .replace(/\b(actuellement|en ce moment|aujourd'hui)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned || query.trim();
}

export interface GroundedQuery {
  searchQuery: string;
  targetCountry: string;
  keywords: string[];
}

/**
 * Ancre intelligemment la requête dans le contexte géographique approprié :
 * Par défaut, sur Fa & Vodun Connect, une question civique, institutionnelle, gouvernementale,
 * juridique ou académique sans pays explicite concerne le Bénin.
 * Si un autre pays est spécifié (France, Sénégal, Côte d'Ivoire, USA, etc.), il est rigoureusement respecté.
 * Si la question concerne une personnalité ou une entité générale (ex: Mahuna Akplogan, Elon Musk), 
 * aucune restriction territoriale artificielle n'est imposée pour permettre une fouille exhaustive.
 */
export function groundSearchQuery(rawQuery: string): GroundedQuery {
  let q = cleanSearchQuery(rawQuery);

  const countryMatches: Record<string, RegExp> = {
    'Bénin': /\b(bénin|benin|cotonou|porto-novo|parakou|abomey|calavi|ouidah)\b/i,
    'France': /\b(france|paris|français|française)\b/i,
    'Sénégal': /\b(sénégal|senegal|dakar)\b/i,
    'Côte d\'Ivoire': /\b(côte d'ivoire|cote d'ivoire|abidjan)\b/i,
    'Togo': /\b(togo|lomé|lome)\b/i,
    'Mali': /\b(mali|bamako)\b/i,
    'Niger': /\b(niger|niamey)\b/i,
    'Burkina Faso': /\b(burkina|burkina faso|ouagadougou)\b/i,
    'Cameroun': /\b(cameroun|yaoundé|douala)\b/i,
    'Gabon': /\b(gabon|libreville)\b/i,
    'Guinée': /\b(guinée|guinee|conakry)\b/i,
    'Congo': /\b(congo|brazzaville|kinshasa|rdc)\b/i,
    'Ghana': /\b(ghana|accra)\b/i,
    'Nigéria': /\b(nigéria|nigeria|abuja|lagos)\b/i,
    'États-Unis': /\b(états-unis|etats-unis|usa|amérique|washington)\b/i,
    'Canada': /\b(canada|ottawa|québec|quebec)\b/i,
    'Russie': /\b(russie|moscou)\b/i,
    'Chine': /\b(chine|pékin|pekin)\b/i
  };

  let targetCountry = '';
  let explicitFound = false;

  for (const [cName, regex] of Object.entries(countryMatches)) {
    if (regex.test(q)) {
      targetCountry = cName;
      explicitFound = true;
      break;
    }
  }

  // Détection des sujets civiques, gouvernementaux, politiques, académiques ou institutionnels
  const isCivicOrInstitutional = /\b(gouvernement|ministre|ministère|président|porte-parole|porte parole|député|maire|parlement|assemblée|cour|cena|haac|police|armée|état-major|recteur|élection|scrutin|loi|décret|concours|bac|bepc|cep|examen|diplôme|institution|monnaie)\b/i.test(q);

  let finalQuery = q;
  if (!explicitFound && isCivicOrInstitutional) {
    finalQuery = `${q} Bénin`;
    targetCountry = 'Bénin';
  }

  const keywords = finalQuery
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 2 && !['les', 'des', 'qui', 'est', 'que', 'pour', 'dans', 'sur'].includes(w));

  return {
    searchQuery: finalQuery,
    targetCountry,
    keywords
  };
}

/**
 * Navigation et fouille encyclopédique approfondie sur Wikipédia
 * Combine reconnaissance institutionnelle, recherche textuelle en direct avec User-Agent requis
 * et filtrage intelligent selon le pays cible pour éliminer les personnalités étrangères hors-sujet.
 */
export async function deepWikiSearch(primaryEntity: string, searchQuery: string, targetCountry = 'Bénin'): Promise<SearchResultItem[]> {
  const targetPages: string[] = [];
  const WIKI_HEADERS = {
    'User-Agent': 'FaVodunConnect/1.0 (https://favodunconnect.bj; contact@favodunconnect.bj)',
    'Accept': 'application/json'
  };

  // Étape 0 : Détection directe d'une institution ou d'un ministère majeur (Bénin / Afrique)
  const combinedText = `${primaryEntity} ${searchQuery}`.toLowerCase();
  for (const [key, inst] of Object.entries(BENIN_AFRICA_INSTITUTIONS)) {
    const keyRegex = new RegExp(`\\b${key}\\b`, 'i');
    if (keyRegex.test(combinedText) || combinedText.includes(key)) {
      if (!targetPages.includes(inst.officialTitle)) {
        targetPages.push(inst.officialTitle);
      }
      if (inst.ministerTitle && !targetPages.includes(inst.ministerTitle)) {
        targetPages.push(inst.ministerTitle);
      }
      break;
    }
  }

  // Étape 1 : Opensearch avec User-Agent officiel
  const candidates = [primaryEntity, searchQuery].filter(c => Boolean(c && c.trim().length > 2));
  for (const cand of candidates) {
    if (targetPages.length >= 4) break;
    try {
      const openUrl = `https://fr.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(cand)}&limit=4&namespace=0&redirects=resolve&format=json`;
      const res = await fetch(openUrl, { headers: WIKI_HEADERS });
      if (res.ok) {
        const data = await res.json();
        const titles = data?.[1] || [];
        for (const t of titles) {
          if (!targetPages.includes(t)) targetPages.push(t);
        }
      }
    } catch (e) {}
  }

  // Étape 2 : Fulltext Search si pas assez de pages trouvées
  if (targetPages.length < 3) {
    for (const cand of candidates) {
      if (targetPages.length >= 8) break;
      try {
        const srUrl = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cand)}&format=json&utf8=1`;
        const res = await fetch(srUrl, { headers: WIKI_HEADERS });
        if (res.ok) {
          const data = await res.json();
          const hits = data?.query?.search || [];
          for (const h of hits.slice(0, 8)) {
            if (!targetPages.includes(h.title)) {
              targetPages.push(h.title);
            }
          }
        }
      } catch (e) {}
    }
  }

  if (targetPages.length === 0) return [];

  // Étape 3 : Extraction du contenu complet (AVEC redirects=1, User-Agent et filtrage pays cible)
  const results: SearchResultItem[] = [];
  for (const pageTitle of targetPages.slice(0, 8)) {
    if (results.length >= 3) break;
    try {
      const extUrl = `https://fr.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&redirects=1&titles=${encodeURIComponent(pageTitle)}&format=json&utf8=1`;
      const res = await fetch(extUrl, { headers: WIKI_HEADERS });
      if (res.ok) {
        const data = await res.json();
        const pages = data?.query?.pages || {};
        for (const pid of Object.keys(pages)) {
          const p = pages[pid];
          const extract = p?.extract || '';
          if (extract.length > 50) {
            const combined = `${p.title} ${extract}`.toLowerCase();
            const matchesCountry = targetCountry ? combined.includes(targetCountry.toLowerCase()) : true;
            if (matchesCountry) {
              results.push({
                title: `Wikipédia : ${p.title}`,
                url: `https://fr.wikipedia.org/wiki/${encodeURIComponent(p.title.replace(/\s+/g, '_'))}`,
                snippet: extract.slice(0, 1500)
              });
              break;
            }
          }
        }
      }
    } catch (e) {}
  }

  return results;
}

/**
 * Exécute une recherche web multi-sources ultra-rapide côté serveur
 * Combine DuckDuckGo (web général, portails .gouv.bj & ministères), Google News RSS (actualités certifiées)
 * et Wikipedia API Live avec fouille approfondie pour éliminer les hors-sujets.
 */
export async function searchWeb(query: string, maxResults = 6, history?: Array<{ role: string; text: string }>): Promise<SearchResultItem[]> {
  const entities = extractEntitiesFromHistory(history);
  const primaryEntity = entities[0] || '';
  const resolvedQuery = resolveContextualSearchQuery(query, history);
  const grounded = groundSearchQuery(resolvedQuery);
  const searchQuery = grounded.searchQuery;
  if (!searchQuery) return [];

  const keywords = grounded.keywords;

  const [ddgRes, newsRes, wikiRes] = await Promise.allSettled([
    // 1. DuckDuckGo HTML (Portails gouvernementaux, sites officiels .gouv.bj, articles spécifiques)
    (async (): Promise<SearchResultItem[]> => {
      const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchQuery)}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);
      try {
        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8'
          }
        });
        clearTimeout(timeout);
        if (!res.ok) return [];
        const html = await res.text();
        const items: SearchResultItem[] = [];
        const blocks = html.split(/class="result\s+results_links/i).slice(1);
        for (const block of blocks) {
          if (items.length >= 4) break;
          const titleMatch = block.match(/<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
          const snippetMatch = block.match(/<a[^>]*class="result__snippet"[^>]*>([\s\S]*?)<\/a>/i);
          if (titleMatch) {
            const rawUrl = titleMatch[1];
            const cleanUrl = cleanDuckDuckGoUrl(rawUrl);
            const title = decodeHtmlEntities(titleMatch[2].replace(/<[^>]+>/g, ''));
            const snippet = snippetMatch ? decodeHtmlEntities(snippetMatch[1].replace(/<[^>]+>/g, '')) : '';
            if (title && snippet && cleanUrl.startsWith('http')) {
              // Vérification de pertinence : au moins un mot-clé présent dans le titre ou le snippet
              const isRelevant = keywords.length === 0 || keywords.some(kw => (title + ' ' + snippet).toLowerCase().includes(kw));
              if (isRelevant) {
                items.push({ title, url: cleanUrl, snippet });
              }
            }
          }
        }
        return items;
      } catch {
        return [];
      } finally {
        clearTimeout(timeout);
      }
    })(),

    // 2. Google News RSS (Presse certifiée en direct : Le Monde, Jeune Afrique, RFI, Benin Web TV, Ecofin, Matin Libre)
    (async (): Promise<SearchResultItem[]> => {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(searchQuery)}&hl=fr&gl=BJ&ceid=BJ:fr`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);
      try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) return [];
        const xml = await res.text();
        const items: SearchResultItem[] = [];
        const itemBlocks = xml.split('<item>').slice(1);
        for (const block of itemBlocks) {
          if (items.length >= 4) break;
          const titleMatch = block.match(/<title>(.*?)<\/title>/);
          const linkMatch = block.match(/<link>(.*?)<\/link>/);
          const pubDateMatch = block.match(/<pubDate>(.*?)<\/pubDate>/);
          if (titleMatch && linkMatch) {
            const rawTitle = decodeHtmlEntities(titleMatch[1].replace(/<[^>]+>/g, '')).trim();
            const lower = rawTitle.toLowerCase();
            // Filtre de pertinence : au moins un mot-clé
            const isRelevant = keywords.length === 0 || keywords.some(kw => lower.includes(kw));
            if (isRelevant) {
              items.push({
                title: rawTitle,
                url: linkMatch[1],
                snippet: `Actualité récente certifiée (${pubDateMatch?.[1]?.slice(0, 16) || ''}) : ${rawTitle}`
              });
            }
          }
        }
        return items;
      } catch {
        return [];
      } finally {
        clearTimeout(timeout);
      }
    })(),

    // 3. Wikipedia Fouille Approfondie (Opensearch + Fulltext + Extraits intégraux avec suivi des redirections et filtrage pays)
    (async (): Promise<SearchResultItem[]> => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3500);
      try {
        const wikiItems = await deepWikiSearch(primaryEntity, searchQuery, grounded.targetCountry);
        clearTimeout(timeout);
        return wikiItems;
      } catch {
        clearTimeout(timeout);
        return [];
      }
    })()
  ]);

  // Agrégation et pondération intelligente des résultats
  const rawPool: Array<{ item: SearchResultItem; score: number }> = [];

  const addWithScore = (candidateItems: SearchResultItem[], baseWeight: number) => {
    for (const it of candidateItems) {
      if (!it || !it.url || !it.title) continue;
      let score = baseWeight;
      const lowerUrl = it.url.toLowerCase();
      const lowerText = `${it.title} ${it.snippet}`.toLowerCase();

      // Bonus domaine officiel gouvernemental
      if (lowerUrl.includes('.gouv.bj') || lowerUrl.includes('.gouv.')) {
        score += 80;
      }
      // Bonus presse locale béninoise & panafricaine reconnue
      if (lowerUrl.includes('beninwebtv.bj') || lowerUrl.includes('agenceecofin.com') || lowerUrl.includes('banouto.bj') || lowerUrl.includes('matinlibre.com')) {
        score += 50;
      }
      // Bonus pertinence des mots-clés
      for (const kw of keywords) {
        if (lowerText.includes(kw)) score += 12;
      }
      // Bonus spécial actualité 2026
      if (lowerText.includes('2026')) score += 15;

      rawPool.push({ item: it, score });
    }
  };

  if (ddgRes.status === 'fulfilled' && Array.isArray(ddgRes.value)) {
    addWithScore(ddgRes.value, 40);
  }
  if (wikiRes.status === 'fulfilled' && Array.isArray(wikiRes.value)) {
    addWithScore(wikiRes.value, 48);
  }
  if (newsRes.status === 'fulfilled' && Array.isArray(newsRes.value)) {
    addWithScore(newsRes.value, 38);
  }

  // Trier par score décroissant et dédoublonner
  rawPool.sort((a, b) => b.score - a.score);

  const items: SearchResultItem[] = [];
  for (const entry of rawPool) {
    if (items.length >= maxResults) break;
    const isDuplicate = items.some(existing => 
      existing.url === entry.item.url || 
      existing.title.toLowerCase().slice(0, 30) === entry.item.title.toLowerCase().slice(0, 30)
    );
    if (!isDuplicate) {
      items.push(entry.item);
    }
  }

  return items;
}

/**
 * Formate les résultats de recherche web sous forme de bloc de prompt strict pour Fumi
 * INTÈGRE LES DIRECTIVES STRICTES ANTI-HALLUCINATION ET ANTI-INVENTION
 */
export function formatSearchResultsForPrompt(results: SearchResultItem[]): string {
  if (!results || results.length === 0) return '';

  const topResults = results.slice(0, 5);
  const formattedItems = topResults.map((item, idx) => {
    const cleanSnippet = (item.snippet || '').trim();
    const truncatedSnippet = cleanSnippet.length > 450 ? cleanSnippet.slice(0, 450) + '...' : cleanSnippet;
    return `[Source ${idx + 1}] Titre : ${item.title}\nLien : ${item.url}\nDonnées vérifiées en temps réel : ${truncatedSnippet}`;
  }).join('\n\n');

  return `=== DONNÉES FACTUELLES CERTIFIÉES ISSUES DU WEB EN TEMPS RÉEL ===
Voici les faits réels extraits en direct du web pour cette question précise :

${formattedItems}

🚨 DIRECTIVES FACTUELLES INVIOLABLES (TOLÉRANCE ZÉRO POUR L'INVENTION) :
1. VÉRACITÉ ABSOLUE : Tu dois t'en tenir EXCLUSIVEMENT et STRICTEMENT aux données réelles vérifiées ci-dessus.
2. INTERDICTION TOTALE D'INVENTER : Ne devine, n'extrapole et n'invente JAMAIS un nom de personne, de ministre, de décret, de date ou d'événement imaginaire. Si une information ou un nom précis n'est pas clairement mentionné dans les sources ci-dessus, dis-le avec franchise et humilité (« Selon les informations actuelles disponibles, le nom n'est pas explicitement précisé... »).
3. CITATION DE SOURCE PERTINENTE : N'inclus un lien markdown [Nom de la source](URL) QUE s'il correspond DIRECTEMENT et EXACTEMENT au fait que tu énonces. N'ajoute jamais de lien sans rapport.
4. PRIMAUTÉ TOTALE DU PRÉSENT RÉEL : Ces sources en temps réel ont une priorité absolue sur toute mémoire ou connaissance passée. Rétablis la vérité des faits actuels sans complaisance.`;
}
