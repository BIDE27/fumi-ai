"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Key, Plus, Copy, Check, Trash2, ArrowLeft, Terminal, 
  Code, Shield, Zap, Sparkles, AlertCircle, Play
} from 'lucide-react';

interface ApiKeyItem {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}

const LOCAL_STORAGE_KEYS = 'fumi_ai_dev_api_keys_v1';

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [keyName, setKeyName] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'keys' | 'docs' | 'test'>('keys');

  // État de la console de test
  const [testKey, setTestKey] = useState('');
  const [testPrompt, setTestPrompt] = useState('Explique-moi la genèse du signe Gbê-Mêdjì et écris une fonction TypeScript pour modéliser ses 4 niveaux binaires.');
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS);
      if (stored) {
        setKeys(JSON.parse(stored));
      } else {
        // Clé de démonstration par défaut
        const defaultKey: ApiKeyItem = {
          id: 'k_default_01',
          name: 'Clé Initiale Développeur (Fa & Vodun Connect)',
          key: 'fumi_sk_live_africa_sovereign_ai_2026',
          createdAt: new Date().toLocaleDateString('fr-FR')
        };
        setKeys([defaultKey]);
        setTestKey(defaultKey.key);
      }
    } catch (e) {}
  }, []);

  const saveKeys = (newKeys: ApiKeyItem[]) => {
    setKeys(newKeys);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS, JSON.stringify(newKeys));
    } catch (e) {}
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName.trim()) return;

    const randomSuffix = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
    const newKeyString = `fumi_sk_live_${randomSuffix}`;

    const newKey: ApiKeyItem = {
      id: `key_${Date.now()}`,
      name: keyName.trim(),
      key: newKeyString,
      createdAt: new Date().toLocaleDateString('fr-FR')
    };

    saveKeys([newKey, ...keys]);
    setKeyName('');
    if (!testKey) setTestKey(newKeyString);
  };

  const handleDeleteKey = (id: string) => {
    saveKeys(keys.filter(k => k.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleRunTest = async () => {
    if (!testKey || !testPrompt.trim() || isTesting) return;
    setIsTesting(true);
    setTestResponse(null);

    try {
      const res = await fetch('/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${testKey.trim()}`
        },
        body: JSON.stringify({
          model: 'fumi-sovereign',
          messages: [{ role: 'user', content: testPrompt.trim() }]
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setTestResponse(`❌ Erreur (${res.status}) : ${data?.error?.message || 'Échec de la requête'}`);
      } else {
        const text = data?.choices?.[0]?.message?.content || JSON.stringify(data, null, 2);
        setTestResponse(text);
      }
    } catch (err: any) {
      setTestResponse(`❌ Erreur réseau : ${err?.message || 'Impossible de joindre le serveur'}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#0f0d0b] text-[#fcfaf5] flex flex-col">
      {/* HEADER NAVIGATION */}
      <header className="h-16 border-b border-[#2d2720] px-4 sm:px-8 flex items-center justify-between bg-[#181512]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors p-2 rounded-xl hover:bg-stone-800/50"
            title="Retour au Chat"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline text-xs font-semibold">Retour au Chat</span>
          </Link>
          <div className="h-5 w-px bg-stone-700 mx-1" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d1984b] to-[#a26131] flex items-center justify-center p-0.5">
              <img src="/images/fumi/fumi_avatar.png" alt="FUMI" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-wide text-[#fcfaf5]">PORTAIL DÉVELOPPEUR FUMI</h1>
              <span className="text-[10px] text-[#dab372] font-semibold">Gestion des Clés API &amp; Intégration</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION DES ONGLETS */}
        <div className="flex items-center gap-1 bg-[#120f0c] p-1 rounded-xl border border-[#2d2720]">
          <button
            onClick={() => setActiveTab('keys')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'keys'
                ? 'bg-[#d1984b] text-stone-950 shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="flex items-center gap-1.5"><Key size={13} /> Clés API</span>
          </button>

          <button
            onClick={() => setActiveTab('docs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'docs'
                ? 'bg-[#d1984b] text-stone-950 shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="flex items-center gap-1.5"><Code size={13} /> Documentation</span>
          </button>

          <button
            onClick={() => setActiveTab('test')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'test'
                ? 'bg-[#d1984b] text-stone-950 shadow-xs'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span className="flex items-center gap-1.5"><Terminal size={13} /> Console Test</span>
          </button>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8">
        {/* ONGLET 1 : GESTION DES CLÉS API */}
        {activeTab === 'keys' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Bannière de présentation */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1c1813] to-[#251e16] border border-[#382d20] shadow-xl relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#dab372] flex items-center gap-1 mb-2">
                  <Shield size={14} /> Sécurité Zero-Trust &amp; Souveraineté
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Connectez vos applications à FUMI AI
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                  Générez des clés API pour alimenter <strong className="text-[#dab372]">Fa &amp; Vodun Connect</strong>, vos applications mobiles React Native / Flutter, vos plateformes d'entreprises ou vos scripts d'analyse sans aucune dépendance envers OpenAI.
                </p>
              </div>
            </div>

            {/* Formulaire de création de clé */}
            <div className="p-5 rounded-2xl bg-[#16120e] border border-[#2b2319]">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Plus size={16} className="text-[#d1984b]" /> Créer une nouvelle clé API Fumi
              </h3>
              <form onSubmit={handleCreateKey} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Nom de l'application (ex: Fa & Vodun Connect, Bot WhatsApp, App Mobile)"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  className="flex-1 bg-[#100d0a] border border-[#2d2720] rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#d1984b]"
                />
                <button
                  type="submit"
                  disabled={!keyName.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c27e3c] to-[#d1984b] text-stone-950 font-bold text-xs hover:brightness-110 disabled:opacity-40 transition-all flex items-center justify-center gap-1.5"
                >
                  <Key size={14} /> Générer la clé
                </button>
              </form>
            </div>

            {/* Tableau des clés existantes */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-stone-300">Vos clés API actives ({keys.length})</h3>
              <div className="space-y-2">
                {keys.map((k) => (
                  <div
                    key={k.id}
                    className="p-4 rounded-2xl bg-[#171410] border border-[#29221a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-[#d1984b]/40 transition-colors"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="font-semibold text-xs text-white flex items-center gap-2">
                        <span>{k.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-normal">Active</span>
                      </div>
                      <div className="font-mono text-xs text-stone-400 truncate flex items-center gap-2">
                        <span>{k.key}</span>
                      </div>
                      <div className="text-[10px] text-stone-500">Créée le {k.createdAt}</div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => copyToClipboard(k.key)}
                        className="px-3 py-1.5 rounded-lg bg-[#241d15] hover:bg-[#31271d] text-stone-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors border border-[#3a2e20]"
                      >
                        {copiedKey === k.key ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        <span>{copiedKey === k.key ? 'Copié !' : 'Copier'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteKey(k.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-stone-500 hover:text-red-400 transition-colors"
                        title="Révoquer la clé"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ONGLET 2 : DOCUMENTATION & EXEMPLES */}
        {activeTab === 'docs' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Documentation d'Intégration API</h2>
              <p className="text-xs text-stone-400">
                L'API FUMI est 100% compatible avec la spécification officielle OpenAI (<code className="text-[#dab372]">/v1/chat/completions</code>).
              </p>
            </div>

            {/* Exemple cURL */}
            <div className="p-4 rounded-2xl bg-[#14110e] border border-[#2d2720] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#dab372]">
                <span>Appel cURL universel</span>
                <button
                  onClick={() => copyToClipboard(`curl https://votre-fumi.vercel.app/api/v1/chat/completions \\\n  -H "Content-Type: application/json" \\\n  -H "Authorization: Bearer fumi_sk_live_..." \\\n  -d '{"model": "fumi-sovereign", "messages": [{"role": "user", "content": "Bonjour Fumi !"}]}'`)}
                  className="hover:text-white flex items-center gap-1 text-[11px]"
                >
                  <Copy size={12} /> Copier
                </button>
              </div>
              <pre className="p-3 bg-[#0a0807] rounded-xl text-xs text-stone-300 overflow-x-auto font-mono">
{`curl https://votre-fumi.vercel.app/api/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer fumi_sk_live_..." \\
  -d '{
    "model": "fumi-sovereign",
    "messages": [
      { "role": "user", "content": "Bonjour Fumi ! Explique-moi le jour Fêzan d'aujourd'hui." }
    ]
  }'`}
              </pre>
            </div>

            {/* Exemple Python (SDK OpenAI) */}
            <div className="p-4 rounded-2xl bg-[#14110e] border border-[#2d2720] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#dab372]">
                <span>Python (Utilise directement le package 'openai')</span>
                <button
                  onClick={() => copyToClipboard(`from openai import OpenAI\n\nclient = OpenAI(\n    base_url="https://votre-fumi.vercel.app/api/v1",\n    api_key="fumi_sk_live_..."\n)\n\nresponse = client.chat.completions.create(\n    model="fumi-sovereign",\n    messages=[{"role": "user", "content": "Rédige une fonction TypeScript."}]\n)\n\nprint(response.choices[0].message.content)`)}
                  className="hover:text-white flex items-center gap-1 text-[11px]"
                >
                  <Copy size={12} /> Copier
                </button>
              </div>
              <pre className="p-3 bg-[#0a0807] rounded-xl text-xs text-stone-300 overflow-x-auto font-mono">
{`from openai import OpenAI

client = OpenAI(
    base_url="https://votre-fumi.vercel.app/api/v1",
    api_key="fumi_sk_live_votre_cle"
)

response = client.chat.completions.create(
    model="fumi-sovereign",
    messages=[
        {"role": "user", "content": "Rédige une fonction TypeScript pour modéliser le Fâ."}
    ]
)

print(response.choices[0].message.content)`}
              </pre>
            </div>

            {/* Exemple Node.js / TypeScript pour Fa & Vodun Connect */}
            <div className="p-4 rounded-2xl bg-[#14110e] border border-[#2d2720] space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#dab372]">
                <span>TypeScript / Next.js (Pour Fa &amp; Vodun Connect)</span>
              </div>
              <pre className="p-3 bg-[#0a0807] rounded-xl text-xs text-stone-300 overflow-x-auto font-mono">
{`export async function askFumiRemote(question: string) {
  const res = await fetch('https://votre-fumi.vercel.app/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${process.env.FUMI_API_KEY}\`
    },
    body: JSON.stringify({
      model: 'fumi-sovereign',
      messages: [{ role: 'user', content: question }]
    })
  });
  const data = await res.json();
  return data.choices[0].message.content;
}`}
              </pre>
            </div>
          </div>
        )}

        {/* ONGLET 3 : CONSOLE DE TEST EN DIRECT */}
        {activeTab === 'test' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Console de Test Live</h2>
              <p className="text-xs text-stone-400">
                Testez en direct votre endpoint <code className="text-[#dab372]">/api/v1/chat/completions</code> avec vos clés API.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#16120e] border border-[#2d2720] space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Clé API d'autorisation :</label>
                <input
                  type="text"
                  value={testKey}
                  onChange={(e) => setTestKey(e.target.value)}
                  placeholder="fumi_sk_live_..."
                  className="w-full bg-[#0d0a08] border border-[#2d2720] rounded-xl px-3.5 py-2 text-xs font-mono text-[#dab372] focus:outline-none focus:border-[#d1984b]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Prompt de test :</label>
                <textarea
                  rows={3}
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  className="w-full bg-[#0d0a08] border border-[#2d2720] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#d1984b] resize-none"
                />
              </div>

              <button
                onClick={handleRunTest}
                disabled={isTesting || !testKey}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c27e3c] to-[#d1984b] text-stone-950 font-bold text-xs hover:brightness-110 disabled:opacity-40 transition-all flex items-center gap-2"
              >
                {isTesting ? <Sparkles size={14} className="animate-spin" /> : <Play size={14} />}
                <span>{isTesting ? "FUMI calcule..." : "Envoyer la requête de test"}</span>
              </button>

              {testResponse && (
                <div className="mt-4 pt-4 border-t border-[#2d2720] space-y-2">
                  <div className="text-xs font-semibold text-stone-400">Réponse du serveur FUMI :</div>
                  <pre className="p-4 rounded-xl bg-[#090706] border border-[#221c16] text-xs text-stone-200 whitespace-pre-wrap overflow-x-auto max-h-96">
                    {testResponse}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
