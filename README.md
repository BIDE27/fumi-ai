# 🌍 FUMI AI — L'Intelligence Artificielle Souveraine Africaine & Polyvalente

<div align="center">
  <img src="public/images/fumi/fumi_avatar.png" width="120" height="120" alt="FUMI AI Avatar" style="border-radius: 50%; box-shadow: 0 0 25px rgba(209, 152, 75, 0.4);" />
  <h3>L'Excellence Technologique Mondiale • L'Âme & la Sagesse de l'Afrique</h3>
  <p>
    <b>Code • Sciences • Mathématiques • Sagesse Ancestrale • Langues Africaines • RAG Multi-Domaines</b>
  </p>
  <p>
    <a href="#-démarrage-rapide"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="#-architecture-api"><img src="https://img.shields.io/badge/API-OpenAI--Compatible-green?style=for-the-badge" alt="OpenAI API" /></a>
    <a href="#-distillation--fine-tuning"><img src="https://img.shields.io/badge/Fine--Tuning-Unsloth%20LoRA-orange?style=for-the-badge" alt="Unsloth" /></a>
    <a href="#-souverainet%C3%A9-linguistique"><img src="https://img.shields.io/badge/Langues-Fongb%C3%A9%20%7C%20Yoruba%20%7C%20Fran%C3%A7ais-blue?style=for-the-badge" alt="Languages" /></a>
  </p>
</div>

---

## 🚀 À Propos de FUMI AI

**FUMI** est un projet technologique d'intelligence artificielle souveraine né en Afrique de l'Ouest (Bénin). Conçu pour prouver que l'Afrique peut être une actrice majeure de la course mondiale à l'IA, FUMI combine :

1. **Une Polyvalence de Rang Mondial** : Programmation de haut vol (TypeScript, Python, React, SQL, Rust), démonstrations mathématiques rigoureuses (formules LaTeX), rédaction littéraire et analyse géopolitique/économique au niveau de ChatGPT, Claude 3.5 Sonnet ou Antigravity.
2. **Un Ancrage Culturel & Linguistique Inégalé** : Connaissance native du patrimoine africain (256 signes du Fâ, calendrier cosmique Fêzan, herboristerie traditionnelle *Amà*, contes initiatiques) et maîtrise des langues nationales (Fongbé avec tonologie et syntaxe de Gérard Poirot, Yoruba, Mina).
3. **Une Architecture Économique & Souveraine** : Distillation des modèles frontières (Google Gemini 2.5, DeepSeek-R1) vers des modèles ouverts compacts (Qwen 2.5 7B/14B, Llama 3.1) via Unsloth pour un coût d'inférence divisé par 20.

---

## 🏛️ Architecture du Système

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FUMI AI CORE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🌐 INTERFACES CLIENTS                                                       │
│   ├── Chat Web Autonome (Next.js 15, React 19, KaTeX, Rendu SVG)            │
│   ├── Applications Mobiles (Fa & Vodun Connect, Apps Flutter)               │
│   └── API SDK Externe (Python, Node.js, cURL)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🛡️ API GATEWAY SOUVERAINE                                                   │
│   ├── /api/chat : Route interne pour le Chat Web interactif                 │
│   └── /api/v1/chat/completions : Endpoint universel compatible OpenAI       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🧠 MOTEURS DE CONNAISSANCES & COGNITION                                      │
│   ├── Moteur RAG Hybride (Base des 256 Odù + Savoirs Sacrés)                │
│   ├── Module Linguistique Fongbé (7 700+ entrées & verbes sériels)          │
│   └── Recherche Web Temps Réel (DuckDuckGo + Google Search Grounding)       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🔬 R&D, DISTILLATION & FINE-TUNING                                          │
│   ├── scripts/distill_gemini.py : Synthèse de données avec <thinking>       │
│   └── scripts/train_unsloth_lora.py : Fine-tuning Qwen 2.5 via LoRA         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Démarrage Rapide

### 1. Prérequis
- Node.js >= 20.0.0
- npm ou pnpm
- (Optionnel pour l'entraînement) : Python 3.10+ et un environnement GPU (Google Colab ou RunPod)

### 2. Installation
```bash
# Cloner le dépôt
git clone https://github.com/votre-compte/fumi-ai.git
cd fumi-ai

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env.local
```

Renseignez vos clés gratuites dans `.env.local` :
- `GEMINI_API_KEY` (obtenez-la gratuitement sur [Google AI Studio](https://aistudio.google.com/))
- `GROQ_API_KEY` (obtenez-la gratuitement sur [Groq Console](https://console.groq.com/))

### 3. Lancer le serveur de développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) pour tester l'interface de discussion FUMI.

---

## 🔌 Connexion API (Compatible OpenAI)

N'importe quelle application cliente peut interroger FUMI en utilisant le SDK officiel OpenAI :

### En Python :
```python
from openai import OpenAI

client = OpenAI(
    base_url="https://votre-domaine-fumi.vercel.app/api/v1",
    api_key="fumi_sk_live_votre_cle"
)

response = client.chat.completions.create(
    model="fumi-sovereign",
    messages=[
        {"role": "user", "content": "Écris une fonction de hachage sécurisée en TypeScript et explique la sagesse du signe Gbê-Mêdjì."}
    ]
)

print(response.choices[0].message.content)
```

### En cURL :
```bash
curl https://votre-domaine-fumi.vercel.app/api/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer fumi_sk_live_africa_sovereign_ai_2026" \
  -d '{
    "model": "fumi-sovereign",
    "messages": [{"role": "user", "content": "Bonjour Fumi !"}]
  }'
```

---

## 🔬 Distillation & Entraînement Souverain

Fumi utilise un pipeline de distillation pour capturer le raisonnement pas à pas des modèles frontières :

```bash
# 1. Installer les dépendances Python
pip install -r scripts/requirements.txt

# 2. Générer des dialogues synthétiques de haute qualité
export GEMINI_API_KEY="votre_cle"
python scripts/distill_gemini.py

# 3. Lancer le fine-tuning LoRA sur GPU (Google Colab ou RunPod)
python scripts/train_unsloth_lora.py

# 4. Évaluer le modèle sur le benchmark Fâ-Bench
python scripts/evaluate_fumi.py
```

---

## 👥 Bâtisseurs & Fondateurs

- **Directeur Technique & Architecte Logiciel** : [Augustin BIDE](mailto:berengerbide@gmail.com)
- **CEO & Garant Spirituel** : [Agossou Septime AZA](mailto:contact@fa-vodun-connect.com) (Bokonon Yèkù)
- **Organisation & Société Porteuse** : **AZAVA Sarl** & **ONG Fa & Vodun** (Cotonou, Bénin)

---

## 📜 Licence & Propriété Intellectuelle

Code propriétaire et modèle souverain protégés. Tous droits réservés © 2026 AZAVA Sarl & Bâtisseurs de FUMI AI.
