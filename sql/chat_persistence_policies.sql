-- ==============================================================================
-- POLITIQUES RLS POUR LA PERSISTANCE DU CHAT FUMI DANS SUPABASE
-- Tables : public.chat_sessions & public.chat_messages
-- Assure la sauvegarde perpétuelle des discussions et l'entraînement de Fumi IA
-- ==============================================================================

-- 1. Sécurité et permissions sur public.chat_sessions
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can only see their own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can only insert their own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can update their own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can delete their own chat sessions" ON public.chat_sessions;
DROP POLICY IF EXISTS "Users can manage their own chat sessions" ON public.chat_sessions;

-- Permet à chaque utilisateur de lire, insérer, mettre à jour et supprimer ses propres sessions
CREATE POLICY "Users can manage their own chat sessions" ON public.chat_sessions 
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 2. Sécurité et permissions sur public.chat_messages
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can only see their own messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can insert their own messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can update their own messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can delete their own messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can manage their own messages" ON public.chat_messages;

-- Permet à chaque utilisateur de lire, insérer et gérer les messages appartenant à ses sessions
CREATE POLICY "Users can manage their own messages" ON public.chat_messages 
FOR ALL USING (
    EXISTS (SELECT 1 FROM public.chat_sessions WHERE id = session_id AND user_id = auth.uid())
) WITH CHECK (
    EXISTS (SELECT 1 FROM public.chat_sessions WHERE id = session_id AND user_id = auth.uid())
);

-- Index pour accélérer le tri chronologique et la recherche pour l'entraînement IA
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON public.chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at);
