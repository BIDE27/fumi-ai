/**
 * Moteur des salutations dynamiques et capsules proactives de Fumi
 * Synchronisé avec le calendrier sacré Fèzan et la base de connaissances
 */
import { getFezanForDate } from './fezan';

export interface FumiGreeting {
  headline: string;
  subline: string;
  period: 'morning' | 'afternoon' | 'evening';
}

export interface FumiProactiveCard {
  id: string;
  badge: string;
  badgeIcon: 'crown' | 'sparkles' | 'book' | 'compass' | 'shield' | 'flame';
  title: string;
  description: string;
  actionLabel: string;
  actionType: 'navigate' | 'prompt';
  targetUrl?: string;
  promptQuery?: string;
  secondaryActionLabel?: string;
  secondaryActionType?: 'navigate' | 'prompt';
  secondaryTargetUrl?: string;
  secondaryPromptQuery?: string;
}

/**
 * Banques de salutations chaleureuses et variées selon le moment de la journée
 */
const MORNING_GREETINGS = [
  (name: string) => ({
    headline: `Kú dɔ̀ zànzǎn, ${name} !`,
    subline: "Que la lumière du Fâ éclaire tes pas dès cette première lueur.",
    period: 'morning' as const
  }),
  (name: string) => ({
    headline: `Belle et lumineuse aube, ${name} !`,
    subline: "Les esprits bienveillants ouvrent ce jour. De quelle bénédiction ton cœur a-t-il soif ?",
    period: 'morning' as const
  }),
  (name: string) => ({
    headline: `Bonjour et paix à toi, ${name}.`,
    subline: "Un nouveau cycle commence. Que voulons-nous accomplir ou éclairer aujourd'hui ?",
    period: 'morning' as const
  }),
  (name: string) => ({
    headline: `Réveil béni, cher(e) ${name} !`,
    subline: "Avant que le jour ne prenne son élan, déposons ici tes questions et tes souhaits.",
    period: 'morning' as const
  }),
];

const AFTERNOON_GREETINGS = [
  (name: string) => ({
    headline: `Que la force soit avec toi, ${name} !`,
    subline: "Le soleil est au zénith. Gardons un esprit clair et protégé face aux défis du jour.",
    period: 'afternoon' as const
  }),
  (name: string) => ({
    headline: `Belle après-midi, ${name} !`,
    subline: "Entre deux engagements, prends ce souffle pour consulter la sagesse du Fâ.",
    period: 'afternoon' as const
  }),
  (name: string) => ({
    headline: `Fumi t'écoute, ${name}.`,
    subline: "Une décision importante à peser ou un choix à éclairer en ce milieu de journée ?",
    period: 'afternoon' as const
  }),
  (name: string) => ({
    headline: `Sur quoi cheminons-nous, ${name} ?`,
    subline: "L'énergie de l'après-midi favorise l'action juste et la clarté d'esprit.",
    period: 'afternoon' as const
  }),
];

const EVENING_GREETINGS = [
  (name: string) => ({
    headline: `Kú dɔ̀ gbadéwé, ${name} !`,
    subline: "Le soleil se couche sur le Danxomè. Déposons le tumulte du monde extérieur.",
    period: 'evening' as const
  }),
  (name: string) => ({
    headline: `Douce soirée en paix, ${name}.`,
    subline: "Que les ancêtres protègent ton toit. As-tu fait un songe ou une rencontre intrigante ?",
    period: 'evening' as const
  }),
  (name: string) => ({
    headline: `La nuit veille avec toi, ${name}.`,
    subline: "Le moment propice pour écouter les contes secrets et sonder les mystères de l'âme.",
    period: 'evening' as const
  }),
  (name: string) => ({
    headline: `Paix sur ta demeure, ${name}.`,
    subline: "Avant le repos de la nuit, de quel conseil spirituel as-tu besoin ce soir ?",
    period: 'evening' as const
  }),
];

/**
 * Retourne une salutation personnalisée, vivante et variée
 */
export function getFumiGreeting(userName?: string, seed?: string): FumiGreeting {
  const cleanName = (userName && userName.trim()) ? userName.trim() : 'mon ami(e)';
  const currentHour = new Date().getHours();

  let pool: Array<(name: string) => FumiGreeting> = AFTERNOON_GREETINGS;
  if (currentHour >= 4 && currentHour < 12) {
    pool = MORNING_GREETINGS;
  } else if (currentHour >= 18 || currentHour < 4) {
    pool = EVENING_GREETINGS;
  }

  // Calcul d'un index déterministe par session pour éviter le flickering, ou aléatoire
  let index = Math.floor(Math.random() * pool.length);
  if (seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    index = Math.abs(hash) % pool.length;
  }

  return pool[index](cleanName);
}

/**
 * Génère la liste des capsules proactives de découverte et d'action
 * Synchronisées en temps réel avec le Fèzan et notre base de connaissances (knowledge)
 */
export function getFumiProactiveCards(date: Date = new Date()): FumiProactiveCard[] {
  const fezan = getFezanForDate(date);
  const cards: FumiProactiveCard[] = [];

  // 1. CARTE ORACLE DU FÂ & FÈZAN EN DIRECT (100% synchronisée avec la page Fèzan)
  const cleanMeaning = fezan.meaning.replace(/^Jour (de l['’]|du |de la |des |de )/i, '').replace(/\.$/, '');
  const fezanTitle = fezan.name === 'Fâ'
    ? "Aujourd'hui, c'est le jour sacré du Fâ !"
    : `Jour de ${fezan.name} : ${cleanMeaning}`;

  const badgeIcon = fezan.name === 'Fâ'
    ? 'sparkles'
    : fezan.status === 'Favorable'
      ? 'sparkles'
      : fezan.status === 'Neutre'
        ? 'compass'
        : 'shield';

  cards.push({
    id: `fezan_day_${fezan.id}`,
    badge: `Fèzan : ${fezan.nameFon || fezan.name} • ${fezan.status.toUpperCase()}`,
    badgeIcon,
    title: fezanTitle,
    description: fezan.description,
    actionLabel: 'Interroger le Fâ',
    actionType: 'navigate',
    targetUrl: '/consultation',
    secondaryActionLabel: 'Détails Fèzan',
    secondaryActionType: 'navigate',
    secondaryTargetUrl: '/fezan',
  });

  // 2. CARTE TRÉSOR ROYAL : LE SAVON DU ROI BÉHANZIN
  cards.push({
    id: 'behanzin_royal_soap',
    badge: 'Secret Royal du Dahomey',
    badgeIcon: 'crown',
    title: "Le savon protecteur du Roi Béhanzin",
    description: "Le savais-tu ? Ce savon sacré fut celui qu'utilisait le roi Béhanzin dans le temps colonial pour que les peuples et même les colons respectent et craignent sa majesté.",
    actionLabel: "Raconte-moi l'histoire",
    actionType: 'prompt',
    promptQuery: "Raconte-moi l'histoire ancestrale du savon de chance, de charisme et de respect qu'utilisait le Roi Béhanzin à l'époque coloniale, et comment la royauté du Danxomè préparait ce trésor mystique.",
    secondaryActionLabel: 'Voir la boutique',
    secondaryActionType: 'navigate',
    secondaryTargetUrl: '/store',
  });

  // 3. CARTE CONTES ET SAGESSE DU FÂ (Reliée à knowledge/ et Drive)
  cards.push({
    id: 'ancestral_tales',
    badge: 'Contes & Sagesses',
    badgeIcon: 'book',
    title: "La parabole sacrée du caméléon",
    description: "Pourquoi le Fâ enseigne-t-il d'avancer avec la patience et la discrétion du caméléon ? Découvre ce conte initiatique d'Abomey.",
    actionLabel: 'Écouter le conte',
    actionType: 'prompt',
    promptQuery: "Raconte-moi le conte traditionnel dahoméen du caméléon et de la patience face au danger, en m'expliquant la sagesse spirituelle qu'il transmet pour ma vie.",
    secondaryActionLabel: 'Autre légende',
    secondaryActionType: 'prompt',
    secondaryPromptQuery: "Raconte-moi un conte traditionnel béninois méconnu sur la fidélité, le courage ou la malice des animaux dans le Fâ.",
  });

  // 4. CARTE KPOLI / SIGNE PERSONNEL
  cards.push({
    id: 'kpoli_discovery',
    badge: 'Initiation & Destin',
    badgeIcon: 'sparkles',
    title: "Connais-tu ton Kpoli (Signe de vie) ?",
    description: "Ton signe de Fâ de naissance révèle ta boussole cosmique, tes interdits alimentaires et les portes secrètes de ta prospérité.",
    actionLabel: 'Comprendre mon Kpoli',
    actionType: 'prompt',
    promptQuery: "Explique-moi en profondeur ce qu'est le Kpoli (signe personnel de Fâ), son importance capitale pour un individu et comment le Bokonon le révèle lors d'une consultation.",
    secondaryActionLabel: 'Consulter',
    secondaryActionType: 'navigate',
    secondaryTargetUrl: '/consultation',
  });

  return cards;
}
