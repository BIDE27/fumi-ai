import { NextResponse } from 'next/server';
import { validateFumiApiKey } from '@/lib/apiKeyAuth';
import { callGeminiChat, getGeminiApiKey } from '@/lib/geminiClient';
import { callGroqChat, getGroqApiKey, GroqChatMessage } from '@/lib/groqClient';
import { getRelevantKnowledgeAsync } from '@/lib/knowledgeBase';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-fumi-api-key, *',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  // 1. Validation Zero-Trust de la clé API
  const authResult = validateFumiApiKey(req);
  if (!authResult.isValid) {
    return NextResponse.json(
      {
        error: {
          message: authResult.error || "Accès non autorisé.",
          type: "invalid_request_error",
          code: "unauthorized"
        }
      },
      { status: 401, headers: CORS_HEADERS }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { messages = [], model = "fumi-sovereign", temperature = 0.4, max_tokens = 2000 } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        {
          error: {
            message: "Le tableau 'messages' est requis et ne peut être vide.",
            type: "invalid_request_error",
            code: "missing_messages"
          }
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const lastMessage = messages[messages.length - 1];
    const userQuery = typeof lastMessage?.content === 'string' ? lastMessage.content : '';

    // Injection des connaissances RAG
    const knowledge = await getRelevantKnowledgeAsync(userQuery);
    const systemPrompt = `Tu es FUMI, l'Intelligence Artificielle Souveraine Africaine & Polyvalente pour le Monde.
Tu es appelée via l'API Standardisée Fumi v1. Tu réponds avec rigueur, excellence, sagesse et précision.
${knowledge ? `\n=== CONNAISSANCES DE DOMAINE INJECTÉES ===\n${knowledge}` : ''}`;

    let generatedText = "";
    let effectiveModel = "fumi-7b-sovereign";

    // 1. Tentative Gemini 2.5 Flash
    const geminiKey = await getGeminiApiKey();
    if (geminiKey) {
      try {
        const geminiMessages = messages.map(m => ({
          role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
          parts: [{ text: typeof m.content === 'string' ? m.content : '' }]
        }));

        const geminiRes = await callGeminiChat({
          systemInstruction: systemPrompt,
          messages: geminiMessages,
          temperature,
          explicitApiKey: geminiKey,
          preferredModel: 'gemini-2.5-flash'
        });

        if (geminiRes?.text) {
          generatedText = geminiRes.text;
          effectiveModel = `fumi-${geminiRes.model}`;
        }
      } catch (gemErr) {
        console.warn("[Fumi OpenAI API] Gemini fallback vers Groq:", gemErr);
      }
    }

    // 2. Cascade Groq open-source
    if (!generatedText) {
      const groqKey = await getGroqApiKey();
      if (groqKey) {
        const groqMessages: GroqChatMessage[] = [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({
            role: (m.role === 'assistant' ? 'assistant' : 'user') as 'assistant' | 'user',
            content: typeof m.content === 'string' ? m.content : ''
          }))
        ];

        const groqRes = await callGroqChat({
          messages: groqMessages,
          model: 'qwen/qwen3.8-27b',
          temperature,
          maxTokens: max_tokens,
          apiKey: groqKey
        });

        if (groqRes?.text) {
          generatedText = groqRes.text;
          effectiveModel = `fumi-${groqRes.model}`;
        }
      }
    }

    if (!generatedText) {
      generatedText = "FUMI API : Nos serveurs sont momentanément saturés. Veuillez réitérer votre requête.";
    }

    // Réponse au format standard OpenAI Chat Completions
    const completionId = `chatcmpl-fumi-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const promptTokensEst = Math.ceil(JSON.stringify(messages).length / 4);
    const completionTokensEst = Math.ceil(generatedText.length / 4);

    return NextResponse.json(
      {
        id: completionId,
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model: effectiveModel,
        system_fingerprint: "fp_fumi_sovereign_v1",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: generatedText
            },
            logprobs: null,
            finish_reason: "stop"
          }
        ],
        usage: {
          prompt_tokens: promptTokensEst,
          completion_tokens: completionTokensEst,
          total_tokens: promptTokensEst + completionTokensEst
        }
      },
      { headers: CORS_HEADERS }
    );

  } catch (error: any) {
    return NextResponse.json(
      {
        error: {
          message: error?.message || "Erreur interne du serveur Fumi API.",
          type: "api_error",
          code: "internal_error"
        }
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
