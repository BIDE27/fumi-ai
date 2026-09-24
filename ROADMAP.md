# 🗺️ FEUILLE DE ROUTE STRATÉGIQUE (ROADMAP) — FUMI AI (2026 - 2027)
## De la Distillation Frontière à l'IA Souveraine Africaine de Référence

> **Objectif** : Bâtir une entreprise d'intelligence artificielle africaine de premier plan, rentable, souveraine et capable de rivaliser avec les modèles mondiaux tout en valorisant le patrimoine immatériel et les besoins concrets du continent africain.

---

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CALENDRIER STRATÉGIQUE SUR 12 MOIS                              │
├────────────────────┬────────────────────┬─────────────────────┬────────────────────────┤
│ PHASE 1 (Mois 1-2) │ PHASE 2 (Mois 3-4) │ PHASE 3 (Mois 5-7)  │ PHASE 4 (Mois 8-12)    │
│ Autonomie & API    │ Usine à Données    │ Modèle Souverain    │ Mobile Edge &          │
│ Gateway Standard   │ 25 000 Dialogues   │ Fumi-7B Fine-Tuné   │ Écosystème Panafricain │
└────────────────────┴────────────────────┴─────────────────────┴────────────────────────┘
```

---

### 📍 PHASE 1 : Autonomie du Dépôt, Déploiement Cloud & API Standardisée (Mois 1 - 2)
**Objectif** : Déployer le serveur Fumi AI indépendant et fournir une API robuste aux premières applications.

1. **Déploiement Continu du Dépôt `fumi-ai`** :
   - Mise en ligne sur Vercel avec nom de domaine dédié (ex: `fumi-ai.com` ou `api.fumi.africa`).
   - Configuration des clés API gratuites Google Gemini 2.5 et Groq Cloud.
2. **Activation de l'API Gateway OpenAI-Compatible** :
   - Mise en production de l'endpoint `/api/v1/chat/completions`.
   - Système de clés d'API sécurisées (`fumi_sk_...`) avec contrôle d'accès Zero-Trust.
3. **Branchement à Fa & Vodun Connect** :
   - Connexion de l'application cliente principale via clé d'API distante sans impacter l'expérience utilisateur.

---

### 📍 PHASE 2 : L'Usine à Données Synthétiques Sacrées & Polyvalentes (Mois 3 - 4)
**Objectif** : Créer le plus grand jeu de données francophone et africain au monde avec traces de raisonnement pas à pas.

1. **Génération Massive par Distillation** :
   - Exécution du script `scripts/distill_gemini.py` pour produire **25 000 paires de dialogue de haute volée**.
   - Préservation obligatoire du raisonnement explicite dans `<thinking>`.
2. **Les 4 Piliers du Dataset Fumi** :
   - **Pilier 1 - Sagesse Ancestrale & Fâ** : Les 256 Odù, contes, calendrier Fêzan, herboristerie sacrée.
   - **Pilier 2 - Code & Ingénierie Logicielle** : TypeScript, Python, architecture cloud, algorithmes.
   - **Pilier 3 - Sciences & Mathématiques** : Équations physiques, chimie, statistiques, modélisation.
   - **Pilier 4 - Langues & Économie Africaine** : Fongbé châtié, Yoruba, Mina, droit des affaires OHADA, agroécologie.
3. **Contrôle & Validation Bokonon / Experts** :
   - Validation humaine par les gardiens spirituels (Bokonon Yèkù) pour garantir 0 dérive et 0 profanation.

---

### 📍 PHASE 3 : Naissance du Modèle Fumi-7B & Démonstration Investisseurs (Mois 5 - 7)
**Objectif** : Posséder nos propres poids de modèle (Open-Weights Souverains) et prouver la viabilité économique.

1. **Fine-Tuning LoRA / QLoRA via Unsloth** :
   - Entraînement sur GPU cloud abordable (RunPod NVIDIA A100 80GB, coût < 30 $ par session).
   - Base modèle : `Qwen/Qwen2.5-7B-Instruct` ou `Meta-Llama-3.1-8B-Instruct`.
   - Fusion des poids dans `fumi-7b-v1`.
2. **Inférence Serverless Haute Performance** :
   - Hébergement des poids sur Together AI Custom Endpoints ou vLLM.
   - Latence < 400ms et division des coûts par 20 par rapport aux API tierces fermées.
3. **Pitch Deck & Recherche de Financements Africains** :
   - Présentation aux fonds d'investissement (AfriTech, Bpifrance Afrique, investisseurs béninois et régionaux).
   - Démonstration en direct de FUMI résolvant des cas complexes en langue locale et en code.

---

### 📍 PHASE 4 : Déploiement Mobile Edge Hors-Ligne & Expansion Panafricaine (Mois 8 - 12)
**Objectif** : Permettre à n'importe quel citoyen africain d'avoir Fumi dans sa poche, même sans connexion internet.

1. **Quantification 4-bit (GGUF / ONNX)** :
   - Création de `Fumi-Mini` (modèle 1.5B / 3B de paramètres).
   - Inférence locale directe sur smartphone iOS & Android via Flutter et `llama.cpp`.
2. **Intégration Vocale Native (Speech-to-Speech)** :
   - Reconnaissance vocale en Fongbé/Yoruba et synthèse vocale avec l'accent et la chaleur africaine.
3. **Souveraineté Complète** :
   - FUMI devient l'infrastructure d'IA africaine de référence, utilisable par les écoles, entreprises et administrations publiques.
