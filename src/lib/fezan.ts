// ============================================================================
// MOTEUR FÈKAN — Système de calcul algorithmique officiel du Fèzan & d'AWAYA
// ============================================================================
// Conforme à la spécification algorithmique officielle du Fèkan :
// 1. Cycle invariable de 9 Fèzan (Mèdjo -> Mèkou -> Vodun -> Azon -> Vo -> Hwè -> Bo -> Hin -> Fâ).
// 2. AWAYA constitue le point de rupture et de renouveau du cycle lunaire (Nature : Neutre).
// 3. Le lendemain d'un AWAYA est TOUJOURS Mèdjo (Index 0).
// 4. Formule mathématique : F(D) = AWAYA si D = A, sinon F(D) = S[(D - A - 1) MOD 9].
// ============================================================================

export interface FezanDayInfo {
  id: number;
  name: string;
  nameFon: string;
  status: 'Favorable' | 'Défavorable' | 'Neutre';
  badgeColor: string;
  symbol: string;
  element: string;
  divinity: string;
  meaning: string;
  description: string;
  recommended: string[];
  avoid: string[];
  wisdom: string;
  isAwaya?: boolean;
}

/**
 * Cycle fondamental des 9 Fèzan ordinaires du Fâ (Positions 0 à 8)
 */
export const FEZAN_DAYS: FezanDayInfo[] = [
  {
    id: 0,
    name: 'Mèdjo',
    nameFon: 'Mɛ̀jɔ́',
    status: 'Favorable',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    symbol: '❂',
    element: 'Lumière & Naissance',
    divinity: 'Mawu-Lisa',
    meaning: 'Jour de l’Apparition, de la Création et du Renouveau.',
    description: 'Une des vibrations les plus fertiles du cycle. Tout ce qui est semé en Mèdjo porte des fruits durables : commerce, mariages, signatures de contrats, inaugurations et démarrages de projets à court, moyen ou long terme.',
    recommended: [
      'Lancement de nouveaux projets ou entreprises',
      'Célébrations de mariage, fiançailles et alliances',
      'Voyages d\'affaires et investissements importants',
      'Poser la première pierre d\'un édifice'
    ],
    avoid: [
      'La procrastination et l\'hésitation stérile',
      'Les pensées défaitistes ou la résignation',
      'Remettre à plus tard ce qui doit naître aujourd\'hui'
    ],
    wisdom: 'La création est un souffle d\'éternité. Ce que tu inities sous la bénédiction de Mèdjo traversera les saisons avec force.'
  },
  {
    id: 1,
    name: 'Mèkou',
    nameFon: 'Mɛ̀kú',
    status: 'Défavorable',
    badgeColor: 'bg-stone-100 text-stone-700 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700',
    symbol: '♰',
    element: 'Terre & Mémoire',
    divinity: 'Tohossou / Ku',
    meaning: 'Jour du Repos, de la Mémoire et des Ancêtres.',
    description: 'Journée traditionnellement associée à la retenue, à la mémoire des aïeux et au recueillement. Les énergies demandent de la tempérance et de la prudence relationnelle. Évitez les fêtes démesurées ou conflits.',
    recommended: [
      'Honorer la mémoire et les sacrifices des ancêtres',
      'Prières familiales et libations douces',
      'Pardonner les rancœurs du passé',
      'Prendre soin de son foyer et se recueillir'
    ],
    avoid: [
      'Grandes réjouissances bruyantes et ostentatoires',
      'Procédures judiciaires et confrontations directes',
      'Prendre des risques physiques ou financiers inutiles'
    ],
    wisdom: 'L\'arbre ne peut grandir vers le ciel qu\'en chérissant les racines enfouies dans la terre sacrée de ses aïeux.'
  },
  {
    id: 2,
    name: 'Vodun',
    nameFon: 'Vodún',
    status: 'Favorable',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800',
    symbol: '☥',
    element: 'Esprit & Nature',
    divinity: 'Toutes les Divinités Vodun',
    meaning: 'Jour du Sacré, des Esprits et des Bénédictions.',
    description: 'Vibration spirituelle très puissante. Jour traditionnellement associé aux rituels, cérémonies et démarches spirituelles. Les portes du monde invisible sont ouvertes pour recevoir les prières sincères et offrandes.',
    recommended: [
      'Offrandes, prières et cérémonies spirituelles',
      'Demandes de grâce, de paix et de prospérité',
      'Actes de générosité, d\'aumône et de charité',
      'Visite aux sanctuaires et couvents sacrés'
    ],
    avoid: [
      'Profaner les interdits ou négliger le sacré',
      'Manquer de respect à la nature et aux éléments',
      'L\'ingratitude envers les forces bienfaitrices'
    ],
    wisdom: 'Le Vodun est la pulsation secrète de la nature vivante. Sois en harmonie avec elle et l\'abondance coulera vers toi.'
  },
  {
    id: 3,
    name: 'Azon',
    nameFon: 'Azɔ̀n',
    status: 'Défavorable',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    symbol: '⚕',
    element: 'Corps & Équilibre',
    divinity: 'Sakpata',
    meaning: 'Jour de la Guérison, du Soin et de la Prudence.',
    description: 'Journée consacrée à la santé physique et mentale. Vibration qui invite à la modération alimentaire, à l\'hygiène de vie, à la prise de remèdes doux et à la non-dispersion des ressources et des énergies.',
    recommended: [
      'Prendre soin de son corps et se soigner avec attention',
      'Bains de plantes médicinales et tisanes purifiantes',
      'Alimentation saine, modérée et légère',
      'Écouter les signaux et avertissements de son corps'
    ],
    avoid: [
      'Excès de table, d\'alcool ou de surmenage',
      'Dispersion des ressources financières ou vitales',
      'Négliger les symptômes de fatigue ou de maladie'
    ],
    wisdom: 'Le corps est le temple terrestre de l\'âme. Préserve-le avec sagesse pour accomplir ta noble destinée.'
  },
  {
    id: 4,
    name: 'Vo',
    nameFon: 'Vɔ́',
    status: 'Favorable',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800',
    symbol: '⚖',
    element: 'Éther & Libération',
    divinity: 'Dan / Legba',
    meaning: 'Jour du Sacrifice, du Pardon et de la Libération.',
    description: 'Journée particulièrement propice aux sacrifices, aumônes, offrandes et pratiques religieuses. Faire un don, libérer une dette ou pardonner une offense en ce jour apporte une immense bénédiction de retour.',
    recommended: [
      'Faire des dons, aumônes et actes de charité',
      'Rituels de libération karmique et d\'allègement',
      'Pardonner et se réconcilier avec autrui',
      'Purification énergétique de son espace de vie'
    ],
    avoid: [
      'L\'avarice, la retenue égoïste et la rancune',
      'Garder des dettes morales ou des ressentiments',
      'S\'accrocher au passé et refuser le pardon'
    ],
    wisdom: 'Donner de bon cœur n\'appauvrit jamais : la main qui s\'ouvre pour bénir est la première à recevoir la grâce céleste.'
  },
  {
    id: 5,
    name: 'Hwè',
    nameFon: 'Hwè / Akwɛ́',
    status: 'Défavorable',
    badgeColor: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
    symbol: '☼',
    element: 'Feu & Soleil',
    divinity: 'Hwiosso / Hwè',
    meaning: 'Jour du Jugement, de la Vérité et du Soleil révélateur.',
    description: 'Vibration de mise en lumière intransigeante. Jour associé aux désaccords, tensions, procès et situations de dysharmonie. Agissez avec calme, mesure et droiture absolue.',
    recommended: [
      'Faire preuve d\'honnêteté, de clarté et de droiture',
      'Régler les litiges et différends dans le calme',
      'Méditation, introspection et purification',
      'Écouter posément avant de répondre'
    ],
    avoid: [
      'Engager des disputes, querelles ou procès impulsifs',
      'Signer des contrats sous tension ou précipitation',
      'Prendre des décisions impulsives ou blessantes'
    ],
    wisdom: 'La vérité est une torche céleste : elle éclaire celui qui la porte avec paix et consume celui qui cherche à tromper.'
  },
  {
    id: 6,
    name: 'Bo',
    nameFon: 'Bǒ',
    status: 'Favorable',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    symbol: '🛡',
    element: 'Terre & Protection',
    divinity: 'Gú / Legba',
    meaning: 'Jour de la Force, du Sort et de la Protection.',
    description: 'Jour associé aux opérations symboliques liées aux éléments, aux pratiques mystiques et au renforcement de l\'aura. Excellente journée pour consolider ses projets et se protéger.',
    recommended: [
      'Consolidation de projets et renforcement de sécurité',
      'Bains et rituels de protection et d\'affirmation',
      'Affirmation de soi, courage et persévérance',
      'Renforcement des liens d\'alliance et de communauté'
    ],
    avoid: [
      'Céder à la peur, au découragement ou au doute',
      'Défier inutilement ses limites sans préparation',
      'Laisser ses biens ou projets sans surveillance'
    ],
    wisdom: 'Le bouclier de l\'esprit est forgé dans la pureté du cœur et la fermeté inébranlable des intentions.'
  },
  {
    id: 7,
    name: 'Hin',
    nameFon: 'Hǐn / Fɔ́',
    status: 'Défavorable',
    badgeColor: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
    symbol: '☽',
    element: 'Nuit & Eau',
    divinity: 'Yɛhwe Hwèndo',
    meaning: 'Jour de l’Introspection, du Silence et du Recul.',
    description: 'Journée traditionnellement associée aux interruptions, blocages ou introspections nécessaires. Invitation au ralentissement, au repos réparateur et à l\'évaluation lucide.',
    recommended: [
      'Repos du corps et apaisement de l\'esprit',
      'Lectures inspirantes, études et écriture intime',
      'Méditation dans le calme et la sérénité',
      'Éviter les dépenses extravagantes et superflues'
    ],
    avoid: [
      'Démarrer de grandes entreprises matérielles précipitées',
      'Prêter ou emprunter d\'importantes sommes',
      'Entreprendre de longs voyages imprévus'
    ],
    wisdom: 'La nuit ne détruit pas le soleil, elle lui permet de renaître avec éclat. Accepte le silence pour entendre l\'oracle.'
  },
  {
    id: 8,
    name: 'Fâ',
    nameFon: 'Fá',
    status: 'Favorable',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    symbol: '📜',
    element: 'Air & Connaissance',
    divinity: 'Orunmila / Fâ',
    meaning: 'Jour de la Sagesse, de la Consultation et de la Clarté.',
    description: 'Journée bénie par excellence particulièrement associée aux pratiques du Fâ, à la divination, à la géomancie et aux grandes décisions éclairées. Idéal pour consulter les Bokonons.',
    recommended: [
      'Consultation du Fâ et demandes spirituelles profondes',
      'Prise de décisions stratégiques pour sa vie',
      'Étude des sagesses et traditions ancestrales',
      'Échanges éclairants avec des Bokonon et sages'
    ],
    avoid: [
      'L\'arrogance, l\'orgueil et le rejet des conseils sages',
      'Agir dans la confusion et le désordre',
      'Bafouer ses principes moraux et spirituels'
    ],
    wisdom: 'Le Fâ est le livre ouvert du destin : qui sait l\'interroger avec respect et humilité marche avec assurance sur son chemin.'
  }
];

/**
 * Jour neutre AWAYA : Point zéro et de renouveau du cycle lunaire
 */
export const AWAYA_DAY: FezanDayInfo = {
  id: 9,
  name: 'Awaya',
  nameFon: 'Awaya',
  status: 'Neutre',
  badgeColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
  symbol: '🌑',
  element: 'Cosmos & Nouvelle Lune',
  divinity: 'Mawu / Forces Cosmiques',
  meaning: 'Jour de Transition, de Renouvellement et de Point Zéro du Cycle.',
  description: 'Journée sacrée marquant la fin d\'une lunaison et le passage vers un nouveau cycle cosmique. Jour neutre de transition, d\'alignement et de recueillement où l\'énergie universelle se régénère.',
  recommended: [
    'Méditation, contemplation et recueillement spirituel',
    'Préparation sereine des projets du cycle à venir',
    'Purification personnelle et observation de la nature',
    'Repos réparateur et accueil du renouveau'
  ],
  avoid: [
    'Précipitation, impatience et agitation inutile',
    'Signer des engagements définitifs sans recul',
    'Négliger le repos spirituel et l\'écoute intérieure'
  ],
  wisdom: 'Awaya est la porte sacrée entre l\'ancien et le nouveau cycle. Le sage s\'y recueille pour accueillir la nouvelle lumière.',
  isAwaya: true
};

/**
 * Liste complète ordonnée du cycle débutant par le Point Zéro (AWAYA) suivi des 9 Fèzan
 */
export const ALL_FEZAN_DAYS: FezanDayInfo[] = [AWAYA_DAY, ...FEZAN_DAYS];

export const FON_MONTHS = [
  "Àxwéjísù", "Lòxòsù", "Líxísù", "Fenvísù", "Gùdùgùdùsù", "Àyídósù", 
  "Liyasù", "Àvívósù", "Anyanyasù", "Kpanyasù", "Alunsù", "Wowosù"
];

// ============================================================================
// BASE DE CALIBRATION ASTRONOMIQUE DES DATES D'AWAYA (NOUVELLES LUNES FÈKAN)
// Calculées pour le fuseau horaire de Cotonou / Bénin (UTC+1, heure locale)
// ============================================================================
const KNOWN_AWAYA_DATES: string[] = [
  // 2024
  '2024-01-11', '2024-02-10', '2024-03-10', '2024-04-09', '2024-05-08', '2024-06-06',
  '2024-07-06', '2024-08-04', '2024-09-03', '2024-10-02', '2024-11-01', '2024-12-01', '2024-12-31',
  // 2025
  '2025-01-29', '2025-02-28', '2025-03-29', '2025-04-28', '2025-05-27', '2025-06-25',
  '2025-07-25', '2025-08-23', '2025-09-22', '2025-10-21', '2025-11-20', '2025-12-20',
  // 2026 (Spécification officielle Fèkan 2026)
  '2026-01-18', '2026-02-17', '2026-03-19', '2026-04-17', '2026-05-16', '2026-06-15',
  '2026-07-14', '2026-08-12', '2026-09-11', '2026-10-10', '2026-11-09', '2026-12-09',
  // 2027
  '2027-01-08', '2027-02-07', '2027-03-08', '2027-04-07', '2027-05-06', '2027-06-05',
  '2027-07-04', '2027-08-03', '2027-09-01', '2027-10-01', '2027-10-30', '2027-11-29', '2027-12-28',
  // 2028
  '2028-01-26', '2028-02-25', '2028-03-26', '2028-04-25', '2028-05-24', '2028-06-23',
  '2028-07-22', '2028-08-20', '2028-09-19', '2028-10-18', '2028-11-17', '2028-12-16',
  // 2029
  '2029-01-15', '2029-02-13', '2029-03-15', '2029-04-13', '2029-05-13', '2029-06-12',
  '2029-07-11', '2029-08-09', '2029-09-08', '2029-10-08', '2029-11-06', '2029-12-05',
  // 2030
  '2030-01-04', '2030-02-03', '2030-03-04', '2030-04-03', '2030-05-02', '2030-06-01',
  '2030-07-01', '2030-07-30', '2030-08-29', '2030-09-27', '2030-10-26', '2030-11-25', '2030-12-25'
];

/**
 * Calcul astronomique de haute précision de la Nouvelle Lune (Algorithme de Jean Meeus)
 * Permet de déterminer AWAYA pour n'importe quelle date passée ou future (1900 à 2100+).
 */
function computeAstronomicalAwayaDate(targetYear: number, targetMonth: number, targetDay: number): string {
  const targetDateStr = `${targetYear}-${String(targetMonth).padStart(2, '0')}-${String(targetDay).padStart(2, '0')}`;
  
  // Estimation de la lunaison k (environ 12.3685 lunaisons par an depuis J2000)
  const approxK = Math.floor((targetYear + (targetMonth - 1) / 12 + targetDay / 365.25 - 2000) * 12.3685);
  
  let bestAwayaStr = '';
  
  // Recherche sur une fenêtre de lunaisons [k - 3, k + 2]
  for (let k = approxK - 3; k <= approxK + 2; k++) {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const T4 = T3 * T;
    const jde = 2451549.59268 + 29.530588853 * k + 0.0001337 * T2 - 0.000000150 * T3 + 0.00000000073 * T4;
    const M = (2.5534 + 29.10535669 * k - 0.0000218 * T2 - 0.00000011 * T3) * Math.PI / 180.0;
    const Mprime = (201.5643 + 385.81693528 * k + 0.0107438 * T2 + 0.00001239 * T3 - 0.000000058 * T4) * Math.PI / 180.0;
    const F = (160.7108 + 390.67050274 * k - 0.0016341 * T2 - 0.00000227 * T3 + 0.000000011 * T4) * Math.PI / 180.0;
    const omega = (124.7746 - 1.56375580 * k + 0.0020691 * T2 + 0.00000215 * T3) * Math.PI / 180.0;
    const E = 1.0 - 0.002516 * T - 0.0000074 * T2;

    const dJDE =
      -0.40720 * Math.sin(Mprime)
      + 0.17241 * E * Math.sin(M)
      + 0.01608 * Math.sin(2 * Mprime)
      + 0.01039 * Math.sin(2 * F)
      + 0.00739 * E * Math.sin(Mprime - M)
      - 0.00514 * E * Math.sin(Mprime + M)
      + 0.00208 * E * E * Math.sin(2 * M)
      - 0.00111 * Math.sin(Mprime - 2 * F)
      - 0.00057 * Math.sin(Mprime + 2 * F)
      + 0.00056 * E * Math.sin(2 * Mprime + M)
      - 0.00042 * Math.sin(3 * Mprime)
      + 0.00042 * E * Math.sin(M + 2 * F)
      + 0.00038 * E * Math.sin(M - 2 * F)
      - 0.00024 * E * Math.sin(2 * Mprime - M)
      - 0.00017 * Math.sin(omega)
      - 0.00007 * Math.sin(Mprime + 2 * M)
      + 0.00004 * Math.sin(2 * Mprime - 2 * F)
      + 0.00004 * Math.sin(3 * M)
      + 0.00003 * Math.sin(Mprime + M - 2 * F)
      + 0.00003 * Math.sin(2 * Mprime + 2 * F)
      - 0.00003 * Math.sin(Mprime + M + 2 * F)
      + 0.00003 * Math.sin(Mprime - M + 2 * F)
      - 0.00002 * Math.sin(Mprime - M - 2 * F)
      - 0.00002 * Math.sin(3 * Mprime + M)
      + 0.00002 * Math.sin(4 * Mprime);

    const jd = jde + dJDE;
    
    // Ajustement heure locale Cotonou (UTC+1) et observation du croissant
    const jdCotonou = jd + (1.0 / 24.0) + 0.35;
    const z = Math.floor(jdCotonou + 0.5);
    let a = z;
    if (z >= 2299161) {
      const alpha = Math.floor((z - 1867216.25) / 36524.25);
      a = z + 1 + alpha - Math.floor(alpha / 4);
    }
    const b = a + 1524;
    const c = Math.floor((b - 122.1) / 365.25);
    const dDay = Math.floor(365.25 * c);
    const e = Math.floor((b - dDay) / 30.6001);
    const day = b - dDay - Math.floor(30.6001 * e);
    const month = e < 14 ? e - 1 : e - 13;
    const year = month > 2 ? c - 4716 : c - 4715;
    
    const candidateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    if (candidateStr <= targetDateStr) {
      if (!bestAwayaStr || candidateStr > bestAwayaStr) {
        bestAwayaStr = candidateStr;
      }
    }
  }
  
  return bestAwayaStr;
}

/**
 * Recherche la dernière date d'AWAYA précédant ou égale à la date demandée (A <= D)
 */
export function findLastAwaya(targetDate: Date): string {
  const y = targetDate.getFullYear();
  const m = targetDate.getMonth() + 1;
  const d = targetDate.getDate();
  const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  // 1. Recherche prioritaire dans la table calibrée officielle
  let lastAnchor = '';
  for (const anchor of KNOWN_AWAYA_DATES) {
    if (anchor <= dateStr) {
      lastAnchor = anchor;
    } else {
      break;
    }
  }

  if (lastAnchor) {
    // Si la date est couverte par la table calibrée
    const firstAnchor = KNOWN_AWAYA_DATES[0];
    const lastAnchorDate = KNOWN_AWAYA_DATES[KNOWN_AWAYA_DATES.length - 1];
    if (dateStr >= firstAnchor && dateStr <= lastAnchorDate) {
      return lastAnchor;
    }
  }

  // 2. Moteur astronomique universel pour les dates hors table
  return computeAstronomicalAwayaDate(y, m, d);
}

/**
 * Calcule le Fèzan authentique pour n'importe quelle date passée, présente ou future.
 * 
 * Règle officielle :
 * - D = Date recherchée
 * - A = Dernière date d'AWAYA (A <= D)
 * - Si D == A : F(D) = AWAYA (Nature : Neutre)
 * - Si D > A  : N = D - A ; Index = (N - 1) MOD 9
 *   S = [Mèdjo, Mèkou, Vodun, Azon, Vo, Hwè, Bo, Hin, Fâ]
 */
export function getFezanForDate(date: Date | string): FezanDayInfo {
  const target = typeof date === 'string' ? new Date(date) : date;
  
  // Normalisation UTC pour éviter tout décalage d'heure d'été ou de fuseau
  const y = target.getFullYear();
  const m = target.getMonth();
  const d = target.getDate();
  const targetMidnightUTC = Date.UTC(y, m, d);

  const awayaStr = findLastAwaya(target);
  const [ay, am, ad] = awayaStr.split('-').map(Number);
  const awayaMidnightUTC = Date.UTC(ay, am - 1, ad);

  // Cas 1 : La date est le jour d'AWAYA
  if (targetMidnightUTC === awayaMidnightUTC) {
    return AWAYA_DAY;
  }

  // Cas 2 : La date se situe après AWAYA
  const diffDays = Math.round((targetMidnightUTC - awayaMidnightUTC) / (1000 * 60 * 60 * 24));
  
  // Index = (N - 1) MOD 9
  let index = (diffDays - 1) % 9;
  if (index < 0) index += 9;

  return FEZAN_DAYS[index];
}

export const getFezanDayForDate = getFezanForDate;

/**
 * Vérifie si une date donnée correspond au jour d'AWAYA (Nouvelle Lune cosmique)
 */
export function isAwayaDate(date: Date | string): boolean {
  const fezan = getFezanForDate(date);
  return fezan.status === 'Neutre' || fezan.id === 9;
}

/**
 * Récupère le nom traditionnel Fon du mois
 */
export function getFonMonthName(monthIndex: number): string {
  return FON_MONTHS[monthIndex % 12] || '';
}

