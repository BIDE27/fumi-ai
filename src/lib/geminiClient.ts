/**
 * Client Google Gemini 2.5 Flash / 2.0 Flash
 * Intègre nativement la recherche Google en direct (Google Search Grounding),
 * le traitement d'images et la fenêtre de contexte de 1M de tokens.
 */

export interface GeminiChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }>;
}

export interface GeminiResponse {
  text: string;
  model: string;
  durationMs: number;
  groundingSources?: Array<{ title: string; url: string }>;
}

const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash'
];

/**
 * Récupère la clé API Gemini depuis l'environnement ou les paramètres système
 */
export async function getGeminiApiKey(): Promise<string | null> {
  const envKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (envKey && envKey.trim()) return envKey.trim();

  // Tentative de récupération depuis Supabase system_settings si configurée
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && anonKey) {
      const res = await fetch(`${supabaseUrl}/rest/v1/system_settings?key=eq.gemini_config&select=value`, {
        headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        const dbKey = data?.[0]?.value?.apiKey;
        if (dbKey && typeof dbKey === 'string') return dbKey.trim();
      }
    }
  } catch {
    // Silencieux
  }

  return null;
}

/**
 * Appel conversationnel complet à Gemini avec support Google Search Grounding
 */
export async function callGeminiChat({
  systemInstruction,
  messages,
  temperature = 0.4,
  enableSearch = false,
  explicitApiKey,
  preferredModel = 'gemini-2.5-flash',
}: {
  systemInstruction?: string;
  messages: GeminiChatMessage[];
  temperature?: number;
  enableSearch?: boolean;
  explicitApiKey?: string | null;
  preferredModel?: string;
}): Promise<GeminiResponse> {
  const apiKey = explicitApiKey || await getGeminiApiKey();
  if (!apiKey) {
    throw new Error("Clé API Gemini non configurée.");
  }

  const modelsToTry = [
    preferredModel,
    ...GEMINI_MODELS.filter(m => m !== preferredModel)
  ];

  const startTime = Date.now();
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const requestBody: Record<string, any> = {
        contents: messages,
        generationConfig: {
          temperature,
          maxOutputTokens: 2500,
        }
      };

      if (systemInstruction && systemInstruction.trim()) {
        requestBody.systemInstruction = {
          parts: [{ text: systemInstruction.trim() }]
        };
      }

      // Activer la recherche Google native si demandée
      if (enableSearch) {
        requestBody.tools = [{ googleSearch: {} }];
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson?.error?.message || `Erreur Gemini (${res.status})`;
        
        // Si le modèle est introuvable ou surchargé, basculer sur le modèle suivant
        if (res.status === 404 || res.status === 429 || res.status === 503) {
          console.warn(`[Gemini API] Modèle ${model} indisponible (${res.status}), bascule vers le suivant...`);
          lastError = new Error(errMsg);
          continue;
        }

        throw new Error(errMsg);
      }

      const data = await res.json();
      const candidate = data?.candidates?.[0];
      const text = candidate?.content?.parts?.map((p: any) => p.text || '').join('').trim() || '';

      if (!text) {
        throw new Error("Réponse vide reçue de Gemini.");
      }

      // Extraction des métadonnées de sources Google Search si disponibles
      const groundingSources: Array<{ title: string; url: string }> = [];
      const metadata = candidate?.groundingMetadata;
      if (metadata?.groundingChunks) {
        for (const chunk of metadata.groundingChunks) {
          if (chunk.web?.uri) {
            groundingSources.push({
              title: chunk.web.title || new URL(chunk.web.uri).hostname,
              url: chunk.web.uri
            });
          }
        }
      }

      return {
        text,
        model,
        durationMs: Date.now() - startTime,
        groundingSources: groundingSources.length > 0 ? groundingSources : undefined
      };

    } catch (err: any) {
      lastError = err;
      console.warn(`[Gemini API] Erreur sur ${model}:`, err.message);
      continue;
    }
  }

  throw lastError || new Error("Tous les modèles Gemini ont échoué.");
}
