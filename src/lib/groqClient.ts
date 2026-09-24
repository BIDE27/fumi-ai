declare global {
  var __FUMI_CUSTOM_GROQ_KEY__: string | undefined;
}

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

export type GroqModel = 
  | 'openai/gpt-oss-120b'
  | 'qwen/qwen3.8-27b'
  | 'openai/gpt-oss-20b'
  | 'groq/compound'
  | 'deepseek-r1-distill-llama-70b'
  | 'llama-3.3-70b-versatile'
  | string;

export const GROQ_VISION_MODELS = [
  'qwen/qwen3.8-27b',
  'qwen/qwen3.6-27b'
];

export const GROQ_TEXT_MODELS = [
  'openai/gpt-oss-120b',
  'qwen/qwen3.8-27b',
  'qwen/qwen3.6-27b',
  'openai/gpt-oss-20b'
];

export type GroqMessageContentPart = 
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } };

export interface GroqChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | GroqMessageContentPart[];
}

/**
 * Récupère la clé API Groq (variable d'environnement, mémoire, ou clé de secours haute disponibilité)
 */
export async function getGroqApiKey(req?: Request): Promise<string | null> {
  if (globalThis.__FUMI_CUSTOM_GROQ_KEY__) {
    return globalThis.__FUMI_CUSTOM_GROQ_KEY__;
  }

  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim() !== '') {
    return process.env.GROQ_API_KEY.trim();
  }

  return null;
}

function hasVisionContent(messages: GroqChatMessage[]): boolean {
  return messages.some(m => {
    if (Array.isArray(m.content)) {
      return m.content.some((part: GroqMessageContentPart) => part.type === 'image_url');
    }
    return false;
  });
}

/**
 * Appelle l'API Groq avec cascade haute disponibilité
 */
export async function callGroqChat({
  messages,
  model = 'qwen/qwen3.8-27b',
  temperature = 0.5,
  maxTokens = 2500,
  reasoningEffort,
  apiKey: explicitApiKey
}: {
  messages: GroqChatMessage[];
  model?: GroqModel;
  temperature?: number;
  maxTokens?: number;
  reasoningEffort?: 'none' | 'default' | 'low' | 'medium' | 'high';
  apiKey?: string | null;
}): Promise<{ text: string; model: string; durationMs: number }> {
  const primaryKey = explicitApiKey || await getGroqApiKey();
  if (!primaryKey) {
    throw new Error("Clé API Groq non configurée.");
  }

  const apiKeysToTry = [primaryKey];

  const isVision = hasVisionContent(messages);
  const candidateList = isVision ? GROQ_VISION_MODELS : GROQ_TEXT_MODELS;
  const modelsToTry = candidateList.includes(model)
    ? [model, ...candidateList.filter(m => m !== model)]
    : [...candidateList];

  const startTime = Date.now();
  let lastError: any = null;

  for (const currentKey of apiKeysToTry) {
    for (const targetModel of modelsToTry) {
      try {
        let effectiveMaxTokens = maxTokens;
        if (targetModel === 'qwen/qwen3.6-27b') {
          effectiveMaxTokens = Math.min(effectiveMaxTokens, 850);
        } else {
          effectiveMaxTokens = Math.min(effectiveMaxTokens, 1500);
        }

        const requestBody: Record<string, any> = {
          model: targetModel,
          messages,
          temperature,
          max_tokens: effectiveMaxTokens,
          stream: false
        };

        if (targetModel.startsWith('qwen/')) {
          requestBody.reasoning_effort = reasoningEffort === 'default' ? 'default' : 'none';
        } else if (targetModel.startsWith('openai/gpt-oss')) {
          requestBody.reasoning_effort = (reasoningEffort === 'medium' || reasoningEffort === 'high') ? reasoningEffort : 'low';
        }

        const res = await fetch(GROQ_ENDPOINT, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${currentKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        if (!res.ok) {
          const errorJson = await res.json().catch(() => ({}));
          const errMsg = errorJson?.error?.message || `Erreur Groq (${res.status})`;
          lastError = new Error(errMsg);
          continue;
        }

        const data = await res.json();
        const choice = data?.choices?.[0];
        const rawText = choice?.message?.content || "";

        // Nettoyer balises de réflexion
        let cleanText = rawText.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
        if (cleanText.includes('<think>')) {
          cleanText = cleanText.replace(/<think>[\s\S]*/g, '').trim();
        }

        return {
          text: cleanText || rawText.trim(),
          model: data?.model || targetModel,
          durationMs: Date.now() - startTime
        };
      } catch (err: any) {
        lastError = err;
        continue;
      }
    }
  }

  throw lastError || new Error("Tous les modèles Groq ont échoué.");
}
