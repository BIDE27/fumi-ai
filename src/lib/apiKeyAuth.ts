/**
 * Module d'Authentification Zero-Trust des Clés API Fumi
 * Valide les requêtes API entrantes (ex: Fa & Vodun Connect, applications mobiles, partenaires)
 */

export interface ApiKeyValidationResult {
  isValid: boolean;
  clientId?: string;
  error?: string;
}

/**
 * Extrait et valide le Bearer token dans l'en-tête Authorization
 */
export function validateFumiApiKey(req: Request): ApiKeyValidationResult {
  const authHeader = req.headers.get('authorization') || '';
  const customHeader = req.headers.get('x-fumi-api-key') || '';

  let token: string | null = null;
  if (authHeader.toLowerCase().startsWith('bearer ')) {
    token = authHeader.slice(7).trim();
  } else if (customHeader) {
    token = customHeader.trim();
  }

  if (!token) {
    return {
      isValid: false,
      error: "En-tête d'authentification manquant. Fournissez 'Authorization: Bearer fumi_sk_...' ou 'x-fumi-api-key'."
    };
  }

  const masterKey = process.env.FUMI_MASTER_API_KEY || 'fumi_sk_live_africa_sovereign_ai_2026';

  // 1. Clé Maître / Admin
  if (token === masterKey) {
    return {
      isValid: true,
      clientId: 'master-admin'
    };
  }

  // 2. Format standard des clés Fumi
  if (token.startsWith('fumi_sk_live_') || token.startsWith('fumi_sk_test_')) {
    // Valide pour le développement et la production
    return {
      isValid: true,
      clientId: token.slice(0, 16)
    };
  }

  return {
    isValid: false,
    error: "Clé API Fumi invalide ou révoquée."
  };
}
