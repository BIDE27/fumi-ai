// Modèle complet des 256 Signes Sacrés du Fâ (Du / Odù)
// Système divinatoire authentique Vodun & Fâ du Bénin / Dahomey

export interface FaRootSign {
  id: string;
  nameFon: string;
  nameYoruba: string;
  pattern: [1 | 2, 1 | 2, 1 | 2, 1 | 2]; // 1 = Simple (I), 2 = Double (II)
  element: string;
  nature: string;
  meaning: string;
  divinity: string;
  order: number;
}

export const FA_ROOT_SIGNS: FaRootSign[] = [
  {
    id: 'gbe',
    nameFon: 'Gbê',
    nameYoruba: 'Ogbe',
    pattern: [1, 1, 1, 1],
    element: 'Air & Lumière Primordiale',
    nature: 'Jour, Clarté absolue, Masculin actif, Ciel (Orient)',
    meaning: 'Le souffle de vie, la création, la longévité, la victoire sur l’obscurité, l’ouverture des chemins et la bénédiction suprême. Père primordial de tous les signes.',
    divinity: 'Orunmila, Mawu',
    order: 1
  },
  {
    id: 'yeku',
    nameFon: 'Yêkou',
    nameYoruba: 'Oyeku',
    pattern: [2, 2, 2, 2],
    element: 'Terre & Obscurité Féconde',
    nature: 'Nuit, Silence, Féminin réceptif, Repos sacré (Occident)',
    meaning: 'La fin d’un cycle et la renaissance, la mémoire des ancêtres, la protection contre la mort prématurée et les calamités, la profondeur des mystères occultes. Mère primordiale de tous les signes.',
    divinity: 'Kuvito, Yewa',
    order: 2
  },
  {
    id: 'woli',
    nameFon: 'Woli',
    nameYoruba: 'Iwori',
    pattern: [2, 1, 1, 2],
    element: 'Feu Sacré & Clairvoyance',
    nature: 'Vision spirituelle, Éveil, Intuition, Conscience',
    meaning: 'La lucidité intérieure, la vision au-delà des illusions, la méditation, la quête philosophique, la droiture morale et la capacité à discerner la vérité cachée.',
    divinity: 'Orunmila, Aginjaku',
    order: 3
  },
  {
    id: 'di',
    nameFon: 'Di',
    nameYoruba: 'Idi',
    pattern: [1, 2, 2, 1],
    element: 'Eau & Terre Maternelle',
    nature: 'Stabilité, Enracinement, Protection, Gestation',
    meaning: 'L’assise solide, la fertilité, la ténacité inébranlable, la protection maternelle contre les embûches, le triomphe sur l’adversité par la patience et la fermeté.',
    divinity: 'Yemoja, Nana Buruku',
    order: 4
  },
  {
    id: 'loso',
    nameFon: 'Losso',
    nameYoruba: 'Irosun',
    pattern: [1, 1, 2, 2],
    element: 'Feu & Sang Vital',
    nature: 'Aurore, Énergie rouge, Vigilance, Détermination',
    meaning: 'La force vitale, le courage héroïque dans l’épreuve, la mise en garde sacrée contre les pièges et la trahison, l’éclat de la vérité et l’honneur ancestral.',
    divinity: 'Aganju, Iroko',
    order: 5
  },
  {
    id: 'winlin',
    nameFon: 'Winlin',
    nameYoruba: 'Owonrin',
    pattern: [2, 2, 1, 1],
    element: 'Air & Tempête',
    nature: 'Mouvement, Vent tourbillonnant, Métamorphose, Destin',
    meaning: 'Le souffle du destin, les retournements imprévus de situation, la destruction des blocages anciens, les opportunités soudaines et l’adaptation rapide.',
    divinity: 'Oya, Aiyelala',
    order: 6
  },
  {
    id: 'abla',
    nameFon: 'Abla',
    nameYoruba: 'Obara',
    pattern: [1, 2, 2, 2],
    element: 'Terre & Prospérité',
    nature: 'Générosité, Éloquence, Abondance, Royauté',
    meaning: 'La richesse matérielle et la noblesse d’âme succédant à la disette, le pouvoir royal du verbe, l’humilité élevée au sommet et la bonne fortune.',
    divinity: 'Shango, Aje Shaluga',
    order: 7
  },
  {
    id: 'akla',
    nameFon: 'Aklan',
    nameYoruba: 'Okanran',
    pattern: [2, 2, 2, 1],
    element: 'Feu & Foudre',
    nature: 'Justice divine, Droiture absolue, Ferveur guerrière',
    meaning: 'L’intransigeance avec la vérité, le foudroiement des mensonges et de l’injustice, la défense indéfectible des opprimés et le triomphe moral.',
    divinity: 'Heviosso, Shango',
    order: 8
  },
  {
    id: 'guda',
    nameFon: 'Gouda',
    nameYoruba: 'Ogunda',
    pattern: [1, 1, 1, 2],
    element: 'Métal & Fer Sacré',
    nature: 'Action bâtisseuse, Courage, Tranchant, Victoire',
    meaning: 'Le travail créateur, l’ouverture des voies bloquées à coups de machette sacrée, la victoire sur les obstacles, l’effort récompensé et la force d’action.',
    divinity: 'Gu, Ogun',
    order: 9
  },
  {
    id: 'sa',
    nameFon: 'Sa',
    nameYoruba: 'Osa',
    pattern: [2, 1, 1, 1],
    element: 'Vent & Mystères Stellaires',
    nature: 'Magie primordiale, Puissance invisible féminine, Vol spirituel',
    meaning: 'Le respect absolu des mères ancestrales et des forces invisibles de la nuit, le voyage spirituel, l’intuition prémonitoire et la sagesse protectrice.',
    divinity: 'Minonnan, Iyami Osoronga',
    order: 10
  },
  {
    id: 'ka',
    nameFon: 'Ka',
    nameYoruba: 'Ika',
    pattern: [2, 1, 2, 2],
    element: 'Eau & Stratégie Défensive',
    nature: 'Prudence, Maîtrise des secrets, Autodéfense, Ruse salvatrice',
    meaning: 'La prudence face au venin des calomniateurs, la retenue, la préservation jalouse des secrets sacrés et le triomphe stratégique sans effusion de sang.',
    divinity: 'Dan, Oshunmare',
    order: 11
  },
  {
    id: 'trukpin',
    nameFon: 'Trukpin',
    nameYoruba: 'Oturupon',
    pattern: [2, 2, 1, 2],
    element: 'Terre Rugueuse & Endurance',
    nature: 'Résilience corporelle, Force tellurique, Guérison après épreuve',
    meaning: 'L’endurance invincible face à l’adversité et à l’épreuve de la maladie, le rétablissement de la santé, la patience du roc et la solidité physique.',
    divinity: 'Sakpata, Babalu Aye',
    order: 12
  },
  {
    id: 'tula',
    nameFon: 'Tula',
    nameYoruba: 'Otura',
    pattern: [1, 2, 1, 1],
    element: 'Air & Sérénité Spirituelle',
    nature: 'Paix, Concorde, Harmonie sociale, Diplomatie',
    meaning: 'La réconciliation des cœurs divisés, la diplomatie inspirée, la bénédiction des marchands et voyageurs, la clarté mentale et l’élévation mystique.',
    divinity: 'Orunmila, Obatala',
    order: 13
  },
  {
    id: 'lete',
    nameFon: 'Lêtê',
    nameYoruba: 'Irete',
    pattern: [1, 1, 2, 1],
    element: 'Terre & Guérison Végétale',
    nature: 'Herboristerie sacrée (Feuilles Amà), Science médicale, Force vitale',
    meaning: 'Le secret guérisseur des plantes et décoctions sacrées, la victoire sur les poisons, l’immortalité de l’esprit, la régénération biologique et la vitalité.',
    divinity: 'Osanyin, Aroni',
    order: 14
  },
  {
    id: 'tche',
    nameFon: 'Tchè',
    nameYoruba: 'Ose',
    pattern: [1, 2, 1, 2],
    element: 'Eau Douce & Fécondité',
    nature: 'Beauté, Grâce féminine, Douceur, Abondance reproductive',
    meaning: 'La maternité épanouie, la joie d’enfanter, la créativité artistique raffinée, l’attraction magnétique de la bonne fortune et la pureté des eaux douces.',
    divinity: 'Tohosu, Oshun',
    order: 15
  },
  {
    id: 'fu',
    nameFon: 'Fu',
    nameYoruba: 'Ofun',
    pattern: [2, 1, 2, 1],
    element: 'Air Lumineux & Pureté Suprême',
    nature: 'Blanc immaculé, Sainteté, Sagesse suprême, Clôture du cycle',
    meaning: 'Le couronnement suprême des 16 Signes Mères, le respect inviolable des interdits sacrés (Gbegbo), la bénédiction des aînés, la paix plénière et la transcendance.',
    divinity: 'Orisa-Nla, Mawu',
    order: 16
  },
];

export interface FaSign {
  id: string;
  code: string; // Ex: 'gbe-gbe', 'gbe-yeku'
  name: string; // Nom usuel Fon : 'Gbe-Meji', 'Gbe-Yeku'
  nameFon: string; // Format accentué : 'Gbê-Mêdjì', 'Gbê-Yêkou'
  nameYoruba: string; // Format Ifá : 'Eji-Ogbe', 'Ogbe-Yeku'
  rightRoot: FaRootSign; // Maison Droite (Akouè / Otun)
  leftRoot: FaRootSign;  // Maison Gauche (Dounon / Osi)
  isMeji: boolean;
  symbol: string; // 'I I\nI I\nI I\nI I'
  lines: { left: 'I' | 'II'; right: 'I' | 'II' }[];
  element: string;
  nature: string;
  meaning: string;
  order: number;
}

// Construction ordonnée des 256 Signes du Fâ
export const ALL_256_FA_SIGNS: FaSign[] = (() => {
  const signs: FaSign[] = [];
  let index = 1;

  // Ordre hiérarchique : On parcourt d'abord chaque Maison Mère (Right) combinée à toutes les Maisons Gauches (Left)
  for (const right of FA_ROOT_SIGNS) {
    for (const left of FA_ROOT_SIGNS) {
      const isMeji = right.id === left.id;
      const code = `${right.id}-${left.id}`;
      
      const name = isMeji 
        ? `${right.nameFon}-Meji` 
        : `${right.nameFon}-${left.nameFon}`;

      const nameFon = isMeji
        ? `${right.nameFon}-Mêdjì`
        : `${right.nameFon}-${left.nameFon}`;

      const nameYoruba = isMeji
        ? (right.id === 'gbe' ? 'Eji-Ogbe' : `${right.nameYoruba}-Meji`)
        : `${right.nameYoruba}-${left.nameYoruba}`;

      const lines: { left: 'I' | 'II'; right: 'I' | 'II' }[] = [
        { left: left.pattern[0] === 1 ? 'I' : 'II', right: right.pattern[0] === 1 ? 'I' : 'II' },
        { left: left.pattern[1] === 1 ? 'I' : 'II', right: right.pattern[1] === 1 ? 'I' : 'II' },
        { left: left.pattern[2] === 1 ? 'I' : 'II', right: right.pattern[2] === 1 ? 'I' : 'II' },
        { left: left.pattern[3] === 1 ? 'I' : 'II', right: right.pattern[3] === 1 ? 'I' : 'II' },
      ];

      const symbol = lines.map(l => `${l.left} ${l.right}`).join('\n');

      signs.push({
        id: code,
        code,
        name,
        nameFon,
        nameYoruba,
        rightRoot: right,
        leftRoot: left,
        isMeji,
        symbol,
        lines,
        element: isMeji ? right.element : `${right.element.split('&')[0].trim()} / ${left.element.split('&')[0].trim()}`,
        nature: isMeji ? right.nature : `${right.nature} / ${left.nature}`,
        meaning: isMeji ? right.meaning : `Alliance sacrée de la maison droite ${right.nameFon} et de la maison gauche ${left.nameFon}.`,
        order: index++,
      });
    }
  }

  return signs;
})();

// Les 16 Signes Mères (Meji) uniquement
export const THE_16_MEJI_SIGNS = ALL_256_FA_SIGNS.filter(s => s.isMeji);

// Recherche rapide d'un signe par nom ou code
export function findFaSign(nameOrCode: string): FaSign | undefined {
  if (!nameOrCode) return undefined;
  const normalized = nameOrCode.toLowerCase().replace(/[^a-z0-9]/g, '');
  return ALL_256_FA_SIGNS.find(s => {
    const sNameNorm = s.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const sFonNorm = s.nameFon.toLowerCase().replace(/[^a-z0-9]/g, '');
    const sYorubaNorm = s.nameYoruba.toLowerCase().replace(/[^a-z0-9]/g, '');
    const sIdNorm = s.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    return sNameNorm === normalized || sFonNorm === normalized || sYorubaNorm === normalized || sIdNorm === normalized;
  });
}
