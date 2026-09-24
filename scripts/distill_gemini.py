#!/usr/bin/env python3
"""
FUMI AI - Pipeline de Distillation Synthétique via Google Gemini 2.5
Génère des dialogues de haute qualité avec traces de raisonnement pas à pas (<thinking>)
pour l'entraînement souverain de Fumi-7B / Fumi-14B.
"""

import os
import json
import time
from typing import List, Dict
import urllib.request
import urllib.error

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "..", "datasets", "fumi_distillation_dataset.jsonl")

# Thèmes clés d'entraînement polyvalents & souverains
SAMPLE_TOPICS = [
    {
        "category": "signes_du_fa",
        "question": "J'ai l'impression de commencer mille projets sans réussir à en terminer un seul. Que m'enseigne la sagesse du Fâ ?",
        "context": "Signe Gbê-Mêdjì (Eji-Ogbe). Premier signe du Fâ. Lumière primordiale mais risque de dispersion sans discipline. Calendrier Fêzan."
    },
    {
        "category": "code_programmation",
        "question": "Écris une classe TypeScript sécurisée qui gère un système de tokens d'authentification avec rotation automatique et sans fuite mémoire.",
        "context": "TypeScript strict, architecture Zero-Trust, gestion propre de setTimeout et nettoyage des événements."
    },
    {
        "category": "linguistique_fon",
        "question": "Comment dit-on 'Que Dieu bénisse ton travail et garde ta famille' en Fongbé authentique et quelle est l'analyse grammaticale ?",
        "context": "Dictionnaire Gérard Poirot. Grammaire des verbes sériels, tonologie et particules de bénédiction."
    },
    {
        "category": "agriculture_climat",
        "question": "Quelles sont les meilleures techniques agroécologiques pour enrichir les sols du Sud-Bénin face aux irrégularités de la saison des pluies ?",
        "context": "Sols ferrallitiques (terre de barre), compostage biologique, agroforesterie avec Acacia auriculiformis et cultures intercalaires."
    }
]

DISTILLATION_SYSTEM_PROMPT = """Tu es un Maître Chercheur en Intelligence Artificielle et Connaissances Africaines.
Ton rôle est de générer un exemple d'entraînement d'élite pour l'IA souveraine « FUMI ».

FUMI est polyvalente (code de haut niveau, mathématiques, logique) et profondément enracinée dans les réalités africaines (Bénin, Fongbé, sagesse ancestrale).

RÈGLE ABSOLUE :
Structure ta réponse en deux parties distinctes :
1. <thinking>
   - Décomposition rigoureuse du problème
   - Principes scientifiques ou cosmologiques appliqués
   - Choix pédagogique et stylistique pour Fumi
2. <response>
   - La réponse exacte, digne, claire, chaleureuse et techniquement impeccable que FUMI doit donner.
"""

def call_gemini_api(prompt: str, api_key: str) -> str:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [{"role": "user", "parts": [{"text": prompt}]}],
        "systemInstruction": {"parts": [{"text": DISTILLATION_SYSTEM_PROMPT}]},
        "generationConfig": {"temperature": 0.4, "maxOutputTokens": 2048}
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        candidate = data.get("candidates", [{}])[0]
        parts = candidate.get("content", {}).get("parts", [{}])
        return "".join(p.get("text", "") for p in parts)

def main():
    if not GEMINI_API_KEY:
        print("❌ Erreur : GEMINI_API_KEY non configurée dans l'environnement.")
        print("💡 Définissez la variable : export GEMINI_API_KEY='votre_clé'")
        return

    print("🚀 Démarrage de la génération du dataset de distillation pour FUMI AI...")
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

    with open(OUTPUT_FILE, "a", encoding="utf-8") as f_out:
        for idx, item in enumerate(SAMPLE_TOPICS, start=1):
            print(f"[{idx}/{len(SAMPLE_TOPICS)}] Génération sur le thème : {item['category']}...")
            prompt = f"CONTEXTE FOURNI :\n{item['context']}\n\nQUESTION DE L'UTILISATEUR :\n{item['question']}"
            
            try:
                raw_response = call_gemini_api(prompt, GEMINI_API_KEY)
                sample = {
                    "id": f"fumi_ds_{idx:05d}",
                    "category": item["category"],
                    "conversations": [
                        {"role": "user", "content": item["question"]},
                        {"role": "assistant", "content": raw_response}
                    ]
                }
                f_out.write(json.dumps(sample, ensure_ascii=False) + "\n")
                f_out.flush()
                print(f"✅ Échantillon {idx} enregistré.")
                time.sleep(1) # Respect du rate limit
            except Exception as e:
                print(f"⚠️ Erreur sur l'échantillon {idx}: {e}")

    print(f"\n🎉 Distillation terminée ! Fichier généré dans : {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
