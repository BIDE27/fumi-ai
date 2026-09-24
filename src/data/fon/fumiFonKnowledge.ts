// Module de Connaissance Linguistique Fon Souverain pour Fumi
// Extrait automatiquement du Dictionnaire Francais-Fongbe et de la Grammaire de Gerard Poirot

export interface FonTerm {
  fr: string;
  fon: string;
  cat: string;
}

export interface SerialVerb {
  french: string;
  fon: string;
  literal: string;
}

export const FON_GRAMMAR_ESSENTIALS = {
  tonology: "Le Fongbe est une langue a 4 tons (haut, bas, montant, descendant). Ex: so = cheval, so = tonnerre/foudre, so = demain.",
  negation: "Negation avec le morpheme 'ma... a' ou 'a' en fin de proposition (Un se a = Je n'ai pas entendu).",
  interrogation: "Interrogation avec la particule 'a' finale (A fon ganji a ? = Te portes-tu bien ce matin ?).",
  serial_verbs: [
  {
    "french": "accoucher",
    "fon": "jì vĭ",
    "literal": "engendrer enfant",
    "page": 26
  },
  {
    "french": "accueillir",
    "fon": "yĭ mɛ",
    "literal": "recevoir personne",
    "page": 26
  },
  {
    "french": "acheter",
    "fon": "",
    "literal": "acheter chose",
    "page": 26
  },
  {
    "french": "admirer",
    "fon": "kpà mɛ",
    "literal": "louer personne",
    "page": 26
  },
  {
    "french": "allaiter",
    "fon": "",
    "literal": "donner sein",
    "page": 26
  },
  {
    "french": "annoncer",
    "fon": "",
    "literal": "lancer nouvelle",
    "page": 26
  },
  {
    "french": "appeler",
    "fon": "",
    "literal": "appeler quelqu’un",
    "page": 26
  },
  {
    "french": "assassiner",
    "fon": "hù mɛ",
    "literal": "tuer personne",
    "page": 26
  },
  {
    "french": "autoriser",
    "fon": "nă gbè",
    "literal": "donner voix",
    "page": 26
  },
  {
    "french": "balayer",
    "fon": "zà ayĭ",
    "literal": "balayer terre",
    "page": 26
  },
  {
    "french": "batailler",
    "fon": "fùn ahwàn",
    "literal": "agiter guerre",
    "page": 26
  },
  {
    "french": "battre le tambour",
    "fon": "xò hŭn",
    "literal": "battre tambour",
    "page": 26
  },
  {
    "french": "baver",
    "fon": "",
    "literal": "rejeter bave",
    "page": 26
  },
  {
    "french": "bégayer",
    "fon": "",
    "literal": "secouer langue",
    "page": 26
  },
  {
    "french": "bénir",
    "fon": "",
    "literal": "frapper souhait",
    "page": 26
  },
  {
    "french": "boutonner",
    "fon": "dŏ gbŏ",
    "literal": "appliquer bouton",
    "page": 26
  },
  {
    "french": "boxer",
    "fon": "nyì akodokwín",
    "literal": "lancer poing",
    "page": 26
  },
  {
    "french": "brûler",
    "fon": "",
    "literal": "consumer feu",
    "page": 26
  },
  {
    "french": "cambrioler",
    "fon": "",
    "literal": "ramasser maison",
    "page": 26
  },
  {
    "french": "chanter",
    "fon": "jì hàn",
    "literal": "émettre chant",
    "page": 26
  },
  {
    "french": "chasser",
    "fon": "nyà gbĕ",
    "literal": "chasser chasse",
    "page": 26
  },
  {
    "french": "chausser",
    "fon": "dŏ afɔkpà",
    "literal": "appliquer chaussure",
    "page": 26
  },
  {
    "french": "citer en justice",
    "fon": "",
    "literal": "appeler jugement",
    "page": 26
  },
  {
    "french": "coiffer",
    "fon": "ɖŏ ɖà",
    "literal": "arranger cheveux",
    "page": 26
  },
  {
    "french": "colporter",
    "fon": "jlă nŭ",
    "literal": "proclamer chose",
    "page": 26
  },
  {
    "french": "commettre un sacrilège",
    "fon": "gbà hùn",
    "literal": "casser",
    "page": 26
  },
  {
    "french": "comploter",
    "fon": "blă sé",
    "literal": "attacher complot",
    "page": 26
  },
  {
    "french": "composer un chant",
    "fon": "kpà hàn",
    "literal": "composer",
    "page": 27
  },
  {
    "french": "condamner",
    "fon": "",
    "literal": "appliquer jugement",
    "page": 27
  },
  {
    "french": "conduire",
    "fon": "kùn hŭn",
    "literal": "conduire véhicule",
    "page": 27
  },
  {
    "french": "construire une maison",
    "fon": "",
    "literal": "couvrir",
    "page": 27
  },
  {
    "french": "conter",
    "fon": "",
    "literal": "dire conte",
    "page": 27
  },
  {
    "french": "cotiser",
    "fon": "",
    "literal": "cotiser argent",
    "page": 27
  },
  {
    "french": "coudre",
    "fon": "",
    "literal": "coudre chose",
    "page": 27
  },
  {
    "french": "courir",
    "fon": "kan wezùn",
    "literal": "prendre course",
    "page": 27
  },
  {
    "french": "coûter cher",
    "fon": "",
    "literal": "être amer prix",
    "page": 27
  },
  {
    "french": "couvrir une case",
    "fon": "",
    "literal": "couvrir maison",
    "page": 27
  },
  {
    "french": "creuser",
    "fon": "kùn dò",
    "literal": "creuser trou",
    "page": 27
  },
  {
    "french": "crier",
    "fon": "sú xó",
    "literal": "arracher parole",
    "page": 27
  },
  {
    "french": "danser",
    "fon": "ɖŭ wè",
    "literal": "remuer danse",
    "page": 27
  }
]
};

export const FON_PRIORITY_LEXICON: Record<string, FonTerm> = {
  "abcès": {
    "fr": "abcès",
    "fon": "mεtεfyɔCC ; mεtεfyε ; nùtítε ; nùtεmε ; avoir un abcès ; nŭ tε mε",
    "cat": "general"
  },
  "abîme": {
    "fr": "abîme",
    "fon": "dodò gɔngɔn",
    "cat": "general"
  },
  "abîmé": {
    "fr": "abîmé",
    "fon": "tló",
    "cat": "general"
  },
  "abord": {
    "fr": "abord",
    "fon": "tó ; aux abords de la porte ; hɔntò ; aux abords du marché ; axi tó ; d'abord ; dŏ nukɔBn ; hwεH",
    "cat": "general"
  },
  "hwgbá": {
    "fr": "-hwεgbá",
    "fon": "jε nukɔBn ; jε nukɔn ɔC ; tò ; les abords du marché ; axitó ; les abords du marché d'abomey",
    "cat": "general"
  },
  "abri": {
    "fr": "abri",
    "fon": "xɔsá ; abri pour la cuisine ; kúkuxɔsá ; abri pour les bovins ; nyibú xɔCsá ; abri pour un cheval ; sɔC",
    "cat": "general"
  },
  "xcsá": {
    "fr": "xɔcsá",
    "fon": "abri provisoire ; azavà",
    "cat": "general"
  },
  "glhn": {
    "fr": "glɔhn",
    "fon": "s'abriter du vent ; bε ; bε jɔhɔBn",
    "cat": "general"
  },
  "absence": {
    "fr": "absence",
    "fon": "tíntɔCn ; túntɔCn ; xwémáɖé ; l'absence d'esprit ; yɛyi ; yɛyu ; s'absenter ; tɔCn ; s'abstenir ; gɔBn",
    "cat": "spirituel_fa"
  },
  "abus": {
    "fr": "abus",
    "fon": "abus de la force ; mεtáfú ; mεtáfútáfú",
    "cat": "general"
  },
  "faiblequesoit": {
    "fr": "faible que soit",
    "fon": "gbà acε ; abuser d'une femme ; gblĕ mε ; action d'abuser de sa force contre quelqu'un",
    "cat": "famille_societe"
  },
  "accès": {
    "fr": "accès",
    "fon": "accès de froid ; avivɔzɔBn ; avoir un accès de fièvre ; avivɔ sìn mε",
    "cat": "sante_tisane"
  },
  "conséquencesfâcheuses": {
    "fr": "conséquences fâcheuses",
    "fon": "afɔkú",
    "cat": "spirituel_fa"
  },
  "acclamation": {
    "fr": "acclamation",
    "fon": "aploò ; acclamations de joie exprimées par les femmes ; aluwáásí ó! owó! owó! ; wásí wásí",
    "cat": "famille_societe"
  },
  "óó": {
    "fr": "óó !",
    "fon": "acclamations en l'honneur du roi d'Abomey ; agbogbo xánxàn ; acclamations en tapant sur les",
    "cat": "general"
  },
  "xwèdm": {
    "fr": "-xwè dŏ mɛ",
    "fon": "se faire accompagner ; kplá",
    "cat": "general"
  },
  "accouchement": {
    "fr": "accouchement",
    "fon": "ajì ; vìjíjí",
    "cat": "sante_tisane"
  },
  "accueillirunvisiteur": {
    "fr": "accueillir un visiteur",
    "fon": "xɛC jŏ ; accueillir une femme ; xɛC nà",
    "cat": "famille_societe"
  },
  "djm": {
    "fr": "dŏ jĭ mε",
    "fon": "s'accuser ; ɖɔB hwε",
    "cat": "general"
  },
  "achat": {
    "fr": "achat",
    "fon": "nùxíxɔC ; nùxúxɔC",
    "cat": "general"
  },
  "acide": {
    "fr": "acide",
    "fon": "kpákpá ; acide (pour les fruits boissons) ; sinvεsínvε",
    "cat": "general"
  },
  "acier": {
    "fr": "acier",
    "fon": "ganwlíwlí",
    "cat": "general"
  },
  "acné": {
    "fr": "acné",
    "fon": "nyɔkúsí ; nyɔkwésé",
    "cat": "general"
  },
  "âcre": {
    "fr": "âcre",
    "fon": "être âcre ; vεH ; être d'un goût un peu âcre ; kpákpá",
    "cat": "general"
  },
  "actif": {
    "fr": "actif",
    "fon": "être actif ; wŭ yă",
    "cat": "general"
  },
  "adieu": {
    "fr": "adieu",
    "fon": "faire ses adieux à quelqu'un ; dŏ «yì bó wá» nú mε",
    "cat": "spirituel_fa"
  },
  "adjoint": {
    "fr": "adjoint",
    "fon": "adjoint à un vaudoun ; hunsɔC ; adjoint du chef de famille ; logomεxú ; adjoint du ministre des",
    "cat": "famille_societe"
  },
  "administrateur": {
    "fr": "administrateur",
    "fon": "administrateur du poison d'épreuve ; àɖìkpénúmεtɔC ; àɖìnàtɔC",
    "cat": "sante_tisane"
  },
  "adopter": {
    "fr": "adopter",
    "fon": "adopter quelqu'un ; sɔC mε bo hεn ; sɔC mε bo hεn kplɔCn ; yĭ mɛ bo hɛBn ; adopter un enfant ; yĭ vĭ",
    "cat": "famille_societe"
  },
  "adorateur": {
    "fr": "adorateur",
    "fon": "adorateur de dieu ; măwùsεntɔC",
    "cat": "spirituel_fa"
  },
  "adoration": {
    "fr": "adoration",
    "fon": "nŭsinsεn ; sinsεn ; adoration de dieu ; măwùsínsεn",
    "cat": "spirituel_fa"
  },
  "adorer": {
    "fr": "adorer",
    "fon": "sεn ; adorer dieu ; sεn măwŭ ; adorer un vaudoun ; sεn vodún",
    "cat": "spirituel_fa"
  },
  "m": {
    "fr": "mε",
    "fon": "kplé zàn xá mɛ ; commettre l'adultère (femme) ; dŏ afɔB gbĕ ; toute forme d'adultère ; zankplékplé",
    "cat": "famille_societe"
  },
  "xám": {
    "fr": "xá mε",
    "fon": "kpé mε ; avoir affaire avec quelqu'un ; kpé nŭ xá mε ; être à son affaire ; ɖŏ è wŭ ; ɖò... wŭ",
    "cat": "general"
  },
  "affût": {
    "fr": "affût",
    "fon": "wù ; aller se mettre à l'affût pour un gibier ; yì wù nú làn",
    "cat": "general"
  },
  "afin": {
    "fr": "afin",
    "fon": "afin de ; bó ná dó ; afin que ; bó nú ; nú",
    "cat": "general"
  },
  "âgé": {
    "fr": "âgé",
    "fon": "xó ; être âgé ; wà ɖaxó",
    "cat": "general"
  },
  "agenouillement": {
    "fr": "agenouillement",
    "fon": "kpolijijε",
    "cat": "spirituel_fa"
  },
  "agenouiller": {
    "fr": "agenouiller",
    "fon": "action de s'agenouiller ; kpolijijε ; s'agenouiller ; jε kpò ; jε kpolì ; s'agenouiller devant",
    "cat": "spirituel_fa"
  },
  "aggraver": {
    "fr": "aggraver",
    "fon": "s'aggraver ; jε... jĭ ; s'aggraver pour une maladie ; fɔCn adăn",
    "cat": "sante_tisane"
  },
  "agile": {
    "fr": "agile",
    "fon": "bìbí ; géwún ; mεbíbí ; yɛyɛC ; être agile ; ɖì wŭ ; dŏ acà",
    "cat": "general"
  },
  "agir": {
    "fr": "agir",
    "fon": "blŏ ; jɔBlù ; agir comme un enfant ; blŏ vĭ ; agir dans l'ombre ; wà yɛB mɛB nŭ ; agir selon ce qu'on dit",
    "cat": "famille_societe"
  },
  "bldéjí": {
    "fr": "blŏ d’é jí",
    "fon": "blŏ do é jí ; façon d'agir de dieu ; măwùnyìnyí ; manière d'agir ; nùwálɔB",
    "cat": "spirituel_fa"
  },
  "j": {
    "fr": "jĭ",
    "fon": "agrandir en longueur ; dŏ gà... jĭ ; agrandir par mégarde ; vlán",
    "cat": "general"
  },
  "aguet": {
    "fr": "aguet",
    "fon": "être au aguets ; xɔC",
    "cat": "general"
  },
  "ah": {
    "fr": "ah !",
    "fon": "kóoyì ; kóyì ; yĕgè ; ah çà ! ; cáyì!",
    "cat": "general"
  },
  "ahuri": {
    "fr": "ahuri",
    "fon": "yɛyinɔB ; yeyunɔB",
    "cat": "general"
  },
  "aide": {
    "fr": "aide",
    "fon": "alɔdidó ; alɔdó ; alɔdómε ; alɔdómεtɔC ; alɔdotɔC ; alɔdudó ; kpε ; aide du bourreau ; mìgánví",
    "cat": "nature_monde"
  },
  "aider": {
    "fr": "aider",
    "fon": "dŏ alɔB mε ; aider à charger sur la tête ; ɖìɖă ɖŏ ta ; aider à décharger un fardeau ; zlɔHn ; zlɔHn",
    "cat": "sante_tisane"
  },
  "agbàn": {
    "fr": "agbàn",
    "fon": "aider à mettre une charge sur la tête ; ɖìɖá agbàn ; aider quelqu'un ; dŏ alɔB mε",
    "cat": "sante_tisane"
  },
  "aïe": {
    "fr": "aïe",
    "fon": "yĭgíì ; yúgwíì ; yĕgè ; cĭgì ; yágáyì ; yĭgì ; aïe aïe ! ; yĭgíì ; yúgwíì",
    "cat": "general"
  },
  "aïeul": {
    "fr": "aïeul",
    "fon": "les aïeux ; viva",
    "cat": "general"
  },
  "aigle": {
    "fr": "aigle",
    "fon": "hɔHn ; hɔnsúhɔCnsú",
    "cat": "general"
  },
  "aigre": {
    "fr": "aigre",
    "fon": "aigre pour la viande ou du poisson ; mùmú ; être aigre ; vεH ; être aigre ; vεH sìn",
    "cat": "nature_monde"
  },
  "aigu": {
    "fr": "aigu",
    "fon": "xwíɖíxwíɖí ; être aigu ; wìnní ; xwíɖí",
    "cat": "general"
  },
  "ail": {
    "fr": "ail",
    "fon": "áyò",
    "cat": "general"
  },
  "aile": {
    "fr": "aile",
    "fon": "awà ; aile d'oiseau ; xɛwà",
    "cat": "nature_monde"
  },
  "aimé": {
    "fr": "aimé",
    "fon": "vεná ; bien-aimé ; vεnàvεnà ; mεɖubomì",
    "cat": "general"
  },
  "aimer": {
    "fr": "aimer",
    "fon": "aimer à faire le bien ; nyɔH xomɛB dŏ mɛ wŭ ; aimer la parure ; ɖŏ acɔC ; aimer la propreté ; zìn wŭ",
    "cat": "general"
  },
  "aine": {
    "fr": "aine",
    "fon": "asámε ; sεlì",
    "cat": "general"
  },
  "aîné": {
    "fr": "aîné",
    "fon": "mεxó ; nukɔngbeví ; nukɔnví ; aînée des femmes de la maison ; táà ; aînée des femmes de la",
    "cat": "famille_societe"
  },
  "ainsi": {
    "fr": "ainsi",
    "fon": "lĕ ; mɔH ; mɔH ɖokpó ɔ ; mɔH… gbɔBn ; qu'il en soit ainsi ; amĭ!",
    "cat": "general"
  },
  "air": {
    "fr": "air",
    "fon": "jε ; air ; à l'air libre ; jɔhɔBn ; air frais ; jɔhɔn fífá ; air morbide ; kuncεεn ; air triste ; kuncεεn ; d'un",
    "cat": "general"
  },
  "aise": {
    "fr": "aise",
    "fon": "vivò ; vuvò ; à l'aise ; fεε ; être à l'aise ; vò ; être à l'aise (argent, biens) ; gèzé ; le fait de se trouver",
    "cat": "general"
  },
  "aisé": {
    "fr": "aisé",
    "fon": "être aisé ; fá",
    "cat": "general"
  },
  "alêne": {
    "fr": "alêne",
    "fon": "nùtɔCnnú",
    "cat": "general"
  },
  "algue": {
    "fr": "algue",
    "fon": "xugbehán",
    "cat": "general"
  },
  "aller": {
    "fr": "aller",
    "fon": "dăn hùn ; wă yì ; xwè ; yì ; zún dó ; aller ... pour ; xwè...gbé ; aller auprès de quelqu'un ; yì mε gɔHn",
    "cat": "general"
  },
  "xwè": {
    "fr": "xwè",
    "fon": "s'en aller ; xwè yì gbĕ ; va-et-vient ; jasísí",
    "cat": "general"
  },
  "alors": {
    "fr": "alors",
    "fon": "énε ; mɔɔB ; alors que l'on parle encore ; masɔCnúnyànyĭ",
    "cat": "general"
  },
  "alun": {
    "fr": "alun",
    "fon": "alun de potasse ; sindakεn",
    "cat": "general"
  },
  "amant": {
    "fr": "amant",
    "fon": "sìn ; xɔnnɔB",
    "cat": "general"
  },
  "âme": {
    "fr": "âme",
    "fon": "âme humaine ; lĭndɔHn ; wù ɖíɖí xomε kacà",
    "cat": "general"
  },
  "amen": {
    "fr": "amen",
    "fon": "amĭ",
    "cat": "general"
  },
  "amer": {
    "fr": "amer",
    "fon": "être amer ; vεH",
    "cat": "general"
  },
  "ami": {
    "fr": "ami",
    "fon": "agbohudó ; lù ; xɔCntɔBn ; ami à qui l'on peut tout dire ; ɖɔxátɔC ; ami cher ; xɔCntonsatɔC ; ami conjuré",
    "cat": "famille_societe"
  },
  "vodúnnúxcntbn": {
    "fr": "vodúnnúxɔcntɔbn",
    "fon": "ami d'enfance ; kpε xɔCntɔn ; ami du défunt venant en seconde position ; xɔCntɔn",
    "cat": "famille_societe"
  },
  "linsinmtbn": {
    "fr": "linsinmɛ tɔbn",
    "fon": "ami fidèle ; saxɔCntɔCn ; ami intime ; sà ; ami intime ; sálú ; ami intime considéré comme",
    "cat": "famille_societe"
  },
  "unfrère": {
    "fr": "un frère",
    "fon": "nɔví saxɔCntɔBn ; tɔCví saxɔCntɔBn ; ami lié par un pacte ; xɔCntɔn alε ; ami prêt à vous trahir",
    "cat": "famille_societe"
  },
  "êtreami": {
    "fr": "être ami",
    "fon": "nyí xɔCntɔBn ; nyĭ xɔCntɔBn ; un ami de deuxième main ; xɔCntɔn linsinmε tɔBn ; un ami de",
    "cat": "famille_societe"
  },
  "rencontre": {
    "fr": "rencontre",
    "fon": "xɔCntɔnsatɔC yayá ; un ami intime ; klíklí ; un ami quelconque ; xɔCntɔnsatɔC yayá",
    "cat": "famille_societe"
  },
  "amidon": {
    "fr": "amidon",
    "fon": "gɔHmà",
    "cat": "famille_societe"
  },
  "amincir": {
    "fr": "amincir",
    "fon": "blŏ ní wìnní",
    "cat": "famille_societe"
  },
  "amitié": {
    "fr": "amitié",
    "fon": "mεmε ; xɔCntɔCnnyínyí ; amitié conclue ; xɔCntɔCnzúnzún ; amitié liée par le pacte du sang",
    "cat": "famille_societe"
  },
  "alnùxcntbn": {
    "fr": "alεnùxɔcntɔbn",
    "fon": "être en amitié avec quelqu'un ; ɖò xɔCntɔBn mɛB xá mɛ ; faire amitié ; jε xɔCntɔBn ; le fait de",
    "cat": "famille_societe"
  },
  "amour": {
    "fr": "amour",
    "fon": "wànyìyí ; marque d'amour ; heɖiɖó ; marque d'amour ; heɖuɖó",
    "cat": "general"
  },
  "ample": {
    "fr": "ample",
    "fon": "ɖoyaɖoyà ; gblayaà ; gblayagblayà ; gblògbló ; hloyaà ; très ample ; vuyavuyà ; woyawoya ; zɛɛB",
    "cat": "general"
  },
  "amulette": {
    "fr": "amulette",
    "fon": "bŏ ; flă ; tílà ; amulette de défense ; nùɖíɖá ; amulette des femmes enceintes ; xokan",
    "cat": "sante_tisane"
  },
  "an": {
    "fr": "an",
    "fon": "l'an prochain ; xwe e jàwé ɔC ; le jour de l'an ; xwe kpíkpé ; le jour de l'an ; xwè yà-ɖéyaɖé ; xwè yɔByɔC",
    "cat": "general"
  },
  "ancêtre": {
    "fr": "ancêtre",
    "fon": "tɔCgbó ; ancêtre des familles d’alada, abomey, et porto-novo ; agasú ; ancêtre protecteur d'une",
    "cat": "spirituel_fa"
  },
  "personne": {
    "fr": "personne",
    "fon": "jɔtɔC ; les ancêtres ; kpɔlí ; les ancêtres de la famille ; viva ; les ancêtres les plus reculés",
    "cat": "spirituel_fa"
  },
  "kplíkplí": {
    "fr": "kpɔlíkpɔlí",
    "fon": "les grands ancêtres ; tɔCgbó tɔCgbó",
    "cat": "spirituel_fa"
  },
  "âne": {
    "fr": "âne",
    "fon": "kεtεkεtε ; sɔC kεtεkεtε ; tócí",
    "cat": "general"
  },
  "anéantir": {
    "fr": "anéantir",
    "fon": "gbà ; gbà bĭ ; vìvá ; anéantir une famille ; sú kún dŏ",
    "cat": "famille_societe"
  },
  "ange": {
    "fr": "ange",
    "fon": "wɛnsagùn ; ange gardien ; alɔnus ε C",
    "cat": "general"
  },
  "angle": {
    "fr": "angle",
    "fon": "gogwè ; gwegwè ; nùgblágɔCdɔC ; zoè ; zwè ; dans l'angle intérieur ; zwe mɛB ; sur l'angle extérieur",
    "cat": "general"
  },
  "année": {
    "fr": "année",
    "fon": "xwè ; année passée ; lĕxwlĕ ; année prochaine ; lĕxwlĕ ; au cours de cette année ; é xwe è",
    "cat": "general"
  },
  "ay": {
    "fr": "ayĭ",
    "fon": "annoncer à travers le pays ; ɖŏ gan gbɔn tomε ; annoncer au son du gong ; ɖŏ gàn ; annoncer une",
    "cat": "general"
  },
  "anone": {
    "fr": "anone",
    "fon": "nyĭglŏ ; nyĭgwlĕ",
    "cat": "general"
  },
  "anse": {
    "fr": "anse",
    "fon": "awà ; hεntεn ; l’anse du seau ; sóo sín awà",
    "cat": "nature_monde"
  },
  "anus": {
    "fr": "anus",
    "fon": "adajεlinu ; adayigò ; adigwè ; mĭgò ; migomε ; tɔCntɔCngbɔnlín ; yonu ; à l'anus ; migomε",
    "cat": "general"
  },
  "août": {
    "fr": "août",
    "fon": "avivɔsùn",
    "cat": "general"
  },
  "appel": {
    "fr": "appel",
    "fon": "ylɔH ; appel au secours ; axwá ; faire appel à ; ylɔH nyikɔC ; faire l'appel ; ylɔH nyikɔC",
    "cat": "general"
  },
  "appellation": {
    "fr": "appellation",
    "fon": "appellation administrative d'un groupe ethnique ; mina ; appellation de l'initiée lors de la",
    "cat": "spirituel_fa"
  },
  "sá": {
    "fr": "sá",
    "fon": "s'appliquer à ; ɖŏ è wŭ ; dŏ găn dŏ... wŭ ; syεn wŭ ; s'appliquer à quelque chose ; ɖò... wŭ",
    "cat": "general"
  },
  "approcher": {
    "fr": "approcher",
    "fon": "sε wă ; sε wă nukɔBn ; wă gbɔBn ; wă nukɔBn ; approcher de ; yă ; approcher familièrement",
    "cat": "famille_societe"
  },
  "lìyá": {
    "fr": "lìyá",
    "fon": "approcher le bois du feu ; sε myɔB dŏ ; s'approcher ; sɛB wă ; sε yă",
    "cat": "general"
  },
  "appui": {
    "fr": "appui",
    "fon": "gànjεwú ; sosyεn ; sosyεnnú ; ce qui sert d'appui pour marcher ; zɔndewú",
    "cat": "general"
  },
  "jnm": {
    "fr": "jε nŭ mε",
    "fon": "appuyer dessus ; zĭn d'é jĭ ; appuyer du doigt, de la main, du pied ; tε ; appuyer la proposition",
    "cat": "general"
  },
  "âpre": {
    "fr": "âpre",
    "fon": "kpákpá ; être âpre ; wlĭ ɖεH",
    "cat": "general"
  },
  "après": {
    "fr": "après",
    "fon": "après lui ; gùdó tɔBn ; après moi ; gùdó cè ; après que ; gŭdò ; après-demain ; azăn'tɔn gbè",
    "cat": "general"
  },
  "apte": {
    "fr": "apte",
    "fon": "être apte ; nyɔH ; sɔBxú",
    "cat": "general"
  },
  "arabe": {
    "fr": "arabe",
    "fon": "malεgbè ; malεnugbè",
    "cat": "general"
  },
  "arbre": {
    "fr": "arbre",
    "fon": "arbre à baies noires comestibles ; fɔntín ; arbre à caoutchouc ; lɔHbatín ; arbre à encens ; zatín",
    "cat": "nature_monde"
  },
  "dur": {
    "fr": "dur",
    "fon": "kákεtín ; arbre aux des fleurs rouges ; aɖàɖá ; arbre aux larges feuilles ; wutín ; arbre cola",
    "cat": "nature_monde"
  },
  "marché": {
    "fr": "marché",
    "fon": "gbagbaɖà ; les arbres ; atín lε ; tout arbre pouvant servir à préparer des remèdes ; atínkεntín",
    "cat": "sante_tisane"
  },
  "arc": {
    "fr": "arc",
    "fon": "daswé ; gă ; katawunkpé ; katawunkpò ; bander l'arc ; tlɔC katawunkpé",
    "cat": "general"
  },
  "arche": {
    "fr": "arche",
    "fon": "arche d'alliance ; akɔjijεgbá",
    "cat": "general"
  },
  "ardu": {
    "fr": "ardu",
    "fon": "être ardu ; vεH wŭ",
    "cat": "general"
  },
  "arête": {
    "fr": "arête",
    "fon": "xú",
    "cat": "general"
  },
  "laviolationdunpacte": {
    "fr": "la violation d'un pacte",
    "fon": "lεkwε ; argent que le défunt prévoit pour entrer chez les ancêtres ; degbokwε",
    "cat": "spirituel_fa"
  },
  "arme": {
    "fr": "arme",
    "fon": "ahwanfunnú ; arme de guerre ; ahwanfunnú",
    "cat": "general"
  },
  "armée": {
    "fr": "armée",
    "fon": "ahwàn",
    "cat": "general"
  },
  "arqué": {
    "fr": "arqué",
    "fon": "xíxá ; aux jambes arquées ; wlɛkɛCtɛC ; xá d'ásá ; xá dŏ ásá ; celui qui a des jambes arquées",
    "cat": "general"
  },
  "dent": {
    "fr": "dent",
    "fon": "ɖè àɖŭ ; sún àɖŭ ; arracher ; arracher violemment ; gbì ; arracher violemment ; klɔCn ; le fait",
    "cat": "general"
  },
  "tissu": {
    "fr": "tissu",
    "fon": "fɔB tó ; arranger le rebord d'un tissu ; xò tó ; arranger le rebord d'un travail ; xò tó ; arranger les",
    "cat": "general"
  },
  "cheveux": {
    "fr": "cheveux",
    "fon": "xò ɖà ; arranger les cheveux avec art ; gin ɖà ; arranger les cheveux pour une femme ; tε ɖà",
    "cat": "famille_societe"
  },
  "arrêt": {
    "fr": "arrêt",
    "fon": "alɔɖótè",
    "cat": "general"
  },
  "art": {
    "fr": "art",
    "fon": "àcɔC ; art culinaire ; nùɖíɖá ; nùɖúɖúɖíɖá ; art du voyant ; mwεn",
    "cat": "general"
  },
  "goflm": {
    "fr": "goflεmε",
    "fon": "l'articulation de la main ; alɔgoflεmε",
    "cat": "general"
  },
  "assez": {
    "fr": "assez",
    "fon": "en avoir assez ; kpéké kɔB nú mε ; être assez ; kpé",
    "cat": "general"
  },
  "assis": {
    "fr": "assis",
    "fon": "bien assis ; kpé adò ; la position assise ; ayìjínjɔCn ; ayìjúnjɔCn ; le fait d’être assis ; ayìjínjɔCn",
    "cat": "general"
  },
  "assistance": {
    "fr": "assistance",
    "fon": "assistance à une femme qui accouche ; ajininɔB",
    "cat": "famille_societe"
  },
  "atour": {
    "fr": "atour",
    "fon": "vivanú ; atours ; àcɔCbánú ; àcɔCnú",
    "cat": "general"
  },
  "corde": {
    "fr": "corde",
    "fon": "blă dŏ kàn mε ; attacher de l’importance à ; kíyà ; kéyà ; attacher des lattes avec des lianes",
    "cat": "general"
  },
  "tldmw": {
    "fr": "-tlε dŏ mε wŭ",
    "fon": "s'attacher de façon indéfectible à ; kpεnzɔBn",
    "cat": "general"
  },
  "kpcnm": {
    "fr": "kpɔcn mε",
    "fon": "ɖŏ nukún mε ; nɔB té kpɔCn mε ; celui qui peut attendre longtemps pour profiter de la",
    "cat": "general"
  },
  "nourriturequonprépare": {
    "fr": "nourriture qu'on prépare",
    "fon": "nùhwεntɔC ; le fait d'attendre pour écouter le discour ; tóɖómε ; une femme",
    "cat": "famille_societe"
  },
  "quiattendunenfant": {
    "fr": "qui attend un enfant",
    "fon": "nukúnnɔB",
    "cat": "famille_societe"
  },
  "ayìtè": {
    "fr": "-ɖŏ ayì tè",
    "fon": "sè tónú ; kpé nukún wŭ ; le fait d'être attentif ; tójínúnɔC",
    "cat": "general"
  },
  "nylnd": {
    "fr": "nylăn dŏ",
    "fon": "attirer les gens ; dɔBn mε ; attirer quelqu'un à soi ; dɔBn mε dŏ wŭ ; attiser la bagarre ; klɔC hùn",
    "cat": "general"
  },
  "d": {
    "fr": "dŏ",
    "fon": "attiser le feu ; sε myɔB dŏ ; attiser les différends ; klɔC nŭ dŏ ; celui qui se plaît à attiser les différends",
    "cat": "general"
  },
  "aube": {
    "fr": "aube",
    "fon": "ayìhínhɔCn ; ayìhúnhɔCn ; à l'aube ; zànfɔCnnú",
    "cat": "general"
  },
  "aucun": {
    "fr": "aucun",
    "fon": "ɖĕbŭ ă ; ɖokpó... ă ; mε tí... ă",
    "cat": "general"
  },
  "auge": {
    "fr": "auge",
    "fon": "tò ; auge de maçon ; xɔtlεtɔC gbă ; auge pour piler les amandes de palme ; dĕtò ; augmentation",
    "cat": "general"
  },
  "chose": {
    "fr": "chose",
    "fon": "dŏ kwε nŭ jĭ",
    "cat": "general"
  },
  "aussi": {
    "fr": "aussi",
    "fon": "ké ; kpódó... kpán ; lɔHC ; lɔɔC ; lɔlɔC ; lɔlɔC mɔH ; mɔH ; mɔBké ; aussi que ; kpódó... kpán",
    "cat": "general"
  },
  "autel": {
    "fr": "autel",
    "fon": "vɔBsákpè ; autel consacré à un vaudoun ; zŭn ; autel du vaudoun du courage ; adànzún ; autel",
    "cat": "spirituel_fa"
  },
  "génie": {
    "fr": "génie",
    "fon": "bokɔCnɔC s’ánsεεn ; autel portatif pour consulter le génie ; fásεn ; autel portatif pour le culte du",
    "cat": "general"
  },
  "gbta": {
    "fr": "gbăta",
    "fon": "autel portatif spécial ; sonusεεn ; boule unissant la tige d'un autel portatif à sa partie supérieure",
    "cat": "general"
  },
  "kò": {
    "fr": "kò",
    "fon": "sorte d'autel portatif ; asεεn",
    "cat": "general"
  },
  "nùvdómtc": {
    "fr": "nùvεdómεtɔc",
    "fon": "auteur et source de la vie (un dieu) ; gbεɖàsínánɔB",
    "cat": "spirituel_fa"
  },
  "autre": {
    "fr": "autre",
    "fon": "ɖĕvo ; vò ; à une autre fois ; é sù hweɖénu ; autre lieu ; agɔHn ; autre part ; fí ɖĕvo ; tεn ɖĕvo",
    "cat": "general"
  },
  "vom": {
    "fr": "ɖĕvo mε",
    "fon": "une autre année ; xwè ɖĕvo mɛB ; une autre fois ; azɔBn ɖébŭ ; hwe ɖĕvo nu ; nεbɔH ; une autre",
    "cat": "general"
  },
  "avaler": {
    "fr": "avaler",
    "fon": "mì ; nù ; action d'avaler ; mimi ; avaler le poison d'épreuve ; nù aɖĭ ; avaler sans croquer",
    "cat": "sante_tisane"
  },
  "glwgw": {
    "fr": "glwĭgwε",
    "fon": "avaler un comprimé ; mì atínkεn ; qu'on avale facilement sans mâcher ; xwlitì",
    "cat": "general"
  },
  "avant": {
    "fr": "avant",
    "fon": "azɔHnlìn ; avant de ; có bó ; có bó ná ; avant le temps ; hwenumasu ; avant l'heure de midi ; káká",
    "cat": "general"
  },
  "avare": {
    "fr": "avare",
    "fon": "gwèɖítɔC ; gwĕnɔB ; nùvεtɔC ; wɔBnwínnɔB ; être avare ; ɖì gwĕ ; kú wɔBnwín ; vε nŭ",
    "cat": "general"
  },
  "avec": {
    "fr": "avec",
    "fon": "dŏ... jĭ ; kpódó... kpán ; ná ; xá ; être avec ; ɖò... jĭ",
    "cat": "general"
  },
  "avent": {
    "fr": "avent",
    "fon": "avent (dans la liturgie chrétienne) ; tenɔkpɔCn wìwá aklúnɔ tɔn sín hwenu",
    "cat": "general"
  },
  "dlhm": {
    "fr": "dlɔh mɛ",
    "fon": "celui qui vient avertir quelqu'un en cachette ; jànnŭjànnŭ",
    "cat": "general"
  },
  "aveu": {
    "fr": "aveu",
    "fon": "hwεɖiɖɔ ; linlɔn ; aveu d’adultère ; asúxíxá ; aveu de ses péchés ; hwεɖiɖɔ",
    "cat": "general"
  },
  "nukún": {
    "fr": "nukún",
    "fon": "aveugler quelqu'un ; và nukún nú mε ; xò avivì dŏ mε ; être aveugle ; tɔCn nukún ; và nukún",
    "cat": "general"
  },
  "avide": {
    "fr": "avide",
    "fon": "dŏ nukúnkεn ; nukúnklóklónɔB ; nukúnkεnnɔB ; être avide de gloire ; ba susù",
    "cat": "general"
  },
  "avion": {
    "fr": "avion",
    "fon": "jɔmεhún ; jìhún ; aller en avion ; dŏ jomεhún ; avion militaire ; ahwànhŭn",
    "cat": "general"
  },
  "avoir": {
    "fr": "avoir",
    "fon": "ɖŏ ; ɖŏ así ; ɖò àsí mεɖé tɔBn ; tíìn ; avoir à ; b'á dó ; tín ; tout l'avoir de quelqu'un ; ka kpó gò kpó",
    "cat": "general"
  },
  "femmes": {
    "fr": "femmes",
    "fon": "gblé xô ; avortement provoqué ; xoɖiɖe",
    "cat": "famille_societe"
  },
  "avorter": {
    "fr": "avorter",
    "fon": "gblĕ adɔgò ; gblĕ xò ; avorter (pour les animaux) ; lùn vĭ ; avorter (pour les femmes) ; gblé xò",
    "cat": "sante_tisane"
  },
  "bac": {
    "fr": "bac",
    "fon": "bac (bateau qui traverse le fleuve) ; tɔgbohún",
    "cat": "nature_monde"
  },
  "bâclé": {
    "fr": "bâclé",
    "fon": "nyamanyama ; faire un travail bâclé ; wà dŏ akpò",
    "cat": "general"
  },
  "bague": {
    "fr": "bague",
    "fon": "alɔganví ; alɔkε",
    "cat": "general"
  },
  "túcwn": {
    "fr": "-túcwεn",
    "fon": "baguette dépouillée de ses feuilles ; balúmε ; baguette employée pour la divination ; lɔnflεn",
    "cat": "nature_monde"
  },
  "baie": {
    "fr": "baie",
    "fon": "atínsínsεn",
    "cat": "general"
  },
  "baigner": {
    "fr": "baigner",
    "fon": "lε ; se baigner ; lε wŭ ; se baigner avec des médicaments (des plantes) ; lε amasìn",
    "cat": "sante_tisane"
  },
  "bain": {
    "fr": "bain",
    "fon": "lilε ; wùlílε ; bain rituel des adeptes du génie ; fálílε",
    "cat": "general"
  },
  "baisser": {
    "fr": "baisser",
    "fon": "dŏ dò ; yì dò ; zĕ dŏ dò ; zĕ wă dò ; zĕ yi dà ; baisser la tête ; dŏ kɔB dò ; dŏ ta dò ; baisser la tête",
    "cat": "sante_tisane"
  },
  "bal": {
    "fr": "bal",
    "fon": "wè ; weɖuɖú",
    "cat": "general"
  },
  "balai": {
    "fr": "balai",
    "fon": "akízà ; sorte de balai ; xá",
    "cat": "general"
  },
  "balancer": {
    "fr": "balancer",
    "fon": "mì ; action de balancer ; mimi ; balancer la tête ; xò kɔB ; balancer les bras ; mì awà ; se",
    "cat": "sante_tisane"
  },
  "balle": {
    "fr": "balle",
    "fon": "bɔHlù ; kpεn ; sokpεn ; túkpεn",
    "cat": "general"
  },
  "ballonné": {
    "fr": "ballonné",
    "fon": "bìsésé ; bitiì ; avoir le ventre ballonné ; gò hŭn mε ; segeè",
    "cat": "sante_tisane"
  },
  "ballonnementduventre": {
    "fr": "ballonnement du ventre",
    "fon": "gohúnmε",
    "cat": "sante_tisane"
  },
  "banal": {
    "fr": "banal",
    "fon": "yàyá",
    "cat": "general"
  },
  "banc": {
    "fr": "banc",
    "fon": "xwlɛzinkpò ; zinkpò",
    "cat": "general"
  },
  "bande": {
    "fr": "bande",
    "fon": "bande pour pansement ; akpablanú ; akpablávɔB",
    "cat": "general"
  },
  "barbe": {
    "fr": "barbe",
    "fon": "atán ; gbakɔtán ; barbe de maïs ; gbadé ɖà",
    "cat": "general"
  },
  "barbu": {
    "fr": "barbu",
    "fon": "atánnɔB",
    "cat": "general"
  },
  "barre": {
    "fr": "barre",
    "fon": "barre de fer ; gankpotín",
    "cat": "general"
  },
  "bas": {
    "fr": "bas",
    "fon": "afɔgódé ; à voix basse ; xísíxísí ; xlíxlí ; aller en bas ; yì dò ; au bas ; ɖŏ dò ; glɔH ; ɖò dò ; désigne",
    "cat": "general"
  },
  "bâtir": {
    "fr": "bâtir",
    "fon": "gbă ; mε ; bâtir solidement ; lĭ ; bâtir un nid ; wà àdɔH ; bâtir un nid ; xò adɔH ; bâtir une case ; gbă",
    "cat": "general"
  },
  "xb": {
    "fr": "xɔb",
    "fon": "bâtir une maison ; sá xwé ; celui qui bâtit des murs ; dòmεtɔC",
    "cat": "general"
  },
  "bâton": {
    "fr": "bâton",
    "fon": "kpò ; bâton à grosse tête ; kpota ; bâton armé de fer pour la chasse ; adovwé ; bàkpé ; bâton",
    "cat": "sante_tisane"
  },
  "kpc": {
    "fr": "kpɛc",
    "fon": "battre la campagne ; xò gbĕ ; battre le tambour ; xò hŭn ; battre quelqu’un avec une verge ; ɖù bă",
    "cat": "general"
  },
  "battu": {
    "fr": "battu",
    "fon": "être battu avec une verge ; ɖŏ bă nú mε",
    "cat": "general"
  },
  "bave": {
    "fr": "bave",
    "fon": "àfúntúnkplɔH ; dɔB ; dε ; bave gluante ; dεhɔC",
    "cat": "general"
  },
  "bavé": {
    "fr": "bavé",
    "fon": "tún afúntúnkplɔH",
    "cat": "general"
  },
  "baver": {
    "fr": "baver",
    "fon": "lùlú dε ; lùn dε ; tún afúntúnkplɔC ; action de baver ; dεlunlùn",
    "cat": "general"
  },
  "béant": {
    "fr": "béant",
    "fon": "vlolò",
    "cat": "general"
  },
  "beau": {
    "fr": "beau",
    "fon": "ɖεkpε ; être beau ; nyɔH ɖεkpε ; nyɔH kún ; nyɔH kún ; être beau (pour une chose) ; fɛC wŭ ; faire le",
    "cat": "nature_monde"
  },
  "taala": {
    "fr": "-taala",
    "fon": "talala ; tlala ; tobútobú ; tεεn ; vò ; vonyà ; wɔBblíbà ; wɔBbúwɔCbú ; wosuwosù ; wutuwutù ; yoò ; avoir",
    "cat": "general"
  },
  "beaufrère": {
    "fr": "beau-frère",
    "fon": "nyɔHwεn",
    "cat": "famille_societe"
  },
  "bébé": {
    "fr": "bébé",
    "fon": "yɛByɛC ; yɛByɛBví ; faire le bébé ; ɖɔB yεyε ; ɖŏ vεjε",
    "cat": "general"
  },
  "bec": {
    "fr": "bec",
    "fon": "bănkì",
    "cat": "general"
  },
  "bègue": {
    "fr": "bègue",
    "fon": "ɖεkúkúnɔB ; ɖεkúnɔB ; ɖεtítεnɔB",
    "cat": "general"
  },
  "dokc": {
    "fr": "-dokɔc",
    "fon": "beignet ; beignet de maïs ; ganví ; beignet de maïs ; klεklε ; măsà ; aklà ; beignet de maïs sec",
    "cat": "general"
  },
  "bêler": {
    "fr": "bêler",
    "fon": "fàn",
    "cat": "general"
  },
  "belle": {
    "fr": "belle",
    "fon": "belle jeune fille ; sinsinmilisìn",
    "cat": "general"
  },
  "bénédiction": {
    "fr": "bénédiction",
    "fon": "ɖεxixo ; fífá ; afɔfún hwà, alɔfún hwà ; bénédiction du saint-sacrement ; abεsánwùn",
    "cat": "spirituel_fa"
  },
  "bénir": {
    "fr": "bénir",
    "fon": "bénir quelqu’un ; xò ɖε dŏ... jĭ ; xò ɖɛB nú mɛ ; bénir quelque chose ; xò ɖε dŏ... jĭ",
    "cat": "general"
  },
  "benjamin": {
    "fr": "benjamin",
    "fon": "kpodoví ; benjamin ; le benjamin ; kpodé ; kpodwé ; vĭ kpodé",
    "cat": "famille_societe"
  },
  "bercer": {
    "fr": "bercer",
    "fon": "bercer un enfant ; tε vĭ",
    "cat": "famille_societe"
  },
  "bête": {
    "fr": "bête",
    "fon": "kanlìn ; yɛjɛɛB ; yɛjɛyɛjɛB ; bête sauvage ; gbèmεlán ; une bête (serpent insecte ver microbe)",
    "cat": "nature_monde"
  },
  "biais": {
    "fr": "biais",
    "fon": "de biais ; ajaxlaxú",
    "cat": "general"
  },
  "bible": {
    "fr": "bible",
    "fon": "alinzɔn wemá ; yɛhwewemá",
    "cat": "general"
  },
  "biche": {
    "fr": "biche",
    "fon": "biche cochon ; gbɔH lewé ; tεklí lèwĕ",
    "cat": "general"
  },
  "bidon": {
    "fr": "bidon",
    "fon": "bidon d'huile ; amigbá",
    "cat": "famille_societe"
  },
  "bien": {
    "fr": "bien",
    "fon": "céké céké ; ɖagbè ; déwúndéwún ; nyɔBná ; páá ; sɔB gbè ; aller bien ; fɔCn ; jε mε ; bien-être ; gedemε",
    "cat": "general"
  },
  "tc": {
    "fr": "tɛc",
    "fon": "être bien réussi ; jε àcɔ ; être bien vivant ; nɔB gbε ; faire le bien ; wà ɖagbè ; se bien porter ; ɖŏ",
    "cat": "general"
  },
  "agbe": {
    "fr": "ɖagbe",
    "fon": "mɔB lanmε ; mɔB lanmε syεnsyεn ; très bien ; cánwún ; ɖagbeɖagbè ; ɖŏ ganjí ; géwúngéwún",
    "cat": "general"
  },
  "biens": {
    "fr": "biens",
    "fon": "nùnyɔBná",
    "cat": "general"
  },
  "bière": {
    "fr": "bière",
    "fon": "bĭ ; bière de maïs ; cakpálò ; gbadé ahàn ; gbadéhàn ; bière de mil ; cakpálò ; dóló ; bière de mil",
    "cat": "general"
  },
  "lihàn": {
    "fr": "lihàn",
    "fon": "bière de sorgho ; abɔBhàn ; bière glacée ; byă glăsì",
    "cat": "general"
  },
  "bijou": {
    "fr": "bijou",
    "fon": "ganví",
    "cat": "general"
  },
  "bile": {
    "fr": "bile",
    "fon": "adanvε ; dεhɔC",
    "cat": "general"
  },
  "bille": {
    "fr": "bille",
    "fon": "kwín",
    "cat": "general"
  },
  "blanc": {
    "fr": "blanc",
    "fon": "aklamεnù ; awumεnù ; wèwé ; être blanc ; wĕ ; un Blanc ; yovó ; zojagĕ",
    "cat": "general"
  },
  "blasphème": {
    "fr": "blasphème",
    "fon": "nunylanylá ; blasphème contre dieu ; nunylánylá dó măwù wù",
    "cat": "spirituel_fa"
  },
  "blessure": {
    "fr": "blessure",
    "fon": "akpà ; wùgbìgblé ; wùgblègblé ; avoir des blessures à la bouche ; gbà nu ; blessure d'un coup",
    "cat": "sante_tisane"
  },
  "bleu": {
    "fr": "bleu",
    "fon": "àféfé ; fεsínnɔB ; bleu d'espagne ; blɔH ; fε ; la couleur bleue ; fε ; fε sìn",
    "cat": "general"
  },
  "bloc": {
    "fr": "bloc",
    "fon": "bloc latéritique ; awĭnya klagbaja ; klagbaja",
    "cat": "general"
  },
  "boeuf": {
    "fr": "boeuf",
    "fon": "nyì ; nyibú ; nyìbú sísá ; nyibúsú",
    "cat": "general"
  },
  "boire": {
    "fr": "boire",
    "fon": "nù ; nù nŭ ; nù sìn ; action de boire ; nunu ; action de boire de l'eau ; sin nunu ; action de boire le",
    "cat": "nature_monde"
  },
  "poisondépreuve": {
    "fr": "poison d'épreuve",
    "fon": "vodùn nunu ; action de boire le vaudoun pour contracter le pacte du sang",
    "cat": "sante_tisane"
  },
  "boiredelalcool": {
    "fr": "boire de l'alcool",
    "fon": "blă ; boire le poison d'épreuve ; nù aɖĭ ; nù vodún ; boire l'eau du vaudoun ; nù",
    "cat": "sante_tisane"
  },
  "bois": {
    "fr": "bois",
    "fon": "atín ; atínkánmε ; zunkàn ; bois blanc ; atín wɔvlì ; bois de chauffage ; nakí ; bois de chauffage",
    "cat": "general"
  },
  "alánb": {
    "fr": "alánɔb",
    "fon": "atín avlatótwe ; bois jaune employé pour faire des cure-dents ; zeɖù ; bois pour montrer le",
    "cat": "general"
  },
  "aciná": {
    "fr": "aciná",
    "fon": "bois rouge très dur ; afuntín ; kákε ; bois sacré de fà ; fázùn ; bois sec ; nakí xúxú ; bois travaillé",
    "cat": "spirituel_fa"
  },
  "boîte": {
    "fr": "boîte",
    "fon": "gangbá ; gbă ; boîte à craie ; hwè gbá ; boîte à savon ; àɖìká ; boîte à tabac ; azɔgbaví ; boite",
    "cat": "general"
  },
  "fer": {
    "fr": "fer",
    "fon": "gannúví ; boiter momentanément ; tɔBn",
    "cat": "general"
  },
  "bol": {
    "fr": "bol",
    "fon": "sinkɔCgbεn ; bol pour manger ; nùɖúgánnú",
    "cat": "general"
  },
  "bombé": {
    "fr": "bombé",
    "fon": "bitibitiì ; bεnú ; gawùn ; gɔɖɔɖɔB ; bombé (front) ; nεwùn",
    "cat": "general"
  },
  "bon": {
    "fr": "bon",
    "fon": "ɖagbè ; xomɛfífánɔB ; être bon ; fá xomɛB ; nyɔH ; nyɔC ɖagbè ; nyɔH xomɛB ; nyɔH xomε ; vìví ; être bon",
    "cat": "general"
  },
  "bond": {
    "fr": "bond",
    "fon": "linlɔHn ; lunlɔCn",
    "cat": "general"
  },
  "bonté": {
    "fr": "bonté",
    "fon": "jijɔnyinyɔC ; mεdɔndówŭ ; nyìnyɔC ; nyùnyɔC ; xomɛfífá ; xomɛnyinyɔC ; xomɛnyunyɔC",
    "cat": "general"
  },
  "bord": {
    "fr": "bord",
    "fon": "àkpá ; kpá ; nu ; ta ; tó ; au bord de ; nu ; au bord de l'eau ; tɔB ɔB tó ; tɔkpá ; tɔnu ; au bord de l'étang",
    "cat": "nature_monde"
  },
  "tántá": {
    "fr": "tántá",
    "fon": "au bord du chemin ; alikpá ; au bord du marigot ; tánnú ; au bord du trou ; kɔCdónú ; bord de la",
    "cat": "famille_societe"
  },
  "mer": {
    "fr": "mer",
    "fon": "xutó ; xúta ; le bord de la mer ; xù tó ; bord d'un habit ; yaɖà ; bord d'un lac ; tɔtó ; bord d'un toit",
    "cat": "general"
  },
  "borne": {
    "fr": "borne",
    "fon": "piláa ; borne kilométrique ; alijlεtín",
    "cat": "general"
  },
  "bosse": {
    "fr": "bosse",
    "fon": "gŏ ; kpó ; avoir des bosses ; wŭ gŏ ; bosses et creux ; kpó ɖĕ dò ɖĕ ; celui qui a une bosse ; gŏnɔB",
    "cat": "general"
  },
  "bossu": {
    "fr": "bossu",
    "fon": "kpótɔCnɔB",
    "cat": "general"
  },
  "botte": {
    "fr": "botte",
    "fon": "danmaɖù ; danmalyá",
    "cat": "general"
  },
  "boubou": {
    "fr": "boubou",
    "fon": "bowunbá ; kamizáà ; sorte de boubou sans manches ; ɖawùncíkí ; sorte de boubou très ample",
    "cat": "famille_societe"
  },
  "bouc": {
    "fr": "bouc",
    "fon": "gbàgbá ; gbɔH asú ; gbɔH sú ; espèce de bouc sauvage ; axé",
    "cat": "general"
  },
  "boue": {
    "fr": "boue",
    "fon": "adù ; adùn ; baà ; boue noirâtre des marécages ; bɔH",
    "cat": "general"
  },
  "palme": {
    "fr": "palme",
    "fon": "dèɖàtɔC ; faire bouillir l'arachide ; ɖà aziín",
    "cat": "general"
  },
  "boule": {
    "fr": "boule",
    "fon": "gbŏ ; mlìmlí ; nùmlìmlí ; action de mettre en boules ; mlìmlí ; en boule ; kuù ; lógwé ; en gosse",
    "cat": "general"
  },
  "bouse": {
    "fr": "bouse",
    "fon": "bouse de vache ; nyìbú mĭ ; nyimí",
    "cat": "general"
  },
  "bout": {
    "fr": "bout",
    "fon": "kò ; nu ; nuvínu ; ta ; tó ; vivɔnu ; vuvɔnu ; au bout ; kpoɖó ; kpoɖokpóɖó ; nu ; vuvɔnu ; au bout de",
    "cat": "general"
  },
  "fnú": {
    "fr": "fεnú",
    "fon": "celui qui est au bout ; mε e ɖò tó lé jí ; du bout des doigts ; cébée ; du bout des doigts ; cεbεε ; le",
    "cat": "general"
  },
  "pied": {
    "fr": "pied",
    "fon": "afɔnu",
    "cat": "general"
  },
  "bovin": {
    "fr": "bovin",
    "fon": "nyibú",
    "cat": "general"
  },
  "boxe": {
    "fr": "boxe",
    "fon": "gusú ; hunxixo",
    "cat": "general"
  },
  "boxer": {
    "fr": "boxer",
    "fon": "nyì gusú ; nyì kwín",
    "cat": "general"
  },
  "bras": {
    "fr": "bras",
    "fon": "àbă ; awà ; personne ayant les bras longs ; alagá",
    "cat": "general"
  },
  "brave": {
    "fr": "brave",
    "fon": "akɔCnkpántɔC ; asúká ; ayiglaglánɔB ; mεglaglá",
    "cat": "general"
  },
  "bravo": {
    "fr": "bravo",
    "fon": "akɔCnkpínkpan ; alɔ towe ɖíè",
    "cat": "general"
  },
  "brise": {
    "fr": "brise",
    "fon": "jɔhɔn fífá ; brise légère ; jɔhɔn flεflε",
    "cat": "general"
  },
  "brisé": {
    "fr": "brisé",
    "fon": "gbìgbá ; tló ; wìnwɛCn ; être brisé ; wɛHn",
    "cat": "general"
  },
  "broyé": {
    "fr": "broyé",
    "fon": "lili",
    "cat": "general"
  },
  "bru": {
    "fr": "bru",
    "fon": "vĭ asì ; vĭsì ; sa bru ; vì tɔCn sì",
    "cat": "general"
  },
  "bruit": {
    "fr": "bruit",
    "fon": "zìngbídì ; zìngídì ; avec bruit ; kpawùn ; kplikplì ; avec un petit bruit ; klεwún ; bruit de la graisse",
    "cat": "general"
  },
  "sol": {
    "fr": "sol",
    "fon": "jò ; bruit du coup de fusil ; túgbè ; bruit du coup de poing ; kɔwùn ; bruit du serpent qui rampe",
    "cat": "nature_monde"
  },
  "awn": {
    "fr": "awăn",
    "fon": "bruit que fait une matière dure en cassant ; kawùn ; bruit répété d'une chose qui se casse",
    "cat": "general"
  },
  "vawùn": {
    "fr": "vawùn",
    "fon": "faire du bruit ; ɖɔB nŭ ; ɖŭ zìngbídì ; xò adăn ; xò zìngbídì ; faire du bruit (avec quelqu'un) ; ɖŭ",
    "cat": "general"
  },
  "brûlé": {
    "fr": "brûlé",
    "fon": "fyɔCfyɔC",
    "cat": "general"
  },
  "véwún": {
    "fr": "-véwún",
    "fon": "viwùn ; vlawùn ; xasawùn ; xayawùn ; xazawùn ; xéwún ; yawùn ; brusquement (chut !) ; xwíwún",
    "cat": "general"
  },
  "brute": {
    "fr": "brute",
    "fon": "gbetɔChla ; langbεtɔC ; lanjɔmɔB ; agir comme une brute ; jɔB làn",
    "cat": "general"
  },
  "bûche": {
    "fr": "bûche",
    "fon": "bûche de bois ; nakíkpò",
    "cat": "general"
  },
  "burin": {
    "fr": "burin",
    "fon": "sò ; burin à bout plat et tranchant ; swè",
    "cat": "general"
  },
  "but": {
    "fr": "but",
    "fon": "agwĕ ; atà ; postposition indiquant le but ; gbé",
    "cat": "general"
  },
  "buter": {
    "fr": "buter",
    "fon": "kl ε Cn afɔB",
    "cat": "general"
  },
  "butte": {
    "fr": "butte",
    "fon": "kɔCzùn ; kpè ; kpó ta ; butte formée comme pour semer l'igname ; zŭn ; butte sur laquelle on pose",
    "cat": "general"
  },
  "butter": {
    "fr": "butter",
    "fon": "butter une plante ; nyì zŭn",
    "cat": "sante_tisane"
  },
  "cabri": {
    "fr": "cabri",
    "fon": "gbɔH ; terme utilisé pour appeler les cabris ; akútù ; vieux cabri court et solide ; gbagbá alŭnkwìn",
    "cat": "general"
  },
  "cache": {
    "fr": "cache",
    "fon": "cache-sexe pour femme ; nùkpé ; cache-col ; kɔblánú ; cache-nez ; kɔblánú ; cache-sexe",
    "cat": "famille_societe"
  },
  "gbagwé": {
    "fr": "gbagwé",
    "fon": "godwé ; cache-sexe (hommes et femmes) ; gòdó",
    "cat": "famille_societe"
  },
  "caché": {
    "fr": "caché",
    "fon": "kwεnkwεn",
    "cat": "general"
  },
  "bìbm": {
    "fr": "bìbε mε",
    "fon": "cacher l'objet à rechercher ; dŏ dεn ; cacher ses faiblesses ; bà wì ; cacher un fruit pour le",
    "cat": "general"
  },
  "cadeaudevoyage": {
    "fr": "cadeau de voyage",
    "fon": "agbankàn ; agbanmεnnú ; cadeau pour obtenir une fille en mariage ; asibyɔnú",
    "cat": "famille_societe"
  },
  "café": {
    "fr": "café",
    "fon": "ahannuxwé ; kafε",
    "cat": "general"
  },
  "cage": {
    "fr": "cage",
    "fon": "ajà ; cage à oiseaux ; xεjà ; cage à poules ; koklójà ; cage thoracique ; gò",
    "cat": "nature_monde"
  },
  "calamité": {
    "fr": "calamité",
    "fon": "adlà",
    "cat": "famille_societe"
  },
  "calme": {
    "fr": "calme",
    "fon": "azĕ ; cúɖúɖú ; hùnkúkú ; kεɖεgóví ; sɔxwixwe ; xomɛfífá ; celui qui est calme ; sɔxwetɔC ; être",
    "cat": "general"
  },
  "camion": {
    "fr": "camion",
    "fon": "agbanhún",
    "cat": "famille_societe"
  },
  "camionnette": {
    "fr": "camionnette",
    "fon": "agbanhún",
    "cat": "famille_societe"
  },
  "camp": {
    "fr": "camp",
    "fon": "camp militaire ; ahwanslá",
    "cat": "general"
  },
  "canal": {
    "fr": "canal",
    "fon": "dohún ; dóhwín",
    "cat": "general"
  },
  "canif": {
    "fr": "canif",
    "fon": "canif tranchant ; hă ; aklájíví",
    "cat": "general"
  },
  "canna": {
    "fr": "canna",
    "fon": "àcídikwín",
    "cat": "general"
  },
  "canne": {
    "fr": "canne",
    "fon": "kpò ; kpog ε B ; canne à sucre ; leké ; súklétín ; yovójɛtín",
    "cat": "general"
  },
  "canon": {
    "fr": "canon",
    "fon": "agbă ; agbàlyá ; canon de fusil ; túgán ; canon que l'on enfonce dans la terre ; dosò ; sorte de",
    "cat": "nature_monde"
  },
  "car": {
    "fr": "car",
    "fon": "ɖŏ",
    "cat": "general"
  },
  "carpe": {
    "fr": "carpe",
    "fon": "akpaví ; wɛH ; variété de carpe ; azégεn",
    "cat": "general"
  },
  "carré": {
    "fr": "carré",
    "fon": "adaεnεnɔB ; adεnεnɔB",
    "cat": "general"
  },
  "carte": {
    "fr": "carte",
    "fon": "carte à jouer ; wĕ ; carte d'identité ; mεɖé dó gesí wémá ; carte d'invitation ; mεdida wĕmà",
    "cat": "general"
  },
  "cas": {
    "fr": "cas",
    "fon": "dans ce cas-là ; énε ɔC ; en cas ; nudannú ; nugblanú ; en ce cas là ; tεn nε ɔC mε ɔC",
    "cat": "general"
  },
  "case": {
    "fr": "case",
    "fon": "xɔB ; aller dans sa case ; yì xɔB ; case avec des murs en terre ; dŏxɔB ; case avec plafond ; azaxɔ ; case",
    "cat": "nature_monde"
  },
  "tôles": {
    "fr": "tôles",
    "fon": "ganxɔB ; case couverte en tuiles ; kpεnxɔB ; case d'attente ; agwàjí ; case des perles ; jε xɔC ; case du",
    "cat": "general"
  },
  "xm": {
    "fr": "ɖεxɔmε",
    "fon": "case ronde ; amlixɔB ; case sans murs ; akabaxɔsá ; case spéciale ; làxó ; case sur pieux",
    "cat": "general"
  },
  "cassé": {
    "fr": "cassé",
    "fon": "gbìgbá ; tló ; wìnwɛCn ; être cassé ; wɛHn",
    "cat": "general"
  },
  "amandesdepalme": {
    "fr": "amandes de palme",
    "fon": "xò dèkín ; zìn dèkín ; casser quelque chose ; hεn gbà ; le fait de se casser la tête à",
    "cat": "sante_tisane"
  },
  "lbg": {
    "fr": "lɔb gŏ",
    "fon": "se casser un pied ; lɔH afɔB ; se casser une jambe ; lɔH afɔB",
    "cat": "general"
  },
  "cassetête": {
    "fr": "casse-tête",
    "fon": "kpota",
    "cat": "sante_tisane"
  },
  "cataracte": {
    "fr": "cataracte",
    "fon": "àsí ; cataracte (maladie des yeux) ; sí",
    "cat": "sante_tisane"
  },
  "cauri": {
    "fr": "cauri",
    "fon": "àkwε ; àkwεwó ; àkwεwókwín",
    "cat": "general"
  },
  "cause": {
    "fr": "cause",
    "fon": "nŭ ; à cause de ; ɖŏ nu ; ɖŏ ta mε ; ɖŏ... tamε ; ɖŏ... wŭ ; ɖò... wŭtù ; à cause de leur désobéissance",
    "cat": "general"
  },
  "causer": {
    "fr": "causer",
    "fon": "cyán xó ; ɖɔB xó ; ɖɔB xó nú mε ; ɖŏ alisá ; ɖŏ alisá xá mε ; nɔB alisá xá mε ; causer de la douleur à",
    "cat": "sante_tisane"
  },
  "causerie": {
    "fr": "causerie",
    "fon": "xócyáncyán ; causerie familière ; alisá",
    "cat": "famille_societe"
  },
  "canot": {
    "fr": "canot",
    "fon": "canot moderne ; akló",
    "cat": "general"
  },
  "ce": {
    "fr": "ce",
    "fon": "dεH ; élε ; émí ; ce que ; nŭ ; celle-là ; nε ; celles-ci ; élε ; celles-là ; élε ; c'est ; wɛB ; c'est que ; wɛB",
    "cat": "general"
  },
  "ceci": {
    "fr": "ceci",
    "fon": "ɖíè",
    "cat": "general"
  },
  "céder": {
    "fr": "céder",
    "fon": "gbɔB ; wɔB ; action de céder le pas ; zizɛ ; céder le pas à quelqu'un ; zɛB nú mɛ ; céder par vente ; flí",
    "cat": "general"
  },
  "femmesretiennentlepagne": {
    "fr": "femmes retiennent le pagne",
    "fon": "aɖɔkεn ; ceinture pour protéger le ventre ; xomɛblanú ; ceinture qui sert",
    "cat": "sante_tisane"
  },
  "auxfemmesdeportemonnaie": {
    "fr": "aux femmes de porte-monnaie",
    "fon": "ganɖɔkεn ; ceinture-amulette ; alinkàn ; sorte de ceinture ; akpakàn",
    "cat": "famille_societe"
  },
  "cela": {
    "fr": "cela",
    "fon": "ɖíè ; é ; énε ; nε ; c'est pour cela ; ɖó énɛC ɔC wútú ; c'est pour cela que ; énε ɔC wε zɔCn bɔB",
    "cat": "general"
  },
  "célébrer": {
    "fr": "célébrer",
    "fon": "célébrer la messe ; blŏ amĭsà ; célébrer le mariage ; wà asì nŭ ; célébrer une fête ; ɖù xwè",
    "cat": "famille_societe"
  },
  "celer": {
    "fr": "celer",
    "fon": "ɖìɖá hwlă ; sɔC hwlă ; zĕ hwlă",
    "cat": "general"
  },
  "celui": {
    "fr": "celui",
    "fon": "celui que voici ; yɛC ; celui qui ; mε ɖé é ; celui-ci ; mε élɔC ; celui-là ; nε ; forme syncopée de yé :",
    "cat": "general"
  },
  "cent": {
    "fr": "cent",
    "fon": "kanweko ; cent ans ; xwe kanweké ; cent cinquante ; kantɔn gbàn ; cent dix ; kanwe gbàn ; cent",
    "cat": "general"
  },
  "dinitiationaugénievaudounn": {
    "fr": "d'initiation au génie vaudounn",
    "fon": "fázúnyí ; cérémonie familiale ; kákplékplé ; cérémonie familiale ; kplé",
    "cat": "famille_societe"
  },
  "ká": {
    "fr": "ká",
    "fon": "cérémonie familiale de fin d'année au jour de l'an chez les fons ; xwetanú ; cérémonie fastueuse en",
    "cat": "famille_societe"
  },
  "lhonneurdesancêtres": {
    "fr": "l'honneur des ancêtres",
    "fon": "vivanú ; cérémonie funèbre ; cyɔCnú ; nùwíwá ; nùwúwá ; cérémonie funèbre",
    "cat": "spirituel_fa"
  },
  "chezlesmaxi": {
    "fr": "chez les maxi",
    "fon": "axijεkpé ; cérémonie funèbre d'une veuve à son mari défunt ; lεH afɔB ; cérémonie funèbre",
    "cat": "famille_societe"
  },
  "dumil": {
    "fr": "du mil",
    "fon": "hŭ jă ; cérémonie qui consiste à offrir la farine de mil à l'autel portatif ; jàhúhú ; cérémonie qui",
    "cat": "general"
  },
  "sortiedelenfant": {
    "fr": "sortie de l'enfant",
    "fon": "ɖè vĭ tɔCn ; faire la cérémonie de sortie de l'enfant ; ɖè vĭ zε hwε ; ɖè vĭ tɔCn ; faire la",
    "cat": "famille_societe"
  },
  "cérémoniedeysù": {
    "fr": "cérémonie de yεsù",
    "fon": "fɔB yεsù ; faire la cérémonie familiale où l'on mange ensemble ; kplé ká ; faire la",
    "cat": "famille_societe"
  },
  "cérémoniefunèbredéfinitive": {
    "fr": "cérémonie funèbre définitive",
    "fon": "ɖì cyɔC ; faire la cérémonie où les vodúnɔB ramènent à la vie l'initié(e)",
    "cat": "spirituel_fa"
  },
  "aprèssamortsymbolique": {
    "fr": "après sa mort symbolique",
    "fon": "fɔCn hùn ; faire la cérémonie pour asseoir l'enfant vers six mois ; sɔC vĭ júnjɔCn",
    "cat": "famille_societe"
  },
  "hùn": {
    "fr": "hùn",
    "fon": "faire la petite cérémonie des autel portatif ; fε asεεn ta ; faire les cérémonies du clan pour",
    "cat": "general"
  },
  "lenfant": {
    "fr": "l'enfant",
    "fon": "ɖè yεsu nú vĭ ; fɔB yɛsu núû vĭ ; fɔB yεsu nú vĭ ; fɔB yεsu nú vĭ ; ɖè yεsù nú vĭ ; faire les premières",
    "cat": "famille_societe"
  },
  "vodúnyesù": {
    "fr": "vodún yesù",
    "fon": "toute cérémonie coutumière concernant la famille ; yɛsù ; variété de cérémonie",
    "cat": "famille_societe"
  },
  "cesser": {
    "fr": "cesser",
    "fon": "ɖŏ alɔB tè ; gbɔB ; jŏ dŏ ; kεn ; cesser de donner des enfants (femme) ; zùn ajì ; cesser de donner des",
    "cat": "famille_societe"
  },
  "petitsanimaux": {
    "fr": "petits (animaux)",
    "fon": "zùn ajì ; cesser de faire quelque chose ; ɖŏ alɔB tè ; cesser de mettre bas ; kpò vĭ",
    "cat": "sante_tisane"
  },
  "cesserdenfanter": {
    "fr": "cesser d'enfanter",
    "fon": "kpò vĭ ; cesser d'enfanter en raison de l'âge ; kpò vĭ ; cesser le jeûne ; tún nu ; faire",
    "cat": "famille_societe"
  },
  "cet": {
    "fr": "cet",
    "fon": "élɔC ; énε",
    "cat": "general"
  },
  "cette": {
    "fr": "cette",
    "fon": "dε ; élɔC ; énε",
    "cat": "general"
  },
  "ceux": {
    "fr": "ceux",
    "fon": "ceux-ci ; éhɔCnmε ; élɔC ; ceux-là ; élε",
    "cat": "general"
  },
  "chair": {
    "fr": "chair",
    "fon": "chair (profonde) ; lanvε ; chair de poule ; avivɔfún ; chair quelconque ; làn ; la chair de la cerise",
    "cat": "general"
  },
  "champ": {
    "fr": "champ",
    "fon": "adà ; gbò ; gbomε ; glè ; glelilε ; gleta ; champ après la récolte du maïs ; hankán ; champ",
    "cat": "general"
  },
  "jikpo": {
    "fr": "jikpo",
    "fon": "jù ; jukpo",
    "cat": "general"
  },
  "chant": {
    "fr": "chant",
    "fon": "hàn ; hanjiji ; au chant du coq ; kokló kɔC asì ; chant composé pour quelqu'un ; hanmá ; chant de",
    "cat": "general"
  },
  "deuil": {
    "fr": "deuil",
    "fon": "nùwámεhan ; chant de supplication ; vohàn ; chant de triomphe ; gànhúmε hàn ; chant",
    "cat": "general"
  },
  "ducoq": {
    "fr": "du coq",
    "fon": "akɔC ; akɔCkíkɔC ; akɔCkúkɔC ; chant funèbre ; avĭhàn ; chant hanyè ; hanyì ; chant satirique ; hanló",
    "cat": "general"
  },
  "char": {
    "fr": "char",
    "fon": "char de combat ; ahwànhŭn ; char de guerre à chevaux ; ahwankεkε",
    "cat": "general"
  },
  "chasser": {
    "fr": "chasser",
    "fon": "nyà ; nyà gbĕ ; nyà mε ; nyà mε tɔCn ; nyà tɔCn ; nyì ; chasser la maladie par des incantations ; nyì",
    "cat": "sante_tisane"
  },
  "azbn": {
    "fr": "azɔbn",
    "fon": "chasser la mort ; fε kú ; chasser les mouches ; xò sukpɔB",
    "cat": "general"
  },
  "chat": {
    "fr": "chat",
    "fon": "asé ; awĭì ; tútwì ; chat sauvage ; gbèwĭì ; chat tigre ; alúlwí ; chat-huant ; azĕxε ; le chat",
    "cat": "general"
  },
  "chaud": {
    "fr": "chaud",
    "fon": "gbógbógbó ; myɔɖòwŭ ; myɔmyɔ ; zozò ; avoir chaud ; yŏzò hɛBn mɛ ; être chaud ; hùn myɔB ; hùn",
    "cat": "general"
  },
  "chaux": {
    "fr": "chaux",
    "fon": "adakpεn ; hwĕ",
    "cat": "general"
  },
  "chef": {
    "fr": "chef",
    "fon": "axɔCsú ; azɔBkplɔCnm ε tɔC ; c ε Cfù ; găn ; zàngán ; chef d’un vaudoun ; măwŭnɔB ; chef de chantier",
    "cat": "general"
  },
  "azbgán": {
    "fr": "azɔbgán",
    "fon": "chef de char ; ahwanhúngán ; chef de famille ; daá ; h ε Bnnùgán ; xwégán ; xwénɔC ; chef de gare",
    "cat": "famille_societe"
  },
  "lagágn": {
    "fr": "lagá găn",
    "fon": "chef de groupe ; gb ε Bnùgán ; chef de la collectivité familiale ; h ε Bnnùgán ; chef de l'état",
    "cat": "famille_societe"
  },
  "slàgán": {
    "fr": "-slàgán",
    "fon": "chef de village ; togán ; tòxɔCsú ; chef des enfants dans une famille ; vìgán ; chef des fossoyeurs",
    "cat": "famille_societe"
  },
  "dannb": {
    "fr": "dannɔb",
    "fon": "être chef ; ɖù axɔCsú ; ɖù găn ; être le chef d'un pays ; kpà àc ε B dŏ tò ɖĕ m ε B ; le chef ; nukɔntɔC",
    "cat": "general"
  },
  "cher": {
    "fr": "cher",
    "fon": "satɔC ; vìvε ; vεná ; zɔnjɛzɔnfɔCn ; bien cher ; vεnàvεnà ; être cher ; vεH ; vε axì ; être cher à quelqu'un",
    "cat": "general"
  },
  "vhnúm": {
    "fr": "vεh nú mε",
    "fon": "le fait d'être cher ; axivε ; très cher ; vìvεná ; vεnàvεnà",
    "cat": "general"
  },
  "núm": {
    "fr": "nú mε",
    "fon": "chercher à manger ; bà nŭ ɖù ; chercher à mettre le bon droit de son côté ; bà hwεjijɔ",
    "cat": "general"
  },
  "mmw": {
    "fr": "mεmε wŭ",
    "fon": "chercher à se venger ; bà hlɔBn ; chercher à se venger de quelqu'un ; bà hă mε ; bà hlɔBn mε",
    "cat": "general"
  },
  "w": {
    "fr": "wŭ",
    "fon": "chercher à s'éloigner de quelqu'un ; gbεH mεmε mε ; chercher à trouver à redire sur quelqu'un ; bà",
    "cat": "general"
  },
  "dòmw": {
    "fr": "dò ɖŏ mε wŭ",
    "fon": "chercher avec peine des objets dispersés ; kínkεn ; chercher de quoi manger ; bà nŭ ɖɔB",
    "cat": "general"
  },
  "fnnúm": {
    "fr": "fεn nú mε",
    "fon": "chercher le fond de quelque chose ; bà dò nú mε ; chercher le moyen de quelque chose ; bà",
    "cat": "general"
  },
  "bàxóm": {
    "fr": "bà xó mε",
    "fon": "chercher quelqu'un ; ɖò mε gbĕ mε ; tɔCn mε gbĕ ; chercher querelle ; bà hùn mε ; bà jlε",
    "cat": "general"
  },
  "marier": {
    "fr": "marier",
    "fon": "bà asì ; chercher un mari pour quelqu'un ; bà asú nú mε ; chercher un moyen ; bà súnnù",
    "cat": "famille_societe"
  },
  "chéri": {
    "fr": "chéri",
    "fon": "bòɖŏ ; kówún ; vìvεná ; vεná",
    "cat": "general"
  },
  "hwà": {
    "fr": "hwà",
    "fon": "cheveux ; wùjɔCnú ; cheveux d'un nouveau-né ; sεɖá ; cheveux ébouriffés ; ɖà kεyεε ; les tous",
    "cat": "nature_monde"
  },
  "chez": {
    "fr": "chez",
    "fon": "aller chez quelqu'un ; ɖiɖó mε gɔHn ; être chez un maître ; ɖò mε kànnu",
    "cat": "general"
  },
  "chien": {
    "fr": "chien",
    "fon": "aglà ; avŭn ; cukú ; chien crevé ! (insulte courante) ; avun nyinyɔC ; chien de chasse ; aglà ; chien",
    "cat": "general"
  },
  "choc": {
    "fr": "choc",
    "fon": "agloxixo ; agloyamε ; agloyiyá ; kliwùn ; xuxo ; avec un choc sec ; gawùn ; avec un choc sec",
    "cat": "general"
  },
  "extraordinaire": {
    "fr": "extraordinaire",
    "fon": "aɖawùn ; chose familière à quelqu'un ; nùmámε ; chose fugace ; wàyìwáyínú ; chose",
    "cat": "famille_societe"
  },
  "écarterlamaladie": {
    "fr": "écarter la maladie",
    "fon": "azɔnnyinú ; chose pour la toilette ; wùlɛBnú ; chose pour tromper ; mεblεnú ; chose",
    "cat": "sante_tisane"
  },
  "nespéraitplus": {
    "fr": "n'espérait plus",
    "fon": "nùmáɖónukún ; chose quotidienne ; tεgbεgbenú ; chose ronde ; togoɖò ; chose sacrée",
    "cat": "spirituel_fa"
  },
  "nùém": {
    "fr": "nùɖé mε",
    "fon": "une chose bien à soi ; nŭ mε tɔBn tuto ; une chose en petite quantité ; nŭ hwihwe ; une chose",
    "cat": "general"
  },
  "choyer": {
    "fr": "choyer",
    "fon": "kε ; tεn ; action de choyer ; kíkε ; choyer un enfant ; kε vĭ ; tεn vĭ ; le fait de choyer ; tíntεn",
    "cat": "famille_societe"
  },
  "chut": {
    "fr": "chut !",
    "fon": "n'abɔH nɔB abɔH",
    "cat": "general"
  },
  "chute": {
    "fr": "chute",
    "fon": "ayìjíjε",
    "cat": "general"
  },
  "ci": {
    "fr": "ci",
    "fon": "yɛC ; de-ci de-là ; gbèɖànúgbeɖanú ; gbĕgbĕ ; gbèjágbèjá ; gbejígbejí ; lεkanlεkàn ; lagbésogbé ; de-ci",
    "cat": "general"
  },
  "àbchw": {
    "fr": "-àbɔchwε",
    "fon": "cicatrice de la variole ; axɔCsúkpa ; sakpatákpà ; cicatrice en relief ; agbì",
    "cat": "general"
  },
  "ciel": {
    "fr": "ciel",
    "fon": "jinukúnsùn ; jìxwé ; sεxwé ; au ciel ; ɖò lɔHn dɔHn ; ɖò lɔHn dŏn",
    "cat": "general"
  },
  "cil": {
    "fr": "cil",
    "fon": "nukúnfún ; nukúntáfún",
    "cat": "general"
  },
  "cime": {
    "fr": "cime",
    "fon": "ta",
    "cat": "general"
  },
  "cinq": {
    "fr": "cinq",
    "fon": "atɔCɔCn ; cinq cents francs ; kpɔCwùn kó ; cinq francs ; ɖɔHlà ; ɖɔHla ɖokpó",
    "cat": "general"
  },
  "cire": {
    "fr": "cire",
    "fon": "aɖùwa ; cire du moucheron ; ahwìnhwεHnaɖuwà ; ahwìnhwεHnɖuwà",
    "cat": "general"
  },
  "ciron": {
    "fr": "ciron",
    "fon": "atínɖútínɖwí",
    "cat": "general"
  },
  "citer": {
    "fr": "citer",
    "fon": "citer les titres de gloire de quelqu'un ; mlă mε ; citer quelqu'un en justice ; ylɔH hwε mε",
    "cat": "general"
  },
  "claie": {
    "fr": "claie",
    "fon": "agbà ; ajalalà ; ajlalà ; claie à fruits ; avà ; claie servant de barrage dans une rivière ; wàn ; sorte",
    "cat": "nature_monde"
  },
  "clair": {
    "fr": "clair",
    "fon": "clair (pour la couleur rouge) ; nyεnmínyεnmí ; clair (pour l'eau) ; zinzin ; clair de lune ; sunɖiɖi",
    "cat": "nature_monde"
  },
  "hhn": {
    "fr": "hɔhn",
    "fon": "wĕ ; zàwé ; zàwĕ ; zìn ; faire clair ; ayĭ zàwĕ ; hɔHn wĕ ; faire clair de lune ; sùn tɔCn ; n'être pas claire",
    "cat": "nature_monde"
  },
  "clan": {
    "fr": "clan",
    "fon": "akɔB ; akɔta ; yɛsù ; nom de clan ; akɔnyikɔC ; nom d'un clan ; jεtɔCví",
    "cat": "general"
  },
  "clé": {
    "fr": "clé",
    "fon": "cávì ; hɔnhunnú ; hɔnsúnú ; clé métallique ; hɔnhungàn",
    "cat": "general"
  },
  "clin": {
    "fr": "clin",
    "fon": "clin d'oeil ; nukúnxwíxwé",
    "cat": "general"
  },
  "clou": {
    "fr": "clou",
    "fon": "hùnjεn",
    "cat": "general"
  },
  "coeur": {
    "fr": "coeur",
    "fon": "ayì ; hŭn ; jì ; au coeur compliqué ; ayigεdεgεdεnɔB ; avoir le coeur simple ; ayì ɖò wεn ; avoir le",
    "cat": "general"
  },
  "zunta": {
    "fr": "zunta",
    "fon": "ne pas avoir de coeur ; kú xomε",
    "cat": "general"
  },
  "coiffer": {
    "fr": "coiffer",
    "fon": "blă ɖà ; ɖŏ ɖà ; se coiffer (homme) ; ɖô ɖà ; se coiffer (femme) ; blă ɖà",
    "cat": "famille_societe"
  },
  "coiffure": {
    "fr": "coiffure",
    "fon": "azà ; ɖabiblá ; gbàkún ; coiffure (pour une femme) ; ɖablablá ; coiffure (pour un homme)",
    "cat": "famille_societe"
  },
  "aió": {
    "fr": "ɖaɖiɖó",
    "fon": "coiffure de chef ; gànzá ; coiffure des femmes ayant la forme d'une calebasse renversée ; káví",
    "cat": "famille_societe"
  },
  "coin": {
    "fr": "coin",
    "fon": "gɔngɔBn ; gogwè ; gwegwè ; kɔnkwεn ; kwεnkwεn ; nùgblágɔCdɔC ; nùsó ; nùswé ; zoè ; zwè ; coin obscur",
    "cat": "general"
  },
  "monde": {
    "fr": "monde",
    "fon": "sín wɛBkɛC zwè ɛnɛ lɛC mɛB ; le coin des lèvres ; nukpá ; les coins et recoins ; nùklεnsεn nuklεnsεn",
    "cat": "general"
  },
  "l": {
    "fr": "lε",
    "fon": "les divers coins d'un emplacement ; nùklεnsεn nuklεnsεn lε ; sur le coin ; zwè jí",
    "cat": "general"
  },
  "col": {
    "fr": "col",
    "fon": "akɔClà ; kɔClà ; col de chemise ; awukɔB ; col de veste ; awukɔB ; col d'un canari ; zεnlákwε ; col d'un",
    "cat": "general"
  },
  "colis": {
    "fr": "colis",
    "fon": "agbàn ; nùbìblá ; nùblàblá",
    "cat": "general"
  },
  "colle": {
    "fr": "colle",
    "fon": "awɔBn ; nùtlεnú ; colle à papier ; wèmàtlɛCnú",
    "cat": "general"
  },
  "collé": {
    "fr": "collé",
    "fon": "collé et bien lourd ; kpεkoò ; être collés ensemble ; kpàn",
    "cat": "general"
  },
  "collectivité": {
    "fr": "collectivité",
    "fon": "collectivité familiale ; hεHnnù ; hεHnnù ɖaxó",
    "cat": "famille_societe"
  },
  "commandement": {
    "fr": "commandement",
    "fon": "acεkpikpà ; sεn ; nùzɔCn ; les commandements de dieu ; măwù sεn lε ; les",
    "cat": "spirituel_fa"
  },
  "comme": {
    "fr": "comme",
    "fon": "ɖɔhùn ; ɖĕe ; ɖì lĕe ; ɖì lĕe...gbɔBn ; ée ; lĕè ; lĕè ... gbɔBn ; mɔHhùn ; comme au jour de sa naissance",
    "cat": "general"
  },
  "jgbè": {
    "fr": "jɔgbè",
    "fon": "comme ça ; mɔHtɔBn ; comme ceci ; lĕ ; lehunkɔC ; lewunlɔC ; comme ci comme ça ; kócwéé ; comme",
    "cat": "general"
  },
  "méw": {
    "fr": "mεɖé wŭ",
    "fon": "wɔH ; commencer à bouillir ; fyε ; commencer à fleurir ; wlí sε ; commencer à jaillir ; wɔH",
    "cat": "general"
  },
  "ìzbn": {
    "fr": "ɖì zɔbn",
    "fon": "commencer à monter (pour un fleuve, une rivière) ; hùn dò ; commencer à parler ; wlĭ xó",
    "cat": "nature_monde"
  },
  "rendu": {
    "fr": "rendu",
    "fon": "gbeɖiɖó ; gbeɖuɖó",
    "cat": "general"
  },
  "concession": {
    "fr": "concession",
    "fon": "xwétá ; concession clôturée ; xwétá ; concession familiale ; xwé ; xwédó ; dans la",
    "cat": "famille_societe"
  },
  "awò": {
    "fr": "awò",
    "fon": "connaître le secret des revenants ; mɔB awò ; faire connaître ; hùn xó mε",
    "cat": "general"
  },
  "consacré": {
    "fr": "consacré",
    "fon": "être consacré au service d'un vaudoun ; sεn vodún",
    "cat": "spirituel_fa"
  },
  "mode": {
    "fr": "mode",
    "fon": "cá ; considérer d'un regard hostile ; fɔB wùn fɛBn ; considérer quelqu'un comme ; sɔC mε dŏ ɖŏ ; ne",
    "cat": "general"
  },
  "consommation": {
    "fr": "consommation",
    "fon": "consommation de la tête du cabri après un sacrifice ; gbɔBtágbígbá",
    "cat": "spirituel_fa"
  },
  "fákántc": {
    "fr": "fákántɔc",
    "fon": "consulter l'oracle ; kàn fá ; kàn nùzɔCn ; consulter l'oracle avec le chapelet ; kàn akplε",
    "cat": "spirituel_fa"
  },
  "contamination": {
    "fr": "contamination",
    "fon": "azɔnsísɔC ; azɔnsúsɔC",
    "cat": "famille_societe"
  },
  "conte": {
    "fr": "conte",
    "fon": "hwenuxó ; xɛxó ; yɛxó ; conte de fées ; yɛxó",
    "cat": "general"
  },
  "contenir": {
    "fr": "contenir",
    "fon": "hεn ; tíìn ; contenir du poison ; ɖŏ aɖĭ ; contenir une chose ; hεn nŭ ; se contenir ; dŏ agbɔHn",
    "cat": "sante_tisane"
  },
  "dò": {
    "fr": "dò",
    "fon": "tìn",
    "cat": "general"
  },
  "contracter": {
    "fr": "contracter",
    "fon": "contracter une souillure consécutive à une infamie ; xò lɔB ; fait de contracter une maladie",
    "cat": "sante_tisane"
  },
  "parunefautemorale": {
    "fr": "par une faute morale",
    "fon": "azɔnsísɔC ; azɔnsúsɔC ; contracter ; le fait de contracter une maladie subite au cours",
    "cat": "sante_tisane"
  },
  "contradiction": {
    "fr": "contradiction",
    "fon": "nùdìndɔCn ; nùdùndɔCn ; être en contradiction avec ; dŏ gbè vò xá ; qui a l'esprit de",
    "cat": "spirituel_fa"
  },
  "contrepoison": {
    "fr": "contrepoison",
    "fon": "àɖìhún ; glŏ",
    "cat": "sante_tisane"
  },
  "kpéná": {
    "fr": "kpé ná",
    "fon": "convenir avec quelqu'un ; ɖɔB xá mε ; convenir de ; ɖɔB gbò ; être comme il convient ; ɖŏ ganjí",
    "cat": "general"
  },
  "conversation": {
    "fr": "conversation",
    "fon": "conversation du soir ; gbada'lisa ; conversation familière sur des sujets plaisants ; dafε",
    "cat": "famille_societe"
  },
  "converser": {
    "fr": "converser",
    "fon": "ɖŏ alisá ; converser avec quelqu'un ; nɔB alisá xá mε ; converser familièrement ; ɖŏ alisá xá",
    "cat": "famille_societe"
  },
  "coq": {
    "fr": "coq",
    "fon": "koklóò ; koklósú ; coq à l'âne ; jagé ; coq adulte au beau chant ; kokló kɔCásí tlélé ; coq de pagode",
    "cat": "nature_monde"
  },
  "wtutú": {
    "fr": "wŭtutú",
    "fon": "faire un coq à l'âne ; gbò jagé",
    "cat": "general"
  },
  "coque": {
    "fr": "coque",
    "fon": "coque de l'amande de palme ; dèkínkán",
    "cat": "general"
  },
  "corne": {
    "fr": "corne",
    "fon": "lanzò ; corne d'animal ; zò",
    "cat": "nature_monde"
  },
  "corps": {
    "fr": "corps",
    "fon": "agbazà ; gò ; wŭ ; corps de l'homme par opposition à l'âme ; agbazà ; le corps du point de vue de",
    "cat": "general"
  },
  "lasanté": {
    "fr": "la santé",
    "fon": "lanmε",
    "cat": "sante_tisane"
  },
  "cosse": {
    "fr": "cosse",
    "fon": "fló",
    "cat": "general"
  },
  "côte": {
    "fr": "côte",
    "fon": "ajajaxú ; côte à côte ; xúsúxúsú ; côte de la mer ; xuta ; côte escarpée ; xùkpójí ; côte",
    "cat": "general"
  },
  "côté": {
    "fr": "côté",
    "fon": "adajamε ; adajà ; ajajà ; ajajamε ; àkpá ; kɔnkwεn ; kpá ; kwεnkwεn ; kεn ; à côté du but ; nyidò ; de",
    "cat": "general"
  },
  "coton": {
    "fr": "coton",
    "fon": "avɔkàn ; coton en touffe ; avɔkanfún ; sorte de coton à fleurs rouges ; cεkε",
    "cat": "general"
  },
  "cou": {
    "fr": "cou",
    "fon": "kɔB ; cou-de-pied ; afɔgólí ; afɔkɔB",
    "cat": "general"
  },
  "adgò": {
    "fr": "adɔgò",
    "fon": "gblĕ xò ; nyì alɔ dò ; flε kεn ; fausse couche ; xogbiblé",
    "cat": "general"
  },
  "mlh": {
    "fr": "-mlɔh",
    "fon": "mlɔH ayĭ ; mlɔH wεn ; se coucher comme les poules ; yì kokló xɔB ; se coucher sans manger ; dɔH xovɛC",
    "cat": "general"
  },
  "coude": {
    "fr": "coude",
    "fon": "awagólì ; awagólìgólì ; awagεlì ; gŏlì ; alɔgólìgŏlì ; awàgólìgŏlì ; au pli du coude ; awavlámε ; faire",
    "cat": "general"
  },
  "terre": {
    "fr": "terre",
    "fon": "sà kpé ayìkúngbàn ; couler un bateau ; gbà hŭn ; couler une embarcation ; syɔC ; faire couler ; ɖɔH",
    "cat": "nature_monde"
  },
  "lùlú": {
    "fr": "-lùlú",
    "fon": "faire couler sur la tête d'une personne le sang d'un animal immolé à sa place ; sà hùn",
    "cat": "sante_tisane"
  },
  "couleuvre": {
    "fr": "couleuvre",
    "fon": "amidàn ; dàn",
    "cat": "famille_societe"
  },
  "coup": {
    "fr": "coup",
    "fon": "xuxo ; à petits coups ; hăbŭ ; coup de cloche ; ganxixo ; coup de feu ; sò ; sogbè ; coup de fusil",
    "cat": "general"
  },
  "sò": {
    "fr": "sò",
    "fon": "coup de pied ; afɔsɔCmε ; coup de poing ; akodokwín ; gusú ; coup donné avec la main ouverte ; fεn",
    "cat": "general"
  },
  "faute": {
    "fr": "faute",
    "fon": "kú hwε",
    "cat": "general"
  },
  "coupe": {
    "fr": "coupe",
    "fon": "coupe de cheveu spéciale de l'initié au fâ ; fáyíɖá ; coupe de cheveux ; zogbodó ; coupe-coupe",
    "cat": "spirituel_fa"
  },
  "glnkpà": {
    "fr": "glεnkpà",
    "fon": "la coupe bue pour conclure le pacte d'amitié ; lεnunu",
    "cat": "famille_societe"
  },
  "coupé": {
    "fr": "coupé",
    "fon": "avoir les règles coupées ; sùn cí tè nú mε ; coupé d'eau ; cícá ; être coupé ; sεn",
    "cat": "nature_monde"
  },
  "lmier": {
    "fr": "lmier",
    "fon": "gbò dĕkpà ; sεHn dĕkpà ; couper les cheveux ; kpà ɖà ; couper les cheveux à quelqu'un ; kpà ɖà nú",
    "cat": "general"
  },
  "cour": {
    "fr": "cour",
    "fon": "kɔCxò ; basse-cour ; kokló kpámε ; cour d'un enclos d'initiation d'un vaudoun ; vodun satò ; cour",
    "cat": "spirituel_fa"
  },
  "kcn": {
    "fr": "kɔcn",
    "fon": "wà adăn ; wà àdăn dŏ mɛ ; w'àdăn dŏ mɛ",
    "cat": "general"
  },
  "courber": {
    "fr": "courber",
    "fon": "bεH sín ; gɔBdɔC ; sɔC dô ; tɔB ; courber la tête ; bε sìn ; wε ta ; se courber ; fε ; xá ; se courber jusqu'à",
    "cat": "sante_tisane"
  },
  "coureur": {
    "fr": "coureur",
    "fon": "wezunkántɔC ; coureur de femmes ; nyɔBnúbátɔC",
    "cat": "famille_societe"
  },
  "cours": {
    "fr": "cours",
    "fon": "cours d'eau ; tɔsisa ; cours d'eau du bénin appelé ouémé en français ; wĕmɛB ; cours d'eau",
    "cat": "nature_monde"
  },
  "court": {
    "fr": "court",
    "fon": "kpéwún ; aux jambes courtes ; wlɛkɛCtɛC ; court et bien constituée ; alŭnkwìn ; court et bien fait",
    "cat": "general"
  },
  "courtiser": {
    "fr": "courtiser",
    "fon": "celui qui aime courtiser les femmes ; àcɔCɖóxámεtɔ",
    "cat": "famille_societe"
  },
  "coussinet": {
    "fr": "coussinet",
    "fon": "sunuhlεn ; coussinet des porteurs que l'on pose sur la tête ; sunnù ; coussinet mis sur la tête",
    "cat": "sante_tisane"
  },
  "couvent": {
    "fr": "couvent",
    "fon": "couvent vaudoun ; hùn kpámε ; hunxwé",
    "cat": "spirituel_fa"
  },
  "crabe": {
    "fr": "crabe",
    "fon": "crabe de lagune ; asɔCn ; crabe de mer ; asɔCn ; crabe de terre ; agàsá",
    "cat": "nature_monde"
  },
  "craie": {
    "fr": "craie",
    "fon": "craie blanche ; hwĕ ; craie en poudre ; cɔCkì",
    "cat": "general"
  },
  "crâne": {
    "fr": "crâne",
    "fon": "taká ; takágŏ",
    "cat": "general"
  },
  "créé": {
    "fr": "créé",
    "fon": "être comme dieu l'a créée ; ɖò sε gbè jĭ",
    "cat": "spirituel_fa"
  },
  "créer": {
    "fr": "créer",
    "fon": "ɖŏ ; action de créer ; ɖuɖó ; créer du désordre ; dŏ hannyahannyà ; créer du trouble ; dŏ",
    "cat": "general"
  },
  "síndò": {
    "fr": "sín dò",
    "fon": "creuser un trou pour prendre de !a terre ; sín kɔCdó ; creuser une calebasse ; sín ká",
    "cat": "nature_monde"
  },
  "creux": {
    "fr": "creux",
    "fon": "atínsómε ; dò ; dodò ; gbamε ; gɔngɔBn ; sò ; swè ; creux de l'oreille ; tógwlè ; tógwlemε ; tólì ; creux",
    "cat": "general"
  },
  "plus": {
    "fr": "plus",
    "fon": "kɔCsò ; dans le creux ; dodo mε ; domε ; être creux ; ɖŏ sò ; le creux de la main ; alɔkpáxwì ; le",
    "cat": "general"
  },
  "cri": {
    "fr": "cri",
    "fon": "axó ; axóxó ; axwá ; cri annonçant qu'on est prêt à se saisir du cercueil ou du symbole d'un mort",
    "cat": "general"
  },
  "dupetitpoussin": {
    "fr": "du petit poussin",
    "fon": "xwín ; cri pour chasser les animaux ; soε ; cri pour faire peur à un enfant ; táyì ; cri",
    "cat": "sante_tisane"
  },
  "enfantàlalune": {
    "fr": "enfant à la lune",
    "fon": "hlokohwé",
    "cat": "famille_societe"
  },
  "crier": {
    "fr": "crier",
    "fon": "dà axóxó ; dà xó ; dŏ aké ; dŏ axó ; dŏ axóxó ; dŏ axwá ; dŏ xó ; kɔC ; ké ; sú xó ; sún xó ; action de crier",
    "cat": "general"
  },
  "kíkc": {
    "fr": "kíkɔc",
    "fon": "crier à la lune ; kɔC sùn ; crier au malheur ; sá heelú ; crier de joie en se frappant la bouche à",
    "cat": "nature_monde"
  },
  "crime": {
    "fr": "crime",
    "fon": "dànŭ ; dànùwíwá ; commettre un crime ; wà alànnŭ ; wà dàká",
    "cat": "general"
  },
  "crise": {
    "fr": "crise",
    "fon": "faire une crise d’épilepsie ; kú adĭngbè",
    "cat": "general"
  },
  "croc": {
    "fr": "croc",
    "fon": "aɖŭ ; croc (de la flèche, de l'hameçon, du harpon). ; kεn ; croc pour prendre de la viande",
    "cat": "general"
  },
  "croix": {
    "fr": "croix",
    "fon": "aklúzù ; la croix du christ ; yàtín",
    "cat": "general"
  },
  "cru": {
    "fr": "cru",
    "fon": "mŭ",
    "cat": "general"
  },
  "crue": {
    "fr": "crue",
    "fon": "être en crue ; ɖì sìn",
    "cat": "general"
  },
  "cruel": {
    "fr": "cruel",
    "fon": "dànùwátɔC ; dànùwáxámεtɔC ; nylán hùn ; être cruel ; nylă hùn ; être cruel envers quelqu'un ; wà",
    "cat": "general"
  },
  "amà": {
    "fr": "amà",
    "fon": "kεn amà ; cueillir des mangues ; gbε amăgà ; cueillir des objets un à un ; kεn ; cueillir du piment",
    "cat": "general"
  },
  "cuir": {
    "fr": "cuir",
    "fon": "anyŭ",
    "cat": "general"
  },
  "cuire": {
    "fr": "cuire",
    "fon": "action de cuire ; bibεtεn ; ɖìɖa ; action de cuire l'igname ; temimε ; cuire à grand feu ; xò zò dŏ",
    "cat": "general"
  },
  "n": {
    "fr": "nŭ",
    "fon": "cuire de la viande ; ɖà làn ; cuire des briques de terre ; mε blĭkì ; cuire le pain ; ɖà wɔBxúxú ; faire",
    "cat": "nature_monde"
  },
  "cuit": {
    "fr": "cuit",
    "fon": "ɖìɖa ; être cuit ; bĭ kàn",
    "cat": "general"
  },
  "culte": {
    "fr": "culte",
    "fon": "nŭsinsεn ; sinsεn ; culte de dieu ; măwù sínsεn ; culte des ancêtres ; kútítɔCnú ; culte des morts",
    "cat": "spirituel_fa"
  },
  "curé": {
    "fr": "curé",
    "fon": "yɛhwenɔgăn",
    "cat": "general"
  },
  "cuve": {
    "fr": "cuve",
    "fon": "gbă",
    "cat": "general"
  },
  "dalle": {
    "fr": "dalle",
    "fon": "kpè ; dalle construite ; kpe mimε",
    "cat": "general"
  },
  "dame": {
    "fr": "dame",
    "fon": "nyɔBnú ɖaxó ; dame au teint clair ; navɔB",
    "cat": "general"
  },
  "damer": {
    "fr": "damer",
    "fon": "action de damer ; zìnzín ; action de damer la route ; agbăsa zinzín",
    "cat": "general"
  },
  "dans": {
    "fr": "dans",
    "fon": "ɖŏ è mε ; ɖŏ mε ; nu ; dans la tête ; ɖò ta mε ; dans un bref délai ; malinmálín mε ; postposition",
    "cat": "sante_tisane"
  },
  "danse": {
    "fr": "danse",
    "fon": "wè ; weɖuɖú ; bondir et faire un pas de danse ; tlɔC gbò ; danse à deux ; asádánnyídánnyí ; danse",
    "cat": "general"
  },
  "àleuropéenne": {
    "fr": "à l'européenne",
    "fon": "asádánnyídánnyí ; danse de joie du vainqueur ; ahwannɔwè ; danse en l'honneur du fâ",
    "cat": "spirituel_fa"
  },
  "ùgò": {
    "fr": "-ɖù gò",
    "fon": "faire danser l'escargot sur le revers de la main ; ɖù gò ; faire danser quelqu'un ; dŏ wè nú mε",
    "cat": "general"
  },
  "dard": {
    "fr": "dard",
    "fon": "dard d'abeille ; wìínsɛC ; dard de la guêpe ; gbɔBnvε sε ; dard de l'abeille ; wììn sε ; dard des insectes",
    "cat": "general"
  },
  "date": {
    "fr": "date",
    "fon": "hwenu ; date de l'alliance ; akɔjεgbè ; de vieille date ; xwetítíxwegbàn",
    "cat": "general"
  },
  "datte": {
    "fr": "datte",
    "fon": "sélí",
    "cat": "general"
  },
  "de": {
    "fr": "de",
    "fon": "sín",
    "cat": "general"
  },
  "dé": {
    "fr": "dé",
    "fon": "dé à jouer ; sí ; xú",
    "cat": "general"
  },
  "débit": {
    "fr": "débit",
    "fon": "débit de boissons ; ahannuxɔsá ; ahannuxwé",
    "cat": "general"
  },
  "rouge": {
    "fr": "rouge",
    "fon": "ganmú ; débris de métaux ; ayàmú ; débris de poterie ; zɛBn xwɛB ; débris fibreux ; lyăn",
    "cat": "general"
  },
  "gbè": {
    "fr": "gbè",
    "fon": "xò gbĕ",
    "cat": "general"
  },
  "décès": {
    "fr": "décès",
    "fon": "cyɔCkúkú ; cyɔCkúmε",
    "cat": "general"
  },
  "décor": {
    "fr": "décor",
    "fon": "vivanú",
    "cat": "general"
  },
  "dm": {
    "fr": "dŏ mε",
    "fon": "tá",
    "cat": "general"
  },
  "gdò": {
    "fr": "gŭdò",
    "fon": "yì nùkán mε",
    "cat": "general"
  },
  "déité": {
    "fr": "déité",
    "fon": "déité androgyne ; xεbyoso ; déité de la famille ; akɔ vodún ; déité de la forêt ; nùkánme vodún",
    "cat": "famille_societe"
  },
  "dusol": {
    "fr": "du sol",
    "fon": "ayì vodún ; déité d'une ville, d’un pays ; tò vodún ; déité familiale ; hεHnnu vodún ; déité jumelle",
    "cat": "famille_societe"
  },
  "déjà": {
    "fr": "déjà",
    "fon": "ko ; xóxó",
    "cat": "general"
  },
  "délai": {
    "fr": "délai",
    "fon": "azànɖíɖó ; azànɖúɖó ; action de fixer un délai ; azànɖíɖó ; azànɖúɖó",
    "cat": "general"
  },
  "wh": {
    "fr": "wɔh",
    "fon": "dŏ wɔH sìn ; délayer de la farine pour la mettre dans la sauce ; fàn línfín dó nùsúnnú ɔC mε ; délayer",
    "cat": "general"
  },
  "délit": {
    "fr": "délit",
    "fon": "hwε",
    "cat": "general"
  },
  "déluré": {
    "fr": "déluré",
    "fon": "qualifie un enfant déluré ; azingblεntεn",
    "cat": "famille_societe"
  },
  "demande": {
    "fr": "demande",
    "fon": "byɔBbyɔC ; kinkanbyɔC ; nùbyɔCbyɔC ; nùbyɔBbyɔ ; demande de la main d'une femme à la famille",
    "cat": "famille_societe"
  },
  "demandeenmariage": {
    "fr": "demande en mariage",
    "fon": "asibyɔCbyɔC ; asibyɔCɖótè",
    "cat": "famille_societe"
  },
  "filleenmariage": {
    "fr": "fille en mariage",
    "fon": "vìbyɔCbyɔC ; celui qui demande à manger ; nùbyɔCɖútɔC ; demander à épouser une femme",
    "cat": "famille_societe"
  },
  "mghn": {
    "fr": "mɛ gɔhn",
    "fon": "demander grâce ; dŏ kεnklεεn ; demander la permission à quelqu'un ; byɔ ɖŏ mε nŭ",
    "cat": "general"
  },
  "mendier": {
    "fr": "mendier",
    "fon": "byɔH nŭ ; demander un renseignement à quelqu'un ; bà nŭ dò ; demander une fille en mariage",
    "cat": "famille_societe"
  },
  "byhn": {
    "fr": "byɔh nŭ",
    "fon": "demander une permission ; byɔH gbè ; demanderà entrer en relation avec une fille ; byɔH gbè",
    "cat": "general"
  },
  "demi": {
    "fr": "demi",
    "fon": "adaɖé ; à demi ; ɖiblà ; demi-noyau pour faire le chapelet divinatoire ; akplε ; faire demi-tour",
    "cat": "general"
  },
  "démon": {
    "fr": "démon",
    "fon": "awŏvì ; yε kwíjí kwíjí",
    "cat": "general"
  },
  "fláay": {
    "fr": "-flá ayĭ",
    "fon": "dĭn... wŭ ; dépasser un endroit ; fɔBn wŭ",
    "cat": "general"
  },
  "ayò": {
    "fr": "ayò",
    "fon": "faire des dépenses inconsidérées ; ɖù ayò",
    "cat": "general"
  },
  "dépit": {
    "fr": "dépit",
    "fon": "xomɛsìn ; en dépit de ; có",
    "cat": "general"
  },
  "dépôt": {
    "fr": "dépôt",
    "fon": "dépôt d'une boisson dans bouteille ; gɔB",
    "cat": "general"
  },
  "mb": {
    "fr": "mɛb",
    "fon": "depuis si longtemps ; gbógbó nε ɔC jεn ɖíè ; depuis toujours ; sín tεgbε ɔC",
    "cat": "general"
  },
  "dernier": {
    "fr": "dernier",
    "fon": "gùdó tɔBn ; tó ; vivɔ ; vuvɔ ; dernier enfant (péjoratif) ; jàxwlε ; dernière raclure de pâte",
    "cat": "famille_societe"
  },
  "wojáxwlc": {
    "fr": "wojáxwlɛc",
    "fon": "être le dernier ; gbɔBn tó ; le dernier enfant ; kpodé ; kpodwé ; le dernier jour du monde ; gbε",
    "cat": "famille_societe"
  },
  "derrièrelamaison": {
    "fr": "derrière la maison",
    "fon": "xwé gŭdo ; derrière la tête ; zogudó ; derrière le cou ; kɔgbεnnu ; derrière le cou",
    "cat": "sante_tisane"
  },
  "kognu": {
    "fr": "kogɔnu",
    "fon": "derrière lui ; gùdó tɔBn ; derrière moi ; gùdó cè ; être derrière quelqu'un ; ɖò mε gŭdò ; le",
    "cat": "general"
  },
  "dès": {
    "fr": "dès",
    "fon": "dès que ; ée ; káká yí jε gàn ɖ'é mε",
    "cat": "general"
  },
  "kpbnm": {
    "fr": "kpɔbn mε",
    "fon": "descendre d'un véhicule ; jε tè sín hŭn mε ; faire descendre (d'un arbre, d'un véhicule) ; ɖè",
    "cat": "nature_monde"
  },
  "désir": {
    "fr": "désir",
    "fon": "jìjló ; jlŏ ; jlojló ; nùjíjló ; nujìjló ; nùjlòjló ; nùjlómε ; nùjlómεnú ; désir démesuré ; nùjlómεdíngàn",
    "cat": "general"
  },
  "dessus": {
    "fr": "dessus",
    "fon": "d’é nú ; dŏ é nú ; au-dessus de ; jĭ ; dessus de la tête ; ahɔnlomε ; dessus du plafond ; azají ; le",
    "cat": "sante_tisane"
  },
  "vojij": {
    "fr": "vojijε",
    "fon": "se détacher (malgré les précautions prises) ; flε ; se détacher et tomber dans ; flε kpɔBn",
    "cat": "general"
  },
  "détourner": {
    "fr": "détourner",
    "fon": "gbàdá ; celui qui détourne tout à son profit ; nùwlóɖútɔC ; détourner la tête de quelqu'un",
    "cat": "sante_tisane"
  },
  "ù": {
    "fr": "ɖù",
    "fon": "détourner quelque chose pour se faire de l'argent ; wlŏ nŭ sà ; détourner une partie de la",
    "cat": "general"
  },
  "détruire": {
    "fr": "détruire",
    "fon": "fó ; gblĕ ; hεn gblĕ ; hεn kíja ; détruire en éparpillant ; kíjá ; détruire une famille ; sú kún dŏ",
    "cat": "famille_societe"
  },
  "dette": {
    "fr": "dette",
    "fon": "axɔC ; avoir une dette envers quelqu'un ; ɖù axɔC dŏ mε ; faire des dettes ; ɖù axɔC ; ɖù axɔC dŏ mε",
    "cat": "general"
  },
  "deux": {
    "fr": "deux",
    "fon": "owè ; wè ; deux à deux ; we wè ; wè wè ; webɔB webɔB ; deux cents ; afɔɖé ; deux cents cauris ou",
    "cat": "general"
  },
  "webb": {
    "fr": "webɔb",
    "fon": "les deux ensemble ; webɔB webɔB",
    "cat": "general"
  },
  "dévaster": {
    "fr": "dévaster",
    "fon": "dévaster une famille ; sú kún dŏ",
    "cat": "famille_societe"
  },
  "devenir": {
    "fr": "devenir",
    "fon": "hùzú ; zùn ; devenir adolescente ; wìnnyá ; devenir ami ; hùzú xɔCntɔBn ; zùn xɔCntɔBn xá mɛ",
    "cat": "famille_societe"
  },
  "nukúnm": {
    "fr": "nukúnmε",
    "fon": "devenir coutumier ; mă ; devenir enceinte ; kεn jε mε wŭ ; mɔB xò ; devenir enragé ; jε mà",
    "cat": "sante_tisane"
  },
  "devenirfamilier": {
    "fr": "devenir familier",
    "fon": "mă ; devenir fou ; bεH lεn ; hùn lεn ; devenir ; devenir fou ; jε mà ; wlĭ ta ɖù ; devenir",
    "cat": "famille_societe"
  },
  "desplantes": {
    "fr": "des plantes",
    "fon": "vùn ; devenir touffu et envahissant ; vùn ; devenir vaudoun ; zùn vodún ; devenir vieux",
    "cat": "sante_tisane"
  },
  "dxó": {
    "fr": "dŏ xó",
    "fon": "devenu blanc après avoir été coloré ; wŏ",
    "cat": "general"
  },
  "devin": {
    "fr": "devin",
    "fon": "akannɔB ; amaxotɔC ; bokɔCɖáxó ; fákántɔC ; mwεkantɔC ; nùkántɔC ; tɔkantɔC ; devin interprète du Fá",
    "cat": "general"
  },
  "bàb": {
    "fr": "bàbă",
    "fon": "devin menteur ; bokɔCnɔB awogbogbo ; devin qui consulte les morts ; asɔxotɔC ; l’un des noms",
    "cat": "general"
  },
  "honorifiquesdufá": {
    "fr": "honorifiques du fá",
    "fon": "fa ayìdègún",
    "cat": "spirituel_fa"
  },
  "diète": {
    "fr": "diète",
    "fon": "nubiblá ; nublablá",
    "cat": "general"
  },
  "dieu": {
    "fr": "dieu",
    "fon": "alɔnusε ; dadá sεgbó ; gbε ; măwŭ ; sε ; sεgbó ; dieu créateur ; sεmεɖó ; dieu le père tout puissant",
    "cat": "spirituel_fa"
  },
  "mwùtcnbìwùkpétc": {
    "fr": "măwù tɔc nŭbìwùkpétɔc",
    "fon": "dieu maître de tout ; măwŭ gànhúnútɔC ; le dieu créateur ; dadá sεgbó ; le dieu",
    "cat": "spirituel_fa"
  },
  "delafoudre": {
    "fr": "de la foudre",
    "fon": "jìxɔCsú ; le dieu du tonnerre ; agbò lεnsú ; le dieu qui a découpé une partie de la terre pour",
    "cat": "spirituel_fa"
  },
  "lavie": {
    "fr": "la vie",
    "fon": "gbεwuvε",
    "cat": "general"
  },
  "digne": {
    "fr": "digne",
    "fon": "susunɔB ; tɔsúnú ; digne d’hommage ; avalúnɔB ; ɖigne de confiance ; ɖèjìd’éwú ; être digne de ; jε",
    "cat": "general"
  },
  "dim": {
    "fr": "dim",
    "fon": "jeu consistant à chercher un objet caché ; báɖεε ; jeu de l'escargot ; akotósísε",
    "cat": "general"
  },
  "dîme": {
    "fr": "dîme",
    "fon": "kuzŭ",
    "cat": "general"
  },
  "dinde": {
    "fr": "dinde",
    "fon": "tlŏtlŏ ; tlŏtlŏ asì",
    "cat": "general"
  },
  "dîner": {
    "fr": "dîner",
    "fon": "dîner où l'on a invité amis et voisins ; jògbĕ",
    "cat": "famille_societe"
  },
  "dingo": {
    "fr": "dingo",
    "fon": "nùlúnɔB",
    "cat": "general"
  },
  "dire": {
    "fr": "dire",
    "fon": "ɖɔB ; ɖɔB jí ; à vrai dire ; é nyɔC wá ɔC ; action de dire ; ɖiɖɔ ; dire à quelqu'un ; ɖɔB nú mε ; dire ce que",
    "cat": "general"
  },
  "gbl": {
    "fr": "gblŏ",
    "fon": "fàn gblŏ ; dire des louanges d'un vaudoun pour obtenir quelque chose de lui ; xò ɖɛB nú vodún",
    "cat": "general"
  },
  "bl": {
    "fr": "bɔlŭ",
    "fon": "dire la vérité ; ɖɔB nùgbó ; dire sa faute ; ɖɔB hwε ; dire ses péchés ; ɖɔB hwε ; dire un bon mot pour",
    "cat": "general"
  },
  "lesfamilles": {
    "fr": "les familles",
    "fon": "gbaxwégbáxwé",
    "cat": "famille_societe"
  },
  "xwb": {
    "fr": "xwɛb",
    "fon": "disparaître en parlant d'une bosse ; mìmí ; disparaître mystérieusement ; dŏ zĭn ; fò",
    "cat": "general"
  },
  "dispendieux": {
    "fr": "dispendieux",
    "fon": "vεH axì",
    "cat": "spirituel_fa"
  },
  "bjl": {
    "fr": "ɖɔb jlε",
    "fon": "ɖɔB jlεH ; ɖɔB jlεH xá mε ; se disputer quelque chose ; hwlεHn",
    "cat": "general"
  },
  "dit": {
    "fr": "dit",
    "fon": "ɖiɖɔ",
    "cat": "general"
  },
  "divorce": {
    "fr": "divorce",
    "fon": "divorce demandé par la femme ; asúgbígbε ; divorce demandé par le mari ; asigbibé ; prétexte",
    "cat": "famille_societe"
  },
  "dix": {
    "fr": "dix",
    "fon": "wŏ ; dix francs ; ɖɔHla wè",
    "cat": "general"
  },
  "dodu": {
    "fr": "dodu",
    "fon": "kpɔnnɔɔB ; kpɔCnnɔCkpɔCnnɔC",
    "cat": "general"
  },
  "doigt": {
    "fr": "doigt",
    "fon": "alɔví ; l'homme à cinq doigts ; atwεn ; petit doigt ; alɔvíɖòtoé ; alɔvítókε ; tétéɖéví ; tókε",
    "cat": "general"
  },
  "don": {
    "fr": "don",
    "fon": "fεnú ; nùnámε ; nùnìná ; don de dieu ; sεnúnámε ; don en espèce et en nature ; zojɛBxwéjí",
    "cat": "spirituel_fa"
  },
  "donc": {
    "fr": "donc",
    "fon": "hŭn ; ká ; lá ; donc ! ; lóo ! ; mε !",
    "cat": "general"
  },
  "donnerduballonnementintestinal": {
    "fr": "donner du ballonnement intestinal",
    "fon": "jĭ gò nú mε ; donner du poison à quelqu'un ; dŏ nŭ nŭ mε nú mε",
    "cat": "sante_tisane"
  },
  "ladot": {
    "fr": "la dot",
    "fon": "jŏ agbàn nú mε ; donner la fessée à quelqu'un ; gbà yonu nú mε ; donner la main à quelqu'un",
    "cat": "general"
  },
  "nalbm": {
    "fr": "nă alɔb mε",
    "fon": "donner la permission à quelqu'un ; ɖè gbè nú mε ; donner la réponse sur quelque chose à",
    "cat": "general"
  },
  "sùnnyikcm": {
    "fr": "-sùn nyikɔc mε",
    "fon": "donner ; donner un remède à quelqu'un ; dŏ amà mε ; donner un surnom à quelqu'un",
    "cat": "sante_tisane"
  },
  "nynúm": {
    "fr": "ɖŏ nyĭ nú mε",
    "fon": "donner une amende à quelqu'un ; kán àkwε nú mε ; donner une chiquenaude ; sε sε",
    "cat": "general"
  },
  "unnomàquelquun": {
    "fr": "un nom à quelqu'un",
    "fon": "nyìsúnmε ; le fait de donner une fille en mariage ; vìnàsú ; donner ; le fait de se",
    "cat": "famille_societe"
  },
  "soi": {
    "fr": "soi",
    "fon": "dɔH gbĕ ; ne pas dormir ; nɔB wunzεn",
    "cat": "general"
  },
  "dos": {
    "fr": "dos",
    "fon": "ɖì bè ; gbegbé ; negbé ; action de se mettre sur le dos par respect ; kɔCɖíɖé ; au dos ; gbegbé ; nεgbé",
    "cat": "famille_societe"
  },
  "dot": {
    "fr": "dot",
    "fon": "agbàn ; asigbàn ; dot d'acceptation de main ; gbeyíhàn ; dot pour demander la main de la fille à la",
    "cat": "general"
  },
  "famille": {
    "fr": "famille",
    "fon": "asibyɔCgbàn ; dot pour prendre la femme chez-soi ; asikplágbàn ; dot sous forme de monnaie",
    "cat": "famille_societe"
  },
  "asikw": {
    "fr": "asikwε",
    "fon": "petite dot ; gbeyigbán",
    "cat": "general"
  },
  "dote": {
    "fr": "dote",
    "fon": "petite dote ; agban kpεví",
    "cat": "general"
  },
  "douillet": {
    "fr": "douillet",
    "fon": "kεbɔC ; douillet pour un enfant ; vεjε ; être douillet ; ɖɔB vĭ ; faire le douillet ; blŏ vĭ ; blŏ yɛByɛC",
    "cat": "famille_societe"
  },
  "ybyc": {
    "fr": "-ɖɔ yɛbyɛc",
    "fon": "douillet ; faire le douillet ; ɖɔB yεyε ; ɖŏ vεjε",
    "cat": "general"
  },
  "douleur": {
    "fr": "douleur",
    "fon": "flú ; nùvìvε ; nùvεnúmε ; vìvε ; wùvɛC ; wùvìvɛC ; yà ; douleur de l'enfantement ; vìnú ; douleur",
    "cat": "sante_tisane"
  },
  "lancinantedansledos": {
    "fr": "lancinante dans le dos",
    "fon": "xúɖúxúɖú ; douleur morale ; yajiji ; être dans les douleurs de l'enfantement ; jε",
    "cat": "sante_tisane"
  },
  "doute": {
    "fr": "doute",
    "fon": "exprime un doute qui a été vérifié ; vε dŏ ...wε sín ; vε... sín",
    "cat": "general"
  },
  "douve": {
    "fr": "douve",
    "fon": "douve de tonneau ; gbà xwlε",
    "cat": "nature_monde"
  },
  "doux": {
    "fr": "doux",
    "fon": "fífá ; mεfífá ; être doux ; fá ; fá xomε ; vìví",
    "cat": "general"
  },
  "douze": {
    "fr": "douze",
    "fon": "wĕwè ; wŏwè",
    "cat": "general"
  },
  "drap": {
    "fr": "drap",
    "fon": "gbɔBfúnvɔB ; lεngbɔCfúnvɔB ; drap de lit ; zanjívɔB ; zànjívɔB",
    "cat": "general"
  },
  "dresser": {
    "fr": "dresser",
    "fon": "dĕ ; slɔC ; dresser la tête ; sɔC kɔB té ; dresser le cou ; sɔC kɔB té ; dresser le cou, la tête ; sɔC kɔB tè",
    "cat": "sante_tisane"
  },
  "droit": {
    "fr": "droit",
    "fon": "ayì ɖò wεn ; ɖiɖi ; ganjí ; hwε ; jìjlɔC ; jlɔBjlɔC ; télélé ; titewungbè ; tlɔlɔB ; tlélé ; droit d'aînesse ; viɖàxó",
    "cat": "general"
  },
  "ac": {
    "fr": "acε",
    "fon": "viɖàxó cε ; droit ; droit et de grande taille ; ginnaà ; droit pour un adolescent ; fánnáfánná ; droit",
    "cat": "general"
  },
  "duper": {
    "fr": "duper",
    "fon": "blεH ; flú",
    "cat": "general"
  },
  "durée": {
    "fr": "durée",
    "fon": "hwenu ; jididɔC ; jidudɔC",
    "cat": "general"
  },
  "durer": {
    "fr": "durer",
    "fon": "dɔH jì ; dε ; xɔB ; durer (en parlant des aliments) ; tε ; durer longtemps ; dɔH jì ; le fait de durer",
    "cat": "general"
  },
  "eau": {
    "fr": "eau",
    "fon": "gùn ; sìn ; sùn ; eau à boire ; sinnunu ; eau agitée ; tɔxixo ; tɔxuxo ; eau baptismale ; yɛhwesìn ; au",
    "cat": "nature_monde"
  },
  "nunu": {
    "fr": "nunu",
    "fon": "sinnunu ; eau pour les libations ; ɖεxosìn ; eau salée ; jεsìn ; eau stagnante ; tán ; eau tiède ; sin",
    "cat": "nature_monde"
  },
  "ébahi": {
    "fr": "ébahi",
    "fon": "yɛyinɔB ; yeyunɔB",
    "cat": "general"
  },
  "écart": {
    "fr": "écart",
    "fon": "à l'écart ; azɔgà ; cáɖáá ; céɖéé ; kádáá ; vò ; vokán vokán ; aller se mettre à l'écart ; sε jε zɔB ; être à",
    "cat": "general"
  },
  "écartersesplumescaudales": {
    "fr": "écarter ses plumes caudales",
    "fon": "gbà vă ; écarter un malheur pour un sacrifice au Fá ; ɖè adlà ; s'écarter de",
    "cat": "spirituel_fa"
  },
  "échange": {
    "fr": "échange",
    "fon": "ɖyɔBɖyɔC ; nùɖyɔBɖyɔC ; échange de filles entre deux familles pour des mariaqes ; ɖyɔHnŭ",
    "cat": "famille_societe"
  },
  "échec": {
    "fr": "échec",
    "fon": "afɔkú",
    "cat": "general"
  },
  "écho": {
    "fr": "écho",
    "fon": "yɛflú",
    "cat": "general"
  },
  "échos": {
    "fr": "échos",
    "fon": "xɔxɔB",
    "cat": "general"
  },
  "éclat": {
    "fr": "éclat",
    "fon": "ɖiɖì ; avec éclat ; lánlán ; mlamlà ; éclat de la lune ; sunhwlé ɖiɖì",
    "cat": "nature_monde"
  },
  "école": {
    "fr": "école",
    "fon": "azɔHmε ; azɔBmεxwé ; wèmàxɔC ; wèmàxɔCmɛB ; wèxɔCmɛB ; école de base ; wèmàxɔCmε dokɔ tɔBn ; école",
    "cat": "general"
  },
  "tbn": {
    "fr": "tɔbn",
    "fon": "écouter en cachette ; xɔC tó ; écouter et mettre en pratique ; sè bo blŏ ; écouter sans agir en",
    "cat": "general"
  },
  "wmà": {
    "fr": "wĕmà",
    "fon": "écrire une lettre à quelqu'un ; wlăn wĕmà sɛC dó mɛ",
    "cat": "general"
  },
  "écrit": {
    "fr": "écrit",
    "fon": "nù wlànwlán ; wèmà wínwlán ; wìnwlán",
    "cat": "general"
  },
  "écume": {
    "fr": "écume",
    "fon": "àfíntúnkplɔH ; afúntúnkplɔH ; àfúntúnkplɔH ; fún ; écume d'huile de palme ; amifún",
    "cat": "famille_societe"
  },
  "éduquer": {
    "fr": "éduquer",
    "fon": "éduquer un enfant ; hεn vĭ",
    "cat": "famille_societe"
  },
  "égard": {
    "fr": "égard",
    "fon": "sísí",
    "cat": "general"
  },
  "égaré": {
    "fr": "égaré",
    "fon": "bùbú ; yɛyinɔB ; yeyunɔB",
    "cat": "general"
  },
  "égaux": {
    "fr": "égaux",
    "fon": "être égaux ; ɖò zɛɛCn",
    "cat": "general"
  },
  "égout": {
    "fr": "égout",
    "fon": "ayìsúnhwín",
    "cat": "general"
  },
  "eh": {
    "fr": "eh",
    "fon": "eh bien ! ; kóoyì ! ; kóyì !",
    "cat": "general"
  },
  "élève": {
    "fr": "élève",
    "fon": "nùkplɔCntɔC ; nùkplɔCnví ; wèmàkplɔCntɔC ; wèmàxɔCmɛCví ; d'un prix élevé ; vìvε",
    "cat": "general"
  },
  "élevé": {
    "fr": "élevé",
    "fon": "gaga ; être d'un prix élevé ; vεH axì",
    "cat": "general"
  },
  "élever": {
    "fr": "élever",
    "fon": "zĕ ; zĕ yì jĭ ; élever de terre ; zĕ sín ayĭ ; élever des animaux ; nyì ; élever des bovins ; nyì nyibú",
    "cat": "sante_tisane"
  },
  "zgbèyìj": {
    "fr": "-zĕ gbè yì jĭ",
    "fon": "élever les murs d'une maison ; mε xɔB ; élever un enfant ; hεn vĭ ; s'élever au dessus de",
    "cat": "famille_societe"
  },
  "élire": {
    "fr": "élire",
    "fon": "cyăn ; action d’élire ; cyáncyán ; élire un chef ; sɔC mε găn",
    "cat": "general"
  },
  "elle": {
    "fr": "elle",
    "fon": "é ; éyε ; à elle ; n'í",
    "cat": "general"
  },
  "elles": {
    "fr": "elles",
    "fon": "yĕ",
    "cat": "general"
  },
  "nukbn": {
    "fr": "nukɔbn",
    "fon": "ɖŏ wŭ zɔB nú",
    "cat": "general"
  },
  "élu": {
    "fr": "élu",
    "fon": "un élu ; mε cyáncyán",
    "cat": "general"
  },
  "émanciper": {
    "fr": "émanciper",
    "fon": "émanciper un enfant ; hùn tó nú yɔkpɔCvú",
    "cat": "famille_societe"
  },
  "émoi": {
    "fr": "émoi",
    "fon": "akpakpà ; xɛsì ; être en émoi ; xò zĭn",
    "cat": "general"
  },
  "empan": {
    "fr": "empan",
    "fon": "alɔbá ; bă",
    "cat": "general"
  },
  "dè": {
    "fr": "dè",
    "fon": "empêcher la mort de venir ; xε kú ; empêcher la mort de venir en lui donnant ce qu'elle veut ; ɖyɔH",
    "cat": "general"
  },
  "kú": {
    "fr": "kú",
    "fon": "xɛC kú ; empêcher la pluie de tomber ; klɔCn jĭ ; glɔCn jĭ ; empêcher l'efficacité d'un bô ; klɔCn bŏ",
    "cat": "nature_monde"
  },
  "empoisonnement": {
    "fr": "empoisonnement",
    "fon": "nùdónùmεnúmε ; sorte d'empoisonnement ; alăn",
    "cat": "sante_tisane"
  },
  "empoisonner": {
    "fr": "empoisonner",
    "fon": "empoisonner quelqu'un ; ɖŏ alăn nú mε ; empoisonner quelqu'un ; dŏ nŭ nŭ mε nú mε",
    "cat": "sante_tisane"
  },
  "afdò": {
    "fr": "afɔdò",
    "fon": "afɔdomε ; empreinte d'une chaussure ; afɔkpadò",
    "cat": "general"
  },
  "empressé": {
    "fr": "empressé",
    "fon": "être empressé à saluer les gens ; yă wŭ dŏ mɛ",
    "cat": "famille_societe"
  },
  "empressement": {
    "fr": "empressement",
    "fon": "cɔcɔB ; avec empressement ; klεnklεn ; empressement à recevoir ou à saluer quelqu'un",
    "cat": "famille_societe"
  },
  "akwc": {
    "fr": "akwɛc",
    "fon": "emprunter quelque chose à quelqu'un ; hwĕ nŭ ɖò mε así",
    "cat": "general"
  },
  "ému": {
    "fr": "ému",
    "fon": "être ému ; xò zĭn",
    "cat": "general"
  },
  "enceinte": {
    "fr": "enceinte",
    "fon": "action de mettre une femme enceinte ; xodudó ; enceinte fortifiée ; agbŏdò ; être enceinte",
    "cat": "sante_tisane"
  },
  "amnu": {
    "fr": "aɖĭ ɖŏ mε nu",
    "fon": "ɖŏ adɔgò ; ɖò xò ; ɖŏ xò ; mɔB adɔgò ; sùn nɔ tè nú mε ; xò ɖò mɛ nu ; être enceinte avant",
    "cat": "sante_tisane"
  },
  "lâge": {
    "fr": "l'âge",
    "fon": "gbà zεHn ; femme enceinte (car elle ne voit pas ce qu'elle va devenir) ; nukúnnɔB",
    "cat": "sante_tisane"
  },
  "wùlbkpá": {
    "fr": "wùlɛbkpá",
    "fon": "enclos pour le bétail ; kpámε ; enclos pour le bokinà ; kpámε ; enclos pour le couvent de tel",
    "cat": "spirituel_fa"
  },
  "outelvaudoun": {
    "fr": "ou tel vaudoun",
    "fon": "kpámε ; enclos sacré de la société secrète des kûtiti ; gbalε",
    "cat": "spirituel_fa"
  },
  "encre": {
    "fr": "encre",
    "fon": "wèmàsín ; encre en poudre violette ou autre ; kwélè ; kólè ; encre rouge ; swè",
    "cat": "general"
  },
  "endormir": {
    "fr": "endormir",
    "fon": "endormir quelqu'un ; ɖŏ sεnmlɔB nú mε ; endormir un enfant ; xwè vĭ dŏ amlɔB mε ; xwè xĭ dlɔH",
    "cat": "famille_societe"
  },
  "enfant": {
    "fr": "enfant",
    "fon": "aɖì ; nyaví ; vĭ ; vŭ ; yakpɔC ; avoir un enfant ; jì vĭ ; avoir un enfant alors que le précédent tète",
    "cat": "famille_societe"
  },
  "lamamelle": {
    "fr": "la mamelle",
    "fon": "vĭ ɖ’ànɔBnu ; enfant à la mamelle ; vĭɖanɔnú ; yakpɔCvú ɖò anɔnú ; yɔkpɔCvú ɖò anɔnú ; enfant",
    "cat": "famille_societe"
  },
  "adultérin": {
    "fr": "adultérin",
    "fon": "agaví ; enfant au pair ; vìɖómεgɔCn ; vĭɖòmεgɔCn ; enfant au service d'une famille ; vìɖòmεgɔCn",
    "cat": "famille_societe"
  },
  "enfantblanc": {
    "fr": "enfant blanc",
    "fon": "yovóví ; yovóvú ; aɖimεví ; aɖiví ; enfant de la maison de la mère ; nylɔylɔvĭ ; enfant du",
    "cat": "famille_societe"
  },
  "pays": {
    "fr": "pays",
    "fon": "toví ; enfant encore à la mamelle quand sa mère devient enceinte ; kpεdóví ; kpεdóvú ; enfant",
    "cat": "sante_tisane"
  },
  "gâté": {
    "fr": "gâté",
    "fon": "kpεdóvú ; vì tíntεn ; vìkíkε ; enfant illégitime ; alɔmawlíví ; enfant issu d'un mariage chrétien",
    "cat": "famille_societe"
  },
  "alwlitcví": {
    "fr": "alɔwlitɔcví",
    "fon": "enfant maladif ; azɔnví ; enfant prodigue ; akpavú ; enfant qui est toujours malade ; azɔnví",
    "cat": "famille_societe"
  },
  "enfantquihérite": {
    "fr": "enfant qui hérite",
    "fon": "xùɖùví ; enfant qui n'est pas encore sevré ; kpε ; faire l’enfant ; blŏ nŭ ; ɖɔB vĭ ; les",
    "cat": "famille_societe"
  },
  "kpká": {
    "fr": "kpεká",
    "fon": "petit enfant chéri ; kóɖó ; petits enfants ; yɔkpwɛCyɔkpwɛC ; un enfant ; klíklí",
    "cat": "famille_societe"
  },
  "enfantement": {
    "fr": "enfantement",
    "fon": "ajì ; jiji ; vìjíjí",
    "cat": "famille_societe"
  },
  "enfanter": {
    "fr": "enfanter",
    "fon": "gbà gò ; jì ; jì vĭ ; enfanter (pop.) ; gbà gò ; enfanter avec un enfant encore au sein ; jì kpε ; ne",
    "cat": "famille_societe"
  },
  "plusenfanter": {
    "fr": "plus enfanter",
    "fon": "kpò vĭ",
    "cat": "famille_societe"
  },
  "enfer": {
    "fr": "enfer",
    "fon": "zomɛB ; l'enfer mythologique ; kújεsúsava",
    "cat": "general"
  },
  "enflé": {
    "fr": "enflé",
    "fon": "bεtεε ; dede ; gɔɖɔɖɔB ; titε ; être enflé ; flɔC ; être enflé ; hlɔHn",
    "cat": "general"
  },
  "dafbm": {
    "fr": "dŏ afɔb mε",
    "fon": "dŏ afɔB wezùn mɛB ; dŏ gè mε ; s'enfuir dans un autre endroit ; hɔBn jε gbĕ ; s'enfuir en courant",
    "cat": "general"
  },
  "enjeu": {
    "fr": "enjeu",
    "fon": "akɔB",
    "cat": "general"
  },
  "ennui": {
    "fr": "ennui",
    "fon": "adì ; akpɔB ; tagbà ; tagbanú ; wàxálà ; avoir des ennuis ; mɔB akpɔB",
    "cat": "general"
  },
  "gj": {
    "fr": "-gεjεε",
    "fon": "kloklo ; kpayakpayà ; lajaà ; nyatinnyatín ; vannyaà ; vannyavannyà ; énorme (s'applique aux",
    "cat": "general"
  },
  "kàn": {
    "fr": "kàn",
    "fon": "enrouler une natte ; mlă zàn ; s'enrouler ; xásá ; s'enrouler autour de quelque chose ; sló dŏ nŭ",
    "cat": "general"
  },
  "b": {
    "fr": "bŭ",
    "fon": "ɖò kpɔC ; ɖŏ kpɔC ; kplé ɖòB kpɔC ; nɔB kpɔC",
    "cat": "general"
  },
  "enterrer": {
    "fr": "enterrer",
    "fon": "ɖì ; action d'enterrer ; ɖiɖì ; enterrer un cadavre ; ɖì cyɔH ; enterrer un enfant ; tlɔC vĭ",
    "cat": "famille_societe"
  },
  "entêtement": {
    "fr": "entêtement",
    "fon": "cejíjεnnágbóɖó ; tamεcici ; tamεsyεnsyεn ; tamεtití ; tasyεnsyεn ; tótlítlí",
    "cat": "sante_tisane"
  },
  "entêter": {
    "fr": "entêter",
    "fon": "s'entêter ; cí tamε ; gblɔHn ; jε kú ; tì tamε ; tlí tó",
    "cat": "sante_tisane"
  },
  "entre": {
    "fr": "entre",
    "fon": "ɖò gbla...mε ; ɖŏ... gbla mε ; gblamε ; tεntín ; entre l'enfance et l'âge viril ; wìnnyá ; entre nous",
    "cat": "general"
  },
  "xólóó": {
    "fr": "xólóó",
    "fon": "entre toi et moi ; xólóó ; entre-deux ; avlà",
    "cat": "general"
  },
  "entretenir": {
    "fr": "entretenir",
    "fon": "entretenir le feu ; sε myɔB dŏ ; s'entretenir familièrement avec quelqu'un ; cyán xó",
    "cat": "famille_societe"
  },
  "entretien": {
    "fr": "entretien",
    "fon": "entretien familier ; xócyáncyán ; entretien secret ; kpáxó",
    "cat": "famille_societe"
  },
  "envie": {
    "fr": "envie",
    "fon": "mεɖĕvonùjlómε ; mεnujlómε ; mεnúsumεnukúnmε ; nùjlómε ; nùjlómεnú ; nukúnɖòmεgbanmε",
    "cat": "general"
  },
  "wbndm": {
    "fr": "wɛbn dŏ mɛ",
    "fon": "envoyer un songe ; xò dlɔH ; envoyer un songe à quelqu'un ; xò dlɔH mɛ",
    "cat": "general"
  },
  "épais": {
    "fr": "épais",
    "fon": "gbejeè ; kpeɖedè ; kpeɖekpeɖè ; kpítí ; kεɖεkεɖε ; kεɖεε ; tlítlí ; épais (haricot salive) ; kpεkoò ; être",
    "cat": "general"
  },
  "xlán": {
    "fr": "xlá nŭ ɖŏ",
    "fon": "épargner quelque chose en labourant ou en sarclant ; xlá nŭ ɖŏ",
    "cat": "general"
  },
  "épée": {
    "fr": "épée",
    "fon": "dεnkpè ; hwĭ ; hwĭsɔB ; épée à deux tranchants ; hwínúwenɔB ; variété d'épée ; akpε",
    "cat": "general"
  },
  "épi": {
    "fr": "épi",
    "fon": "gŏ ; action de porter des épis ; vìfúfɔC ; en épi ; kayakayà ; kεyεkεyε ; kεyεε ; épi de maïs mûr mais",
    "cat": "general"
  },
  "épice": {
    "fr": "épice",
    "fon": "kpéclekún ; ɖadonú",
    "cat": "general"
  },
  "épier": {
    "fr": "épier",
    "fon": "épier quelqu'un ; xwíɖá",
    "cat": "general"
  },
  "épine": {
    "fr": "épine",
    "fon": "wùn ; l'épine dorsale ; nεgbedómε ; une espèce d'épine sur des lianes rampantes ; vεwún",
    "cat": "general"
  },
  "épouser": {
    "fr": "épouser",
    "fon": "dà asì ; épouser une nouvelle femme ; gbé",
    "cat": "famille_societe"
  },
  "habit": {
    "fr": "habit",
    "fon": "fε awù",
    "cat": "general"
  },
  "époux": {
    "fr": "époux",
    "fon": "asisínɔB ; asisúnɔB ; asú ; sú ; yaó'sú",
    "cat": "general"
  },
  "poison": {
    "fr": "poison",
    "fon": "àɖìɖúɖú ; épreuve que l'on fait subir à quelqu'un ; tɔdómεkpɔCn ; les épreuves de la vie",
    "cat": "sante_tisane"
  },
  "éprouverquelquun": {
    "fr": "éprouver quelqu'un",
    "fon": "dŏ yà nú mɛ ; tεn mε kpɔCn ; éprouver une douleur ; ɖù wùwε ; mɔB wùvɛC ; éprouver",
    "cat": "sante_tisane"
  },
  "équilibre": {
    "fr": "équilibre",
    "fon": "faire l'équilibre sur la tête ; sí kɔB dò",
    "cat": "sante_tisane"
  },
  "ergot": {
    "fr": "ergot",
    "fon": "ergot de coq ; hwyŏ ; koklófεn ; hwyabεH ; ergot des gallinacés ; hwìsó",
    "cat": "general"
  },
  "errer": {
    "fr": "errer",
    "fon": "dăn hùn gbɔBn ; flú ; errer à l'abandon ; lèlé ; e sà lelè ; errer sans but ; lèlé ; sà lelè",
    "cat": "general"
  },
  "akotó": {
    "fr": "akotó",
    "fon": "akotóé ; akweté ; variété d’escargot ; lisagwín ; variété de gros escargot ; agbĭn",
    "cat": "general"
  },
  "hnnu": {
    "fr": "hεnnu",
    "fon": "xɔ hennú ; xɔhɛnnú ; espace libre devant une case ; hεnnu ; espace libre devant une habitation",
    "cat": "general"
  },
  "esprit": {
    "fr": "esprit",
    "fon": "ayì ; ayixà ; nŭɖoyεswímε ; sε ; yɛB ; yɛhwè ; esprit (saint) de conseil ; yɛsinsɛn weɖéxámɛtɔC ; esprit",
    "cat": "spirituel_fa"
  },
  "debonté": {
    "fr": "de bonté",
    "fon": "ayiɖagbeɖiɖó ; esprit de justice ; ayiɖagbeɖiɖó ; esprit des eaux ; tɔvodún ; esprit",
    "cat": "spirituel_fa"
  },
  "dhonnêteté": {
    "fr": "d'honnêteté",
    "fon": "ayiɖagbeɖiɖó ; esprit impur ; yε kwíjí kwíjí ; esprit qui demeure dans un arbre ou une",
    "cat": "spirituel_fa"
  },
  "buttedeterre": {
    "fr": "butte de terre",
    "fon": "dàn ; esprit résidant dans la terre ; dàn ; gedé ; kúxɔCsú ; sakpatá ; esprit saint ; yɛsinsɛn",
    "cat": "spirituel_fa"
  },
  "legrandesprit": {
    "fr": "le grand esprit",
    "fon": "dadá sεgbó ; esprit ; le grand esprit ; dadá sεgbó ; les esprits ; nŭ ɖò yɛsí mɛB ; nŭ ɖò",
    "cat": "spirituel_fa"
  },
  "yswímb": {
    "fr": "yɛswí mɛb",
    "fon": "les mauvais esprits ; yɛB dídá lɛC ; l'esprit suprême ; dadá sεgbó ; petits esprits errants et",
    "cat": "spirituel_fa"
  },
  "essai": {
    "fr": "essai",
    "fon": "tεnkpɔCn ; essai que fait l'enfant pour se tenir debout tout seul ; deè",
    "cat": "famille_societe"
  },
  "dkpcn": {
    "fr": "dŏ kpɔcn",
    "fon": "essayer un objet un véhicule ; dŏ kpɔCn",
    "cat": "general"
  },
  "est": {
    "fr": "est",
    "fon": "l'est ; zănzànhwéjí",
    "cat": "general"
  },
  "et": {
    "fr": "et",
    "fon": "bɔB ; ká ; kɔCn ; kpódó... kpán ; lobɔB ; et après ; lobɔB ; et caetera ; kpukpotɔC ; et ensuite ; lobɔB ; et",
    "cat": "general"
  },
  "étage": {
    "fr": "étage",
    "fon": "azají ; à l'étage ; síngbójí",
    "cat": "general"
  },
  "étain": {
    "fr": "étain",
    "fon": "aflélé ; félélé ; flélé",
    "cat": "general"
  },
  "étang": {
    "fr": "étang",
    "fon": "tán ; tɔB",
    "cat": "general"
  },
  "état": {
    "fr": "état",
    "fon": "ninɔ ; nyìnyí ; tomε ; être en très bon état ; céwúncéwún ; le fait d'être en bon état ; ɖagbenunɔB",
    "cat": "general"
  },
  "létat": {
    "fr": "l'état",
    "fon": "ninɔmε ; nunɔmε",
    "cat": "general"
  },
  "tézàn": {
    "fr": "-té zàn",
    "fon": "idée de s'étendre très facilement ; wɛɛɛB ; le fait d'étendre une chose ; títε ; s’étendre ; dlεHn",
    "cat": "general"
  },
  "être": {
    "fr": "être",
    "fon": "ɖè ; nɔB ; nyĭ ; wɛB nyí ; être (lieu, état, manière d'être) ; ɖŏ ; la façon d'être ; ninɔmε ; nunɔmε ; jijɔB",
    "cat": "general"
  },
  "jujb": {
    "fr": "-jujɔb",
    "fon": "ninɔ ; nyìnyí ; petit être vivant ; nùvíɖogbε ; tout être inanimé ; atín kpó kan kpó ; un être vivant",
    "cat": "general"
  },
  "étui": {
    "fr": "étui",
    "fon": "akpà ; akún ; gò ; étui à aiguilles ; avɔtɔnú ; blεfútù ; nyεgó ; étui à flèches ; găgò ; étui pour mettre",
    "cat": "general"
  },
  "eux": {
    "fr": "eux",
    "fon": "yĕ",
    "cat": "general"
  },
  "éveillé": {
    "fr": "éveillé",
    "fon": "être éveillé ; zìn ; qualifie un enfant très éveillé ; azingblεntεn",
    "cat": "famille_societe"
  },
  "éventer": {
    "fr": "éventer",
    "fon": "fε ; nyì afafà ; éventer quelqu’un ; nyì afafà nú mε ; éventrer un animal ; kε",
    "cat": "sante_tisane"
  },
  "exact": {
    "fr": "exact",
    "fon": "ɖŏ ganjí ; ganjínínɔB ; ganjínúnɔB ; gbesisɔ ; gbesusɔ ; sɔB gbè",
    "cat": "general"
  },
  "examiner": {
    "fr": "examiner",
    "fon": "bà kpɔCn ; bɔɖɔB kpɔCn ; bɔɖɔɔB ; gbèjé ; hεn kpɔCn ; kàn bɔH ; kàn byɔH ; kéjé ; kéjé kpɔCn ; kpɔCn",
    "cat": "famille_societe"
  },
  "examinersaconscience": {
    "fr": "examiner sa conscience",
    "fon": "kéjé ayì kpɔCn",
    "cat": "famille_societe"
  },
  "excès": {
    "fr": "excès",
    "fon": "à l’excès ; dín ; díngàn ; celui qui mange avec excès ; mɛ wiwan ; excès de boisson",
    "cat": "general"
  },
  "excrément": {
    "fr": "excrément",
    "fon": "adà ; lanmí ; mĭ ; sɔBnŭɖà ; excrément des animaux ; lan mĭ ; excrément qui reste au derrière",
    "cat": "sante_tisane"
  },
  "nàmh": {
    "fr": "nà mεh",
    "fon": "s'exposer nu au regard de quelqu'un ; nɔ mεH ɖò mε ɖĕvo nukúnmε",
    "cat": "general"
  },
  "fable": {
    "fr": "fable",
    "fon": "lòdónú ; xɛxó ; yɛxó",
    "cat": "general"
  },
  "face": {
    "fr": "face",
    "fon": "nukúnmε ; en face de ; nukɔBn ; kpàn nukɔBn ; faire face ; kpàn nukɔBn ; kpàn nukɔBn ; la face contre",
    "cat": "general"
  },
  "fâcher": {
    "fr": "fâcher",
    "fon": "gblĕ xomɛB ; gblĕ xomε ; action de se fâcher ; xomɛsinsin ; fâcher quelqu'un ; dŏ xomɛsìn mɛ",
    "cat": "spirituel_fa"
  },
  "sefâcher": {
    "fr": "se fâcher",
    "fon": "gblĕ xomɛB ; gblĕ xomε ; sìn xomɛB ; sìn xomɛB dŏ mɛ ; sìn xomε ; sìn xomε dŏ mε ; sìn xomε dŏ",
    "cat": "spirituel_fa"
  },
  "fâcherie": {
    "fr": "fâcherie",
    "fon": "xomɛgbigblé ; xomɛgblegblé",
    "cat": "spirituel_fa"
  },
  "fâcheux": {
    "fr": "fâcheux",
    "fon": "vìvε ; événement fâcheux et inattendu ; nùjεnŭmε ; fâcheuse affaire ; adɔBn",
    "cat": "spirituel_fa"
  },
  "façon": {
    "fr": "façon",
    "fon": "alɔkpà ; de la même façon ; alɔkpa ɖokpó ɔC ; façon d'être ; mεnyinyí ; la façon de se comporter",
    "cat": "general"
  },
  "fade": {
    "fr": "fade",
    "fon": "être fade ; vlεH",
    "cat": "general"
  },
  "fagot": {
    "fr": "fagot",
    "fon": "kɔB ; en fagots ; kɔnukɔnu ; fagot de bois ; nakíkɔBbŭ",
    "cat": "general"
  },
  "faim": {
    "fr": "faim",
    "fon": "kánɖŭkpawùn ; xovɛC ; avoir faim ; xovɛC sìn mɛ",
    "cat": "general"
  },
  "faire": {
    "fr": "faire",
    "fon": "blɔmεvò ; ɖŏ ; wà ; action de faire ; bìbló ; blàblá ; blŏ xá mε ; blòbló ; façon de faire ; nùwálɔB",
    "cat": "general"
  },
  "waalb": {
    "fr": "wa alɔb",
    "fon": "walɔB ; walɔB ; manière de faire ; zìnzán ; ne pas bien faire quelque chose ; ɖè nŭ nyidò ; ne pas",
    "cat": "general"
  },
  "fait": {
    "fr": "fait",
    "fon": "bìbló ; bìbló ; blòbló ; blòbló ; nùwíwá ; nùwúwá ; wiwa ; bien fait ; gbágbà",
    "cat": "general"
  },
  "faîte": {
    "fr": "faîte",
    "fon": "ta ; le faîte de la maison ; xɔta",
    "cat": "general"
  },
  "familiarité": {
    "fr": "familiarité",
    "fon": "hă ; mεmε",
    "cat": "famille_societe"
  },
  "familier": {
    "fr": "familier",
    "fon": "hă ; être familier ; hă ; mă ; tout familier que l'on affectionne : mon chéri ; kóɖó",
    "cat": "famille_societe"
  },
  "famine": {
    "fr": "famine",
    "fon": "adɔB ; kándú",
    "cat": "famille_societe"
  },
  "faner": {
    "fr": "faner",
    "fon": "se faner ; mlŭ ; sún ; xú",
    "cat": "general"
  },
  "fange": {
    "fr": "fange",
    "fon": "bɔH",
    "cat": "general"
  },
  "fard": {
    "fr": "fard",
    "fon": "atínkεn",
    "cat": "general"
  },
  "faux": {
    "fr": "faux",
    "fon": "aɖă ; nyanya ; nyidò ; faux bambou ; bàcε ; faux bruit ; ahòjá ; faux col ; kɔCla ; faux iroko ; gùxɔC",
    "cat": "general"
  },
  "kúhw": {
    "fr": "kú hwε",
    "fon": "faire une faute grave ; gbà acε ; faute cachée ; nŭɖoxomε",
    "cat": "general"
  },
  "fbn": {
    "fr": "fɔbn",
    "fon": "fɔnnù",
    "cat": "general"
  },
  "fée": {
    "fr": "fée",
    "fon": "mamíwátá",
    "cat": "general"
  },
  "fêlé": {
    "fr": "fêlé",
    "fon": "fínfεn",
    "cat": "general"
  },
  "fêler": {
    "fr": "fêler",
    "fon": "fεn",
    "cat": "general"
  },
  "félicitation": {
    "fr": "félicitation",
    "fon": "adánmácyó ; mε kpikpa ; félicitations pour encourager une femme qui vient d'accoucher",
    "cat": "famille_societe"
  },
  "femme": {
    "fr": "femme",
    "fon": "nyɔHnù ; nyɔHHnù ; femme à l'organe génital sans orifice ; klíbotò ; femme adultère ; afɔdógbetɔC",
    "cat": "famille_societe"
  },
  "femmeauteintclair": {
    "fr": "femme au teint clair",
    "fon": "navɔB ; femme au teint sombre ; nawì ; femme chargée de l'initiation des vodúnsì",
    "cat": "famille_societe"
  },
  "ygbà": {
    "fr": "yăgbà",
    "fon": "femme chargée de veiller les morts ; akɔví ɖaxó ; femme de haute taille ; nagà ; nagε ; femme",
    "cat": "famille_societe"
  },
  "delamaison": {
    "fr": "de la maison",
    "fon": "xwésí ; femme ; femme de la maison chargée des cérémonies en l'honneur des autel",
    "cat": "famille_societe"
  },
  "portatif": {
    "fr": "portatif",
    "fon": "tánnyínɔC ; tásínɔC ; femme de mauvaise vie ; tonyatɔC ; femme de quelqu'un ; mε asì ; mε'sì",
    "cat": "famille_societe"
  },
  "femmederencontre": {
    "fr": "femme de rencontre",
    "fon": "alita nyɔHnù ; alitànyɔBnú ; alitànyɔBnú ; femme qui va chercher de l’eau ; tɔyisì",
    "cat": "famille_societe"
  },
  "femmedumari": {
    "fr": "femme du mari",
    "fon": "sísì ; femme du mari de ma mère ; nɔ ce sín asú'sì ; nɔ ce sísì ; femme du roi ; axɔBsí",
    "cat": "famille_societe"
  },
  "axcsì": {
    "fr": "axɔcsì",
    "fon": "axɔCsì ; axɔCsúsì ; femme d’un autre pays prise en mariage ; gbejísì ; gbèjísì ; femme d'un mari",
    "cat": "famille_societe"
  },
  "polygame": {
    "fr": "polygame",
    "fon": "asísì ; asúsì ; femme d'un même clan ; akɔví ; femme d'un roi ; agɔntínmε ; femme élancée",
    "cat": "famille_societe"
  },
  "nagà": {
    "fr": "nagà",
    "fon": "nagε ; femme enceinte ; adɔgonɔB ; gonɔví ; xoxónɔB ; xoxónɔB ; femme frigide ; hwankúnɔB",
    "cat": "sante_tisane"
  },
  "femmemariéechrétiennement": {
    "fr": "femme mariée chrétiennement",
    "fon": "alɔwlísì ; femme mariée dans la concession ; xwégbesì ; femme mariée",
    "cat": "famille_societe"
  },
  "quitrompesonmari": {
    "fr": "qui trompe son mari",
    "fon": "xɔnnɔB ; femme mariée sous le régime de hɔHngbò ; hɔBngbósì ; femme mise en",
    "cat": "famille_societe"
  },
  "unblanc": {
    "fr": "un blanc",
    "fon": "yovó'sì ; femme non étrangère ; xwégbesì ; femme ordinaire ; năwè ; femme ou jeune fille au",
    "cat": "famille_societe"
  },
  "teinttrèsclair": {
    "fr": "teint très clair",
    "fon": "vɔvɔnɔbakεn ; femme qui a un bébé ; vĭnɔB ; femme qui est mère ; vĭnɔB ; femme qui",
    "cat": "famille_societe"
  },
  "préparedesbeignets": {
    "fr": "prépare des beignets",
    "fon": "ganviɖatɔC ; femme qui vend au marché des plantes médicinales ; amasinnɔB",
    "cat": "sante_tisane"
  },
  "vivantenconcubinage": {
    "fr": "vivant en concubinage",
    "fon": "alitànyɔBnú ; femme stérile ; wɛnsinɔB ; femme svelte ; nagà ; nagε ; femme",
    "cat": "famille_societe"
  },
  "sánsì": {
    "fr": "s'ánsì",
    "fon": "la première femme de la maison ; yaalé ; la première femme épousée ; yaalé ; ma femme ; yaó",
    "cat": "famille_societe"
  },
  "cè": {
    "fr": "cè",
    "fon": "yaó mì ; qui a trois femmes ; kantɔnnɔB ; très jeune femme ; asixwé",
    "cat": "famille_societe"
  },
  "fémur": {
    "fr": "fémur",
    "fon": "asáxú",
    "cat": "general"
  },
  "tnkàn": {
    "fr": "tεn kàn",
    "fon": "fendre une tige flexible pour la préparer à attacher les fagots ; tεn kàn ; fendre une tige",
    "cat": "general"
  },
  "fendu": {
    "fr": "fendu",
    "fon": "fínfεn ; zizɛ ; être fendu ; fεn ; zɛB",
    "cat": "general"
  },
  "ferme": {
    "fr": "ferme",
    "fon": "gleta ; gleta ; sɔCCkíkε ; tì ; tεnwùn ; bien ferme ; tikoò ; tikotikò ; être ferme envers quelqu'un",
    "cat": "general"
  },
  "fermé": {
    "fr": "fermé",
    "fon": "bibɔB ; bubɔB ; súsú",
    "cat": "general"
  },
  "myhnu": {
    "fr": "myɔh nu",
    "fon": "fermer la bouche à quelqu'un ; cí xó dŏ nu nú mε ; gbà xó dŏ nu nú mɛ ; gbò xó dŏ nu nú mε",
    "cat": "general"
  },
  "kám": {
    "fr": "ká mε",
    "fon": "fermer la main ; myɔH alɔB ; fermer la porte légèrement ; bɔB hɔBn dŏ ; fermer le chemin ; sú alì",
    "cat": "general"
  },
  "aw": {
    "fr": "awε",
    "fon": "cí hwexɔC ; fermer une porte ; sú hɔBn ; ne pas fermer l'oeil ; dɔH wunzεn",
    "cat": "general"
  },
  "fesse": {
    "fr": "fesse",
    "fon": "gogó ; yonu ; fesses proéminentes ; agbɔnnu ; qui a de grosses fesses ; gogónɔB ; se dit pour",
    "cat": "general"
  },
  "fête": {
    "fr": "fête",
    "fon": "xwè ; faire la fête ; ɖù agɔH ; ɖù agŏ ; fête extraordinaire ; xwè gɛnnyigɛnnyì ; fête sensationnelle",
    "cat": "general"
  },
  "fêter": {
    "fr": "fêter",
    "fon": "ɖù xwè ; fêter quelqu'un ; ɖù xwè nú mε",
    "cat": "general"
  },
  "feu": {
    "fr": "feu",
    "fon": "myɔB ; myɔmyɔ ; zò ; activer le feu ; flɔC zò ; xò zò dŏ nŭ ; activer le feu de la forge ; xò zò ; xò zò dŏ",
    "cat": "general"
  },
  "éphémère": {
    "fr": "éphémère",
    "fon": "zo wlawlà ; qui met le feu à une maison ; xɔdómyɔtɔC ; xɔdózotɔC",
    "cat": "famille_societe"
  },
  "sccma": {
    "fr": "sɔccma",
    "fon": "feuille pour la sauce aux légumes ; gbòmá ; feuille pour se torcher ; mìsúnmà ; feuille purgative",
    "cat": "nature_monde"
  },
  "amam": {
    "fr": "ama mŭ",
    "fon": "feuilles d'une variété d’arbre ; dèslégεma ; feuilles tendre du manioc ; tewunɖé ; nom de",
    "cat": "nature_monde"
  },
  "fève": {
    "fr": "fève",
    "fon": "ayikún",
    "cat": "general"
  },
  "fi": {
    "fr": "fi",
    "fon": "faire fi des bonnes manières dans son comportement ; hɔHn wùn",
    "cat": "general"
  },
  "fichu": {
    "fr": "fichu",
    "fon": "fichu de tête ; gélé",
    "cat": "sante_tisane"
  },
  "fiel": {
    "fr": "fiel",
    "fon": "vìvε",
    "cat": "general"
  },
  "vache": {
    "fr": "vache",
    "fon": "nyibumí ; fiente d'oiseau ; xɛmí ; xε mĭ",
    "cat": "nature_monde"
  },
  "fier": {
    "fr": "fier",
    "fon": "goyitɔC ; action de faire le fier ; gìgó ; être fier ; sù ta ; yĭ gò ; yĭ gò ; faire le fier ; gŏ",
    "cat": "general"
  },
  "fièvre": {
    "fr": "fièvre",
    "fon": "avivɔB ; avivɔzɔBn ; avuvɔB ; avoir de la fièvre ; avivɔB sìn mε ; fièvre (accès chaud) ; hwezivɔC",
    "cat": "sante_tisane"
  },
  "hwezivczbn": {
    "fr": "hwezivɔczɔbn",
    "fon": "fièvre intermittente (paludisme) ; kpɔCnhwekpɔCnhwè",
    "cat": "sante_tisane"
  },
  "figue": {
    "fr": "figue",
    "fon": "malεkókwé",
    "cat": "general"
  },
  "fil": {
    "fr": "fil",
    "fon": "avɔkàn ; kàn ; fil de fer ; gankàn ; fil de filet à pêcheurs ; awlε ; fil téléphonique ; pósukàn ; le fil de",
    "cat": "general"
  },
  "filer": {
    "fr": "filer",
    "fon": "gbε ; gbε ; gbε avɔkàn ; action de filer quelqu'un ; mεxwíɖáxwíɖá",
    "cat": "general"
  },
  "filet": {
    "fr": "filet",
    "fon": "ɖɔB ; dè ; celui qui roule le filet ; ɖɔBxatɔC",
    "cat": "general"
  },
  "fille": {
    "fr": "fille",
    "fon": "vĭ ; vĭnyɔnú ; belle jeune fille ; ɖyɔHvi ganɖobá ; belle-fille ; atóbε ; vĭ asì ; vĭ'sì ; état de la vieille",
    "cat": "general"
  },
  "filou": {
    "fr": "filou",
    "fon": "mεblεtɔC",
    "cat": "general"
  },
  "fils": {
    "fr": "fils",
    "fon": "vĭ ; arrière petit-fils ; vìvúvivu ; beau-fils ; vì sú ; vĭ asú ; fils aîné ; vì ɖaxó ; vìɖáxó ; fils de",
    "cat": "nature_monde"
  },
  "fin": {
    "fr": "fin",
    "fon": "atà ; bε yε ; fífó ; fúfó ; fúfónú ; glíglí ; lílílí ; lyólyó ; mεsísε ; vivɔ ; vuvɔ ; wɛBɖɛBwɛCɖɛC ; celui qui est",
    "cat": "general"
  },
  "final": {
    "fr": "final",
    "fon": "vivɔ ; vuvɔ",
    "cat": "general"
  },
  "finir": {
    "fr": "finir",
    "fon": "vɔB ; action de finir ; fífó ; fúfó ; fúfónú ; finir de ; ɖŏ alɔB tè ; ɖŏ alɔB tè ; fó ; finir par ; nă wă ; wă",
    "cat": "general"
  },
  "pas": {
    "fr": "pas",
    "fon": "gεnnyigεnnyi",
    "cat": "general"
  },
  "fiole": {
    "fr": "fiole",
    "fon": "gò",
    "cat": "general"
  },
  "fixe": {
    "fr": "fixe",
    "fon": "kleteè",
    "cat": "general"
  },
  "fixer": {
    "fr": "fixer",
    "fon": "sùn ; fixer ; xwè ; fixer à une personne la part qu'il doit donner ; zε nŭjɔB nú mε ; fixer la part à",
    "cat": "general"
  },
  "flanc": {
    "fr": "flanc",
    "fon": "adɔCkpá ; ajajà",
    "cat": "general"
  },
  "fléau": {
    "fr": "fléau",
    "fon": "akpakpò",
    "cat": "general"
  },
  "flèche": {
    "fr": "flèche",
    "fon": "gă ; hwăn ; flèche empoisonnée ; aɖìgá",
    "cat": "sante_tisane"
  },
  "fleur": {
    "fr": "fleur",
    "fon": "sε ; fleur d’ornementation ; folóò ; fleur d'arbre ; atínsε ; fleur de maïs ; gbadésε ; fleur de nété",
    "cat": "nature_monde"
  },
  "sunvb": {
    "fr": "sunvɔb",
    "fon": "wunsungblɛCn",
    "cat": "general"
  },
  "flirt": {
    "fr": "flirt",
    "fon": "hè ; heɖiɖó ; heɖuɖó",
    "cat": "general"
  },
  "flot": {
    "fr": "flot",
    "fon": "aslɔCkε ; ɔxixo ; tɔxuxo ; à flot ; hòhò ; hohohò",
    "cat": "general"
  },
  "flou": {
    "fr": "flou",
    "fon": "fitiì ; de façon floue ; faàn",
    "cat": "general"
  },
  "flûte": {
    "fr": "flûte",
    "fon": "akwε ; kpetè ; kpεn ; flûte en bambou ; dawékpεn ; dawékpεn ; flûte en bois ; kwε ; flûte en",
    "cat": "general"
  },
  "ftus": {
    "fr": "fœtus",
    "fon": "foetus avorté ; hungbandan ; foetus embryonnaire ; hungbandan ; foetus non arrivé à terme",
    "cat": "general"
  },
  "foi": {
    "fr": "foi",
    "fon": "nùɖíɖí ; avoir la foi ; ɖì nŭ",
    "cat": "general"
  },
  "foie": {
    "fr": "foie",
    "fon": "alĭn ; alìnxlé",
    "cat": "general"
  },
  "foire": {
    "fr": "foire",
    "fon": "aximε",
    "cat": "general"
  },
  "fois": {
    "fr": "fois",
    "fon": "azɔBn ; il était une fois ; gbe dokpó sù",
    "cat": "general"
  },
  "folie": {
    "fr": "folie",
    "fon": "ayixazɔBn ; lεn ; nùlúlú ; taɖù ; taɖuhunhun ; tamεmasɔgbè ; wlé ; yɛyi ; yɛyu ; foliole d'une",
    "cat": "general"
  },
  "fon": {
    "fr": "fon",
    "fon": "nom donné aux fons à cause de leur ruse ; akpónyagidì",
    "cat": "general"
  },
  "fond": {
    "fr": "fond",
    "fon": "dò ; kò ; au fond ; ɖŏ dò ; bas fond ; gbamε ; gbamε ; tɔdomε ; être au fond ; ɖŏ dò ; fond d'une",
    "cat": "general"
  },
  "fondé": {
    "fr": "fondé",
    "fon": "être fondé ; lĭ",
    "cat": "general"
  },
  "fondu": {
    "fr": "fondu",
    "fon": "être fondus collés ensemble ; kpɔCtɔC ; kpántán ; fondu et collé ; kpántánkpántán",
    "cat": "general"
  },
  "fonte": {
    "fr": "fonte",
    "fon": "agbàlyá ; gbadaglà",
    "cat": "general"
  },
  "force": {
    "fr": "force",
    "fon": "adăn ; găn ; gànhúmε ; glàglá ; hlɔBnhlɔCn ; avec force ; gbligbli ; hlɔBnhlɔCn ɖò wŭ ; kpódó hlɔBnhlɔCn",
    "cat": "general"
  },
  "kpán": {
    "fr": "kpán",
    "fon": "de force ; gănnù ; gannugánnú ; kplulù ; xwaà ; être à bout de forces ; nŭ kpé mε ; vɔB găn",
    "cat": "general"
  },
  "mari": {
    "fr": "mari",
    "fon": "zĕ mε ɖŏ ajò",
    "cat": "famille_societe"
  },
  "forêt": {
    "fr": "forêt",
    "fon": "atínkàn ; atínkánmε ; zùn ; zùngbó ; zunkàn ; zunkangbomɛB",
    "cat": "nature_monde"
  },
  "forge": {
    "fr": "forge",
    "fon": "flè ; flemε ; flexɔmε ; nùtúnxɔCsá ; forge en plein air ; flesá ; forge sous un hangar ; flesá",
    "cat": "general"
  },
  "formalité": {
    "fr": "formalité",
    "fon": "faire les formalités pour prendre femme ; wà asì nŭ ; les formalités pour prendre femme",
    "cat": "famille_societe"
  },
  "forme": {
    "fr": "forme",
    "fon": "ninɔmε ; nunɔmε ; en forme ; wùyámɛ ; en forme de boule ; tɔngɔɔBn ; être en forme ; bĭ ; wŭ yă",
    "cat": "general"
  },
  "formé": {
    "fr": "formé",
    "fon": "bien formé ; gogoɖogò ; être mal formé ; gblĕ wɔHn",
    "cat": "general"
  },
  "fort": {
    "fr": "fort",
    "fon": "agidi ; akowunká ; glàglá ; gúngúngún ; lĭ dŏ ; wòkógò ; être fort ; dŏ hlɔBnhlɔCn ; glă ; xú syɛCn ; xú",
    "cat": "general"
  },
  "syn": {
    "fr": "syεn",
    "fon": "faire le fort à bras ; glă awà ; fort et abusif (pouvoir) ; glanglàn ; fort et mal bâti ; ganjaàn",
    "cat": "general"
  },
  "tête": {
    "fr": "tête",
    "fon": "aglăjà ; très fort ; akú ; cákácáká ; gawunga ; glálá ; yoò ; zowunkla ; très fort (pour johàn)",
    "cat": "sante_tisane"
  },
  "fosse": {
    "fr": "fosse",
    "fon": "ayìsúnhwín ; dò ; yɔB ; yɔdò ; fosse d'aisance ; adadò",
    "cat": "general"
  },
  "fossé": {
    "fr": "fossé",
    "fon": "agbŏ ; fossé profond ; dogbó",
    "cat": "general"
  },
  "fou": {
    "fr": "fou",
    "fon": "anŭwànùmɔCnɔB ; lεnnɔB ; mamajεmatɔC ; nùlúnɔB ; nùwánùmɔBnɔC ; taɖunɔB ; yɛyinɔB ; yeyunɔB ; être fou",
    "cat": "general"
  },
  "fouet": {
    "fr": "fouet",
    "fon": "bă ; lanbá",
    "cat": "general"
  },
  "foulard": {
    "fr": "foulard",
    "fon": "dukwí ; tabladukwí ; tablanú ; tablavɔC ; foulard de tête ; tabladúkwí ; foulard noué ; nùbìblá",
    "cat": "sante_tisane"
  },
  "foule": {
    "fr": "foule",
    "fon": "agùn ; mεkplékplé ; togùn ; en foule ; kɔnnyikpɔC",
    "cat": "general"
  },
  "foulé": {
    "fr": "foulé",
    "fon": "être foulé ; ɖɔB",
    "cat": "general"
  },
  "four": {
    "fr": "four",
    "fon": "zokpó ; four (un grand pot en terre) ; kpó ; four à pain ; blεHɖìɖàtɔC ; wɔBxúxúɖádó ; wɔBxúxúkpó",
    "cat": "nature_monde"
  },
  "fourgon": {
    "fr": "fourgon",
    "fon": "agbanhεnxɔB ; celui qui fabrique les fourgons de camions ; hùnjàntɔC",
    "cat": "famille_societe"
  },
  "foyer": {
    "fr": "foyer",
    "fon": "adò ; adokɔC ; aménager un foyer avec trois pierres ; kpé adò ; foyer formé de trois pierres ou de",
    "cat": "general"
  },
  "jambe": {
    "fr": "jambe",
    "fon": "afɔlilɔC ; afɔlulɔC",
    "cat": "general"
  },
  "whnw": {
    "fr": "wɛhn wŭ",
    "fon": "se fracturer un os ; lɔB gŏ",
    "cat": "general"
  },
  "frais": {
    "fr": "frais",
    "fon": "akwɛCzínzán ; àkwεzínzán ; fífá ; fε ; kpɔncɔɔBn ; nùzínzán ; yɔByɔC ; être frais ; fá ; frais et dispos",
    "cat": "general"
  },
  "franc": {
    "fr": "franc",
    "fon": "flán ; nùgbóɖɔCtɔC ; être franc ; ɖɔB nùgbó ; ɖɔB nùgbó ; ɖɔB xomɛB ; ɖɔB xomε ; le fait de n'être pas",
    "cat": "general"
  },
  "porte": {
    "fr": "porte",
    "fon": "xúxú kpɛC ; frapper dans ses mains avant d'entrer ; xò àsí kpɛC ; frapper dans ses mains avant",
    "cat": "general"
  },
  "asíkp": {
    "fr": "así kpε",
    "fon": "xò kpɛC ; frapper fortement ; xò gàngăn ; frapper la porte à grand bruit sur quelqu'un qui",
    "cat": "general"
  },
  "frein": {
    "fr": "frein",
    "fon": "flεεn",
    "cat": "general"
  },
  "frêle": {
    "fr": "frêle",
    "fon": "lwεlwε C",
    "cat": "general"
  },
  "frémissement": {
    "fr": "frémissement",
    "fon": "frémissement annonciateur de fièvre ; dεεn",
    "cat": "sante_tisane"
  },
  "frère": {
    "fr": "frère",
    "fon": "nɔBví ; beau-frère ; asì nɔBví ; frère aîné ; fofó ; frère aîné du roi ; axɔCnɔCví ; frère cadet du père",
    "cat": "famille_societe"
  },
  "ataví": {
    "fr": "ataví",
    "fon": "frère consanguin ; tɔCví ; tɔCví ; frère du roi ; axɔCnɔCví ; mes frères ; nɔví cé lε mi",
    "cat": "famille_societe"
  },
  "fripé": {
    "fr": "fripé",
    "fon": "être fripé ; bíbɔC",
    "cat": "general"
  },
  "frire": {
    "fr": "frire",
    "fon": "frire dans l'huile ; jlεH ; sɔB ; frire de la viande ; sɔB làn ; le fait de frire ; sisɔ ; susɔ",
    "cat": "general"
  },
  "frit": {
    "fr": "frit",
    "fon": "sisɔ ; susɔ",
    "cat": "general"
  },
  "froid": {
    "fr": "froid",
    "fon": "avivɔB ; être froid ; fá ; avoir froid ; avivɔ sìn mε",
    "cat": "general"
  },
  "front": {
    "fr": "front",
    "fon": "nukɔBn ; au front (guerre) ; zo sonu ; front bombé ; gεnnεgεnnε ; nukɔCn gεnnεgεnnε ; front de",
    "cat": "general"
  },
  "wú": {
    "fr": "wú",
    "fon": "frotter avec un médicament ; sá amasìn dŏ wŭ ; frotter et récurer les dents ; xwá aɖŭ ; frotter",
    "cat": "general"
  },
  "fruit": {
    "fr": "fruit",
    "fon": "sínsεn ; espèce de fruits ressemblant à la goyave ; amănà ; fruit d’un arbre ; kpéjélekún ; fruit de",
    "cat": "nature_monde"
  },
  "fugace": {
    "fr": "fugace",
    "fon": "wàyìwáyí ; se dit d'une apparition soudaine et fugace d’une chose ou d'un esprit ; blεH avɔB",
    "cat": "spirituel_fa"
  },
  "fugue": {
    "fr": "fugue",
    "fon": "faire une fugue ; jε gbĕ",
    "cat": "general"
  },
  "fuir": {
    "fr": "fuir",
    "fon": "hɔBn ; hɔBn yì ; kùn ; lùlú ; fuir le péché ; hɔBn nú hwε ; sí hwε ; fuir quelqu'un ; hɔBn nú mε",
    "cat": "general"
  },
  "fuite": {
    "fr": "fuite",
    "fon": "hinhɔn ; hunhɔn ; avoir une fuite ; kùn",
    "cat": "general"
  },
  "fumé": {
    "fr": "fumé",
    "fon": "hihi",
    "cat": "general"
  },
  "fumée": {
    "fr": "fumée",
    "fon": "azɔB ; azizɔ",
    "cat": "general"
  },
  "fumer": {
    "fr": "fumer",
    "fon": "nù azɔB ; nù azɔB ; sí azɔB ; sí azɔB ; action de fumer ; azɔnunu ; nùhíhí ; faire fumer ; hì ; fumer de",
    "cat": "general"
  },
  "fumier": {
    "fr": "fumier",
    "fon": "zunkɔC ; fumier d'animaux ; lanmí",
    "cat": "sante_tisane"
  },
  "fusil": {
    "fr": "fusil",
    "fon": "tú ; ancien fusil que l'on bourre par le canon ; laja ; fusil à deux coups ; túnuwenɔB ; fusil à pierre",
    "cat": "general"
  },
  "kntù": {
    "fr": "kεn tù",
    "fon": "fusil à un coup ; túnuɖokpónɔB ; fusil de fabrication locale ; cakaviwùn",
    "cat": "general"
  },
  "fût": {
    "fr": "fût",
    "fon": "gbă ; fût métallique ; gangbá ; gangbá",
    "cat": "general"
  },
  "futur": {
    "fr": "futur",
    "fon": "hwenu è jàwé ɔC ; futur plus lointain ; nă wă ; particule servant à former le futur – nă",
    "cat": "general"
  },
  "gai": {
    "fr": "gai",
    "fon": "être gai ; bĭ",
    "cat": "general"
  },
  "gain": {
    "fr": "gain",
    "fon": "lè",
    "cat": "general"
  },
  "gale": {
    "fr": "gale",
    "fon": "aklì ; cíɖɔC ; kpàzŭ ; kpotoxáyí ; avoir la gale ; j ε B aklì ; j ε B azĕ",
    "cat": "general"
  },
  "galon": {
    "fr": "galon",
    "fon": "galon de militaire ; kàn ; galon d'officier ; ahwangánkàn",
    "cat": "general"
  },
  "gant": {
    "fr": "gant",
    "fon": "alɔgodwé",
    "cat": "general"
  },
  "garde": {
    "fr": "garde",
    "fon": "nyinyi ; garde du corps ; wùtúnú",
    "cat": "general"
  },
  "bêtes": {
    "fr": "bêtes",
    "fon": "nyì kanlìn ; garder quelque chose ; cɔC nŭ ; zĕ nŭ hɛBn ; garder ; garder quelqu'un avec soin ; hɛBn",
    "cat": "general"
  },
  "mdw": {
    "fr": "mɛ dŏ wŭ",
    "fon": "hεn mε dŏ wŭ ; garder rancune ; hɛBn mɛ nŭ xomɛB ; garder rancune à quelqu'un ; ɖò kεn xá",
    "cat": "general"
  },
  "gare": {
    "fr": "gare",
    "fon": "hùnɖótεn ; lagáà ; gare ! ; agoò ! ; gare routière ; hùnɖótεn ; mɔHto lagáà ; la gare ; alagáà ; la gare",
    "cat": "general"
  },
  "garer": {
    "fr": "garer",
    "fon": "gɔB ; glĭ ; se garer ; bε ; sε",
    "cat": "general"
  },
  "gari": {
    "fr": "gari",
    "fon": "boule de gari préparée avec de l'huile ; wowunkpa ; du gari sec ou du gari mouillé avec de l'eau",
    "cat": "nature_monde"
  },
  "sansautrechose": {
    "fr": "sans autre chose",
    "fon": "galí flú ; gari de qualité excellente ; axáywé ; gari dont on a retiré l'amidon pour",
    "cat": "famille_societe"
  },
  "sxwí": {
    "fr": "sɔxwí",
    "fon": "gari seulement séché au soleil ; bɔC galí ; gari sous forme granulée ; fεnnyεlinfín ; gari très fin",
    "cat": "nature_monde"
  },
  "nyidò": {
    "fr": "nyidò",
    "fon": "fúnfún akwε",
    "cat": "general"
  },
  "gâter": {
    "fr": "gâter",
    "fon": "gblĕ ; hεn gblĕ ; kε ; action de gâter un enfant ; vìkíkε ; gâte-commerce ; ajɔBhεngblétɔC ; gâter un",
    "cat": "famille_societe"
  },
  "gaz": {
    "fr": "gaz",
    "fon": "avoir des gaz ; jĭ gò",
    "cat": "general"
  },
  "géant": {
    "fr": "géant",
    "fon": "aditì ; gijagijà ; janginjangìn ; jiganjigàn ; sakaà ; sakasakà ; être un géant ; s'avɔB ; sɔC avɔB ; un",
    "cat": "general"
  },
  "gecko": {
    "fr": "gecko",
    "fon": "nyɔxwenyɔxwè",
    "cat": "general"
  },
  "gémir": {
    "fr": "gémir",
    "fon": "wɛBn ; wɛBn azɔBn ; zɛBn ; action de gémir ; winwɛn",
    "cat": "general"
  },
  "gémissement": {
    "fr": "gémissement",
    "fon": "azɔnwinwεn ; winwɛn ; gémissements étouffés manifestant la douleur ; nyɔkwín",
    "cat": "sante_tisane"
  },
  "gêne": {
    "fr": "gêne",
    "fon": "gêne intestinale ; gohúnmε ; gêne motivée qui fait baisser les yeux ; wunkpinkpɛn",
    "cat": "general"
  },
  "gêné": {
    "fr": "gêné",
    "fon": "explications gênées et maladroites ; tɔxixo ; tɔxuxo",
    "cat": "general"
  },
  "gêner": {
    "fr": "gêner",
    "fon": "dŏ yà nú mɛ ; jăn ; jĭ gò nú mε ; wà nŭ xá mɛ",
    "cat": "general"
  },
  "génital": {
    "fr": "génital",
    "fon": "organe génital de l'homme : terme enfantin ; akakà ; organe génital masculin ; nεH ; nεHkàn",
    "cat": "famille_societe"
  },
  "genou": {
    "fr": "genou",
    "fon": "kogólì ; kolì ; kpò ; kpolì ; le fait d'être à genoux ; kpolijijε",
    "cat": "spirituel_fa"
  },
  "gens": {
    "fr": "gens",
    "fon": "ces gens-là ; mε nε ɔC lε ; gens venant des montagnes du fouta-djalon, en guinée ; fúlànĭ ; les gens",
    "cat": "general"
  },
  "gerbe": {
    "fr": "gerbe",
    "fon": "kɔB ; en gerbes ; kɔnukɔnu",
    "cat": "general"
  },
  "germe": {
    "fr": "germe",
    "fon": "kùn",
    "cat": "general"
  },
  "geste": {
    "fr": "geste",
    "fon": "sù ; geste avec le nez pour exprimer le dédain ; awɔnlín ; geste de délicatesse ; yɛByínú ; geste de",
    "cat": "general"
  },
  "gifle": {
    "fr": "gifle",
    "fon": "zonyinyi",
    "cat": "general"
  },
  "gigot": {
    "fr": "gigot",
    "fon": "asá",
    "cat": "general"
  },
  "gilet": {
    "fr": "gilet",
    "fon": "jilé",
    "cat": "general"
  },
  "gin": {
    "fr": "gin",
    "fon": "jĭnì",
    "cat": "general"
  },
  "giron": {
    "fr": "giron",
    "fon": "akɔCn",
    "cat": "general"
  },
  "glace": {
    "fr": "glace",
    "fon": "glăsì ; laglásì ; nùkpεn ; wĕ",
    "cat": "general"
  },
  "glacé": {
    "fr": "glacé",
    "fon": "glăsì",
    "cat": "general"
  },
  "gland": {
    "fr": "gland",
    "fon": "gεnta",
    "cat": "general"
  },
  "glu": {
    "fr": "glu",
    "fon": "awɔBn",
    "cat": "general"
  },
  "goal": {
    "fr": "goal",
    "fon": "golye",
    "cat": "general"
  },
  "gogo": {
    "fr": "gogo",
    "fon": "à gogo ; kɔnnyikpɔC ; kpétó",
    "cat": "general"
  },
  "gombo": {
    "fr": "gombo",
    "fon": "fè ; espèce de gombo à fruits légers ; sεnkún ; gombo (hibiscus esculentus) ; feví ; gombo",
    "cat": "general"
  },
  "gomme": {
    "fr": "gomme",
    "fon": "lɔHbà ; wèmàsúnsúnnú",
    "cat": "general"
  },
  "gond": {
    "fr": "gond",
    "fon": "gond de porte ; hɔnswéswé ; petits gonds de portes ; hɔnkpákpε",
    "cat": "general"
  },
  "gong": {
    "fr": "gong",
    "fon": "gàn ; gong à deux cloches ; ganvíwenɔB ; gong du grand modèle par opposition avec le gong",
    "cat": "general"
  },
  "gorge": {
    "fr": "gorge",
    "fon": "gbegò ; gbekàn ; vεHgò ; vεgómε ; dans la gorge ; vεgómε ; forme syncopée de vεHgò : gorge ; vεH",
    "cat": "general"
  },
  "gorgé": {
    "fr": "gorgé",
    "fon": "être gorgé d'humidité ; nyĭ",
    "cat": "general"
  },
  "asb": {
    "fr": "asɔb",
    "fon": "asɔgò ; asɔgwé",
    "cat": "general"
  },
  "goût": {
    "fr": "goût",
    "fon": "de mauvais goût ; nyamanyama ; être au goût de quelqu'un ; nyɔH nukún mε ; goût sucré ; wɛwɛC",
    "cat": "general"
  },
  "grâce": {
    "fr": "grâce",
    "fon": "fεnú ; kpε ; wùjɔCmɛ ; wùjɛCmɛ ; celui qui fait grâce ; wùjɛCmɛtɔC ; grâce ; de grâce ! ; kεnklεεn !",
    "cat": "general"
  },
  "gracile": {
    "fr": "gracile",
    "fon": "gracile en parlant de plantes poussées à l'ombre ; lwεlwε",
    "cat": "sante_tisane"
  },
  "grade": {
    "fr": "grade",
    "fon": "glădì",
    "cat": "general"
  },
  "grain": {
    "fr": "grain",
    "fon": "kún ; kwín ; nùkún ; au grain très fin ; cíkícíkí ; faire des grains ; mlĭ gŏ ; grain de maïs",
    "cat": "general"
  },
  "abkún": {
    "fr": "abɔkún",
    "fon": "abɔkwín ; graine d'une espèce de citrouille qui est utilisée dans les sauces ; gùsí ; graine",
    "cat": "general"
  },
  "grand": {
    "fr": "grand",
    "fon": "ajanjàn ; ajlò ; azangùn ; ɖaxó ; ɖoyaɖoyà ; gà ; gaga ; gàngăn ; gbajagbajà ; gblajaà ; gbŏ ; gε",
    "cat": "general"
  },
  "dnn": {
    "fr": "dεnɖεn",
    "fon": "grand buveur ; jεtɔCví ; sinmεnù ; grand chapeau de paille ; azagbagbà ; grand chasseur",
    "cat": "nature_monde"
  },
  "fágbó": {
    "fr": "fágbó",
    "fon": "grand feu ; zò gεgε ; grand foulard tissé de fils dorés ou argentés ; sàlŏ ; grand fromager",
    "cat": "general"
  },
  "grandpagne": {
    "fr": "grand pagne",
    "fon": "avɔ kɔnyì ; grand pagne de femmes ; avɔgbigbá ; grand pagne des hommes",
    "cat": "famille_societe"
  },
  "cn": {
    "fr": "ε cn",
    "fon": "grand roseau mâle ; fánsúgbokpa ; rand’route ; aligbó ; grand serviteur d'un vodúnnɔB ; kpóɖó",
    "cat": "nature_monde"
  },
  "yum": {
    "fr": "yɛɖumɛ",
    "fon": "grande brousse ; adlɔH ; zùngbómɛB ; zunkangbomɛB ; grande calebasse ; dágbaká ; kádagle",
    "cat": "general"
  },
  "awànú": {
    "fr": "awànú",
    "fon": "grande divinité à allada ; ayĭzàn ; grande église ; yɛhwexɔ ɖaxó ; grande étendue de chiendent",
    "cat": "general"
  },
  "sgbò": {
    "fr": "sεgbò",
    "fon": "grande faim ; aká ; grande famille ; akɔB ; hεHnnù ɖaxó ; xwétá ; xwédó ; grande famine ; adɔcyɔC",
    "cat": "famille_societe"
  },
  "grandefemmevaudoun": {
    "fr": "grande femme vaudoun",
    "fon": "năgbŏ ; grande foudre ; sogbó ; grande gaulle ; akplă ; grande herbe dont on",
    "cat": "famille_societe"
  },
  "xóxó": {
    "fr": "xóxó",
    "fon": "mɛxó ; grande personne ; mεxó ; grande pirogue large ; wèté ; grande pluie ; jĭ ɖaxó ; grande",
    "cat": "nature_monde"
  },
  "route": {
    "fr": "route",
    "fon": "títi ; grande rue ; aligbó ; toligbó ; grande saison des pluie ; xwè ; xwejí ; xwesìn ; grande salle",
    "cat": "nature_monde"
  },
  "gbó": {
    "fr": "gbó",
    "fon": "grands bandits ; alàgású ; tout grand ; caàn ; toute grande (bouche) ; jεε ; très grand ; adimúlàa",
    "cat": "general"
  },
  "gras": {
    "fr": "gras",
    "fon": "jòkpé ; bien gras ; jŏkεɖεkεɖεnɔB ; être gras ; ɖŏ jŏ ; être gras (pour une viande) ; dŏ jŏ ; être gras",
    "cat": "general"
  },
  "grave": {
    "fr": "grave",
    "fon": "affaire grave ; akóbá ; akóbá aɖabá ; kɔCblúmányà ; très grave ; gεyìn ; gεyìngεyìn",
    "cat": "general"
  },
  "gré": {
    "fr": "gré",
    "fon": "bon gré mal gré ; dàndàn",
    "cat": "general"
  },
  "grêle": {
    "fr": "grêle",
    "fon": "kεn ; kεnjí",
    "cat": "general"
  },
  "grève": {
    "fr": "grève",
    "fon": "hetè",
    "cat": "general"
  },
  "gril": {
    "fr": "gril",
    "fon": "ajalalà ; ajlalà ; gril à poissons ; hwevíhígàn",
    "cat": "nature_monde"
  },
  "aziín": {
    "fr": "aziín",
    "fon": "faire griller des brochettes ; mε ajotín ; faire griller légèrement quelque chose au feu ; hìnhán",
    "cat": "general"
  },
  "griot": {
    "fr": "griot",
    "fon": "hansinɔB ; mεmlátɔC",
    "cat": "general"
  },
  "gris": {
    "fr": "gris",
    "fon": "àfínnɔC",
    "cat": "general"
  },
  "groin": {
    "fr": "groin",
    "fon": "awɔnnu",
    "cat": "general"
  },
  "gros": {
    "fr": "gros",
    "fon": "biwùn ; bowlinúmε ; bŭtèbŭ ; bεtεε ; dede ; diwùn ; ɖogowungbà ; dεwùn ; gawùn ; gbiwùn ; gbli",
    "cat": "general"
  },
  "gooò": {
    "fr": "goɖoò",
    "fon": "klobotoò ; klotoò ; logoò ; totogóɖotò ; gros et tombant ; gεjεε ; gros et traînant ; glεjεglεjε",
    "cat": "general"
  },
  "glj": {
    "fr": "glεjεε",
    "fon": "lεjεlεjε ; lεjεε ; gros et vigoureux ; nawùn ; gros pour les fruits ; vowùn ; le fait d'être gros",
    "cat": "general"
  },
  "grue": {
    "fr": "grue",
    "fon": "ahlĭnhăn ; sorte de grue ; hlĭnhànsúɖanɔB",
    "cat": "general"
  },
  "gué": {
    "fr": "gué",
    "fon": "tɔgbotεn",
    "cat": "general"
  },
  "guêpe": {
    "fr": "guêpe",
    "fon": "guêpe de couleur feu que l'on trouve dans la brousse ; zogbɔCnvɛB ; guêpe maçonne ; gbɔHn",
    "cat": "general"
  },
  "guère": {
    "fr": "guère",
    "fon": "kpεɖé",
    "cat": "general"
  },
  "guéri": {
    "fr": "guéri",
    "fon": "être guéri ; găn",
    "cat": "general"
  },
  "guérir": {
    "fr": "guérir",
    "fon": "gblé azɔBn ; kpɔCn tè ; guérir (en parlant d'une maladie) ; kpɔCn té ; guérir quelqu'un ; gbɔB azɔBn",
    "cat": "sante_tisane"
  },
  "guide": {
    "fr": "guide",
    "fon": "alixlεmεtɔC ; mɔBdómɔCdwé ; mεkplátɔC",
    "cat": "general"
  },
  "guise": {
    "fr": "guise",
    "fon": "agir à sa guise ; ɖò gbawunjò mε",
    "cat": "general"
  },
  "gypse": {
    "fr": "gypse",
    "fon": "ayìnukún",
    "cat": "general"
  },
  "dawù": {
    "fr": "dŏ awù",
    "fon": "s'habiller ; dŏ awù ; s'habiller au même moment ; dŏ awù zɛHnzɛHn",
    "cat": "general"
  },
  "atb": {
    "fr": "atɔb",
    "fon": "habitant d'ici ; fínù ; tomεfínù ; habitant du dahomey ; danxomεnù ; fɔnnù ; habitant du nord",
    "cat": "general"
  },
  "kénù": {
    "fr": "kénù",
    "fon": "habitant du pays adja ; janu ; habitant du pays gεn ; gεnnù ; habitant du pays maxi ; maxínù",
    "cat": "general"
  },
  "xwénù": {
    "fr": "xwénù",
    "fon": "habitant d'une ville ; tomεnù ; habitant le pays ayizo ; ayìzɔCnù ; les habitants des cases sur",
    "cat": "general"
  },
  "hache": {
    "fr": "hache",
    "fon": "asyɔC ; grosse hache ; asyɔCgbólù ; gbolu ; hache du tonnerre ; sosyɔCví",
    "cat": "general"
  },
  "haie": {
    "fr": "haie",
    "fon": "kpá",
    "cat": "general"
  },
  "haine": {
    "fr": "haine",
    "fon": "kεn ; nŭhεnxomε",
    "cat": "general"
  },
  "haïr": {
    "fr": "haïr",
    "fon": "haïr quelqu'un ; gbɛH wăn nú mɛ",
    "cat": "general"
  },
  "halte": {
    "fr": "halte",
    "fon": "tenɔtεn",
    "cat": "general"
  },
  "hamac": {
    "fr": "hamac",
    "fon": "kpɔBn ; hamac des rois d'abomey ; akpaká",
    "cat": "general"
  },
  "hampe": {
    "fr": "hampe",
    "fon": "hampe de drapeau ; asyátín",
    "cat": "nature_monde"
  },
  "hardi": {
    "fr": "hardi",
    "fon": "glă ; glàglánɔB ; être hardi ; syεn ta ; zɛBn nŭ",
    "cat": "general"
  },
  "swé": {
    "fr": "sεwé",
    "fon": "sεwékún ; haricots cuits à l'eau ; abɔbɔB ; haricots cuits simplement à l'eau ; vεyí ; haricots",
    "cat": "nature_monde"
  },
  "mngb": {
    "fr": "mεnɔgbε",
    "fon": "sorte de haricot de couleur beige ; ɖamadámì ; sorte de haricot gros et plat ; akpakún ; sorte",
    "cat": "general"
  },
  "hase": {
    "fr": "hase",
    "fon": "azwi asì ; azwi’sì",
    "cat": "general"
  },
  "hâte": {
    "fr": "hâte",
    "fon": "à la hâte ; tenu ; en hâte ; jajà ; kpódó wùyìyá kpán ; en toute hâte ; ɖò yìyá jí ; kplákplá",
    "cat": "general"
  },
  "hâter": {
    "fr": "hâter",
    "fon": "se hâter ; ɖì wŭ ; dlɔHn ; dŏ wezùn ; fyá ; yă wŭ ; se hâter de faire ; yă wŭ blŏ ; se hâter pour",
    "cat": "general"
  },
  "venir": {
    "fr": "venir",
    "fon": "fyá wă ; se hâter vers ; dlɔHn dŏ",
    "cat": "general"
  },
  "haut": {
    "fr": "haut",
    "fon": "agà ; ajò ; atà ; jogiì ; jogijogì ; aller en haut ; yì jĭ ; au plus haut point de ; zanmɛB ; bien en haut",
    "cat": "general"
  },
  "agaéé": {
    "fr": "aga ɖéé",
    "fon": "en haut ; agà ; en haut de la montée ; kpó ta ; kpóta ; en haute mer ; xu zanmɛB ; être en haut",
    "cat": "general"
  },
  "òj": {
    "fr": "ɖò... jĭ",
    "fon": "être haut ; yì jĭ ; haut de la cuisse ; agunkpámε ; lotomε ; haut de la mâchoire ; cì ; le haut ; jĭ",
    "cat": "general"
  },
  "éé": {
    "fr": "ɖéé",
    "fon": "très haut ; joò ; tlílí",
    "cat": "general"
  },
  "hein": {
    "fr": "hein",
    "fon": "hein ! ; hεHn ! ; mε B! ; εHn !",
    "cat": "general"
  },
  "hélas": {
    "fr": "hélas",
    "fon": "hélas ! ; ké ! ; kée ! ; kóoyì ! ; kóyì ! ; ah ! hélas ! ; káyì",
    "cat": "general"
  },
  "herbe": {
    "fr": "herbe",
    "fon": "gbĕ ; gbèhán ; brins d'herbe coupés qui ont séché ; sεniyɔH ; sεnuyɔC ; herbe à petites feuilles",
    "cat": "nature_monde"
  },
  "hlhnw": {
    "fr": "hlεhnwĕ",
    "fon": "herbe amère ; amavívε ; herbe de savane ; fán ; herbe dont les feuilles se collent au tissu",
    "cat": "famille_societe"
  },
  "kè": {
    "fr": "kè",
    "fon": "qui a une hernie ; avungwenɔB ; variété de hernie ; ahwlilwí ; ahwlulwí",
    "cat": "general"
  },
  "héron": {
    "fr": "héron",
    "fon": "aɖɔxε ; héron blanc ; aɖɔwé ; héron blanc pique-boeufs ; kpatínxwlĕ ; kpatínxwlĕ aɖɔwé",
    "cat": "general"
  },
  "héros": {
    "fr": "héros",
    "fon": "adàntɔC ; súnnu glegbenù",
    "cat": "general"
  },
  "heure": {
    "fr": "heure",
    "fon": "gàn ; ganxuxo ; à heure fixe ou prévue ; ganmεganmε ; à l’heure ; dó gan mε ; à pareille heure",
    "cat": "general"
  },
  "heurt": {
    "fr": "heurt",
    "fon": "agloxixo ; agloyamε ; agloyiyá ; gloxixo ; gloyamε ; gloyiyá ; xuxo",
    "cat": "general"
  },
  "afb": {
    "fr": "afɔb",
    "fon": "heurter quelqu'un ; gbà zà nú",
    "cat": "general"
  },
  "hibou": {
    "fr": "hibou",
    "fon": "azĕxɛB ; klólwé ; kwelele",
    "cat": "general"
  },
  "hier": {
    "fr": "hier",
    "fon": "sɔB ; sɔB é kó wá yí ɔC ; hier matin ; sɔB zănzăn ; hier soir ; sɔ gbadanu",
    "cat": "general"
  },
  "hocher": {
    "fr": "hocher",
    "fon": "hocher la tête ; dăn ta ; hùnhún ta ; mì ta ; xúxú ta",
    "cat": "sante_tisane"
  },
  "homme": {
    "fr": "homme",
    "fon": "gbεtɔC ; súnnù ; homme adultère ; afɔdógbenúmεtɔC ; mεsibatɔC ; homme âgé ; nyaxóxó",
    "cat": "general"
  },
  "gbòlòctc": {
    "fr": "gbòlòɖɔctɔc",
    "fon": "lεlónɔB ; homme infidèle au pacte d'amitié ; lεdatɔC ; homme inflexible ; masegbɔB ; homme",
    "cat": "famille_societe"
  },
  "hommemarié": {
    "fr": "homme marié",
    "fon": "asisínò ; asisúnò ; homme mauvais ; nŭ baɖabaɖa ; homme négligent ; sukútɔC",
    "cat": "famille_societe"
  },
  "hommeordinaire": {
    "fr": "homme ordinaire",
    "fon": "gbɛtɔC xololò ; homme ou femme consacrés à agasu ; agasúsì ; homme ou femme qui",
    "cat": "spirituel_fa"
  },
  "gbtcxololò": {
    "fr": "gbɛtɔc xololò",
    "fon": "homme qui calcule ; ayixanɔB ; homme qui n'a pas réussi à se marier ; xwékònŭ ; homme",
    "cat": "famille_societe"
  },
  "honte": {
    "fr": "honte",
    "fon": "winnyá ; winnyáhumɛ ; avoir honte ; ɖù winnyá ; ɖù wìnyá ; hù winnyá ; winnyá hù mɛ ; faire",
    "cat": "general"
  },
  "sóad": {
    "fr": "só adɔ",
    "fon": "súkésúké sɔC mε ; sorte de hoquet respiratoire chez quelqu'un qui a beaucoup pleuré ; bòbŏ",
    "cat": "nature_monde"
  },
  "hors": {
    "fr": "hors",
    "fon": "être hors de propos ; majεgan ; hors de ; sín ; hors de l'eau ; agĕ ; agεH ; gĕ ; hors du trou ; agĕ",
    "cat": "nature_monde"
  },
  "agh": {
    "fr": "agεh",
    "fon": "gĕ ; hors pair dans le sens négatif ; agănlingàn",
    "cat": "general"
  },
  "hôte": {
    "fr": "hôte",
    "fon": "jŏ ; hôte (qui est reçu) ; jŏnɔH",
    "cat": "general"
  },
  "hôtel": {
    "fr": "hôtel",
    "fon": "hôtel du vaudoun du courage ; adànzún",
    "cat": "general"
  },
  "houe": {
    "fr": "houe",
    "fon": "houe à long manche ; yovólín ; houe large ; alìnsɔC ; houe pour sarcler ; alìnxlé ; sorte de houe",
    "cat": "general"
  },
  "azìnb": {
    "fr": "azìnbε",
    "fon": "sorte de houe dont le fer a la forme d’une langue de chien ; avùnɖε",
    "cat": "general"
  },
  "huer": {
    "fr": "huer",
    "fon": "wɔH ; huer quelqu'un ; fó ; kpà óóó dŏ ta nú mε ; wɔH mɛ",
    "cat": "general"
  },
  "huile": {
    "fr": "huile",
    "fon": "amì ; huile blanche d'amande de noix de palme ; adĭnmiwĕ ; huile d'arachide ; aziinmí ; huile de",
    "cat": "general"
  },
  "coco": {
    "fr": "coco",
    "fon": "agɔnkεmì ; huile de moteur ; mɔHtomì ; huile de palme ; amivɔB ; dĕmì ; sinvɔB ; huile de palme",
    "cat": "famille_societe"
  },
  "termeemployélanuit": {
    "fr": "(terme employé la nuit)",
    "fon": "sinvɔB ; huile de ricin ; gbògbózokwínmí ; huile de senteur ; ami huhwεn",
    "cat": "famille_societe"
  },
  "huiledevoiture": {
    "fr": "huile de voiture",
    "fon": "mɔHtomì ; huile noire extraite de l'amande de palme ; cocò ; huile parfumée ; ami",
    "cat": "famille_societe"
  },
  "hunhwn": {
    "fr": "hunhwεn",
    "fon": "huile purgative ; amislă ; huile raffinée ; amihwínhwεn ; huile rouge ; amivɔB ; l'huile avec",
    "cat": "famille_societe"
  },
  "huit": {
    "fr": "huit",
    "fon": "tántɔBn ; huit cent mille ; dĕgbà afɔɖé ; huit cents ; afεnε ; huit cents cauris ou vingt centimes",
    "cat": "general"
  },
  "humer": {
    "fr": "humer",
    "fon": "gbɔHn",
    "cat": "general"
  },
  "axn": {
    "fr": "axăn",
    "fon": "axánsúnsún",
    "cat": "general"
  },
  "fó": {
    "fr": "fó",
    "fon": "s'humilier devant quelqu'un ; blĭ ml’áyĭ",
    "cat": "general"
  },
  "huppe": {
    "fr": "huppe",
    "fon": "ahlĭnhăn",
    "cat": "general"
  },
  "hutte": {
    "fr": "hutte",
    "fon": "hutte pour chasseurs ; gbèdɔCxɔB ; hutte ronde avec un toit pointu ; goxɔB",
    "cat": "general"
  },
  "hyène": {
    "fr": "hyène",
    "fon": "agbetè ; ajănuagbetè ; hla ; l'hyène des adja ; ajănuhla",
    "cat": "general"
  },
  "ici": {
    "fr": "ici",
    "fon": "dĕ ; ɖŏ fí ; fí ; xwékɔB fi ; d'ici peu ; azănmεfí ; être ici ; ɖŏ fí ; ici-bas ; gbεmε fí ; ɖò gbε dĕ ; ici",
    "cat": "general"
  },
  "même": {
    "fr": "même",
    "fon": "tεn élɔC mε ; ici-bas",
    "cat": "general"
  },
  "idée": {
    "fr": "idée",
    "fon": "ayì ; linlin ; nùlínlín",
    "cat": "general"
  },
  "idiot": {
    "fr": "idiot",
    "fon": "gɔgúnɔB ; gùgú ; gùgùtɔC ; nùlúnɔB ; xlŏnɔB",
    "cat": "general"
  },
  "idole": {
    "fr": "idole",
    "fon": "numesèn",
    "cat": "general"
  },
  "tesus": {
    "fr": "tesusɔ",
    "fon": "igname grillée ; te mimε ; igname nouveau ; teví fɔC ; igname pilé ; agŭ ; sorte d'igname très",
    "cat": "nature_monde"
  },
  "île": {
    "fr": "île",
    "fon": "tɔkpó",
    "cat": "general"
  },
  "image": {
    "fr": "image",
    "fon": "ɖiɖe ; nùɖíɖé ; wèmáɖíɖé ; l'image de quelqu'un ; jɔmɔB",
    "cat": "general"
  },
  "impie": {
    "fr": "impie",
    "fon": "măwùmásítɔC ; măwùmásεntɔC",
    "cat": "general"
  },
  "tají": {
    "fr": "ta jí",
    "fon": "faire l’important ; glă awà ; tε afɔB ayĭ ; jìjé ; tε afɔB ayĭ ; très important ; kpatakikpatakì",
    "cat": "general"
  },
  "importuner": {
    "fr": "importuner",
    "fon": "importuner quelqu'un ; dŏ tagba nú mε ; s'emploie quand on s'adresse à la mère qui vous",
    "cat": "famille_societe"
  },
  "impôt": {
    "fr": "impôt",
    "fon": "amlɔkwε ; axɔCsúkwε ; takwε ; impôt en nature ; kuzŭ ; impôt sur la maison ; xwékwɛ",
    "cat": "general"
  },
  "index": {
    "fr": "index",
    "fon": "nùxlεmεlɔví",
    "cat": "general"
  },
  "indiquer": {
    "fr": "indiquer",
    "fon": "dŏ gesí ; ɖŏ wŭntùn ; jlεH ; jlεH nŭ ; indiquer à quelqu'un ; jlεH nŭ nú mε ; indiquer quel sacrifice",
    "cat": "spirituel_fa"
  },
  "dwé": {
    "fr": "dăwé",
    "fon": "individu de sexe masculin homme ; nyà ; individu du sexe féminin ; năwè ; individu malpropre",
    "cat": "general"
  },
  "infâme": {
    "fr": "infâme",
    "fon": "dàkáwátɔC ; dàkáxótɔC",
    "cat": "spirituel_fa"
  },
  "infamie": {
    "fr": "infamie",
    "fon": "alànnŭ ; dàká ; hεHn ; commettre une infamie ; wà alànnŭ ; xò lɔB",
    "cat": "famille_societe"
  },
  "infidélité": {
    "fr": "infidélité",
    "fon": "gbejimanɔC ; infidélité au pacte d'amitié ; lεdida",
    "cat": "famille_societe"
  },
  "inimitié": {
    "fr": "inimitié",
    "fon": "kεn ; inimitié familiale ; xwé kεn ; xwékɛBn",
    "cat": "famille_societe"
  },
  "initié": {
    "fr": "initié",
    "fon": "être initié à un culte secret ; lεH vɔB mɔB ; être initié à un culte vaudoun ; mɔB hùn dò ; être initié à",
    "cat": "spirituel_fa"
  },
  "unvaudoun": {
    "fr": "un vaudoun",
    "fon": "mɔB awò ; être initié dans la société des zàngbètɔC ; mɔB zăn ; initié au culte vaudoun",
    "cat": "spirituel_fa"
  },
  "sakpata": {
    "fr": "sakpata",
    "fon": "ayɔnù ; initié au vaudoun nyagè ; hŭnkpε ; initié d’une société ; zànví ; initié dans la société",
    "cat": "spirituel_fa"
  },
  "deskutito": {
    "fr": "des kutito",
    "fon": "awomɔtɔC ; awosì ; initié dans tous les domaines du vaudoun ; nyavε ; initié dans une",
    "cat": "spirituel_fa"
  },
  "société": {
    "fr": "société",
    "fon": "zànmɔCtɔC ; nom donné à un initié au vaudoun agasú ; hunyɔC",
    "cat": "spirituel_fa"
  },
  "certainessociétéssecrètes": {
    "fr": "certaines sociétés secrètes",
    "fon": "klɔC alɔB ; initier un enfant à la vie adulte ; hùn tó nú yɔkpɔCvú ; le fait de",
    "cat": "famille_societe"
  },
  "inné": {
    "fr": "inné",
    "fon": "ce qui est inné ; sεnú",
    "cat": "general"
  },
  "ìxsì": {
    "fr": "ɖì xɛsì",
    "fon": "s'inquiéter de quelque chose ; jε tagbà nú nŭ",
    "cat": "general"
  },
  "hwn": {
    "fr": "hwεn",
    "fon": "insecte qui ronge le bois ; atínɖútínɖwí ; insecte vert comme la mante religieuse ; jɔBvìnɔC",
    "cat": "general"
  },
  "sable": {
    "fr": "sable",
    "fon": "kɔCbεnú ; variété d'instrument de musique ; asán",
    "cat": "general"
  },
  "insu": {
    "fr": "insu",
    "fon": "à l'insu de ma mère ; nɔ cè gŭdò",
    "cat": "famille_societe"
  },
  "misèresdequelquun": {
    "fr": "misères de quelqu'un",
    "fon": "nŭyà ; insulte pour une femme flétrie ; gbɔH yakpá",
    "cat": "famille_societe"
  },
  "familledequelquun": {
    "fr": "famille de quelqu'un",
    "fon": "zùn hɛHn ; insulter gravement quelqu'un ; ɖɔB nŭyà mε wŭ ; insulter gravement",
    "cat": "famille_societe"
  },
  "mw": {
    "fr": "mɛ wŭ",
    "fon": "kɔCn wì nú mɛ ; zùn mɛ ; insulter quelqu'un à cause du bien qu'on a fait aux siens ou à lui-même",
    "cat": "general"
  },
  "tam": {
    "fr": "ɖŏ tamε",
    "fon": "tíin tamε",
    "cat": "general"
  },
  "interdit": {
    "fr": "interdit",
    "fon": "gbìgbε ; nùvεmε ; sù ; sεn ; ensemble des interdits liés aux règles de la femme ; gŏsù ; être",
    "cat": "famille_societe"
  },
  "ysímb": {
    "fr": "yɛsí mɛb",
    "fon": "nŭ ɖò yɛswí mɛB ; l'invisible ; yɛsí ; yɛswí",
    "cat": "general"
  },
  "togbesb": {
    "fr": "togbesɔb",
    "fon": "invitation à une corvée volontaire pour assurer à un ami une journée de travail gratuit aux",
    "cat": "famille_societe"
  },
  "dhnkp": {
    "fr": "dɔhnkpε",
    "fon": "inviter quelqu'un ; dà mε ; inviter un passant à venir se désaltérer ; xwlĕ alita sin mε ; le fait",
    "cat": "general"
  },
  "invoquer": {
    "fr": "invoquer",
    "fon": "sà vò nú mε ; ylɔH mɛ ; ylɔH nyikɔC ; invoquer le nom de dieu en vain ; ylɔH măwŭ nyikɔC yayá",
    "cat": "spirituel_fa"
  },
  "iroko": {
    "fr": "iroko",
    "fon": "atínsú ; lŏkò",
    "cat": "general"
  },
  "irrespect": {
    "fr": "irrespect",
    "fon": "memasí",
    "cat": "famille_societe"
  },
  "irrespectueux": {
    "fr": "irrespectueux",
    "fon": "dŏ gbangbè ; mεmasitɔC ; irrespectueux envers quelqu'un ; dŏ gbangbè mε wŭ",
    "cat": "famille_societe"
  },
  "issu": {
    "fr": "issu",
    "fon": "être issu de ; jɔB sín ; issu d'une même souche familiale ; hεnnúmε",
    "cat": "famille_societe"
  },
  "issue": {
    "fr": "issue",
    "fon": "alì",
    "cat": "general"
  },
  "iule": {
    "fr": "iule",
    "fon": "wansúgogó",
    "cat": "general"
  },
  "ivre": {
    "fr": "ivre",
    "fon": "être ivre ; ahàn mŭ m ε",
    "cat": "general"
  },
  "jabot": {
    "fr": "jabot",
    "fon": "adɔtwé",
    "cat": "general"
  },
  "jadis": {
    "fr": "jadis",
    "fon": "ɖ’áyĭ ; ɖŏ áyĭ ; ɖεH ; xóxó ; au temps jadis ; xóxó hwénú ɔC",
    "cat": "general"
  },
  "jarre": {
    "fr": "jarre",
    "fon": "sinzεn ; zɛHn ; zɛHn ɖaxó ; grosse jarre en terre cuite ; gbεn ; jarre dans laquelle on met du métal à",
    "cat": "nature_monde"
  },
  "jaune": {
    "fr": "jaune",
    "fon": "vɔvɔ xɛCgò ; jaune vif ; nyɔɔB",
    "cat": "general"
  },
  "je": {
    "fr": "je",
    "fon": "nyì ; nyε ; un",
    "cat": "general"
  },
  "jeter": {
    "fr": "jeter",
    "fon": "kɔBn ; kɔBn nyì ; nyì ; jaller jeter ; sɔC yì kɔBn ; hùzú kɔBn ; jeter à terre ; nyì àyĭ ; jeter au feu ; bɛH kɔBn",
    "cat": "nature_monde"
  },
  "dzòmb": {
    "fr": "dŏ zò mɛb",
    "fon": "zĕ nyì myɔB mɛB ; zĕ nyì zò mɛB ; jeter au loin ; sɔC nyì gbĕ ; jeter bas ; flí xwè ; jeter dans le feu",
    "cat": "general"
  },
  "jeu": {
    "fr": "jeu",
    "fon": "ayihún ; ayihúndá ; ayihúndídá ; avoir du jeu ; xò tò ; forme d'un jeu ; atɔnɖu ; jeu de cache-cache",
    "cat": "general"
  },
  "alugbaxwé": {
    "fr": "alugbaxwé",
    "fon": "jeu masqué joué par les enfants ; kalétà ; une des formes du jeu d'aji ; εnεxoɖu ; variété de",
    "cat": "famille_societe"
  },
  "jeudi": {
    "fr": "jeudi",
    "fon": "lamísigbè",
    "cat": "general"
  },
  "jeune": {
    "fr": "jeune",
    "fon": "fɔC ; fε ; ganɖobá ; kpεví ; vĭ ; vŭ ; winnyawínnyá ; yakpɔC ; être jeune ; ɖò kpε ; ɖò kpεví ; jeune",
    "cat": "general"
  },
  "dbnkpvú": {
    "fr": "dɔbnkpεvú",
    "fon": "nyaví ; súnnúví ; súnnúvú ; jeune homme fossoyeur ; dɔHnkpε ; jeune homme dynamique",
    "cat": "famille_societe"
  },
  "acosú": {
    "fr": "acosú",
    "fon": "jeune homme fort ; glŏjà ; jăglò ; jeune homme solide ; glŏjà ; jăglò ; jeune marié ; yaó'sú ; jeune",
    "cat": "famille_societe"
  },
  "mariée": {
    "fr": "mariée",
    "fon": "yaó ; yawó ; yawó ; jeune poule ; kokló ganlobá ; jeune poulet ; kokló ganɖobá ; jeune rameau",
    "cat": "famille_societe"
  },
  "jeûne": {
    "fr": "jeûne",
    "fon": "nublablá",
    "cat": "general"
  },
  "joie": {
    "fr": "joie",
    "fon": "akpakpà ; awă ; awàjíjε ; être dans la joie ; j'àwă ; jε àwă",
    "cat": "general"
  },
  "joindre": {
    "fr": "joindre",
    "fon": "kpé ; joindre deux objets ; dɔBn kpé ; joindre les mains sur la tête en signe de deuil ; kplá así ta",
    "cat": "sante_tisane"
  },
  "joli": {
    "fr": "joli",
    "fon": "ɖεkpε ; être joli ; jε àcɔ ; nyɔH kún",
    "cat": "general"
  },
  "jonc": {
    "fr": "jonc",
    "fon": "gros jonc dont ont fait les paillassons ; akɔfεn ; petit jonc servant à faire des chapeaux, des nattes,",
    "cat": "nature_monde"
  },
  "etc": {
    "fr": "etc",
    "fon": "fεn",
    "cat": "general"
  },
  "joue": {
    "fr": "joue",
    "fon": "alàká ; anyă ; klεn ; de grosses joues ; anyă vuù",
    "cat": "general"
  },
  "jouer": {
    "fr": "jouer",
    "fon": "dà ayihún ; jouer à l'escargot ; ɖεH akotó ; jouer aux cartes ; nyì wĕ ; jouer avec enjeu ; nyì akɔB",
    "cat": "general"
  },
  "jouet": {
    "fr": "jouet",
    "fon": "ayihúndánu ; jouet rond ; gbŏ",
    "cat": "general"
  },
  "joug": {
    "fr": "joug",
    "fon": "agbàn ; mεnɔgbàn ; joug pesant et dur ; agbàn kpíkpεn",
    "cat": "general"
  },
  "jouir": {
    "fr": "jouir",
    "fon": "jouir de ; ɖù ; ɖù gbε ; jouir d'un avantage inespéré ; ɖù afù ; jouir d'un héritage ; ɖù gŭ nùɖé tɔBn",
    "cat": "general"
  },
  "jour": {
    "fr": "jour",
    "fon": "azăn ; gbè ; kézè ; zăn ; à un autre jour ; é sù gbe ɖé ; aujourd'hui ; égbé ; égúngún ; ces jours-ci",
    "cat": "general"
  },
  "êtreàjour": {
    "fr": "être à jour",
    "fon": "cεε ; faire jour ; ayĭ hɔCn ; hɔHn ; il y a trois jours ; azăn yi atɔBn ; azăn yi atɔBn ; jour consacré",
    "cat": "spirituel_fa"
  },
  "juge": {
    "fr": "juge",
    "fon": "hwεɖɔtɔC ; hwεgbotɔC ; aller devant le juge ; yì hwεɖɔtɔC nukɔBn ; juge (qui porte la condamnation)",
    "cat": "general"
  },
  "juger": {
    "fr": "juger",
    "fon": "gbò hwε ; action de juger ; hwεɖiɖɔ ; celui qui juge avec partialité vis à vis des siens ; nùmεkántɔC",
    "cat": "general"
  },
  "juin": {
    "fr": "juin",
    "fon": "ayiɖosún",
    "cat": "general"
  },
  "znxwè": {
    "fr": "-zĭnxwè",
    "fon": "jumeau ; gbojà ; zinsú ; jumelle venue en premier ; yayà",
    "cat": "nature_monde"
  },
  "jupe": {
    "fr": "jupe",
    "fon": "sεyà ; yɛlí ; jupe spéciale pour certaines danses vaudoun ; avlayá ; vlayá",
    "cat": "general"
  },
  "jupon": {
    "fr": "jupon",
    "fon": "avlayá ; dovɔB ; yɛlí ; jupon des femmes ; vlayá",
    "cat": "famille_societe"
  },
  "jurer": {
    "fr": "jurer",
    "fon": "xwlé ; xwlé aɖĭ ; jurer en vain ; ylɔH măwŭ nyikɔC yayá ; jurer le nom de dieu ; xwlĕ măwŭ nyĭkɔC",
    "cat": "spirituel_fa"
  },
  "jus": {
    "fr": "jus",
    "fon": "sìn ; jus de fruits ; ahanviví ; jus de viande ; lansìn",
    "cat": "general"
  },
  "juste": {
    "fr": "juste",
    "fon": "ɖŏ ganjí ; pεε ; sɔB gbè ; titewungbè ; être juste envers quelqu'un ; wà hwεjujɔnú nú mε ; l'état de",
    "cat": "general"
  },
  "kalao": {
    "fr": "kalao",
    "fon": "sáságɔlí",
    "cat": "general"
  },
  "kohol": {
    "fr": "kohol",
    "fon": "kilóo ; tilóo",
    "cat": "general"
  },
  "kola": {
    "fr": "kola",
    "fon": "gbawunjà ; kola amère blanche ; ahòwé ; kola monocotylédone ; ahòwé",
    "cat": "famille_societe"
  },
  "kyste": {
    "fr": "kyste",
    "fon": "alɔgúdógwĕ ; kystes restés dans la plante du pied suite au pian ; ɖĭ",
    "cat": "sante_tisane"
  },
  "la": {
    "fr": "la",
    "fon": "è ; i",
    "cat": "general"
  },
  "là": {
    "fr": "là",
    "fon": "fí ; fínε ; ça et là ; fí ɖĕ fí ɖĕ ; être là ; ɖŏ fínε ; être là-bas ; ɖò dɔHn",
    "cat": "general"
  },
  "lac": {
    "fr": "lac",
    "fon": "tɔB ; lac salé ; jεsìn ; le lac ahémé ; hεHn ; nom du lac d’agonvé ; azlì ; nom propre du lac qui baigne",
    "cat": "general"
  },
  "lacer": {
    "fr": "lacer",
    "fon": "blă ; lacer une chaussure ; dŏ afɔkpakàn",
    "cat": "general"
  },
  "lacet": {
    "fr": "lacet",
    "fon": "lacet de chaussures ; afɔkpakàn",
    "cat": "general"
  },
  "lâche": {
    "fr": "lâche",
    "fon": "xɛsinɔB",
    "cat": "general"
  },
  "ladre": {
    "fr": "ladre",
    "fon": "kú wɔBnwín ; wɔBnwínnɔB",
    "cat": "general"
  },
  "lagos": {
    "fr": "lagos",
    "fon": "awɔnlìn",
    "cat": "general"
  },
  "laid": {
    "fr": "laid",
    "fon": "être laid ; nylă kàn ; nylá kún ; très laid ; nylànylá",
    "cat": "general"
  },
  "laine": {
    "fr": "laine",
    "fon": "gbɔBfún ; lεngbɔCfún",
    "cat": "general"
  },
  "aflà": {
    "fr": "aflà",
    "fon": "se laisser approcher ; lɔBn mε ; se laisser faire ; jε aflà ; se laisser faire par timidité ; kú winnyá ; kú",
    "cat": "general"
  },
  "winyá": {
    "fr": "winyá",
    "fon": "se laisser prendre ; lɔBn mε",
    "cat": "general"
  },
  "lait": {
    "fr": "lait",
    "fon": "anɔsín ; lait de vache ; nyibúnɔsín",
    "cat": "general"
  },
  "lampe": {
    "fr": "lampe",
    "fon": "myɔgbεn ; myɔtágbεn ; zogbɛCn ; lampe à huile ; ami myɔgbεn ; lampe à pétrole ; klazín myɔgbεn",
    "cat": "famille_societe"
  },
  "lance": {
    "fr": "lance",
    "fon": "hwăn",
    "cat": "general"
  },
  "lancer": {
    "fr": "lancer",
    "fon": "dŏ ; kɔBn nyì ; nyì ; sε ; action de lancer ; nyinyi ; sísε ; action de lancer l'escargot (jeu d'enfant)",
    "cat": "famille_societe"
  },
  "sìn": {
    "fr": "sìn",
    "fon": "lancer une convocation ; ɖŏ gbesɔB ; lancer une flèche ; nyì gă ; sε gă ; lancer une malédiction ; sá",
    "cat": "general"
  },
  "heelú": {
    "fr": "heelú",
    "fon": "ne pas lancer ; alɔB jlŏ ă ; se lancer à la poursuite de quelqu'un ; jε túnnu mεɖé tɔBn ; se lancer",
    "cat": "general"
  },
  "lande": {
    "fr": "lande",
    "fon": "dans la lande ; gbèxómε",
    "cat": "general"
  },
  "desgn": {
    "fr": "des gεn",
    "fon": "gεngbè ; langue d'un vaudoun ; hungbè ; langue française ; flanségbè ; langue portugaise",
    "cat": "general"
  },
  "lapin": {
    "fr": "lapin",
    "fon": "azwì ; petit lapin ; azwiví",
    "cat": "general"
  },
  "laps": {
    "fr": "laps",
    "fon": "laps de temps ; yɛdomɛB",
    "cat": "general"
  },
  "lard": {
    "fr": "lard",
    "fon": "hanjó",
    "cat": "general"
  },
  "large": {
    "fr": "large",
    "fon": "gbajagbajà ; gbanjangbanjàn ; gblajaà ; gblayaà ; gblayagblayà ; gblògbló ; gbŏ ; vaà ; vajaà ; vajavajà",
    "cat": "general"
  },
  "larve": {
    "fr": "larve",
    "fon": "larve de fourmilion ; agbălε ; larve de la mouche à viande ; wèsú ; larve de moustique",
    "cat": "general"
  },
  "latte": {
    "fr": "latte",
    "fon": "likpá ; action de mettre les lattes ; zanhwlahwlá ; latte d'un toit ; wɛBn",
    "cat": "general"
  },
  "lavé": {
    "fr": "lavé",
    "fon": "nyinya",
    "cat": "general"
  },
  "laver": {
    "fr": "laver",
    "fon": "klɔC ; lε ; action de laver ; kíklɔC ; klɔCklɔC ; lilε ; action de se laver les mains ; alɔ kíklɔC ; laver du linge",
    "cat": "general"
  },
  "le": {
    "fr": "le",
    "fon": "è ; i ; lɔC",
    "cat": "general"
  },
  "leçon": {
    "fr": "leçon",
    "fon": "nù kpínkplɔCn ; nù kplɔCnkplɔCn",
    "cat": "general"
  },
  "léger": {
    "fr": "léger",
    "fon": "fúɖáfúɖá ; kɔCɖɔC ; kléjé ; yàyá ; être léger ; fúɖá ; lòlwé ; lwèlwé ; léger en parlant d'un liquide ; lwεε",
    "cat": "general"
  },
  "gblò": {
    "fr": "gblò",
    "fon": "nom donné au légume lɔHbà pour éviter de le nommer ; kpánúmá ; sorte de légume ; gànhwá",
    "cat": "general"
  },
  "nyimú": {
    "fr": "-nyimɔɖú",
    "fon": "tɔlomá ; kpɔyibà ; variété de légume à feuilles odorantes ; akɔgbo",
    "cat": "nature_monde"
  },
  "lent": {
    "fr": "lent",
    "fon": "kεɖεgóví ; être lent ; dε ; kpò zɔBn ; xwè sɔC",
    "cat": "general"
  },
  "lèpre": {
    "fr": "lèpre",
    "fon": "azɔnvɔB ; gudù ; avoir la lèpre ; jε gudù",
    "cat": "general"
  },
  "les": {
    "fr": "les",
    "fon": "yĕ",
    "cat": "general"
  },
  "leur": {
    "fr": "leur",
    "fon": "yĕtɔBn ; leurs ; yĕtɔBn",
    "cat": "general"
  },
  "levée": {
    "fr": "levée",
    "fon": "levée de soldats ; ahwancítè",
    "cat": "general"
  },
  "lever": {
    "fr": "lever",
    "fon": "fínfɔCn ; flelè ; fúnfɔCn ; sí ; tɔCn ; zĕ ; zĕ yì jĭ ; au lever du jour ; ayitéhɔBnnu ; zànfɔCnnú ; faire lever",
    "cat": "general"
  },
  "dtè": {
    "fr": "dŏ tè",
    "fon": "fɔCn ; le lever du jour ; wunɖòkínkɛCnwɛB ; lever du jour ; ayìhínhɔCn ; ayìhúnhɔCn ; lever du soleil",
    "cat": "nature_monde"
  },
  "lèvre": {
    "fr": "lèvre",
    "fon": "la lèvre inférieure ; nufló do tan",
    "cat": "general"
  },
  "lézard": {
    "fr": "lézard",
    "fon": "alɔHtlɔB ; gros lézard ; vεH ; gros lézard de marigots ou des rivières ; tɔvεH ; lézard brillant à flanc",
    "cat": "famille_societe"
  },
  "liane": {
    "fr": "liane",
    "fon": "atínkàn ; gbĕkàn ; kàn ; grosse liane ; agbankàn ; liane à caoutchouc ; lɔHbatín ; liane d'igname",
    "cat": "general"
  },
  "libre": {
    "fr": "libre",
    "fon": "faà ; kɔvɔC ; waà ; être libre ; ɖò mε ɖésú àsıC ; ɖò mε ɖésú’sıC ; jε tè ; nɔB yàyá ; nyĭ mε ɖésú ; xɔC ; libre",
    "cat": "general"
  },
  "lie": {
    "fr": "lie",
    "fon": "xwaxwá",
    "cat": "general"
  },
  "lié": {
    "fr": "lié",
    "fon": "bìblá ; blàblá",
    "cat": "general"
  },
  "lien": {
    "fr": "lien",
    "fon": "kàn ; nùblànú",
    "cat": "general"
  },
  "lier": {
    "fr": "lier",
    "fon": "blă ; action de lier ; bibì ; bìblá ; blà ; action de lier solidement la charpente ; xɔB kpínkpεn ; lier",
    "cat": "general"
  },
  "amitiéavecquelquun": {
    "fr": "amitié avec quelqu'un",
    "fon": "zùn xɔCntɔBn xá mɛ ; lier camaraderie avec quelqu'un ; dŏ gbé xá mε ; dŏ hă xá",
    "cat": "famille_societe"
  },
  "lieu": {
    "fr": "lieu",
    "fon": "tεn ; tεndò ; wènú ; avoir lieu ; sù ; avoir lieu (pour un incendie) ; sìn ɖà nŭ ; en dernier lieu ; gbɔBn",
    "cat": "general"
  },
  "tó": {
    "fr": "tó",
    "fon": "en tout dernier lieu ; gùdógúdó ; le lieu d'une invitation ; jògbĕ ; le lieu où l'on boit de l'alcool",
    "cat": "general"
  },
  "nùglc": {
    "fr": "nùglɔc",
    "fon": "lieu d’aisance ; adadokpámε ; adadoxɔB ; adajεtεn ; lieu de consultation du Fá ; nùsá ; lieu de",
    "cat": "general"
  },
  "yagbenú": {
    "fr": "yagbenú",
    "fon": "lieu de pêche ; ɖɔnyitεnmε ; lieu de plaisir ; gbεɖutεn ; lieu de prière ; ɖεxotεn ; lieu de",
    "cat": "spirituel_fa"
  },
  "ligne": {
    "fr": "ligne",
    "fon": "hwε ; xwì ; xwixwí ; les lignes de la main ; sεxwí ; ligne de démarcation d'une habitation ; hwε",
    "cat": "general"
  },
  "lime": {
    "fr": "lime",
    "fon": "akutε ; nùlígàn ; lime pour aiguiser les dents ; aɖùgánnú",
    "cat": "general"
  },
  "limer": {
    "fr": "limer",
    "fon": "dŏ akutε ; lì gàn ; limer les dents en pointe ; kàn aɖŭ ; kàn’ɖŭ",
    "cat": "general"
  },
  "limon": {
    "fr": "limon",
    "fon": "bɔH",
    "cat": "general"
  },
  "linge": {
    "fr": "linge",
    "fon": "linge taché de sang pour attester que la jeune mariée était intacte ; hunvɔB ; tout linge utilisé",
    "cat": "famille_societe"
  },
  "lion": {
    "fr": "lion",
    "fon": "jawuntá ; kinikíní ; kinikíní jawuntà",
    "cat": "general"
  },
  "lire": {
    "fr": "lire",
    "fon": "xà ; celui qui sait lire ; wèmàsétɔC ; lire pour vérifier ; xà kpɔCn ; lire un écrit ; xà wĕmà ; lire un",
    "cat": "general"
  },
  "livre": {
    "fr": "livre",
    "fon": "xà wĕmà ; lire une lettre ; xà wĕmà",
    "cat": "general"
  },
  "lisse": {
    "fr": "lisse",
    "fon": "ɖìɖí ; nánáná ; bien lisse ; mɔniì ; mɔCnímɔCní ; être lisse ; ɖìɖí",
    "cat": "general"
  },
  "lit": {
    "fr": "lit",
    "fon": "zàn ; zankpɔBn ; le lit d'un fleuve ; sábɔC ; le lit d'un fleuve ; sábɔC ; lit en bois ; xwlɛkánmà",
    "cat": "general"
  },
  "loger": {
    "fr": "loger",
    "fon": "nɔB",
    "cat": "general"
  },
  "loi": {
    "fr": "loi",
    "fon": "sεn ; action contre la loi ; nùblùblú ; faire une loi ; dŏ sεn ; la loi ancienne ; sεn xóxó ; la loi dans",
    "cat": "general"
  },
  "toutesarigueur": {
    "fr": "toute sa rigueur",
    "fon": "sεngεn ; la loi de dieu ; măwùsεn ; la loi nouvelle ; sɛCn yaɖéyaɖé ; sεn yaɖé-yaɖé ; loi",
    "cat": "spirituel_fa"
  },
  "loin": {
    "fr": "loin",
    "fon": "azɔgà ; zɔB ; au loin ; gbĕ ; gbejí ; sε dŏ ; zɔB ; zɔgà ; bien loin ; gúnmígúnmí ; vwéé ; être au loin ; ɖò",
    "cat": "general"
  },
  "azgà": {
    "fr": "azɔgà",
    "fon": "être loin ; lĭn ; loin de tous ; zɔzɔB ; très loin ; líí ; très loin du lieu où l'on se trouve ; zɔvóó ; zo",
    "cat": "general"
  },
  "véé": {
    "fr": "véé",
    "fon": "zoɖéé",
    "cat": "general"
  },
  "lointain": {
    "fr": "lointain",
    "fon": "lìnlín ; vanavíní ; endroit lointain ; fímayafí ; lointains ancêtres (pour insulter) ; vivavívá",
    "cat": "spirituel_fa"
  },
  "long": {
    "fr": "long",
    "fon": "alɔgà ; ɖì gà ; gà ; gaga ; gblulù ; xwaàn ; xwiyaà ; xwiyaxwiyà ; être long ; ɖì gà ; long et lisse ; àblε",
    "cat": "general"
  },
  "louange": {
    "fr": "louange",
    "fon": "kpikpa ; mε kpikpa ; mεkpikpa ; susù ; xixomlá ; xuxomlá ; louange de marie litanies de la",
    "cat": "famille_societe"
  },
  "louer": {
    "fr": "louer",
    "fon": "kpà ; mlă ; xayà ; xɛCyà ; louer quelque chose ; dà ; dà nŭ ; louer quelqu'un ; kpà mε ; louer un",
    "cat": "general"
  },
  "lourd": {
    "fr": "lourd",
    "fon": "kpinkpεn ; kεɖεkεɖε ; lεtεε ; être lourd ; ɖŏ zìn ; kpεn ; être lourd (réservé aux êtres humains",
    "cat": "general"
  },
  "loyer": {
    "fr": "loyer",
    "fon": "loyer d'une chambre ; xɔkwɛC",
    "cat": "general"
  },
  "lucre": {
    "fr": "lucre",
    "fon": "lè",
    "cat": "general"
  },
  "lui": {
    "fr": "lui",
    "fon": "éyε ; i ; à lui ; éénɔ ; n'í ; avec lui ; x’ɛC ; xá ɛB ; lui ! ; e !",
    "cat": "general"
  },
  "luire": {
    "fr": "luire",
    "fon": "kɔCn",
    "cat": "general"
  },
  "lun": {
    "fr": "lun",
    "fon": "jeu de balle au pied ; bɔHlu afɔsɔCxó ; jeu de mains des enfants ; alɔglwεglwε",
    "cat": "famille_societe"
  },
  "lundi": {
    "fr": "lundi",
    "fon": "tεnígbè ; lundi ; vodúngbé fɔCn j'àyĭ ; lundi ; dimanche dernier ; vodúngbe é kó wá yí ɔC",
    "cat": "general"
  },
  "lune": {
    "fr": "lune",
    "fon": "sùn ; faire pleine lune ; sùn kpé ká ; la nouvelle lune ; sunwájĭ ; lune pâle, sans clarté ; sunkúawì",
    "cat": "nature_monde"
  },
  "lutte": {
    "fr": "lutte",
    "fon": "asádánnyídánnyí ; hunxixo ; zà ; zalili ; lutte corps à corps ; alɔdidó ; alɔdudó",
    "cat": "general"
  },
  "lyre": {
    "fr": "lyre",
    "fon": "sorte de lyre ; agídígbó ; sorte de lyre faite de lames métalliques sur une caisse rectangulaire en",
    "cat": "general"
  },
  "ma": {
    "fr": "ma",
    "fon": "cè ; yè",
    "cat": "general"
  },
  "dotbn": {
    "fr": "do tɔbn",
    "fon": "mâchoire supérieure ; aglanká aga tɔBn",
    "cat": "general"
  },
  "maçon": {
    "fr": "maçon",
    "fon": "xɔtlɛCtɔC",
    "cat": "general"
  },
  "magie": {
    "fr": "magie",
    "fon": "majíkì ; sà bògbé dŏ mε ; attitude magique ; alɔfín ; nufín ; magie noire ; azĕ",
    "cat": "general"
  },
  "main": {
    "fr": "main",
    "fon": "alɔB ; àsí ; aller officiellement demander la main d'une femme ; yì asì gbé ; avec la main ; alɔsɔCxó",
    "cat": "famille_societe"
  },
  "mais": {
    "fr": "mais",
    "fon": "àcéè ; adì ; amɔH ; có ; ká ; kɔCn ; loɔC ; mais hélas ; àcéè ; adì ; mais si ; afì",
    "cat": "general"
  },
  "maïs": {
    "fr": "maïs",
    "fon": "agbadé ; gbadé ; le maïs semé en août ; zò gbadé ; zògbàdé ; le maïs semé en mars-avril ; xwe",
    "cat": "general"
  },
  "gbadé": {
    "fr": "gbadé",
    "fon": "maïs délayé dans l'eau ; sinfannu ; maïs en grains cuit à l'eau et salé mélangé des arachides",
    "cat": "nature_monde"
  },
  "twú": {
    "fr": "tɔwú",
    "fon": "la maison de l'eau ; tɔxwé ; la maison de mamíwatá ; tɔxwé ; la maison des rois d'abomey",
    "cat": "nature_monde"
  },
  "gbójí": {
    "fr": "gbójí",
    "fon": "maison clôturée ; xwéxíxá ; maison couverte de tuiles ; kpexɔB ; kpεnzɔBn ; maison de commerce",
    "cat": "general"
  },
  "majestueux": {
    "fr": "majestueux",
    "fon": "avoir un port de tête majestueux ; xò kɔB",
    "cat": "sante_tisane"
  },
  "mal": {
    "fr": "mal",
    "fon": "nŭ nyanya ; azɔBn ; nyidò ; avoir mal à la tête ; ta ɖù mε ; ta fεn mε ; avoir mal au cou ; kɔB kú mε",
    "cat": "sante_tisane"
  },
  "avoirmalauventre": {
    "fr": "avoir mal au ventre",
    "fon": "gblĕ xomε ; xomɛB wlĭ mɛ ; avoir mal aux dents ; ɖŭ ɖú mε ; avoir mal aux jambes",
    "cat": "sante_tisane"
  },
  "afbkú": {
    "fr": "afɔb kú",
    "fon": "celui qui cherche à faire du mal ; mεεedotɔC ; celui qui dit du mal des gens ; dànùɖɔCnúmεtɔC",
    "cat": "general"
  },
  "wè": {
    "fr": "wè ɖŭ",
    "fon": "mal danser ; xò wè kpò ; mal de dents ; aɖùɖúɖú ; aɖùzɔCn ; mal de ventre ; nŭɖogbε ; mal élevé",
    "cat": "sante_tisane"
  },
  "klj": {
    "fr": "-klεjεε",
    "fon": "nuĭ dò ; mal juger ; dŏ hwε agɔ ; mal parler ; ɖɔB nyidò ; ɖɔB xó gbɔB ; mal parler de quelqu'un ; ɖɔB",
    "cat": "general"
  },
  "nnyidònúm": {
    "fr": "nŭ nyidò nú mε",
    "fon": "kε nu nyanya dŏ mε wŭ ; mal préparé ; kpannyaà ; maux de tête de la nuit ; zănta ; se",
    "cat": "sante_tisane"
  },
  "maladie": {
    "fr": "maladie",
    "fon": "azɔBn ; azɔnjijε ; maladie communiquée par un vaudoun ; jĭzɔBn ; maladie contagieuse ; jεmεjí",
    "cat": "sante_tisane"
  },
  "maladiedecoeur": {
    "fr": "maladie de coeur",
    "fon": "hùnjízɔBn ; hùnxwéhúnxwé ; hŭnzɔBn ; maladie de foie ; alĭnzɔBn ; maladie de la bouche",
    "cat": "sante_tisane"
  },
  "nuslú": {
    "fr": "nuslú",
    "fon": "maladie de la rate ; kúkù ; maladie de peau ; anyŭzɔBn ; maladie de peau au pied ; cákpá",
    "cat": "sante_tisane"
  },
  "maladiedepoitrine": {
    "fr": "maladie de poitrine",
    "fon": "akɔCnjízɔBn ; akɔCnzɔBn ; akɔCnzε ; maladie des nerfs ; kanmεzɔBn ; maladie des reins",
    "cat": "sante_tisane"
  },
  "alinzbn": {
    "fr": "alinzɔbn",
    "fon": "maladie des voies urinaires ; aɖɔHzɔBn ; maladie éruptive ; jĭzɔBn ; xì ; maladie éruptive de la peau",
    "cat": "sante_tisane"
  },
  "produisantdepetitsboutons": {
    "fr": "produisant de petits boutons",
    "fon": "jìnú ; soɖɔC ; maladie provoquée par une rancune ; kεnzɔBn ; maladie qui",
    "cat": "sante_tisane"
  },
  "rougelèpre": {
    "fr": "rouge (lèpre)",
    "fon": "gudù ; sorte de maladie qui atteint surtout les petits enfants dans la bouche et à l'anus",
    "cat": "sante_tisane"
  },
  "mâle": {
    "fr": "mâle",
    "fon": "asú ; sú ; mâle non castré ; àglúzasúkwéɖé",
    "cat": "general"
  },
  "malin": {
    "fr": "malin",
    "fon": "mɛ zinzin ; mεbíbí ; mεsísε ; nukúnzíntɔC ; nukúnzinzinnɔB ; nyɔHHnŭì ; zinzin ; être malin ; bĭ ; dĕ ; sε",
    "cat": "general"
  },
  "malle": {
    "fr": "malle",
    "fon": "gbă ; malle avec le trousseau que le fiancé apportera la femme qu'il va épouser ; asigbá",
    "cat": "famille_societe"
  },
  "maman": {
    "fr": "maman",
    "fon": "năna ; maman (nom affectueux) ; năjinɔB ; maman (nom archaïque) ; năjinɔB",
    "cat": "general"
  },
  "mangé": {
    "fr": "mangé",
    "fon": "ce qu'on a mangé hier (euphémisme) ; sɔBnŭɖà",
    "cat": "general"
  },
  "wlnù": {
    "fr": "wlă nŭ ɖù",
    "fon": "manger avec quelqu'un ; d'álɔ ká ɖokpó ɔC mε xá mε ; manger beaucoup ; lε jε ; manger",
    "cat": "nature_monde"
  },
  "salé": {
    "fr": "salé",
    "fon": "sɔC jε ; manger sans accompagnement ; cán ; manger sans assaisonnement ; cán ; manger sans",
    "cat": "general"
  },
  "manioc": {
    "fr": "manioc",
    "fon": "agblaguda ; ajagún ; ajangún ; fεnlínyε ; la plante de manioc ; fεnnyεntín ; manioc compact et",
    "cat": "sante_tisane"
  },
  "manipulation": {
    "fr": "manipulation",
    "fon": "manipulation des noix ou du chapelet divinatoire pour consulter le fâ ; fákínkán",
    "cat": "spirituel_fa"
  },
  "demanquerderespect": {
    "fr": "de manquer de respect",
    "fon": "lìyàlíyá ; action de manquer le but ; wuntá ; akpó ; le fait de manquer ; kpukpò",
    "cat": "famille_societe"
  },
  "jgbh": {
    "fr": "jε gbεh",
    "fon": "manquer de bonté ; kú wɔBn ; manquer de bonté ; kú xomɛB ; manquer de charme ; vlεH",
    "cat": "general"
  },
  "zbnn": {
    "fr": "zɛbn nŭ",
    "fon": "manquer de respect ; lyá ; manquer de respect à quelqu'un ; mlă mɛ wŭ ; mlă mε wŭ ; manquer",
    "cat": "famille_societe"
  },
  "égal": {
    "fr": "égal",
    "fon": "bà hă mε ; manquer de sang ; hùn hwè dô mε ; manquer de sensibilité ; kú xomɛB ; manquer",
    "cat": "general"
  },
  "azhm": {
    "fr": "azɔhmε",
    "fon": "manquer l'école ; gɔBn azɔHmε ; manquer quelqu'un ; bà mε ; manquer un but ; gbɔB",
    "cat": "general"
  },
  "mante": {
    "fr": "mante",
    "fon": "mante religieuse ; jɔB",
    "cat": "general"
  },
  "lansatc": {
    "fr": "lansatɔc",
    "fon": "marchand d'esclaves ; mεxɔtɔC ; marchand d'huile ; amisatɔC ; marchand de pâte de farine de",
    "cat": "famille_societe"
  },
  "dhuile": {
    "fr": "d'huile",
    "fon": "aminɔB",
    "cat": "famille_societe"
  },
  "waz": {
    "fr": "-w'azɔ",
    "fon": "marcher à la suite de quelqu'un ; xwè dŏ mɛ ; marcher à pied ; zɔBn afɔB ; marcher à quatre",
    "cat": "general"
  },
  "avì": {
    "fr": "avì",
    "fon": "dlă avì ; marcher au pas ; di zɔnlìn zɛHnzɛHn ; marcher dans l'obscurité ; dlă avì ; marcher dans",
    "cat": "general"
  },
  "mardi": {
    "fr": "mardi",
    "fon": "gùzángbè ; talátà ; talátàgbè ; dimanche dernier ; vodúngbe é wà yí ɔC",
    "cat": "general"
  },
  "marée": {
    "fr": "marée",
    "fon": "marée basse ; xujijó ; xujujó ; xusisayì",
    "cat": "general"
  },
  "mariage": {
    "fr": "mariage",
    "fon": "asidida ; asikplákplá ; mεdida ; faire le mariage à l'intérieur de la communauté familiale ; blŏ",
    "cat": "famille_societe"
  },
  "xwéó": {
    "fr": "xwé ɖó",
    "fon": "forme de conclusion de mariage xwéblóɖó ; xwékpótá ; forme de conclusion du mariage",
    "cat": "famille_societe"
  },
  "asúcycsí": {
    "fr": "asúcyɔcsí",
    "fon": "forme de mariage à l'intérieur de la famille où l'on fait peu de dépenses pour la dot ; xwélyó",
    "cat": "famille_societe"
  },
  "marié": {
    "fr": "marié",
    "fon": "être marié ; ɖŏ asì",
    "cat": "famille_societe"
  },
  "chrétiens": {
    "fr": "chrétiens",
    "fon": "wlĭ alɔB ; se marier sur selon le rite chrétien ; wlĭ alɔB",
    "cat": "famille_societe"
  },
  "marigot": {
    "fr": "marigot",
    "fon": "tán ; tɔB",
    "cat": "famille_societe"
  },
  "marin": {
    "fr": "marin",
    "fon": "xunuwatɔC ; xuzɔwatɔC",
    "cat": "famille_societe"
  },
  "maritime": {
    "fr": "maritime",
    "fon": "xumɛtɔBn",
    "cat": "famille_societe"
  },
  "lbzn": {
    "fr": "lεbεzεn",
    "fon": "marmite en terre ; zɛHn ; marmite en terre pour faire la cuisine ; nùɖàzεn ; marmite pour la",
    "cat": "nature_monde"
  },
  "nw": {
    "fr": "nŭ wŭ",
    "fon": "faire une marque à quelqu'un ; ɖŏ wŭntùn mε",
    "cat": "general"
  },
  "marre": {
    "fr": "marre",
    "fon": "en avoir marre ; kpéké kɔB nú mε",
    "cat": "general"
  },
  "mars": {
    "fr": "mars",
    "fon": "xwèjísùn",
    "cat": "general"
  },
  "masculin": {
    "fr": "masculin",
    "fon": "indique le masculin après les noms d'animaux et de certaines plantes ; asú",
    "cat": "sante_tisane"
  },
  "masse": {
    "fr": "masse",
    "fon": "hánmá ; dans toute sa masse ; tikoò ; en masse ; dεnɖεn ; gugù ; hoò ; hwiì ; être en masse ; ɖŭ",
    "cat": "general"
  },
  "mât": {
    "fr": "mât",
    "fon": "mât de pavillon ; asyátín",
    "cat": "general"
  },
  "matin": {
    "fr": "matin",
    "fon": "zănzăn ; de bon matin ; fuù ; zănzăn futufutù ; zănzăn tεεn ; zànfɔCnnu ; du matin au soir",
    "cat": "general"
  },
  "odeur": {
    "fr": "odeur",
    "fon": "wànlúnlún ; mauvaise tête ; xomɛkúkú",
    "cat": "sante_tisane"
  },
  "me": {
    "fr": "me",
    "fon": "mì",
    "cat": "general"
  },
  "mèche": {
    "fr": "mèche",
    "fon": "kàn ; zogbɛCnkàn ; mèche de lampe ; kán myɔgbε",
    "cat": "general"
  },
  "mòkám": {
    "fr": "mă ɖò ká mε",
    "fon": "mélanger les légumes avec les condiments ; nyà mă ɖò ká mε",
    "cat": "general"
  },
  "mêlé": {
    "fr": "mêlé",
    "fon": "être mêlé ; blŭ",
    "cat": "general"
  },
  "mêler": {
    "fr": "mêler",
    "fon": "dɔBn blŭ ; se mêler à ; nɔB kpɔC ; se mêler de ; hwεHn ɖò mε ; tɔCn ɖò mε",
    "cat": "general"
  },
  "mbké": {
    "fr": "-mɔbké",
    "fon": "de même que ; lĕè ; lĕè...gbɔBn ɔC ; mɔH ... gbɔBn ; de même que ... de même ; lĕe... gbɔBn ɔC ; lĕe... mɔH",
    "cat": "general"
  },
  "yèésú": {
    "fr": "-yèɖésú",
    "fon": "faire de même ; wà gbɔBn mɔH ; le même ; ɖokpɔC ɔC ; mɔBhúnkɔC ; mɔBhúnkɔCtɔCn ; le même jour",
    "cat": "general"
  },
  "zogbè": {
    "fr": "zogbè",
    "fon": "lui-même ; paákpaá ; è ; é ɖésú ; éɖéé ; éɖésú ; lui-même en personne ; é ɖésú mεtún ; même si",
    "cat": "general"
  },
  "nbó": {
    "fr": "nă bó",
    "fon": "soi-même ; mεɖéé ; mεɖésú ; toi-même ; hwi ɖésú ; hwiɖéé ; vous-mêmes ; mi ɖé ; mi ɖesú",
    "cat": "general"
  },
  "mener": {
    "fr": "mener",
    "fon": "kplá mɛ yì ; kplá mε hεn yì ; mener tel ou tel genre de vie ; dŏ gbε",
    "cat": "general"
  },
  "menu": {
    "fr": "menu",
    "fon": "tebetebè ; être menu ; wìnní ; faire de menus larcins ; j’àjò wìnìwíní ; j'àjò wìnnìwínní ; menu",
    "cat": "general"
  },
  "merci": {
    "fr": "merci",
    "fon": "merci ! ; ooo ; merci pour la fois passée (il y a un certain temps) ; kú dó gbe ɖé",
    "cat": "general"
  },
  "mère": {
    "fr": "mère",
    "fon": "anɔB ; mεjitɔC ; naé ; năjinɔB ; nɔB ; yă ; belle-mère ; asi nɔB ; asú nɔB ; belle-mère de la femme ; asú nɔB",
    "cat": "famille_societe"
  },
  "grandmère": {
    "fr": "grand-mère",
    "fon": "năna ; nayé ; nɔgbó ; grand-mère maternelle ; nɔnɔB ; mamá ; grand-mère paternelle",
    "cat": "famille_societe"
  },
  "mamá": {
    "fr": "mamá",
    "fon": "la mère de dieu ; măwŭnɔB ; la mère de ma femme ; asi ye nɔB ; la mère de quelqu'un ; mε nɔB ; la",
    "cat": "spirituel_fa"
  },
  "mèreduroi": {
    "fr": "mère du roi",
    "fon": "menɔB ; ma belle-mère ; asi e nɔB ; mère aimante ; nɔB wànyìnúmɛtɔC ; mère de ; nɔB ; mère de",
    "cat": "famille_societe"
  },
  "okpónb": {
    "fr": "ɖokpónɔb",
    "fon": "mère poule ; koklósínɔB ; mère qui vient d'accoucher ; vĭyεyεnɔB ; nom donné à la mère d’un",
    "cat": "famille_societe"
  },
  "enfantencoreausein": {
    "fr": "enfant encore au sein",
    "fon": "kpεjítɔC ; kpεdóvínɔB ; kpεdóvúnɔB ; nom donné à la mère d'un kpédôvi",
    "cat": "famille_societe"
  },
  "kpdóvíjítc": {
    "fr": "kpεdóvíjítɔc",
    "fon": "sa belle-mère ; asú tɔCn nɔB ; asi tɔn nɔB ; asi ε nɔB ; asú tɔCn nɔB",
    "cat": "famille_societe"
  },
  "merle": {
    "fr": "merle",
    "fon": "merle métallique ; ahŏxε",
    "cat": "general"
  },
  "messe": {
    "fr": "messe",
    "fon": "amĭsà ; mĭsà",
    "cat": "general"
  },
  "kg": {
    "fr": "kg)",
    "fon": "kɔCn ; le fait de dépasser la mesure ; lŭ ; mesure de longueur de l'extrémité du pouce à celle du",
    "cat": "general"
  },
  "métal": {
    "fr": "métal",
    "fon": "gàn ; du vrai métal ; ganjɔgan ; métal de qualité ; ganjɔgan ; métal limé ; ganlili ; métal",
    "cat": "general"
  },
  "métis": {
    "fr": "métis",
    "fon": "yovóví ; yovóvú ; mulátù ; yovo klú ; métis (péjoratif) ; yovóklú",
    "cat": "general"
  },
  "mètre": {
    "fr": "mètre",
    "fon": "un mètre de tissu ; avɔ dukwí ɖokpó",
    "cat": "general"
  },
  "mets": {
    "fr": "mets",
    "fon": "mets composé de farine de maïs avec le son et d'huile avec des condiments ; kpaxεε ; mets",
    "cat": "general"
  },
  "jì": {
    "fr": "jì",
    "fon": "jì vĭ ; mettremettre aux prises ; dɔBn kpé ; mettre bas ; jì ; mettre bout à bout ; cá ; mettre côte à côte",
    "cat": "general"
  },
  "kì": {
    "fr": "kì",
    "fon": "mettre dans la ceinture ; sɔC dŏ gŏ mε ; mettre dans un trou ; sɔC dŏ dò mε ; mettre ; mettre de",
    "cat": "general"
  },
  "scté": {
    "fr": "sɔc ɖŏ té",
    "fon": "sɔC ɖŏ vò ; mettre de la poudre au front pour se protéger ; tá atín ; mettre de l'encens sur le feu",
    "cat": "general"
  },
  "dém": {
    "fr": "d'é mε",
    "fon": "sɔC dŏ é mε ; sɔC ɖŏ è mε ; mettre des barrières en travers de la rivière pour arrêter les poissons",
    "cat": "nature_monde"
  },
  "gbòtb": {
    "fr": "gbò tɔb",
    "fon": "mettre des habits de fête ; dŏ àcɔC awù ; dŏ àcɔC wù ; mettre des ventouses ; ɖŏ gò ; mettre deux",
    "cat": "general"
  },
  "mlkc": {
    "fr": "mlĭ kɔc",
    "fon": "mettre en bouteille ; dŏ gò ; mettre en désordre ; fàn ; gìdí ; gùdá ; gùdú ; hànnyá ; mettre en",
    "cat": "general"
  },
  "gage": {
    "fr": "gage",
    "fon": "sa ɖŏ gbanu ; sɔC ɖŏ gbanu ; mettre en marche un moteur ; dŏ zò nú ; mettre en opposition",
    "cat": "general"
  },
  "éjí": {
    "fr": "é jí",
    "fon": "mettre en prison ; dŏ mε gàn ; mettre en rang ; slε ; tò ; mettre en réserve ; sɔC ɖŏ té ; sɔC ɖŏ vò",
    "cat": "general"
  },
  "kpé": {
    "fr": "kpé",
    "fon": "dŏ ajàn mε ; mettre la main à ; sɔC alɔB dŏ ; mettre la main aux hanches ; ɖŏ alɔB alìn ; mettre la main",
    "cat": "general"
  },
  "jí": {
    "fr": "jí",
    "fon": "mettre la maison en ordre ; blŏ ; mettre la radio en marche ; hùn ladyóo ; mettre la terre à égalité",
    "cat": "nature_monde"
  },
  "fairefumer": {
    "fr": "faire fumer",
    "fon": "xá hwevi ; mettre l'enfant au dos ; kpàn vĭ ; mettre les mains aux hanches ; d’álɔ alinkàn",
    "cat": "famille_societe"
  },
  "talb": {
    "fr": "tε alɔb",
    "fon": "mettre son pagne ; gbă avɔB ; mettre sur la tête ; ɖìɖă ; mettre sur le dos ; zĕ ɖŏ wɛBn ; mettre",
    "cat": "sante_tisane"
  },
  "gd": {
    "fr": "gεdε",
    "fon": "mettre une flèche à l'arc ; tlɔC gă ; mettre une jarretière ; gbò dɔnmε ; se faire mettre un dentier",
    "cat": "general"
  },
  "yha": {
    "fr": "ɖyɔh aɖŭ",
    "fon": "se mettre à ; jà...gbé ; se mettre à courir ; bɛH wezùn ; bεH sín ; kán wezùn ; se mettre à deux ; gɔH",
    "cat": "general"
  },
  "jvò": {
    "fr": "jε vò",
    "fon": "se mettre à murmurer ; bεH dŏ hwenu ; se mettre à part ; jε vò ; se mettre à pleurer ; bεH avĭ ; se",
    "cat": "general"
  },
  "sítè": {
    "fr": "sí tè",
    "fon": "se mettre devant ; wă nukɔBn ; se mettre en avant ; klá ; se mettre en belle tenue ; bà àcɔ ; se",
    "cat": "general"
  },
  "xomb": {
    "fr": "xomɛb",
    "fon": "se mettre en colère contre quelqu'un ; jε adăn dŏ mε ; se mettre en état d'inimitié ; dŏ kεHn mε",
    "cat": "general"
  },
  "sl": {
    "fr": "slε",
    "fon": "se mettre en route ; ɖidó ; jε alì jĭ ; se mettre en travers de la gorge ; xá ; se mettre martel en tête",
    "cat": "sante_tisane"
  },
  "schnm": {
    "fr": "sɔc ɖŏ hŭn mε",
    "fon": "se mettre nu ; jε mé ; se mettre sous la protection de quelqu'un ; hɔBn wă sù mε ; hɔBn yi",
    "cat": "general"
  },
  "sù": {
    "fr": "sù",
    "fon": "sù ; se mettre sur le côté ; jε kεn ; găn ajà ; găn jà ; se mettre un bracelet métallique ; dŏ gàn alɔB ; se",
    "cat": "general"
  },
  "sien": {
    "fr": "sien",
    "fon": "jɔB fún",
    "cat": "general"
  },
  "meule": {
    "fr": "meule",
    "fon": "nùlígàn ; la grande meule ; sénɔ ; meule à aiguiser ; nùgánkpεn ; meule que les femmes font",
    "cat": "famille_societe"
  },
  "midi": {
    "fr": "midi",
    "fon": "hwè jlɔH hwăn ; hwè mε ; hwè nyì hwăn ; hwejlɔChwàn ; hwemε ; hwenyìhwăn",
    "cat": "general"
  },
  "miel": {
    "fr": "miel",
    "fon": "wĭìn ; wììnmí",
    "cat": "general"
  },
  "mien": {
    "fr": "mien",
    "fon": "cè ; le mien ; cè ɔ ; les miens ; mε ce lε mì",
    "cat": "general"
  },
  "mieux": {
    "fr": "mieux",
    "fon": "aller mieux ; gbɔB ; kɔCn kpò ; kpɔCn té ; aller mieux pour quelqu'un ; fúɖá nú mε ; être mieux que",
    "cat": "general"
  },
  "enparlantdeschoses": {
    "fr": "(en parlant des choses)",
    "fon": "kpɔCn té ; mieux (pour une maladie) ; wadaà ; tant mieux ! ; ahóo !",
    "cat": "sante_tisane"
  },
  "mil": {
    "fr": "mil",
    "fon": "lì ; gros mil ; abɔB ; mange-mil ; títígwetí",
    "cat": "general"
  },
  "milan": {
    "fr": "milan",
    "fon": "gangan",
    "cat": "general"
  },
  "zanmb": {
    "fr": "zanmɛb",
    "fon": "au milieu du lac ; tɔ zanmɛB ; le milieu ; vlɔH ɖŏ wè ; le milieu de la forêt ; zunta ; le milieu de la",
    "cat": "nature_monde"
  },
  "mille": {
    "fr": "mille",
    "fon": "afatɔCn ; aftɔCn ; dĕgbà ; mille cauris ou 0,25 f. ; akwε afatɔCn ; mille francs ; akpo ɖokpó ; cakì ɖokpó",
    "cat": "general"
  },
  "mimer": {
    "fr": "mimer",
    "fon": "vlεH",
    "cat": "general"
  },
  "mince": {
    "fr": "mince",
    "fon": "babanányì ; gε ; gεgε ; kpεtεkpεtε ; nù báɖáɖá ; wɛBɖɛBwɛCɖɛC ; être mince ; kpécé ; wìnní ; être mince",
    "cat": "general"
  },
  "lblb": {
    "fr": "lεbεlεbε",
    "fon": "mince et long ; xwílóó ; très mince ; kpεcεkpεcε ; wìnìwíní",
    "cat": "general"
  },
  "mine": {
    "fr": "mine",
    "fon": "nukúnmε",
    "cat": "general"
  },
  "ministre": {
    "fr": "ministre",
    "fon": "gănhɔnyítɔC ; honyitɔC ; ministre de dieu ; măwùzɔCwátɔC ; ministre des finances et des biens",
    "cat": "spirituel_fa"
  },
  "mirer": {
    "fr": "mirer",
    "fon": "kpɔCn ; kpɔCn nùkpεn ; se mirer ; kpɔCn wĕ",
    "cat": "general"
  },
  "miséricordieux": {
    "fr": "miséricordieux",
    "fon": "nùbláwùkúnúmεtɔC ; être miséricordieux envers quelqu'un ; kú nù blă wŭ nú mɛ",
    "cat": "spirituel_fa"
  },
  "mite": {
    "fr": "mite",
    "fon": "avɔɖwivɔɖwi",
    "cat": "general"
  },
  "mité": {
    "fr": "mité",
    "fon": "être mité ; gbì",
    "cat": "general"
  },
  "tntín": {
    "fr": "tεntín",
    "fon": "moelle de l'os ; cɔncɔBn",
    "cat": "general"
  },
  "moi": {
    "fr": "moi",
    "fon": "mì ; nyì ; nyε ; moi-même ; nyε ɖésú ; nyε ɖésúnɔB ; nyεɖéé",
    "cat": "general"
  },
  "moins": {
    "fr": "moins",
    "fon": "à moins que ; afì ; au moins ; vɔCvɔC ; au moins quelquefois ; ayanuɖé ; être moins ; hwè hŭ",
    "cat": "general"
  },
  "mois": {
    "fr": "mois",
    "fon": "sùn ; ce mois-ci ; sun élɔC mε ; dans le courant de ce mois ; sun élɔC mε ; le mois dernier ; sùn ɖè ɔC",
    "cat": "general"
  },
  "daoût": {
    "fr": "d'août",
    "fon": "avivɔsùn ; mois de décembre ; woósùn ; mois de mars ; xwejísùn ; mois de novembre",
    "cat": "general"
  },
  "moitiéplein": {
    "fr": "moitié plein",
    "fon": "agbò ; la moitié ; vlɔH ɖŏ wè ; la moitié avant de la plante du pied ; gè ; la moitié de la nuit",
    "cat": "sante_tisane"
  },
  "molle": {
    "fr": "molle",
    "fon": "molle (en parlant de la pâte) ; wɛCwɛCwɛC",
    "cat": "general"
  },
  "mon": {
    "fr": "mon",
    "fon": "cè ; yè ; forme syncopée du possessif cè : mon, mien ; è ; mon ami intime ; sálú cé xɔCntɔBn ; mon",
    "cat": "famille_societe"
  },
  "amitrèscher": {
    "fr": "ami très cher",
    "fon": "xɔCntɔCn cé vívεná ; mon amour ; vivεná cè ; mon bien-aimé ; vivεná cè ; mon camarade",
    "cat": "famille_societe"
  },
  "hàtccè": {
    "fr": "hàtɔc cè",
    "fon": "mon cher ami ; xɔCntɔCn cé vívεná ; mon frère aussi ; nɔví cé mɔBké ; mon maître ; nùkplɔCnmítɔC",
    "cat": "famille_societe"
  },
  "monmari": {
    "fr": "mon mari",
    "fon": "asú cè ; mon prédécesseur ; mε e do mε un ɖe é ; mε e jε nukɔn nú mì ; mon seigneur",
    "cat": "famille_societe"
  },
  "monstre": {
    "fr": "monstre",
    "fon": "wɔHn ; monstre pour les animaux ; adlà ; nom d'un monstre ; zomadónu",
    "cat": "sante_tisane"
  },
  "liquidebouillant": {
    "fr": "liquide bouillant",
    "fon": "kiyakiyà ; monter à cheval ; xá sɔC ; xá sɔC jí ; monter à la tête de quelqu'un ; gblé tamε",
    "cat": "sante_tisane"
  },
  "scyìj": {
    "fr": "sɔc yì jĭ",
    "fon": "zĕ yì jĭ ; monter sur ; xá jĭ ; monter sur le trône ; jε axɔCsúzínkpò jí ; yì găn jĭ",
    "cat": "general"
  },
  "voie": {
    "fr": "voie",
    "fon": "sεnkplɔCnmεtɔC ; faire montre de ses habits ; xlɛC acɔC ; le fait de se montrer ; glaglà ; montrer à",
    "cat": "general"
  },
  "dsù": {
    "fr": "dŏ sù",
    "fon": "se montrer discret ; jɛB yɛB ; se montrer docile à ses ordres ; sè gbè nú mε ; se montrer doux",
    "cat": "general"
  },
  "bhwn": {
    "fr": "ɖɔb hwăn",
    "fon": "ɖɔB hwăn mε wŭ ; cá mε kò ; ɖɔB nyɔmε mε wŭ ; ɖɔB slamε mε wŭ ; gbɔB acà kò mε wŭ ; kò mε ; nɔB",
    "cat": "general"
  },
  "slam": {
    "fr": "-slamε",
    "fon": "slăn ; moquerie fine ; afyɔBn",
    "cat": "general"
  },
  "dents": {
    "fr": "dents",
    "fon": "wɔB nŭ ɖù ; mordre quelque chose pour le manger ; kàn ɖù ; mordre quelqu'un ; nyì aɖŭ dŏ mε",
    "cat": "general"
  },
  "mors": {
    "fr": "mors",
    "fon": "mors de cheval ; agbà",
    "cat": "general"
  },
  "mort": {
    "fr": "mort",
    "fon": "agblagójì ; cyɔC ; hìhán ; kúkú ; kúlítɔC ; kúlútɔC ; kútútɔC ; kúvítɔC ; savà ; à demi mort ; bebè ; action de",
    "cat": "general"
  },
  "mettreàmort": {
    "fr": "mettre à mort",
    "fon": "huhu ; celui qui est mort pour dieu ; măwùtámεkùɖótɔ ; être mort (par euphémisme)",
    "cat": "spirituel_fa"
  },
  "hn": {
    "fr": "hăn",
    "fon": "la mort ; asavà ; kú ; kújεsú ; maɖɔBnúxwε ; saɖexwé ; saɖexwéjεsú ; la mort avide ; kújεsú ; la mort",
    "cat": "general"
  },
  "dunfamilier": {
    "fr": "d'un familier",
    "fon": "nùwámε ; la mort personnifiée ; abaɖaxwé ; kúxɔCsú ; jεsú ; mort considéré dans sa vie de",
    "cat": "famille_societe"
  },
  "morve": {
    "fr": "morve",
    "fon": "misin",
    "cat": "general"
  },
  "morveux": {
    "fr": "morveux",
    "fon": "amisin",
    "cat": "famille_societe"
  },
  "mot": {
    "fr": "mot",
    "fon": "xóɖíɖɔC ; xóɖúɖɔC ; xógbè ; à mots couverts ; vεlεε ; bon mot ; nùbyáxà ; xókwín ; mot nouveau ; xó",
    "cat": "nature_monde"
  },
  "motte": {
    "fr": "motte",
    "fon": "motte de terre ; kɔ gló ; motte de terre durcie ; kɔCglŏ",
    "cat": "nature_monde"
  },
  "mou": {
    "fr": "mou",
    "fon": "être mou ; bɔB ; bɔB wŭ nú mɛ ; blòbló ; bɔHtà ; bŭ ; bubɔB ; kpɔɖɔɔB ; kpɔncɔɔBn ; kpεɖε ; vìvó ; vùvó",
    "cat": "general"
  },
  "sukpb": {
    "fr": "sukpɔb",
    "fon": "mouche verte ; supkɔB amamú",
    "cat": "general"
  },
  "mouchoir": {
    "fr": "mouchoir",
    "fon": "alɔmεdukwí ; lεHnsù ; mouchoir de poche ; akpomεdukwí ; mouchoir de tête ; dukwí",
    "cat": "sante_tisane"
  },
  "tabladúkwí": {
    "fr": "-tabladúkwí",
    "fon": "mouchoir que les femmes portent dans la main ; alɔnudŭkwì ; petit mouchoir ; lεHnsuví",
    "cat": "famille_societe"
  },
  "moue": {
    "fr": "moue",
    "fon": "faire la moue ; gbăn nyà nu ; tlɔCn nu ; faire la moue en tordant la bouche ; gbăn nyà nu",
    "cat": "general"
  },
  "moule": {
    "fr": "moule",
    "fon": "faire des parpaings avec un moule ; blĭkì",
    "cat": "general"
  },
  "zùn": {
    "fr": "zùn",
    "fon": "mourir (pour un vieillard) ; yì xwé ; mourir (pour une vieille personne) ; ɖŏ alɔBkɔB ; mourir à",
    "cat": "general"
  },
  "moyen": {
    "fr": "moyen",
    "fon": "ɖĕwagbɔBn ; wlenwín ; au moyen de ; gbɔBn ... gblamε ; gbɔBn gblà...mε ; au moyen de ; kpódó...",
    "cat": "general"
  },
  "muer": {
    "fr": "muer",
    "fon": "ɖyɔH fún ; muer ; flé hăn ; flé ză ; muer (oiseau) ; ɖyɔH fún ; muer (serpent) ; kɔCn wŭ ; kɔCn anyŭ",
    "cat": "nature_monde"
  },
  "muet": {
    "fr": "muet",
    "fon": "mεmɔnɔɖɔBxó ; être muet ; ɖεH tε ; tε ɖεH",
    "cat": "general"
  },
  "mugir": {
    "fr": "mugir",
    "fon": "hlŭn",
    "cat": "general"
  },
  "mulet": {
    "fr": "mulet",
    "fon": "gesú ; afìn",
    "cat": "general"
  },
  "mur": {
    "fr": "mur",
    "fon": "aglìn ; dŏ ; mur de clôture ; glegbedó ; mur d'enceinte ; agbŏdò ; mur en ruine ; dòglín",
    "cat": "sante_tisane"
  },
  "mûr": {
    "fr": "mûr",
    "fon": "zinzin ; être mûr ; bɔB ; jà ; myă ; zìn hăn ; être mûr (pour certains fruits) ; kε ; être mûr d'esprit",
    "cat": "spirituel_fa"
  },
  "mûri": {
    "fr": "mûri",
    "fon": "mûri hors saison ; xweflɛCdó",
    "cat": "general"
  },
  "mûrir": {
    "fr": "mûrir",
    "fon": "myă",
    "cat": "general"
  },
  "nager": {
    "fr": "nager",
    "fon": "lìn tɔB ; nager dans la mer ; lìn xù",
    "cat": "general"
  },
  "nago": {
    "fr": "nago",
    "fon": "le nago ; anagógbè",
    "cat": "general"
  },
  "nain": {
    "fr": "nain",
    "fon": "ayìdèvú ; mεhweglì ; wɔndavú",
    "cat": "general"
  },
  "naja": {
    "fr": "naja",
    "fon": "xlibó",
    "cat": "general"
  },
  "nappe": {
    "fr": "nappe",
    "fon": "nappe d’eau ; tɔB ; nappe de table ; tavojívɔB ; távojívɔB",
    "cat": "nature_monde"
  },
  "nasse": {
    "fr": "nasse",
    "fon": "ajà ; xà",
    "cat": "general"
  },
  "natte": {
    "fr": "natte",
    "fon": "dans la natte ; zanmɛB ; grosse natte en jonc ; akɔB ; akɔB ; natte ajourée à persiennes ; kosíwúnlé",
    "cat": "general"
  },
  "h": {
    "fr": "ɖɔh",
    "fon": "nattes ajourées que l'on met aux portes ou aux fenêtres ; kosílé ; kosíwúnɖé ; nattes fabriquées au",
    "cat": "general"
  },
  "navré": {
    "fr": "navré",
    "fon": "être navré ; ayì gblé",
    "cat": "general"
  },
  "né": {
    "fr": "né",
    "fon": "celui qui est né par la puissance d'un vaudoun ; hunjɔB ; une personne née entre deux filles",
    "cat": "general"
  },
  "néant": {
    "fr": "néant",
    "fon": "le néant ; yɛyivɔ",
    "cat": "general"
  },
  "nerf": {
    "fr": "nerf",
    "fon": "kàn ; kanmε ; nerf de boeuf ; lanbá",
    "cat": "general"
  },
  "nété": {
    "fr": "nété",
    "fon": "ahwà ; ahwatín",
    "cat": "general"
  },
  "neuf": {
    "fr": "neuf",
    "fon": "kpεεn ; tεnnε ; vεncεnvεncεn ; vεncεεn ; yaɖéyaɖé ; yɔByɔC ; neuf cent soixante-quinze francs",
    "cat": "general"
  },
  "neutraliser": {
    "fr": "neutraliser",
    "fon": "neutralisant d'un talisman déjà en place ; nùhúnnù ; neutraliser la cause d'une maladie",
    "cat": "sante_tisane"
  },
  "neveu": {
    "fr": "neveu",
    "fon": "nɔBví",
    "cat": "general"
  },
  "nez": {
    "fr": "nez",
    "fon": "awɔntín ; nez aplati et mince ; awɔntín kpεtε",
    "cat": "general"
  },
  "niais": {
    "fr": "niais",
    "fon": "gŭ ; mε lulú ; mεlulú ; xlŏnɔB ; yɛyinɔB ; yeyunɔB",
    "cat": "general"
  },
  "nid": {
    "fr": "nid",
    "fon": "adɔH ; nid d'abeilles ; wìínkpà ; nid d'oiseau ; xedɔC",
    "cat": "nature_monde"
  },
  "nièce": {
    "fr": "nièce",
    "fon": "nɔBví",
    "cat": "general"
  },
  "nier": {
    "fr": "nier",
    "fon": "mɔH ; nier ; action de nier ; mìmɔC ; mùmɔC ; action de nier une chose ; nù mímɔC ; nù múmɔC ; nier à la",
    "cat": "general"
  },
  "noce": {
    "fr": "noce",
    "fon": "agbanɖuɖù ; asidida ; faire la noce ; ɖù agbàn",
    "cat": "general"
  },
  "noeud": {
    "fr": "noeud",
    "fon": "gŏ ; nùbìblá ; nùblàblá ; avoir des noeuds ; wŭ gŏ ; avoir des noeuds (pour un arbre) ; ɖŏ gŏ",
    "cat": "nature_monde"
  },
  "noir": {
    "fr": "noir",
    "fon": "awì ; vlivlì ; vlivlivlì ; wiwi ; d'un beau noir ; wiwi cúcú ; être noir ; wì ; faire noir ; zăn dŏ ablù",
    "cat": "nature_monde"
  },
  "noix": {
    "fr": "noix",
    "fon": "noix d'acajou ; kajŭ ; noix de coco encore verte ; agɔndlò ; noix de coco mûre ; agɔnkε ; noix de",
    "cat": "general"
  },
  "nom": {
    "fr": "nom",
    "fon": "nyĭ ; nyìkɔC ; aller consulter pour trouver le nom d'un nouveau-né ; yì agbasá nú vĭ ; au nom de",
    "cat": "nature_monde"
  },
  "nuit": {
    "fr": "nuit",
    "fon": "zănsì ; nom de fille née le lundi ; ajwáví ; nom ; nom de garçon jumeau ; gbojà ; nom de garçon né",
    "cat": "nature_monde"
  },
  "lanaissance": {
    "fr": "la naissance",
    "fon": "wùsú ; nom donné au jumeau venu en premier ; sagbó ; nom donné aux enfants qui",
    "cat": "famille_societe"
  },
  "siège": {
    "fr": "siège",
    "fon": "agɔyì ; nom propre de fille née par le siège ou par les pieds ; agɔsì ; nom propre de fille qui s’est",
    "cat": "general"
  },
  "unefille": {
    "fr": "une fille",
    "fon": "ajayí ; nom propre donné à une fille née le lundi ; siká ; nom propre d'un enfant ; hunsixwè",
    "cat": "famille_societe"
  },
  "hunsú": {
    "fr": "-hunsú",
    "fon": "nom propre d'un garçon ; hunsa ; hunsínú ; nom propre d'une fille ; hunsì ; un nom de sakpata",
    "cat": "general"
  },
  "non": {
    "fr": "non",
    "fon": "enyíì ; non (dans le style indirect) ; xéŏ ; non comestible ; akpà ; non débarbouillé ; atán fín ; non",
    "cat": "general"
  },
  "décortiqué": {
    "fr": "décortiqué",
    "fon": "caklú ; non initié autorisé à présenter les offrandes ordinaires au vaudoun ; sinhutɔC ; non",
    "cat": "spirituel_fa"
  },
  "nord": {
    "fr": "nord",
    "fon": "totaligbé ; le nord ; vóvólívwé ; le nord, vu d'abomey ; ké",
    "cat": "general"
  },
  "normal": {
    "fr": "normal",
    "fon": "sɔB gbè ; un enfant normal ; vìjɔCvĭ",
    "cat": "famille_societe"
  },
  "norme": {
    "fr": "norme",
    "fon": "gàn",
    "cat": "general"
  },
  "nos": {
    "fr": "nos",
    "fon": "mĭtɔBn",
    "cat": "general"
  },
  "noter": {
    "fr": "noter",
    "fon": "sɔC kεn ; bien noter ; ɖŏ kεn jĭ",
    "cat": "general"
  },
  "notre": {
    "fr": "notre",
    "fon": "mĭtɔBn ; notre maître ; nùkplɔCnmìtɔC ; notre mère (appellation de marie chez les catholiques)",
    "cat": "famille_societe"
  },
  "mnb": {
    "fr": "mĭnɔb",
    "fon": "notre mère marie ; mĭnɔB malía ; notre père commun ; mìtɔC ; notre premier père ; tɔC mĭtɔBn",
    "cat": "famille_societe"
  },
  "ayìjtbn": {
    "fr": "ayìjεtɔbn",
    "fon": "notre saint père le pape ; mitɔC mímε ; mìtɔC mímε pápà",
    "cat": "famille_societe"
  },
  "nôtre": {
    "fr": "nôtre",
    "fon": "le nôtre ; mitɔCn ɔC ; les nôtres ; mitɔCn lε",
    "cat": "general"
  },
  "noué": {
    "fr": "noué",
    "fon": "sinsìn",
    "cat": "general"
  },
  "nouer": {
    "fr": "nouer",
    "fon": "sìn ; slε ; slε gŏ ; action de nouer ; sinsìn ; nouer au bout du pagne ; sìn dŏ avɔtó ; slε dŏ avɔB to",
    "cat": "general"
  },
  "dkb": {
    "fr": "dŏ kɔb",
    "fon": "slε avɔB kɔB ; nouer son pagne ; gbă avɔB ; nouer une corde ; sìn kàn dŏ",
    "cat": "general"
  },
  "lgbánúúú": {
    "fr": "lεgbánúɖúɖú",
    "fon": "nourriture préparée par les femmes de la maison pour la fête du viɖétɔCn ; jeɖiɖa",
    "cat": "famille_societe"
  },
  "nous": {
    "fr": "nous",
    "fon": "mĭ ; de nous ; mĭtɔBn ; nous autres ; mĭ dè lε ; mĭ dlε ; nous seuls ; mì ɖóɖó ; mì ɖóɖónɔB ; nous",
    "cat": "general"
  },
  "voici": {
    "fr": "voici !",
    "fon": "wéwéyiwĕyì ; nous-mêmes ; mì ɖé ; mìɖéé ; mi ɖésú",
    "cat": "general"
  },
  "noyau": {
    "fr": "noyau",
    "fon": "kín ; kwín ; noyau de l'amande du palmier de terre ; ayìdègún ; noyau de pomme sauvage",
    "cat": "nature_monde"
  },
  "noyer": {
    "fr": "noyer",
    "fon": "se noyer ; kú tɔB",
    "cat": "general"
  },
  "nu": {
    "fr": "nu",
    "fon": "godé ; mεH ; mεHmεH ; être nu ; ɖò mεH ; nà mεH ; wĕ ; nu-pieds ; sálúbatà ; tout nu ; sεgbéjí",
    "cat": "general"
  },
  "nuage": {
    "fr": "nuage",
    "fon": "akpɔCkpɔB ; azizɔ ; nuage noir ; akpɔCwì",
    "cat": "general"
  },
  "nuée": {
    "fr": "nuée",
    "fon": "azizɔ",
    "cat": "general"
  },
  "vlhwè": {
    "fr": "vlɔh ɖŏ wè",
    "fon": "faire nuit ; zăn dŏ ablù ; zăn kú ; il commence à faire nuit ; zăn bɔB",
    "cat": "general"
  },
  "nul": {
    "fr": "nul",
    "fon": "ɖĕbŭ ă ; ɖokpó... ă ; nul (semi négatif) ; tí ; nulle part ; fí ɖĕ ă ; fí tí ă ; fí tí... ă ; sɔCC",
    "cat": "general"
  },
  "obéir": {
    "fr": "obéir",
    "fon": "sè gbè ; sè tó nŭ ; sè tónú ; celui qui obéit à quelqu'un ; mεgbesetɔC ; obéir à quelqu'un ; sè gbè nú",
    "cat": "general"
  },
  "objet": {
    "fr": "objet",
    "fon": "nŭ ; objet à bon marché ; nŭ kpikpɔ ; objet broyé ; nùlílí ; objet d'adoration ; numesèn ; objet de",
    "cat": "general"
  },
  "síkánú": {
    "fr": "síkánú",
    "fon": "objet nécessaire à la prière ; ɖεxonú ; objet pour récompenser quelqu'un ; ajɔnú ; objet que",
    "cat": "spirituel_fa"
  },
  "océan": {
    "fr": "océan",
    "fon": "xù",
    "cat": "general"
  },
  "oeil": {
    "fr": "oeil",
    "fon": "nukún ; faire les beaux yeux à quelqu'un ; blŏ àcɔC nukún mε ; faire les gros yeux ; hlɔHn nukún",
    "cat": "nature_monde"
  },
  "oeuf": {
    "fr": "oeuf",
    "fon": "azìn ; oeuf à la coque ; azìn ɖiɖa ; oeuf de poule ; koklózìn ; oeuf sur le plat ; azìn susɔ",
    "cat": "general"
  },
  "officierdemarine": {
    "fr": "officier de marine",
    "fon": "ahwanhúngán",
    "cat": "famille_societe"
  },
  "vodún": {
    "fr": "vodún",
    "fon": "xwlé nú vodún ; offrir une offrande liquide à un vaudoun ; bà sìn ; offrir une offrande liquide à",
    "cat": "general"
  },
  "ogre": {
    "fr": "ogre",
    "fon": "adikloésú ; yɔgbó ; le grand ogre ; yɔ gbó ; yɔgbó",
    "cat": "general"
  },
  "oh": {
    "fr": "oh",
    "fon": "oh ! ; kóoyì ! ; kóyì ; mɔɔB ! ; yĕgè ! ; yĕgè !",
    "cat": "general"
  },
  "oie": {
    "fr": "oie",
    "fon": "kpákpá wèwé",
    "cat": "general"
  },
  "oint": {
    "fr": "oint",
    "fon": "sísá",
    "cat": "general"
  },
  "txb": {
    "fr": "tɔxɛb",
    "fon": "oiseau au beau plumage ; avunsákɔwó ; oiseau au long bec ; bεcwε ; oiseau carillon ; adlókpéjí",
    "cat": "nature_monde"
  },
  "znxb": {
    "fr": "zănxɛb",
    "fon": "oiseau pêcheur de couleur gris-blanc ; jajakléklé ; oiseau qui se nourrit de piment ; xɛtàblɛH",
    "cat": "nature_monde"
  },
  "ombre": {
    "fr": "ombre",
    "fon": "yɛB ; yɛtɛBn",
    "cat": "general"
  },
  "on": {
    "fr": "on",
    "fon": "è",
    "cat": "general"
  },
  "oncle": {
    "fr": "oncle",
    "fon": "daá kpε ; tɔC noví ; oncle maternel ; nylɔH ; oncle ou tante paternels ; tɔCnɔCví ; oncle paternel aîné",
    "cat": "general"
  },
  "dupère": {
    "fr": "du père",
    "fon": "daá ɖaxó ; oncle paternel plus jeune que le père ; daá kpε ; daá kpεví ; oncle plus âgé que le",
    "cat": "famille_societe"
  },
  "père": {
    "fr": "père",
    "fon": "atagán ; daá ɖaxó ; oncle plus jeune que le père ; daákpε ; daákpεví ; petit oncle paternel ; ataví",
    "cat": "famille_societe"
  },
  "ongle": {
    "fr": "ongle",
    "fon": "fεn ; wùjɔCnú",
    "cat": "general"
  },
  "vwíín": {
    "fr": "vwíín",
    "fon": "onomatopée indiquant un mouvement rapide et prolongé rapidement ; víín ; onomatopée",
    "cat": "general"
  },
  "onze": {
    "fr": "onze",
    "fon": "wŏ ɖokpó",
    "cat": "general"
  },
  "or": {
    "fr": "or",
    "fon": "àcéè ; adì ; có ; ká ; kɔCn ; loɔC ; or (métal) ; síká ; or pur ; siká akú",
    "cat": "general"
  },
  "gbotoklow": {
    "fr": "-gbotoklowĕ",
    "fon": "orange amère utilisée comme médicament ; azɔngbó ; orange non mûre ; gbotoklewĕ",
    "cat": "famille_societe"
  },
  "ordre": {
    "fr": "ordre",
    "fon": "tuto ; zìnzɔCn ; zùnzɔCn ; dans l'ordre de ; lixò ; alɔjí ; céɖéɖé ; en ordre dispersé ; gbadógbádó",
    "cat": "general"
  },
  "sensé": {
    "fr": "sensé",
    "fon": "lyεHngbèlyεHngbè ; être sous les ordres de ; ɖò àsí mε ; ɖò acε mε glɔC",
    "cat": "general"
  },
  "orgue": {
    "fr": "orgue",
    "fon": "sangún",
    "cat": "general"
  },
  "orner": {
    "fr": "orner",
    "fon": "ɖŏ aɖawùn ; jlă ; jlă ɖŏ ; và",
    "cat": "general"
  },
  "orphelin": {
    "fr": "orphelin",
    "fon": "orphelin de mère ; nɔcyɔCvĭ ; orphelin de père ; tɔCcyɔCví",
    "cat": "famille_societe"
  },
  "os": {
    "fr": "os",
    "fon": "xú ; l'os du poignet ; alɔgó ; l'os nu ; xú gló ; os de crâne humain ; kanlinɖujεta ; os de la mâchoire",
    "cat": "general"
  },
  "oser": {
    "fr": "oser",
    "fon": "gbɔH adɔB ; glă ; kpàn akɔCn ; kpàn kɔCn ; xà ; oser aborder quelqu'un ; glă dŏ mε wŭ ; oser",
    "cat": "general"
  },
  "otage": {
    "fr": "otage",
    "fon": "gbanumε",
    "cat": "general"
  },
  "ôter": {
    "fr": "ôter",
    "fon": "ɖè ; ɖè kpò ; ɖè sín ; hwè sín mε ; kɔCn sín ; yĭ sín ; ôter de ; ɖè tɔCn sín",
    "cat": "general"
  },
  "ou": {
    "fr": "ou",
    "fon": "alŏ ; ou bien ; alŏ ; kàbĭ ; ou bien ? ; abĭ ? ; ou... ou ; alŏ... alŏ",
    "cat": "general"
  },
  "où": {
    "fr": "où",
    "fon": "d'où ; sín ; où ? ; fí tε",
    "cat": "general"
  },
  "ouate": {
    "fr": "ouate",
    "fon": "avɔkanfún",
    "cat": "general"
  },
  "oubli": {
    "fr": "oubli",
    "fon": "nù wínwɔCn ; nùwínwɔCn ; nùwúnwɔCn ; oubli d'une chose ; nù wínwɔCn",
    "cat": "general"
  },
  "ouest": {
    "fr": "ouest",
    "fon": "l'ouest ; gbadahwejí ; l'ouest ; lisají",
    "cat": "general"
  },
  "oui": {
    "fr": "oui",
    "fon": "wĕyì ; εεn ; ah oui ? ; mɔɔB ? ; oui ! ; ooo !",
    "cat": "general"
  },
  "ouïe": {
    "fr": "ouïe",
    "fon": "avoir le sens de l'ouïe ; sè tó nŭ ; ouïe d'un poisson ; anyă",
    "cat": "nature_monde"
  },
  "outil": {
    "fr": "outil",
    "fon": "azɔwanú ; outil de menuisier ; awă ; outil en métal ; àliyánnú",
    "cat": "general"
  },
  "outre": {
    "fr": "outre",
    "fon": "outre en peau ; abutuwa ; outre mesure ; tlán",
    "cat": "nature_monde"
  },
  "outré": {
    "fr": "outré",
    "fon": "être outré ; kpé kɔB",
    "cat": "general"
  },
  "kaw": {
    "fr": "kε awε",
    "fon": "kε awε ; ouvrir un parasol ; kε hwexɔC ; ouvrir une parenthèse sur un sujet ; gbò jagé ; ouvrir",
    "cat": "general"
  },
  "ovin": {
    "fr": "ovin",
    "fon": "lεngbɔC",
    "cat": "general"
  },
  "pacte": {
    "fr": "pacte",
    "fon": "alεH ; lε ; faire le pacte du sang ; nù alε ; nù vodún ; faire solennellement un pacte d'amitié avec",
    "cat": "famille_societe"
  },
  "vodunnúnú": {
    "fr": "vodunnúnú",
    "fon": "pacte d'amitié ; xɔCntɔCnzúnzún",
    "cat": "spirituel_fa"
  },
  "page": {
    "fr": "page",
    "fon": "wĕmà ; wèmànúkúnmɛB ; page d'un livre ; wèmàkpáxwé",
    "cat": "general"
  },
  "pagne": {
    "fr": "pagne",
    "fon": "avɔB ; s’ávɔB ; beau pagne ; àcɔCvɔB ; toxòzĭn ; celui qui possède beaucoup de pagnes ; avɔnɔB ; le",
    "cat": "nature_monde"
  },
  "xwevb": {
    "fr": "xwevɔb",
    "fon": "pagne de mauvaise qualité ; suntɔCnmayiagɔH ; pagne de nuit ; wù cyɔCn ; wucyɔCn ; pagne de",
    "cat": "general"
  },
  "percale": {
    "fr": "percale",
    "fon": "lavɔB ; pagne déchiré ; avɔvunvún ; pagne du dessous pour les femmes ; dovɔB ; pagne en raphia",
    "cat": "famille_societe"
  },
  "kujb": {
    "fr": "kujɔb",
    "fon": "pagne gris ; avɔ afínnɔB ; pagne mortuaire ; adɔH ; adɔBvɔC ; pagne pour la nuit ; avɔB cyɔCncyɔCn",
    "cat": "general"
  },
  "paie": {
    "fr": "paie",
    "fon": "axɔCsúsú ; sú",
    "cat": "general"
  },
  "païen": {
    "fr": "païen",
    "fon": "pagáwùn ; les païens ; togudonú",
    "cat": "general"
  },
  "pain": {
    "fr": "pain",
    "fon": "blεbàtɔC ; wɔBxúxú ; faire du pain ; blŏ wɔBxúxú ; pain de maïs ; ablŏ ; pain sans levain ; wɔBxúxú",
    "cat": "general"
  },
  "pair": {
    "fr": "pair",
    "fon": "de pair ; zɛɛCn",
    "cat": "general"
  },
  "paix": {
    "fr": "paix",
    "fon": "alăfíà ; ayijàyĭ ; ayijεdò ; fífá ; gedemε ; vivomimɔB ; vuvomumɔ ; en paix ; blεε ; ɖó fífá jí ; xwíí ; être",
    "cat": "general"
  },
  "palissade": {
    "fr": "palissade",
    "fon": "akunkɔntín ; kpá ; kpó ; palissade autour d'une plante ; ajàkpá ; palissade métallique",
    "cat": "sante_tisane"
  },
  "sdé": {
    "fr": "-sεdé",
    "fon": "palmier du nombril ; hɔBndé ; palmier nain ; ayìdèvú ; palmier qui donne des noix avec beaucoup",
    "cat": "nature_monde"
  },
  "panne": {
    "fr": "panne",
    "fon": "pannes entre les fermes ; xɔkpínkpɛCn",
    "cat": "general"
  },
  "panse": {
    "fr": "panse",
    "fon": "adɔgò",
    "cat": "general"
  },
  "paon": {
    "fr": "paon",
    "fon": "ahlĭnhăn",
    "cat": "general"
  },
  "papa": {
    "fr": "papa",
    "fon": "papá ; xò babá",
    "cat": "general"
  },
  "pape": {
    "fr": "pape",
    "fon": "pápà ; yɛhwenɔ lɛC'xɔCsú ; yεhwenɔ lε'xɔCsú pápà ; yɛhwenɔxɔCsú ; Notre Saint Père le Pape ; mitɔC",
    "cat": "famille_societe"
  },
  "papillon": {
    "fr": "papillon",
    "fon": "afúntúnkpεkpε ; awadakpεkpε ; awεwε ; ailes jaunes ; amifún",
    "cat": "famille_societe"
  },
  "par": {
    "fr": "par",
    "fon": "ɖŏ... tamε ; gbɔBn ; être par ci par là ; ɖŏ fí ɖò dɔHn ; être par derrière ; ɖò gŭdò ; par catégorie",
    "cat": "general"
  },
  "vovò": {
    "fr": "vovò",
    "fon": "par hasard ; ayanu ; vlafò ; vlavò ; par là-bas ; leε ; par l'intermédiaire de ; gbɔBn ... gblamε ; gbɔBn",
    "cat": "general"
  }
};

export const FON_CULTURAL_BLESSINGS: string[] = [
  "Mawu na d'alɔ we (Que Dieu te vienne en aide / te soutienne)",
  "Mawu na do nukɔn we (Que Dieu te fasse progresser)",
  "Kúdɔ̀ gbadanu, alɔ Mawu tɔn ni nɔ jǐ towe (Bonsoir, que la main divine soit sur toi)",
  "A fɔ́n ganjí à ? À fɔ́n ɖé sín zǎnzǎn ? (Comment t'es-tu réveillé ce matin ?)",
  "Gbɛ́ ɔ, nǔ nyɔ́ tɔn wɛ è nɔ bà (Dans cette vie, c'est le bien et l'élévation que l'on recherche)",
  "Nǔɖé nɔ nyi vɔ̌ ɖò gbetɔ́ gɔ́n ǎ, Mawu wɛ nyí nǔ bǐ (Rien n'est vain chez l'humain si la bénédiction divine accompagne le geste)"
];
