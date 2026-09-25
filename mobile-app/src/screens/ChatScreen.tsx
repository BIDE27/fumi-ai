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
import { getFumiGreeting, getFumiProactiveCards, FumiProactiveCard } from '../lib/fumiGreetings';

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

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState<'adaptive' | 'fast' | 'thinking'>('adaptive');
  const [isModeModalOpen, setIsModeModalOpen] = useState(false);
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

  // Salutation dynamique & Cartes proactives officielles identiques au Web
  const greeting = useMemo(() => {
    return getFumiGreeting('Initié', currentSessionId);
  }, [currentSessionId]);

  const proactiveCards = useMemo(() => {
    return getFumiProactiveCards();
  }, []);

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

  const modeDisplayLabel = chatMode === 'thinking' ? 'Réfléchir' : chatMode === 'fast' ? 'Rapide' : 'Adaptatif';
  const modeDisplayIcon = chatMode === 'thinking' ? '🧠' : chatMode === 'fast' ? '⚡' : '✨';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fcfaf5" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ================= EN-TÊTE SUPÉRIEUR EXACT AU PIXEL DU WEB ================= */}
        <View style={styles.header}>
          {/* Bouton Hamburger */}
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsDrawerOpen(true)}
            accessibilityLabel="Ouvrir le menu"
          >
            <Text style={styles.headerIconText}>☰</Text>
          </TouchableOpacity>

          {/* Logo officiel : Avatar + Lettre + Badge IA (exactement comme le Web) */}
          <View style={styles.headerCenter}>
            <Image
              source={require('../../assets/fumi_avatar.png')}
              style={styles.headerAvatar}
            />
            <Image
              source={require('../../assets/fumi_lettre.png')}
              style={styles.headerLettre}
              resizeMode="contain"
            />
            <View style={styles.iaBadge}>
              <Text style={styles.iaBadgeText}>IA</Text>
            </View>
          </View>

          {/* Bouton Nouveau Chat (+) */}
          <TouchableOpacity
            style={styles.headerButton}
            onPress={initNewSession}
            accessibilityLabel="Nouvelle discussion"
          >
            <Text style={styles.headerIconText}>＋</Text>
          </TouchableOpacity>
        </View>

        {/* ================= CORPS DU CHAT OU ÉTAT D'ACCUEIL ================= */}
        {messages.length === 0 ? (
          <ScrollView
            contentContainerStyle={styles.welcomeScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Avatar & Lettre Fumi centrés */}
            <View style={styles.welcomeMascotteContainer}>
              <Image
                source={require('../../assets/fumi_avatar.png')}
                style={styles.welcomeAvatar}
              />
              <Image
                source={require('../../assets/fumi_lettre.png')}
                style={styles.welcomeLettre}
                resizeMode="contain"
              />
            </View>

            {/* Titre & Sous-titre avec Google Fonts officielles (Merriweather & Inter) */}
            <Text style={styles.welcomeHeadline}>{greeting.headline}</Text>
            <Text style={styles.welcomeSubline}>{greeting.subline}</Text>

            {/* CARROUSEL DES SUGGESTIONS PROACTIVES (Exactement les mêmes cartes qu'en Web) */}
            <View style={styles.carouselHeader}>
              <Text style={styles.carouselHeaderText}>
                ✨ SUGGESTIONS PROACTIVES & SECRETS...
              </Text>
              <Text style={styles.carouselHeaderHint}>Faites défiler →</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContainer}
              snapToInterval={284}
              decelerationRate="fast"
            >
              {proactiveCards.map((card: FumiProactiveCard) => {
                const iconSymbol = card.badgeIcon === 'crown' ? '👑' : card.badgeIcon === 'book' ? '📚' : card.badgeIcon === 'compass' ? '🧭' : card.badgeIcon === 'shield' ? '🛡️' : '✨';
                const actionText = card.actionType === 'prompt' && card.promptQuery
                  ? card.actionLabel
                  : (card.badge.includes('FÊZAN') ? '↗ Interroger le Fâ' : card.badge.includes('ROYAL') ? '💬 Raconter le secret' : card.actionLabel || 'Poser la question ➔');

                return (
                  <View key={card.id} style={styles.suggestionCard}>
                    <View style={styles.suggestionBadge}>
                      <Text style={styles.suggestionBadgeText}>
                        {iconSymbol} {card.badge}
                      </Text>
                    </View>
                    <Text style={styles.suggestionTitle} numberOfLines={2}>
                      {card.title}
                    </Text>
                    <TouchableOpacity
                      style={styles.suggestionButton}
                      onPress={() => sendMessage(card.promptQuery || card.title)}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.suggestionButtonText}>{actionText}</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
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

                    {/* Barre d'action sur message IA */}
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
            <Image
              source={require('../../assets/fumi_avatar.png')}
              style={styles.thinkingAvatar}
            />
            <ActivityIndicator size="small" color="#543719" />
            <Text style={styles.thinkingText}>
              {chatMode === 'thinking' ? 'Fumi réfléchit avec sagesse...' : 'Fumi prépare votre réponse...'}
            </Text>
          </View>
        )}

        {/* ================= CAPSULE DE SAISIE UNIFIÉE EXACTE AU PIXEL DU WEB ================= */}
        <View style={[styles.inputWrapper, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <View style={styles.inputCapsule}>
            {/* Photos attachées */}
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

            {/* Champ de saisie fluide */}
            <TextInput
              style={styles.textInput}
              value={input}
              onChangeText={setInput}
              placeholder={
                attachedImages.length > 0
                  ? `Poser une question sur ces ${attachedImages.length} photo(s)...`
                  : "Demander à Fumi..."
              }
              placeholderTextColor="#9e9486"
              multiline
            />

            {/* Barre inférieure dans la capsule : [+] à gauche, [Mode ▾] et [Mic/Envoyer] à droite */}
            <View style={styles.capsuleBottomRow}>
              {/* Bouton + pour joindre des photos */}
              <TouchableOpacity
                style={styles.plusButton}
                onPress={handlePickImages}
                disabled={attachedImages.length >= 5}
                accessibilityLabel="Ajouter des photos"
              >
                <Text style={styles.plusButtonText}>＋</Text>
              </TouchableOpacity>

              {/* Bloc droit : Sélecteur de mode déroulant + Action */}
              <View style={styles.capsuleRightActions}>
                {/* Pilule Sélecteur de mode */}
                <TouchableOpacity
                  style={styles.modeDropdownPill}
                  onPress={() => setIsModeModalOpen(true)}
                  accessibilityLabel="Changer le mode de réponse"
                >
                  <Text style={styles.modeDropdownText}>
                    {modeDisplayIcon} {modeDisplayLabel} ▾
                  </Text>
                </TouchableOpacity>

                {/* Bouton Envoyer ou Micro */}
                {(input.trim() || attachedImages.length > 0) ? (
                  <TouchableOpacity
                    style={styles.sendCircleButton}
                    onPress={() => sendMessage()}
                    disabled={loading}
                    accessibilityLabel="Envoyer"
                  >
                    <Text style={styles.sendCircleIcon}>↑</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.micCircleButton}
                    onPress={() => Alert.alert("Entrée vocale", "Dictez votre question ou tapez directement dans le champ.")}
                    accessibilityLabel="Micro"
                  >
                    <Text style={styles.micCircleIcon}>🎙️</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <Text style={styles.disclaimerText}>
            Fumi est une IA et peut se tromper
          </Text>
        </View>

        {/* ================= MODAL SÉLECTION DE MODE DE RÉPONSE ================= */}
        <Modal
          visible={isModeModalOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsModeModalOpen(false)}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setIsModeModalOpen(false)}
          >
            <View style={styles.modeModalContent}>
              <Text style={styles.modeModalTitle}>MODE DE RÉPONSE</Text>

              {/* Adaptatif */}
              <TouchableOpacity
                style={[styles.modeModalOption, chatMode === 'adaptive' && styles.modeModalOptionActive]}
                onPress={() => {
                  setChatMode('adaptive');
                  setIsModeModalOpen(false);
                }}
              >
                <Text style={styles.modeModalOptionIcon}>✨</Text>
                <View style={styles.modeModalOptionTextCol}>
                  <Text style={styles.modeModalOptionName}>Adaptatif (Défaut)</Text>
                  <Text style={styles.modeModalOptionDesc}>S'adapte naturellement selon la complexité de chaque question.</Text>
                </View>
              </TouchableOpacity>

              {/* Rapide */}
              <TouchableOpacity
                style={[styles.modeModalOption, chatMode === 'fast' && styles.modeModalOptionActive]}
                onPress={() => {
                  setChatMode('fast');
                  setIsModeModalOpen(false);
                }}
              >
                <Text style={styles.modeModalOptionIcon}>⚡</Text>
                <View style={styles.modeModalOptionTextCol}>
                  <Text style={styles.modeModalOptionName}>Rapide</Text>
                  <Text style={styles.modeModalOptionDesc}>Réponses directes et instantanées pour le quotidien.</Text>
                </View>
              </TouchableOpacity>

              {/* Réfléchir */}
              <TouchableOpacity
                style={[styles.modeModalOption, chatMode === 'thinking' && styles.modeModalOptionActive]}
                onPress={() => {
                  setChatMode('thinking');
                  setIsModeModalOpen(false);
                }}
              >
                <Text style={styles.modeModalOptionIcon}>🧠</Text>
                <View style={styles.modeModalOptionTextCol}>
                  <Text style={styles.modeModalOptionName}>Réfléchir</Text>
                  <Text style={styles.modeModalOptionDesc}>Analyse méthodique et raisonnement approfondi pas à pas.</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

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
                    <Text style={styles.drawerSubtitle}>Guide & Assistance H24</Text>
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
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: '#f0e6cb',
    backgroundColor: '#fcfaf5',
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8f4e6',
    borderWidth: 1,
    borderColor: '#f0e6cb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: {
    fontSize: 18,
    color: '#3a1e12',
    fontWeight: 'bold',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  headerLettre: {
    height: 18,
    width: 55,
  },
  iaBadge: {
    backgroundColor: '#f8f4e6',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dab372',
  },
  iaBadgeText: {
    fontSize: 9.5,
    fontFamily: 'Inter-Bold',
    color: '#6b4028',
  },

  /* HERO / WELCOME */
  welcomeScrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  welcomeMascotteContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  welcomeAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  welcomeLettre: {
    height: 24,
    width: 75,
    marginTop: 4,
  },
  welcomeHeadline: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 21,
    color: '#3a1e12',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 28,
  },
  welcomeSubline: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#6b4028',
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 6,
    marginBottom: 22,
    paddingHorizontal: 16,
  },

  /* CARROUSEL SUGGESTIONS PROACTIVES */
  carouselHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  carouselHeaderText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#a26131',
    letterSpacing: 0.8,
  },
  carouselHeaderHint: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#9e9486',
  },
  carouselContainer: {
    paddingRight: 20,
    gap: 12,
  },
  suggestionCard: {
    width: SCREEN_WIDTH * 0.74,
    maxWidth: 290,
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
    fontFamily: 'Inter-Bold',
    fontSize: 9.5,
    color: '#834d2e',
    textTransform: 'uppercase',
  },
  suggestionTitle: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 13.5,
    color: '#292524',
    lineHeight: 19,
    marginBottom: 14,
  },
  suggestionButton: {
    backgroundColor: '#543719',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 13,
    alignItems: 'center',
  },
  suggestionButtonText: {
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    letterSpacing: 0.2,
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
    backgroundColor: '#543719',
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
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  aiMessageText: {
    color: '#292524',
    fontFamily: 'Inter-Regular',
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
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: '#834d2e',
  },

  /* CHARGEMENT */
  thinkingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  thinkingAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  thinkingText: {
    fontFamily: 'Inter-Medium',
    color: '#834d2e',
    fontSize: 12,
  },

  /* CAPSULE DE SAISIE UNIFIÉE (PIXEL PERFECT WEB) */
  inputWrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: '#fcfaf5',
  },
  inputCapsule: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#e5cf9e',
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
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
    width: 52,
    height: 52,
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
    fontFamily: 'Inter-Regular',
    fontSize: 15.5,
    color: '#292524',
    maxHeight: 120,
    minHeight: 36,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  capsuleBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 2,
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButtonText: {
    fontSize: 22,
    color: '#543719',
    fontWeight: '400',
    lineHeight: 24,
  },
  capsuleRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modeDropdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fcfaf5',
    borderWidth: 1,
    borderColor: '#e5cf9e',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  modeDropdownText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: '#6b4028',
  },
  sendCircleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#543719',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendCircleIcon: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  micCircleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micCircleIcon: {
    fontSize: 18,
  },
  disclaimerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 10.5,
    color: '#a89f91',
    textAlign: 'center',
    marginTop: 6,
  },

  /* MODAL MODE DE RÉPONSE */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  modeModalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modeModalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 10.5,
    color: '#a89f91',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  modeModalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    marginBottom: 6,
    backgroundColor: '#fcfaf5',
  },
  modeModalOptionActive: {
    backgroundColor: '#f8f4e6',
    borderWidth: 1,
    borderColor: '#dab372',
  },
  modeModalOptionIcon: {
    fontSize: 20,
  },
  modeModalOptionTextCol: {
    flex: 1,
  },
  modeModalOptionName: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    color: '#3a1e12',
    marginBottom: 2,
  },
  modeModalOptionDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#6b4028',
    lineHeight: 15,
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
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  drawerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#3a1e12',
  },
  drawerSubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#834d2e',
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
    fontFamily: 'Inter-Bold',
    fontSize: 13,
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
    fontFamily: 'Inter-Regular',
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
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#292524',
  },
  drawerItemTitleActive: {
    fontFamily: 'Inter-Bold',
    color: '#3a1e12',
  },
  drawerItemDelete: {
    padding: 4,
  },
  drawerDeleteText: {
    fontSize: 13,
  },
});
