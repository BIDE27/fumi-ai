import { NextResponse } from 'next/server';
import { callGroqChat, getGroqApiKey, GroqChatMessage } from '@/lib/groqClient';
import { searchWeb, shouldTriggerWebSearch, formatSearchResultsForPrompt } from '@/lib/webSearch';
import { callGeminiChat, getGeminiApiKey, GeminiChatMessage } from '@/lib/geminiClient';
import { buildFumiMasterSystemPrompt } from '@/lib/fumiSystemPrompt';

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

function buildGeminiMessages(
  incomingHistory: any[],
  question: string,
  validImages?: Array<{ data: string; mimeType: string }> | null
): GeminiChatMessage[] {
  const list: GeminiChatMessage[] = [];
  if (Array.isArray(incomingHistory)) {
    for (const h of incomingHistory.slice(-8)) {
      if (h && typeof h.text === 'string' && h.text.trim()) {
        const role: 'user' | 'model' = h.role === 'user' ? 'user' : 'model';
        if (list.length > 0 && list[list.length - 1].role === role) {
          list[list.length - 1].parts.push({ text: h.text.trim() });
        } else {
          list.push({
            role,
            parts: [{ text: h.text.trim() }]
          });
        }
      }
    }
  }

  const currentParts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];
  
  if (Array.isArray(validImages) && validImages.length > 0) {
    for (const img of validImages.slice(0, 5)) {
      if (img?.data) {
        currentParts.push({
          inlineData: {
            mimeType: img.mimeType || 'image/jpeg',
            data: img.data
          }
        });
      }
    }
  }

  currentParts.push({ text: question || "Analyse ceci avec sagesse et respect." });

  if (list.length > 0 && list[list.length - 1].role === 'user') {
    list[list.length - 1].parts.push(...currentParts);
  } else {
    list.push({ role: 'user', parts: currentParts });
  }

  while (list.length > 0 && list[0].role === 'model') {
    list.shift();
  }

  return list;
}

export async function POST(req: Request) {
  try {
    const { action, payload, sessionId } = await req.json().catch(() => ({}));

    if (action === 'chat') {
      const question = String(payload?.question || '').trim();
      const incomingImagesList: any[] = Array.isArray(payload?.images) 
        ? payload.images 
        : (payload?.image ? [payload.image] : []);
      const chatMode: 'adaptive' | 'fast' | 'thinking' = 
        (payload?.chatMode === 'fast' || payload?.chatMode === 'thinking') ? payload.chatMode : 'adaptive';
      const isFirstDiscussionToday = Boolean(payload?.isFirstDiscussionToday);

      // Validation des images
      const validImages: Array<{ data: string; mimeType: string }> = [];
      const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      for (const rawImg of incomingImagesList.slice(0, 5)) {
        if (rawImg && typeof rawImg.data === 'string' && typeof rawImg.mimeType === 'string') {
          if (allowedMimes.includes(rawImg.mimeType.toLowerCase()) && rawImg.data.length <= 12 * 1024 * 1024) {
            const cleanBase64 = rawImg.data.includes(',') 
              ? rawImg.data.split(',')[1] 
              : rawImg.data;
            validImages.push({
              data: cleanBase64,
              mimeType: rawImg.mimeType.toLowerCase()
            });
          }
        }
      }

      let generatedText = "";
      let modelUsed = "qwen-2.5-7b";

      const incomingHistory = payload?.history || [];

      // Détection langue
      const asksEnglishExplicitly = /\b(speak in english|speak english|write in english|reply in english|answer in english|en anglais|parle(r)? en anglais|répond(s|re)? en anglais)\b/i.test(question);
      const isEntirelyEnglish = /^[a-zA-Z0-9\s.,!?'"()\-:;/$%#@&*+<=>_{}[\]]+$/.test(question) && 
        /\b(the|is|are|you|what|how|where|when|why|who|can|could|would|should|please|hello|thanks|with|about|explain|create|write)\b/i.test(question) &&
        !/\b(le|la|les|un|une|des|du|est|sont|qui|que|quoi|comment|pourquoi|dans|avec|pour|merci|bonjour|salut|s'il|te|pla[iî]t|bonsoir)\b/i.test(question);
      const allowEnglish = asksEnglishExplicitly || isEntirelyEnglish;

      // Recherche web si question d'actualité
      let webSearchResultsPrompt = "";
      if (shouldTriggerWebSearch(question, incomingHistory)) {
        try {
          const searchResults = await searchWeb(question, 6, incomingHistory);
          if (searchResults.length > 0) {
            webSearchResultsPrompt = `\n\n${formatSearchResultsForPrompt(searchResults)}`;
          }
        } catch (searchErr) {
          console.warn("[Fumi Chat] Notice recherche web:", searchErr);
        }
      }

      // Construction du Prompt Système Maître Intégral & Sacré
      const { systemPrompt: fullSystemPrompt, shouldDeepReason } = await buildFumiMasterSystemPrompt({
        question,
        incomingHistory,
        chatMode,
        isFirstDiscussionToday,
        webSearchResultsPrompt,
        allowEnglish
      });

      const geminiKey = await getGeminiApiKey();
      const groqKey = await getGroqApiKey(req);
      const activeMaxTokens = shouldDeepReason ? 2500 : 1500;

      // 1. Google Gemini 2.5 Flash en priorité (contexte 1M et Search Grounding)
      if (geminiKey) {
        try {
          const geminiMessages = buildGeminiMessages(incomingHistory, question, validImages);
          const needsSearch = Boolean(webSearchResultsPrompt || shouldTriggerWebSearch(question, incomingHistory));

          const geminiRes = await callGeminiChat({
            systemInstruction: fullSystemPrompt,
            messages: geminiMessages,
            temperature: (webSearchResultsPrompt || needsSearch) ? 0.2 : 0.4,
            enableSearch: needsSearch,
            explicitApiKey: geminiKey,
            preferredModel: 'gemini-2.5-flash'
          });

          if (geminiRes?.text && geminiRes.text.trim().length > 10) {
            generatedText = geminiRes.text.trim();
            modelUsed = geminiRes.model;
          }
        } catch (geminiErr: any) {
          console.warn("[Fumi Chat] Rebascule vers Groq:", geminiErr?.message || geminiErr);
        }
      }

      // 2. Cascade Groq en fallback ou pour exécution open-weights
      if (!generatedText && groqKey) {
        const textMessages: GroqChatMessage[] = [
          { role: 'system', content: fullSystemPrompt }
        ];
        if (Array.isArray(incomingHistory)) {
          for (const h of incomingHistory.slice(-6)) {
            if (h && typeof h.text === 'string' && h.text.trim()) {
              textMessages.push({
                role: h.role === 'user' ? 'user' : 'assistant',
                content: h.text.trim()
              });
            }
          }
        }
        textMessages.push({ role: 'user', content: question });

        const groqCandidateModels = [
          'qwen/qwen3.8-27b',
          'openai/gpt-oss-120b',
          'llama-3.3-70b-versatile'
        ];

        for (const gModel of groqCandidateModels) {
          try {
            const groqRes = await callGroqChat({
              model: gModel,
              apiKey: groqKey,
              temperature: 0.4,
              maxTokens: activeMaxTokens,
              messages: textMessages
            });
            if (groqRes?.text && groqRes.text.trim().length > 10) {
              generatedText = groqRes.text.trim();
              modelUsed = groqRes.model;
              break;
            }
          } catch (groqErr) {
            continue;
          }
        }
      }

      // Fallback résilient
      if (!generatedText || !generatedText.trim()) {
        generatedText = `À fɔ́n ganjí à ! Je suis **FUMI**, votre intelligence artificielle souveraine. J'ai bien reçu votre question : « *${question}* ». Mes relais d'inférence s'actualisent en cet instant ; reposez-moi votre question d'ici quelques secondes.`;
        modelUsed = 'fumi-fallback';
      }

      return NextResponse.json({
        result: generatedText,
        model: modelUsed,
        chatMode,
        isDeepReasoning: shouldDeepReason
      }, { headers: CORS_HEADERS });
    }

    return NextResponse.json({ error: 'Action non reconnue' }, { status: 400, headers: CORS_HEADERS });
  } catch (error: any) {
    return NextResponse.json({
      result: "Bonjour ! Je suis FUMI. Une brève fluctuation de réseau est survenue. N'hésitez pas à me relancer !",
      model: "fumi-resilience",
      error: error?.message || 'Erreur'
    }, { status: 200, headers: CORS_HEADERS });
  }
}
