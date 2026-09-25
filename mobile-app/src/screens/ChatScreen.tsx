import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Modal,
  Alert,
  Dimensions
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { askFumiMobile } from '../services/fumiApi';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AttachedImage {
  id: string;
  uri: string;
  base64: string;
  mimeType: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  images?: string[];
  chatMode?: 'adaptive' | 'fast' | 'thinking';
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}

const STORAGE_SESSIONS_KEY = '@fumi_mobile_sessions_v2';
const STORAGE_ACTIVE_ID_KEY = '@fumi_mobile_active_id';

const PROACTIVE_SUGGESTIONS = [
  {
    id: 'fezan',
    badge: 'Sagesse & Traditions',
    badgeIcon: '👑',
    title: 'Énergies cosmiques du jour selon le Fêzan',
    prompt: 'Quelles sont les énergies cosmiques du jour selon le calendrier traditionnel Fêzan ? Donne-moi les conseils d\'action et de vigilance.',
  },
  {
    id: 'code',
    badge: 'Code & Ingénierie',
    badgeIcon: '💻',
    title: 'Architecture logicielle & Résolution de bugs',
    prompt: 'Agis comme un ingénieur principal expert en TypeScript, Next.js et React Native. Écris une fonction robuste et sécurisée.',
  },
  {
    id: 'fa',
    badge: '16 Signes Mères',
    badgeIcon: '📜',
    title: 'Matrices sacrées du Fâ & Leurs attributs',
    prompt: 'Explique-moi les 16 signes mères du Fâ (Gbê-Mêdji, Yèkou-Mêdji...) avec leurs tracés binaires et leurs leçons de vie.',
  },
  {
    id: 'sciences',
    badge: 'Sciences Africaines',
    badgeIcon: '🧪',
    title: 'Pharmacopée & Ethnobotanique',
    prompt: 'Présente-moi les plantes médicinales majeures du golfe de Guinée et leurs vertus selon la pharmacopée traditionnelle.',
  },
  {
    id: 'protection',
    badge: 'Harmonie & Sérénité',
    badgeIcon: '🛡️',
    title: 'Purification & Alignement énergétique',
    prompt: 'Quels sont les principes traditionnels de purification et d\'harmonie de l\'esprit pour surmonter le stress et les doutes ?',
  }
];

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState<'adaptive' | 'fast' | 'thinking'>('adaptive');
  const [attachedImages, setAttachedImages] = useState<AttachedImage[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  const flatListRef = useRef<FlatList>(null);

  // Charger les sessions sauvegardées
  useEffect(() => {
    (async () => {
      try {
        const storedSessions = await AsyncStorage.getItem(STORAGE_SESSIONS_KEY);
        const storedActiveId = await AsyncStorage.getItem(STORAGE_ACTIVE_ID_KEY);
        if (storedSessions) {
          const parsed = JSON.parse(storedSessions);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSessions(parsed);
            const activeId = (storedActiveId && parsed.some(s => s.id === storedActiveId))
              ? storedActiveId
              : parsed[0].id;
            setCurrentSessionId(activeId);
            return;
          }
        }
      } catch (e) {
        console.warn("Erreur chargement AsyncStorage:", e);
      }
      initNewSession();
    })();
  }, []);

  // Sauvegarder les sessions
  useEffect(() => {
    if (sessions.length > 0) {
      AsyncStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(sessions)).catch(() => {});
    }
  }, [sessions]);

  // Sauvegarder l'ID actif
  useEffect(() => {
    if (currentSessionId) {
      AsyncStorage.setItem(STORAGE_ACTIVE_ID_KEY, currentSessionId).catch(() => {});
    }
  }, [currentSessionId]);

  const currentSession = useMemo(() => {
    return sessions.find(s => s.id === currentSessionId) || sessions[0];
  }, [sessions, currentSessionId]);

  const messages = currentSession?.messages || [];

  const initNewSession = () => {
    const newId = `mob_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newSession: ChatSession = {
      id: newId,
      title: 'Nouvelle discussion',
      messages: [],
      timestamp: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setInput('');
    setAttachedImages([]);
    setIsDrawerOpen(false);
  };

  const deleteSession = (id: string) => {
    Alert.alert(
      "Supprimer la discussion",
      "Voulez-vous vraiment effacer cette discussion Fumi ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            const remaining = sessions.filter(s => s.id !== id);
            if (remaining.length === 0) {
              initNewSession();
            } else {
              setSessions(remaining);
              if (currentSessionId === id) {
                setCurrentSessionId(remaining[0].id);
              }
            }
          }
        }
      ]
    );
  };

  const handlePickImages = async () => {
    if (attachedImages.length >= 5) {
      Alert.alert("Limite atteinte", "Vous pouvez joindre jusqu'à 5 photos par message.");
      return;
    }

    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission requise", "Veuillez autoriser l'accès à vos photos pour joindre des images.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        selectionLimit: 5 - attachedImages.length,
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled && result.assets) {
        const newImages: AttachedImage[] = result.assets
          .filter(a => Boolean(a.base64))
          .map((a, idx) => ({
            id: `img_${Date.now()}_${idx}`,
            uri: a.uri,
            base64: a.base64 || '',
            mimeType: a.mimeType || 'image/jpeg',
          }));

        setAttachedImages(prev => [...prev, ...newImages].slice(0, 5));
      }
    } catch (e: any) {
      Alert.alert("Erreur", "Impossible de charger la photo : " + (e?.message || 'Erreur'));
    }
  };

  const handleRemoveImage = (id: string) => {
    setAttachedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleCopyMessage = async (text: string, id: string) => {
    await Clipboard.setStringAsync(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleToggleSpeak = async (text: string, id: string) => {
    if (speakingMessageId === id) {
      await Speech.stop();
      setSpeakingMessageId(null);
      return;
    }

    await Speech.stop();
    const cleanText = text
      .replace(/\[FA_TRACE:[^\]]+\]/g, '')
      .replace(/```[\s\S]*?```/g, 'bloc de code')
      .replace(/[*#_`>]/g, '')
      .trim();

    setSpeakingMessageId(id);
    Speech.speak(cleanText, {
      language: 'fr-FR',
      rate: 1.02,
      onDone: () => setSpeakingMessageId(null),
      onError: () => setSpeakingMessageId(null),
    });
  };

  const sendMessage = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if ((!textToSend && attachedImages.length === 0) || loading) return;

    const userImagesPayload = attachedImages.map(img => ({
      data: img.base64,
      mimeType: img.mimeType,
    }));
    const userImagesUris = attachedImages.map(img => img.uri);

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: textToSend,
      images: userImagesUris.length > 0 ? userImagesUris : undefined,
    };

    const targetSessionId = currentSessionId || sessions[0]?.id;
    const existingMessages = currentSession?.messages || [];
    const updatedMessages = [...existingMessages, userMsg];

    setSessions(prev => prev.map(s => {
      if (s.id === targetSessionId) {
        const title = s.messages.length === 0 ? textToSend.slice(0, 36) : s.title;
        return {
          ...s,
          title,
          messages: updatedMessages,
          timestamp: Date.now()
        };
      }
      return s;
    }));

    setInput('');
    setAttachedImages([]);
    setLoading(true);

    try {
      const history = updatedMessages.slice(-6).map((m) => ({
        role: m.role,
        text: m.content,
      }));

      const res = await askFumiMobile({
        question: textToSend,
        history,
        chatMode,
        images: userImagesPayload.length > 0 ? userImagesPayload : undefined,
      });

      const aiMsg: Message = {
        id: `a_${Date.now()}`,
        role: 'assistant',
        content: res.text,
        chatMode,
      };

      setSessions(prev => prev.map(s => {
        if (s.id === targetSessionId) {
          return {
            ...s,
            messages: [...s.messages, aiMsg],
            timestamp: Date.now()
          };
        }
        return s;
      }));
    } catch (err: any) {
      const errMsg: Message = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: `Une légère fluctuation est survenue. Vérifiez votre connexion et relancez Fumi ! (${err?.message || 'Erreur'})`,
      };
      setSessions(prev => prev.map(s => {
        if (s.id === targetSessionId) {
          return { ...s, messages: [...s.messages, errMsg] };
        }
        return s;
      }));
    } finally {
      setLoading(false);
    }
  };

  const filteredSessions = useMemo(() => {
    return (sessions || []).filter(s =>
      s.title.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [sessions, searchFilter]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fcfaf5" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ================= EN-TÊTE SUPÉRIEUR EXACT STYLE FA_VODOUN_CONNECT ================= */}
        <View style={styles.header}>
          {/* Bouton Hamburger pour ouvrir le Drawer d'historique */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setIsDrawerOpen(true)}
            accessibilityLabel="Historique des discussions"
          >
            <Text style={styles.hamburgerText}>☰</Text>
          </TouchableOpacity>

          {/* Logo officiel & Badge IA */}
          <View style={styles.headerCenter}>
            <Image
              source={require('../../assets/fumi_avatar.png')}
              style={styles.headerAvatar}
            />
            <Text style={styles.headerTitle}>FUMI AI</Text>
            <View style={styles.iaBadge}>
              <Text style={styles.iaBadgeText}>IA</Text>
            </View>
          </View>

          {/* Bouton Nouveau Chat (+) */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={initNewSession}
            accessibilityLabel="Nouvelle discussion"
          >
            <Text style={styles.plusIconText}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* ================= SÉLECTEUR DE MODE DE RÉPONSE ================= */}
        <View style={styles.modeBarContainer}>
          <TouchableOpacity
            onPress={() => setChatMode('adaptive')}
            style={[styles.modeTab, chatMode === 'adaptive' && styles.modeTabActive]}
          >
            <Text style={[styles.modeTabText, chatMode === 'adaptive' && styles.modeTabTextActive]}>
              ✨ Adaptatif
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setChatMode('fast')}
            style={[styles.modeTab, chatMode === 'fast' && styles.modeTabActive]}
          >
            <Text style={[styles.modeTabText, chatMode === 'fast' && styles.modeTabTextActive]}>
              ⚡ Rapide
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setChatMode('thinking')}
            style={[styles.modeTab, chatMode === 'thinking' && styles.modeTabActive]}
          >
            <Text style={[styles.modeTabText, chatMode === 'thinking' && styles.modeTabTextActive]}>
              🧠 Réfléchir
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= CORPS DU CHAT OU ÉTAT D'ACCUEIL ================= */}
        {messages.length === 0 ? (
          <ScrollView
            contentContainerStyle={styles.welcomeScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Avatar Central & Mascotte */}
            <View style={styles.welcomeAvatarWrapper}>
              <Image
                source={require('../../assets/fumi_avatar.png')}
                style={styles.welcomeAvatar}
              />
            </View>

            {/* Titre & Sous-titre spirituels et technologiques */}
            <Text style={styles.welcomeHeadline}>Kú dɔ̀ zànzǎn !</Text>
            <Text style={styles.welcomeSubline}>
              Je suis FUMI, l'IA souveraine africaine. Je réponds à vos questions de code, de sciences et de traditions avec sagesse.
            </Text>

            {/* CARROUSEL DES SUGGESTIONS PROACTIVES */}
            <View style={styles.carouselHeader}>
              <Text style={styles.carouselHeaderText}>
                ✨ SUGGESTIONS PROACTIVES & SECRETS DU FÂ
              </Text>
              <Text style={styles.carouselHeaderHint}>Glisser →</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContainer}
              snapToInterval={280}
              decelerationRate="fast"
            >
              {PROACTIVE_SUGGESTIONS.map((card) => (
                <View key={card.id} style={styles.suggestionCard}>
                  <View style={styles.suggestionBadge}>
                    <Text style={styles.suggestionBadgeText}>
                      {card.badgeIcon} {card.badge}
                    </Text>
                  </View>
                  <Text style={styles.suggestionTitle}>{card.title}</Text>
                  <TouchableOpacity
                    style={styles.suggestionButton}
                    onPress={() => sendMessage(card.prompt)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.suggestionButtonText}>Poser la question ➔</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </ScrollView>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            renderItem={({ item }) => {
              const isUser = item.role === 'user';
              return (
                <View
                  style={[
                    styles.messageRow,
                    isUser ? styles.userMessageRow : styles.aiMessageRow,
                  ]}
                >
                  {!isUser && (
                    <Image
                      source={require('../../assets/fumi_avatar.png')}
                      style={styles.chatMessageAvatar}
                    />
                  )}
                  <View
                    style={[
                      styles.messageBubble,
                      isUser ? styles.userBubble : styles.aiBubble,
                    ]}
                  >
                    {/* Photos si présentes */}
                    {item.images && item.images.length > 0 && (
                      <View style={styles.messageImagesRow}>
                        {item.images.map((imgUri, imgIdx) => (
                          <Image
                            key={imgIdx}
                            source={{ uri: imgUri }}
                            style={styles.messageImageThumb}
                          />
                        ))}
                      </View>
                    )}

                    {/* Texte du message */}
                    <Text style={isUser ? styles.userMessageText : styles.aiMessageText}>
                      {item.content}
                    </Text>

                    {/* Barre d'action sur message IA : Copier & Écouter */}
                    {!isUser && (
                      <View style={styles.aiActionRow}>
                        <TouchableOpacity
                          style={styles.aiActionBtn}
                          onPress={() => handleCopyMessage(item.content, item.id)}
                        >
                          <Text style={styles.aiActionText}>
                            {copiedMessageId === item.id ? '✓ Copié' : '📋 Copier'}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.aiActionBtn}
                          onPress={() => handleToggleSpeak(item.content, item.id)}
                        >
                          <Text style={styles.aiActionText}>
                            {speakingMessageId === item.id ? '⏹️ Arrêter' : '🔊 Écouter'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              );
            }}
          />
        )}

        {/* Indicateur de chargement */}
        {loading && (
          <View style={styles.thinkingContainer}>
            <ActivityIndicator size="small" color="#6b4028" />
            <Text style={styles.thinkingText}>
              {chatMode === 'thinking' ? 'FUMI réfléchit avec sagesse...' : 'FUMI prépare votre réponse...'}
            </Text>
          </View>
        )}

        {/* ================= BARRE DE SAISIE CAPSULE UNIFIÉE ================= */}
        <View style={[styles.inputWrapper, { paddingBottom: Math.max(insets.bottom, 10) }]}>
          <View style={styles.inputCapsule}>
            {/* Prévisualisation des photos attachées */}
            {attachedImages.length > 0 && (
              <ScrollView horizontal style={styles.attachedImagesBar} showsHorizontalScrollIndicator={false}>
                {attachedImages.map((img) => (
                  <View key={img.id} style={styles.attachedImageItem}>
                    <Image source={{ uri: img.uri }} style={styles.attachedImageThumb} />
                    <TouchableOpacity
                      style={styles.attachedImageRemove}
                      onPress={() => handleRemoveImage(img.id)}
                    >
                      <Text style={styles.attachedImageRemoveText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}

            {/* Champ de texte multiline */}
            <TextInput
              style={styles.textInput}
              value={input}
              onChangeText={setInput}
              placeholder={
                attachedImages.length > 0
                  ? `Poser une question sur ces ${attachedImages.length} photo(s)...`
                  : "Demander à Fumi..."
              }
              placeholderTextColor="#998e82"
              multiline
            />

            {/* Ligne d'actions inférieure */}
            <View style={styles.inputActionRow}>
              {/* Bouton + pour joindre des photos */}
              <TouchableOpacity
                style={styles.attachButton}
                onPress={handlePickImages}
                disabled={attachedImages.length >= 5}
                accessibilityLabel="Joindre une photo"
              >
                <Text style={styles.attachButtonText}>＋</Text>
              </TouchableOpacity>

              {/* Bouton d'envoi rond */}
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (!input.trim() && attachedImages.length === 0) || loading ? styles.sendButtonDisabled : null
                ]}
                onPress={() => sendMessage()}
                disabled={(!input.trim() && attachedImages.length === 0) || loading}
                accessibilityLabel="Envoyer"
              >
                <Text style={styles.sendButtonIcon}>↑</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.disclaimerText}>
            Fumi est une IA et peut se tromper
          </Text>
        </View>

        {/* ================= MODAL TIROIR D'HISTORIQUE (DRAWER) ================= */}
        <Modal
          visible={isDrawerOpen}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsDrawerOpen(false)}
        >
          <View style={styles.drawerOverlay}>
            <TouchableOpacity
              style={styles.drawerBackdrop}
              activeOpacity={1}
              onPress={() => setIsDrawerOpen(false)}
            />
            <View style={styles.drawerSheet}>
              {/* En-tête Tiroir */}
              <View style={styles.drawerHeader}>
                <View style={styles.drawerBrand}>
                  <Image
                    source={require('../../assets/fumi_avatar.png')}
                    style={styles.drawerAvatar}
                  />
                  <View>
                    <Text style={styles.drawerTitle}>Fumi AI</Text>
                    <Text style={styles.drawerSubtitle}>Guide & Assistance</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.drawerCloseButton}
                  onPress={() => setIsDrawerOpen(false)}
                >
                  <Text style={styles.drawerCloseText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Bouton Nouvelle Discussion */}
              <TouchableOpacity
                style={styles.drawerNewButton}
                onPress={initNewSession}
              >
                <Text style={styles.drawerNewButtonText}>✏️ Nouvelle discussion</Text>
              </TouchableOpacity>

              {/* Champ de recherche */}
              <View style={styles.drawerSearchBox}>
                <TextInput
                  style={styles.drawerSearchInput}
                  value={searchFilter}
                  onChangeText={setSearchFilter}
                  placeholder="Rechercher une discussion..."
                  placeholderTextColor="#9e9486"
                />
              </View>

              {/* Liste des discussions */}
              <ScrollView style={styles.drawerList}>
                {filteredSessions.map((s) => {
                  const isActive = s.id === currentSessionId;
                  return (
                    <View
                      key={s.id}
                      style={[styles.drawerItem, isActive && styles.drawerItemActive]}
                    >
                      <TouchableOpacity
                        style={styles.drawerItemContent}
                        onPress={() => {
                          setCurrentSessionId(s.id);
                          setIsDrawerOpen(false);
                        }}
                      >
                        <Text
                          style={[styles.drawerItemTitle, isActive && styles.drawerItemTitleActive]}
                          numberOfLines={1}
                        >
                          {s.title || 'Discussion sans titre'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.drawerItemDelete}
                        onPress={() => deleteSession(s.id)}
                      >
                        <Text style={styles.drawerDeleteText}>🗑️</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fcfaf5',
  },
  container: {
    flex: 1,
    backgroundColor: '#fcfaf5',
  },
  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: '#f0e6cb',
    backgroundColor: '#fcfaf5',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f4e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hamburgerText: {
    fontSize: 20,
    color: '#3a1e12',
    fontWeight: 'bold',
  },
  plusIconText: {
    fontSize: 16,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3a1e12',
    letterSpacing: 0.5,
  },
  iaBadge: {
    backgroundColor: '#f0e6cb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dab372',
  },
  iaBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6b4028',
  },

  /* SÉLECTEUR DE MODE */
  modeBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f4e6',
    padding: 3,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0e6cb',
  },
  modeTab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  modeTabActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  modeTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#834d2e',
  },
  modeTabTextActive: {
    color: '#3a1e12',
    fontWeight: 'bold',
  },

  /* ÉTAT D'ACCUEIL */
  welcomeScrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  welcomeAvatarWrapper: {
    marginTop: 10,
    marginBottom: 12,
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: '#d1984b',
    padding: 2,
    backgroundColor: '#f8f4e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 36,
  },
  welcomeHeadline: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3a1e12',
    marginBottom: 6,
    textAlign: 'center',
  },
  welcomeSubline: {
    fontSize: 13,
    color: '#6b4028',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  carouselHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  carouselHeaderText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#a26131',
    letterSpacing: 0.8,
  },
  carouselHeaderHint: {
    fontSize: 10,
    color: '#9e9486',
    fontWeight: '600',
  },
  carouselContainer: {
    paddingRight: 20,
    gap: 12,
  },
  suggestionCard: {
    width: SCREEN_WIDTH * 0.72,
    maxWidth: 280,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f0e6cb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    justifyContent: 'space-between',
  },
  suggestionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fcfaf5',
    borderWidth: 1,
    borderColor: '#e5cf9e',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 8,
  },
  suggestionBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#834d2e',
  },
  suggestionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#292524',
    lineHeight: 18,
    marginBottom: 14,
  },
  suggestionButton: {
    backgroundColor: '#6b4028',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  suggestionButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },

  /* LISTE DES MESSAGES */
  messageList: {
    padding: 16,
    paddingBottom: 24,
    gap: 14,
  },
  messageRow: {
    flexDirection: 'row',
    gap: 10,
    maxWidth: '88%',
  },
  userMessageRow: {
    alignSelf: 'flex-end',
  },
  aiMessageRow: {
    alignSelf: 'flex-start',
  },
  chatMessageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginTop: 4,
  },
  messageBubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userBubble: {
    backgroundColor: '#6b4028',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f0e6cb',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  userMessageText: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 22,
  },
  aiMessageText: {
    color: '#292524',
    fontSize: 15,
    lineHeight: 22,
  },
  messageImagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  messageImageThumb: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  aiActionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f8f4e6',
  },
  aiActionBtn: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f8f4e6',
  },
  aiActionText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#834d2e',
  },

  /* CHARGEMENT / RÉFLEXION */
  thinkingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  thinkingText: {
    color: '#834d2e',
    fontSize: 12,
    fontWeight: '600',
  },

  /* BARRE DE SAISIE CAPSULE UNIFIÉE */
  inputWrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: '#fcfaf5',
    borderTopWidth: 1,
    borderTopColor: '#f0e6cb',
  },
  inputCapsule: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e5cf9e',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  attachedImagesBar: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  attachedImageItem: {
    position: 'relative',
    marginRight: 8,
  },
  attachedImageThumb: {
    width: 54,
    height: 54,
    borderRadius: 12,
  },
  attachedImageRemove: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#000000',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachedImageRemoveText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 16,
    color: '#292524',
    maxHeight: 120,
    minHeight: 36,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  inputActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  attachButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8f4e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachButtonText: {
    fontSize: 20,
    color: '#6b4028',
    fontWeight: 'bold',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6b4028',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.35,
  },
  sendButtonIcon: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  disclaimerText: {
    fontSize: 10,
    color: '#a89f91',
    textAlign: 'center',
    marginTop: 6,
  },

  /* MODAL DRAWER D'HISTORIQUE */
  drawerOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerBackdrop: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  drawerSheet: {
    width: SCREEN_WIDTH * 0.82,
    maxWidth: 320,
    backgroundColor: '#ffffff',
    height: '100%',
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0e6cb',
  },
  drawerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  drawerAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  drawerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3a1e12',
  },
  drawerSubtitle: {
    fontSize: 10,
    color: '#834d2e',
    fontWeight: '600',
  },
  drawerCloseButton: {
    padding: 6,
  },
  drawerCloseText: {
    fontSize: 18,
    color: '#6b4028',
  },
  drawerNewButton: {
    backgroundColor: '#f8f4e6',
    borderWidth: 1,
    borderColor: '#f0e6cb',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  drawerNewButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#3a1e12',
    textAlign: 'center',
  },
  drawerSearchBox: {
    backgroundColor: '#fcfaf5',
    borderWidth: 1,
    borderColor: '#e5cf9e',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },
  drawerSearchInput: {
    fontSize: 13,
    color: '#292524',
    padding: 0,
  },
  drawerList: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
    backgroundColor: '#ffffff',
  },
  drawerItemActive: {
    backgroundColor: '#f8f4e6',
    borderWidth: 1,
    borderColor: '#e5cf9e',
  },
  drawerItemContent: {
    flex: 1,
    marginRight: 8,
  },
  drawerItemTitle: {
    fontSize: 13,
    color: '#292524',
  },
  drawerItemTitleActive: {
    fontWeight: 'bold',
    color: '#3a1e12',
  },
  drawerItemDelete: {
    padding: 4,
  },
  drawerDeleteText: {
    fontSize: 13,
  },
});
