# 🔌 GUIDE D'INTÉGRATION : RELIER « FA & VODUN CONNECT » À « FUMI AI » PAR API

Ce guide détaille pas à pas comment relier l'application **Fa & Vodun Connect** à votre nouveau serveur indépendant **FUMI AI** dès que ce dernier sera déployé en ligne.

---

## 🌟 Principe du Découplage Propre

Pour l'instant, **Fa & Vodun Connect** continue de fonctionner avec son moteur interne sans interruption.
Lorsque votre nouveau dépôt `fumi-ai` sera hébergé sur Vercel (ex: `https://api.fumi-ai.com`), il vous suffira de 2 étapes minimes pour faire basculer Fa & Vodun Connect sur votre IA indépendante.

---

## Étape 1 : Obtenir la Clé API Fumi

Dans le fichier d'environnement de votre serveur Fumi AI (`.env.production`), vous configurez votre clé maître :
```bash
FUMI_MASTER_API_KEY=fumi_sk_live_votre_cle_secrete_fa_vodun
```

---

## Étape 2 : Configurer les Variables dans Fa & Vodun Connect

Dans le projet `fa_vodoun_connect` (en local dans `.env.local` et sur le tableau de bord Vercel) :

```bash
# URL de votre serveur FUMI autonome
FUMI_API_ENDPOINT=https://votre-projet-fumi.vercel.app/api/v1/chat/completions

# Clé secrète de connexion FUMI
FUMI_API_KEY=fumi_sk_live_votre_cle_secrete_fa_vodun
```

---

## Étape 3 : Exemple d'Appel Côté Fa & Vodun Connect

Dans `src/services/geminiService.ts` ou dans `src/app/api/chat/route.ts` de Fa & Vodun Connect, l'appel devient un simple appel HTTP standardisé :

```typescript
// Appel distant standardisé vers le serveur Fumi AI
export async function queryFumiRemoteApi(question: string, history: any[]) {
  const endpoint = process.env.FUMI_API_ENDPOINT || 'https://votre-projet-fumi.vercel.app/api/v1/chat/completions';
  const apiKey = process.env.FUMI_API_KEY;

  const messages = [
    ...history.map(h => ({
      role: h.role === 'user' ? 'user' : 'assistant',
      content: h.text
    })),
    { role: 'user', content: question }
  ];

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'fumi-sovereign',
      messages,
      temperature: 0.4
    })
  });

  if (!res.ok) {
    throw new Error(`Erreur API Fumi (${res.status})`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}
```

### ✅ Avantages de cette Architecture :
1. **Zéro charge sur Supabase** : Fumi AI gère son propre trafic et ses propres calculs.
2. **Évolution indépendante** : Vous pouvez mettre à jour les modèles, fine-tuner de nouveaux poids ou améliorer le moteur Fumi sans toucher au site Fa & Vodun Connect.
3. **Monétisation B2B** : D'autres entreprises et développeurs pourront également acheter des accès à votre API FUMI avec leurs propres clés `fumi_sk_...`.
