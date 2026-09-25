/**
 * Service API Mobile pour FUMI AI
 * Permet à l'application React Native d'interroger FUMI via le serveur distant
 */

const DEFAULT_API_URL = "https://fumi-ai.vercel.app";

export interface ChatMessagePayload {
  role: 'user' | 'assistant';
  content: string;
}

export async function askFumiMobile({
  question,
  history = [],
  chatMode = 'adaptive',
  images = [],
  apiUrl = DEFAULT_API_URL,
  apiKey
}: {
  question: string;
  history?: Array<{ role: string; text: string }>;
  chatMode?: 'adaptive' | 'fast' | 'thinking';
  images?: Array<{ data: string; mimeType: string }>;
  apiUrl?: string;
  apiKey?: string;
}): Promise<{ text: string; model: string; isDeepReasoning?: boolean }> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const endpoint = `${apiUrl}/api/chat`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        action: 'chat',
        payload: {
          question,
          history,
          chatMode,
          images: images.length > 0 ? images : undefined
        }
      })
    });

    if (!res.ok) {
      throw new Error(`Erreur serveur Fumi (${res.status})`);
    }

    const data = await res.json();
    return {
      text: data.result || "Désolée, aucune réponse générée.",
      model: data.model || "fumi-sovereign",
      isDeepReasoning: data.isDeepReasoning
    };
  } catch (error: any) {
    console.error("[Fumi Mobile API Error]:", error);
    return {
      text: `Une fluctuation de réseau est survenue. Veuillez vérifier votre connexion et relancer votre demande. (${error?.message || 'Erreur'})`,
      model: "fumi-mobile-fallback"
    };
  }
}
