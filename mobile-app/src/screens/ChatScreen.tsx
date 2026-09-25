import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { askFumiMobile } from '../services/fumiApi';
import { getFumiGreeting, getFumiProactiveCards, FumiProactiveCard } from '../lib/fumiGreetings';
import MobileShareModal from '../components/MobileShareModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.82, 320);

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
  pinned?: boolean;
}

const STORAGE_SESSIONS_KEY = '@fumi_mobile_sessions_v4';
const STORAGE_ACTIVE_ID_KEY = '@fumi_mobile_active_id';

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState<'adaptive' | 'fast' | 'thinking'>('adaptive');
  const [attachedImages, setAttachedImages] = useState<AttachedImage[]>([]);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  // Gestion du menu contextuel (Épingler, Renommer, Supprimer)
  const [activeMenuSessionId, setActiveMenuSessionId] = useState<string | null>(null);
  const [renamingSessionId, setRenamingSessionId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // Modale de partage
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Animation Drawer (Glissement de Gauche à Droite)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const drawerTranslateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const drawerBackdropOpacity = useRef(new Animated.Value(0)).current;

  // Animation Dropdown Mode (Popup ancré fluide style Web)
  const [isModeOpen, setIsModeOpen] = useState(false);
  const modeScale = useRef(new Animated.Value(0.92)).current;
  const modeOpacity = useRef(new Animated.Value(0)).current;

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
      initNewSession(true);
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
  const hasUserMessages = messages.some(m => m.role === 'user');
  const isCurrentSessionEmpty = currentSession && currentSession.messages.length === 0;

  // Salutation dynamique & Cartes proactives
  const greeting = useMemo(() => {
    return getFumiGreeting('Initié', currentSessionId);
  }, [currentSessionId]);

  const proactiveCards = useMemo(() => {
    return getFumiProactiveCards();
  }, []);

  // Gestion du Drawer (Animation Gauche -> Droite)
  const openDrawer = () => {
    setActiveMenuSessionId(null);
    setRenamingSessionId(null);
    setIsDrawerVisible(true);
    Animated.parallel([
      Animated.timing(drawerTranslateX, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(drawerBackdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    setActiveMenuSessionId(null);
    setRenamingSessionId(null);
    Animated.parallel([
      Animated.timing(drawerTranslateX, {
        toValue: -DRAWER_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(drawerBackdropOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsDrawerVisible(false);
    });
  };

  // Gestion du menu déroulant Mode (Animation popover fluide)
  const openModeMenu = () => {
    setIsModeOpen(true);
    modeScale.setValue(0.92);
    modeOpacity.setValue(0);
    Animated.parallel([
      Animated.spring(modeScale, {
        toValue: 1,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(modeOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModeMenu = () => {
    Animated.parallel([
      Animated.timing(modeScale, {
        toValue: 0.95,
        duration: 140,
        useNativeDriver: true,
      }),
      Animated.timing(modeOpacity, {
        toValue: 0,
        duration: 140,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsModeOpen(false);
    });
  };

  // Création d'une nouvelle session avec protection stricte : impossible de créer une discussion si la discussion courante est déjà vide
  const initNewSession = (force: boolean = false) => {
    if (!force && isCurrentSessionEmpty) {
      closeDrawer();
      return;
    }

    const newId = `mob_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newSession: ChatSession = {
      id: newId,
      title: 'Nouvelle discussion',
      messages: [],
      timestamp: Date.now(),
      pinned: false,
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setInput('');
    setAttachedImages([]);
    closeDrawer();
  };

  // Gestion du menu contextuel (Épingler, Renommer, Supprimer)
  const togglePinSession = (id: string) => {
    setSessions(prev =>
      prev.map(s => (s.id === id ? { ...s, pinned: !s.pinned } : s))
    );
    setActiveMenuSessionId(null);
  };

  const handleStartRename = (id: string, currentTitle: string) => {
    setRenamingSessionId(id);
    setRenameValue(currentTitle);
    setActiveMenuSessionId(null);
  };

  const handleSaveRename = (id: string) => {
    if (renameValue.trim()) {
      setSessions(prev =>
        prev.map(s => (s.id === id ? { ...s, title: renameValue.trim() } : s))
      );
    }
    setRenamingSessionId(null);
    setRenameValue('');
  };

  const deleteSession = (id: string) => {
    setActiveMenuSessionId(null);
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
              initNewSession(true);
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
    const list = (sessions || []).filter(s =>
      s.title.toLowerCase().includes(searchFilter.toLowerCase())
    );
    return list.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.timestamp - a.timestamp;
    });
  }, [sessions, searchFilter]);

  const modeDisplayLabel = chatMode === 'thinking' ? 'Réfléchir' : chatMode === 'fast' ? 'Rapide' : 'Adaptatif';

  const renderCardBadgeIcon = (icon: FumiProactiveCard['badgeIcon']) => {
    switch (icon) {
      case 'crown':
        return <MaterialCommunityIcons name="crown" size={13} color="#834d2e" />;
      case 'book':
        return <Feather name="book-open" size={12} color="#834d2e" />;
      case 'compass':
        return <Feather name="compass" size={12} color="#834d2e" />;
      case 'shield':
        return <Feather name="shield" size={12} color="#834d2e" />;
      case 'flame':
        return <Ionicons name="flame" size={13} color="#c2410c" />;
      default:
        return <Ionicons name="sparkles" size={12} color="#834d2e" />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fcfaf5" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ================= EN-TÊTE SUPÉRIEUR EXACT AU PIXEL ================= */}
        <View style={styles.header}>
          {/* Bouton Hamburger Vectoriel */}
          <TouchableOpacity
            style={styles.headerButton}
            onPress={openDrawer}
            accessibilityLabel="Ouvrir le menu"
          >
            <Feather name="menu" size={19} color="#3a1e12" />
          </TouchableOpacity>

          {/* Logo officiel : Avatar libre sans cercle + Lettre + Badge IA */}
          <View style={styles.headerCenter}>
            <Image
              source={require('../../assets/fumi_avatar.png')}
              style={styles.headerAvatar}
              resizeMode="contain"
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

          {/* Actions à droite : Bouton Partager (si messages) + Bouton Nouveau Chat (+) */}
          <View style={styles.headerRightActions}>
            {hasUserMessages && (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => setIsShareModalOpen(true)}
                accessibilityLabel="Partager la discussion"
              >
                <Feather name="share-2" size={17} color="#3a1e12" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.headerButton, isCurrentSessionEmpty && styles.headerButtonDisabled]}
              onPress={() => initNewSession(false)}
              disabled={isCurrentSessionEmpty}
              accessibilityLabel="Nouvelle discussion"
            >
              <Feather name="plus" size={19} color={isCurrentSessionEmpty ? '#a8a29e' : '#3a1e12'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= CORPS DU CHAT OU ÉTAT D'ACCUEIL ================= */}
        {messages.length === 0 ? (
          <ScrollView
            contentContainerStyle={styles.welcomeScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Avatar Fumi libre et transparent (cheveux intacts) */}
            <View style={styles.welcomeMascotteContainer}>
              <Image
                source={require('../../assets/fumi_avatar.png')}
                style={styles.welcomeAvatar}
                resizeMode="contain"
              />
              <Image
                source={require('../../assets/fumi_lettre.png')}
                style={styles.welcomeLettre}
                resizeMode="contain"
              />
            </View>

            {/* Titre & Sous-titre avec la police Google Sans officielle */}
            <Text style={styles.welcomeHeadline}>{greeting.headline}</Text>
            <Text style={styles.welcomeSubline}>{greeting.subline}</Text>

            {/* CARROUSEL DES SUGGESTIONS PROACTIVES */}
            <View style={styles.carouselHeader}>
              <View style={styles.carouselHeaderLeft}>
                <Ionicons name="sparkles" size={13} color="#a26131" />
                <Text style={styles.carouselHeaderText}>
                  SUGGESTIONS PROACTIVES & SECRETS...
                </Text>
              </View>
              <View style={styles.carouselHeaderRight}>
                <Text style={styles.carouselHeaderHint}>Faites défiler</Text>
                <Feather name="arrow-right" size={11} color="#9e9486" />
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContainer}
              snapToInterval={284}
              decelerationRate="fast"
            >
              {proactiveCards.map((card: FumiProactiveCard) => {
                const actionText = card.actionType === 'prompt' && card.promptQuery
                  ? card.actionLabel
                  : (card.badge.includes('FÊZAN') ? 'Interroger le Fâ' : card.badge.includes('ROYAL') ? 'Raconter le secret' : card.actionLabel || 'Poser la question');

                return (
                  <View key={card.id} style={styles.suggestionCard}>
                    <View style={styles.suggestionBadge}>
                      {renderCardBadgeIcon(card.badgeIcon)}
                      <Text style={styles.suggestionBadgeText}>
                        {card.badge}
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
                      resizeMode="contain"
                    />
                  )}
                  <View
                    style={[
                      styles.messageBubble,
                      isUser ? styles.userBubble : styles.aiBubble,
                    ]}
                  >
                    {item.images && item.images.length > 0 && (
                      <View style={styles.messageImagesRow}>
                        {item.images.map((uri, idx) => (
                          <Image key={idx} source={{ uri }} style={styles.messageImageThumb} />
                        ))}
                      </View>
                    )}
                    <Text style={isUser ? styles.userMessageText : styles.aiMessageText} selectable>
                      {item.content}
                    </Text>

                    {!isUser && (
                      <View style={styles.aiActionRow}>
                        <TouchableOpacity
                          style={styles.aiActionBtn}
                          onPress={() => handleCopyMessage(item.content, item.id)}
                        >
                          <Feather
                            name={copiedMessageId === item.id ? "check" : "copy"}
                            size={12}
                            color={copiedMessageId === item.id ? "#16a34a" : "#834d2e"}
                          />
                          <Text style={[styles.aiActionText, copiedMessageId === item.id && { color: '#16a34a' }]}>
                            {copiedMessageId === item.id ? 'Copié' : 'Copier'}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.aiActionBtn}
                          onPress={() => handleToggleSpeak(item.content, item.id)}
                        >
                          <Feather
                            name={speakingMessageId === item.id ? "volume-x" : "volume-2"}
                            size={12}
                            color={speakingMessageId === item.id ? "#dc2626" : "#834d2e"}
                          />
                          <Text style={[styles.aiActionText, speakingMessageId === item.id && { color: '#dc2626' }]}>
                            {speakingMessageId === item.id ? 'Arrêter' : 'Écouter'}
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

        {/* Indicateur de réflexion */}
        {loading && (
          <View style={styles.thinkingContainer}>
            <Image
              source={require('../../assets/fumi_avatar.png')}
              style={styles.thinkingAvatar}
              resizeMode="contain"
            />
            <ActivityIndicator size="small" color="#543719" />
            <Text style={styles.thinkingText}>
              {chatMode === 'thinking' ? "Fumi approfondit sa réflexion pas à pas..." : "Fumi formule sa réponse..."}
            </Text>
          </View>
        )}

        {/* ================= CAPSULE DE SAISIE UNIFIÉE ================= */}
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
                      <Feather name="x" size={10} color="#ffffff" />
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

            {/* Barre inférieure dans la capsule */}
            <View style={styles.capsuleBottomRow}>
              {/* Bouton + vectoriel */}
              <TouchableOpacity
                style={styles.plusButton}
                onPress={handlePickImages}
                disabled={attachedImages.length >= 5}
                accessibilityLabel="Ajouter des photos"
              >
                <Feather name="plus" size={18} color="#543719" />
              </TouchableOpacity>

              {/* Bloc droit : Sélecteur de mode déroulant + Action */}
              <View style={styles.capsuleRightActions}>
                {/* Pilule Sélecteur de mode */}
                <TouchableOpacity
                  style={styles.modeDropdownPill}
                  onPress={openModeMenu}
                  accessibilityLabel="Changer le mode de réponse"
                >
                  {chatMode === 'thinking' ? (
                    <Ionicons name="bulb-outline" size={12} color="#b45309" />
                  ) : chatMode === 'fast' ? (
                    <Feather name="zap" size={11} color="#57534e" />
                  ) : (
                    <Ionicons name="sparkles" size={11} color="#6b4028" />
                  )}
                  <Text style={styles.modeDropdownText}>{modeDisplayLabel}</Text>
                  <Feather name="chevron-down" size={11} color="#6b4028" />
                </TouchableOpacity>

                {/* Bouton Envoyer ou Micro Vectoriel */}
                {(input.trim() || attachedImages.length > 0) ? (
                  <TouchableOpacity
                    style={styles.sendCircleButton}
                    onPress={() => sendMessage()}
                    disabled={loading}
                    accessibilityLabel="Envoyer"
                  >
                    <Feather name="arrow-up" size={17} color="#ffffff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.micCircleButton}
                    onPress={() => Alert.alert("Entrée vocale", "Dictez votre question ou tapez directement dans le champ.")}
                    accessibilityLabel="Micro"
                  >
                    <Feather name="mic" size={15} color="#543719" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <Text style={styles.disclaimerText}>
            Fumi est une IA et peut se tromper
          </Text>
        </View>

        {/* ================= POPOVER ANCRÉ DU MODE DE RÉPONSE ================= */}
        {isModeOpen && (
          <View style={[StyleSheet.absoluteFill, styles.popoverOverlay]} pointerEvents="box-none">
            <TouchableWithoutFeedback onPress={closeModeMenu}>
              <View style={StyleSheet.absoluteFill} />
            </TouchableWithoutFeedback>

            <Animated.View
              style={[
                styles.modePopoverCard,
                {
                  bottom: Math.max(insets.bottom, 12) + 68,
                  opacity: modeOpacity,
                  transform: [{ scale: modeScale }],
                },
              ]}
            >
              <Text style={styles.modeModalTitle}>MODE DE RÉPONSE</Text>

              {/* Option 1 : Adaptatif */}
              <TouchableOpacity
                style={[styles.modeModalOption, chatMode === 'adaptive' && styles.modeModalOptionActive]}
                onPress={() => {
                  setChatMode('adaptive');
                  closeModeMenu();
                }}
              >
                <View style={[styles.modeIconCircle, chatMode === 'adaptive' && styles.modeIconCircleActive]}>
                  <Ionicons name="sparkles" size={14} color={chatMode === 'adaptive' ? '#6b4028' : '#78716c'} />
                </View>
                <View style={styles.modeModalOptionTextCol}>
                  <Text style={styles.modeModalOptionName}>Adaptatif (Défaut)</Text>
                  <Text style={styles.modeModalOptionDesc}>S'adapte naturellement selon la complexité de chaque question.</Text>
                </View>
              </TouchableOpacity>

              {/* Option 2 : Rapide */}
              <TouchableOpacity
                style={[styles.modeModalOption, chatMode === 'fast' && styles.modeModalOptionActive]}
                onPress={() => {
                  setChatMode('fast');
                  closeModeMenu();
                }}
              >
                <View style={[styles.modeIconCircle, chatMode === 'fast' && styles.modeIconCircleActive]}>
                  <Feather name="zap" size={14} color={chatMode === 'fast' ? '#3a1e12' : '#78716c'} />
                </View>
                <View style={styles.modeModalOptionTextCol}>
                  <Text style={styles.modeModalOptionName}>Rapide</Text>
                  <Text style={styles.modeModalOptionDesc}>Réponses directes et instantanées pour le quotidien.</Text>
                </View>
              </TouchableOpacity>

              {/* Option 3 : Réfléchir */}
              <TouchableOpacity
                style={[styles.modeModalOption, chatMode === 'thinking' && styles.modeModalOptionActive]}
                onPress={() => {
                  setChatMode('thinking');
                  closeModeMenu();
                }}
              >
                <View style={[styles.modeIconCircle, chatMode === 'thinking' && styles.modeIconCircleActive]}>
                  <Ionicons name="bulb-outline" size={14} color={chatMode === 'thinking' ? '#b45309' : '#78716c'} />
                </View>
                <View style={styles.modeModalOptionTextCol}>
                  <Text style={styles.modeModalOptionName}>Réfléchir</Text>
                  <Text style={styles.modeModalOptionDesc}>Analyse méthodique et raisonnement approfondi pas à pas.</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}

        {/* ================= DRAWER ANIMÉ AVEC MENU GESTION DISCUSSION EXACT AU PIXEL ================= */}
        {isDrawerVisible && (
          <View style={[StyleSheet.absoluteFill, styles.drawerOverlay]} pointerEvents="box-none">
            {/* Backdrop avec opacité animée */}
            <TouchableWithoutFeedback onPress={closeDrawer}>
              <Animated.View style={[styles.drawerBackdrop, { opacity: drawerBackdropOpacity }]} />
            </TouchableWithoutFeedback>

            {/* Volet latéral coulissant depuis la gauche */}
            <Animated.View
              style={[
                styles.drawerSheet,
                {
                  transform: [{ translateX: drawerTranslateX }],
                },
              ]}
            >
              {/* En-tête Tiroir (Capture 1) : Avatar + Fumi AI + Souveraine & Polyvalente + Fermer */}
              <View style={styles.drawerHeader}>
                <View style={styles.drawerBrand}>
                  <Image
                    source={require('../../assets/fumi_avatar.png')}
                    style={styles.drawerAvatar}
                    resizeMode="contain"
                  />
                  <View>
                    <Text style={styles.drawerTitle}>Fumi AI</Text>
                    <Text style={styles.drawerSubtitle}>Souveraine & Polyvalente</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.drawerCloseButton}
                  onPress={closeDrawer}
                  accessibilityLabel="Fermer le menu"
                >
                  <Feather name="x" size={20} color="#78716c" />
                </TouchableOpacity>
              </View>

              {/* Bouton Nouvelle Discussion (Capture 1) avec protection session vide */}
              <TouchableOpacity
                style={[styles.drawerNewButton, isCurrentSessionEmpty && styles.drawerNewButtonDisabled]}
                onPress={() => initNewSession(false)}
                disabled={isCurrentSessionEmpty}
                activeOpacity={0.8}
              >
                <Feather name="edit" size={16} color={isCurrentSessionEmpty ? '#a8a29e' : '#6b4028'} />
                <Text style={[styles.drawerNewButtonText, isCurrentSessionEmpty && styles.drawerNewButtonTextDisabled]}>
                  Nouvelle discussion
                </Text>
              </TouchableOpacity>

              {/* Champ de recherche (Capture 1) */}
              <View style={styles.drawerSearchBox}>
                <Feather name="search" size={14} color="#9e9486" style={{ marginRight: 6 }} />
                <TextInput
                  style={styles.drawerSearchInput}
                  value={searchFilter}
                  onChangeText={setSearchFilter}
                  placeholder="Rechercher..."
                  placeholderTextColor="#9e9486"
                />
              </View>

              {/* Liste des discussions avec menu contextuel (Épingler, Renommer, Supprimer) */}
              <ScrollView
                style={styles.drawerList}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {filteredSessions.map((s) => {
                  const isActive = s.id === currentSessionId;
                  const isMenuOpen = activeMenuSessionId === s.id;
                  const isRenaming = renamingSessionId === s.id;

                  return (
                    <View key={s.id} style={styles.drawerItemWrapper}>
                      <View style={[styles.drawerItem, isActive && styles.drawerItemActive]}>
                        <TouchableOpacity
                          style={styles.drawerItemLeft}
                          onPress={() => {
                            setCurrentSessionId(s.id);
                            closeDrawer();
                          }}
                        >
                          <Feather
                            name="message-square"
                            size={14}
                            color={isActive ? '#6b4028' : '#8c827a'}
                            style={{ marginRight: 8 }}
                          />

                          {s.pinned && (
                            <Ionicons
                              name="pin"
                              size={12}
                              color="#d97706"
                              style={{ marginRight: 4 }}
                            />
                          )}

                          {isRenaming ? (
                            <View style={styles.renameInputContainer}>
                              <TextInput
                                style={styles.renameInput}
                                value={renameValue}
                                onChangeText={setRenameValue}
                                autoFocus
                                onSubmitEditing={() => handleSaveRename(s.id)}
                              />
                              <TouchableOpacity
                                style={styles.renameActionBtn}
                                onPress={() => handleSaveRename(s.id)}
                              >
                                <Feather name="check" size={13} color="#16a34a" />
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.renameActionBtn}
                                onPress={() => setRenamingSessionId(null)}
                              >
                                <Feather name="x" size={13} color="#78716c" />
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <Text
                              style={[
                                styles.drawerItemTitle,
                                isActive && styles.drawerItemTitleActive,
                              ]}
                              numberOfLines={1}
                            >
                              {s.title}
                            </Text>
                          )}
                        </TouchableOpacity>

                        {/* Bouton 3 points verticaux pour ouvrir le menu d'actions (Capture 1) */}
                        {!isRenaming && (
                          <TouchableOpacity
                            style={styles.drawerItemMenuBtn}
                            onPress={() =>
                              setActiveMenuSessionId(isMenuOpen ? null : s.id)
                            }
                            accessibilityLabel="Menu de la discussion"
                          >
                            <Feather name="more-vertical" size={15} color="#78716c" />
                          </TouchableOpacity>
                        )}
                      </View>

                      {/* Fenêtre contextuelle popover (Capture 1 : Épingler, Renommer, Supprimer) */}
                      {isMenuOpen && (
                        <View style={styles.sessionPopoverMenu}>
                          {/* Option 1 : Épingler */}
                          <TouchableOpacity
                            style={styles.sessionPopoverItem}
                            onPress={() => togglePinSession(s.id)}
                          >
                            <Ionicons
                              name={s.pinned ? "pin" : "pin-outline"}
                              size={14}
                              color={s.pinned ? "#d97706" : "#44403c"}
                            />
                            <Text style={styles.sessionPopoverText}>
                              {s.pinned ? 'Désépingler' : 'Épingler'}
                            </Text>
                          </TouchableOpacity>

                          {/* Option 2 : Renommer */}
                          <TouchableOpacity
                            style={styles.sessionPopoverItem}
                            onPress={() => handleStartRename(s.id, s.title)}
                          >
                            <Feather name="edit-2" size={14} color="#44403c" />
                            <Text style={styles.sessionPopoverText}>Renommer</Text>
                          </TouchableOpacity>

                          {/* Option 3 : Supprimer en rouge */}
                          <TouchableOpacity
                            style={styles.sessionPopoverItem}
                            onPress={() => deleteSession(s.id)}
                          >
                            <Feather name="trash-2" size={14} color="#dc2626" />
                            <Text style={[styles.sessionPopoverText, { color: '#dc2626' }]}>
                              Supprimer
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                })}
              </ScrollView>

              {/* Pied du tiroir (Capture 1) : Clés API Fumi / Accès Développeur */}
              <View style={styles.drawerFooter}>
                <TouchableOpacity
                  style={styles.developerKeyButton}
                  onPress={() => {
                    closeDrawer();
                    Alert.alert(
                      "Clés API Fumi",
                      "L'API Fumi v1 est disponible sur /api/v1/chat/completions (compatible OpenAI). Vous pouvez générer et gérer vos clés d'API depuis la section Développeur sur le Web.",
                      [{ text: "Compris" }]
                    );
                  }}
                  activeOpacity={0.8}
                >
                  <View style={styles.developerKeyIconContainer}>
                    <Feather name="key" size={15} color="#834d2e" />
                  </View>
                  <View style={styles.developerKeyTextCol}>
                    <Text style={styles.developerKeyTitle}>Clés API Fumi</Text>
                    <Text style={styles.developerKeySubtitle}>Accès Développeur</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        )}

        {/* ================= MODALE DE PARTAGE EXACTE AU PIXEL DE FA-VODUN ================= */}
        <MobileShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          sessionTitle={currentSession?.title || "Discussion Fumi"}
          sessionId={currentSessionId}
        />
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
  headerButtonDisabled: {
    opacity: 0.45,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerAvatar: {
    width: 30,
    height: 30,
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
    fontFamily: 'GoogleSans-Bold',
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
    width: 76,
    height: 76,
  },
  welcomeLettre: {
    height: 24,
    width: 75,
    marginTop: 4,
  },
  welcomeHeadline: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 22,
    color: '#3a1e12',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 28,
  },
  welcomeSubline: {
    fontFamily: 'GoogleSans-Regular',
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
  carouselHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  carouselHeaderText: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 10,
    color: '#a26131',
    letterSpacing: 0.8,
  },
  carouselHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  carouselHeaderHint: {
    fontFamily: 'GoogleSans-Medium',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fcfaf5',
    borderWidth: 1,
    borderColor: '#e5cf9e',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 10,
    marginBottom: 8,
  },
  suggestionBadgeText: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 9.5,
    color: '#834d2e',
    textTransform: 'uppercase',
  },
  suggestionTitle: {
    fontFamily: 'GoogleSans-Bold',
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
    fontFamily: 'GoogleSans-Bold',
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
    width: 30,
    height: 30,
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
    fontFamily: 'GoogleSans-Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  aiMessageText: {
    color: '#292524',
    fontFamily: 'GoogleSans-Regular',
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
    gap: 10,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f8f4e6',
  },
  aiActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f8f4e6',
  },
  aiActionText: {
    fontFamily: 'GoogleSans-Medium',
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
  },
  thinkingText: {
    fontFamily: 'GoogleSans-Medium',
    color: '#834d2e',
    fontSize: 12,
  },

  /* CAPSULE DE SAISIE UNIFIÉE */
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
  textInput: {
    fontFamily: 'GoogleSans-Regular',
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
    backgroundColor: '#f8f4e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capsuleRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modeDropdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fcfaf5',
    borderWidth: 1,
    borderColor: '#e5cf9e',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  modeDropdownText: {
    fontFamily: 'GoogleSans-Medium',
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
  micCircleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f4e6',
    borderWidth: 1,
    borderColor: '#e5cf9e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimerText: {
    fontFamily: 'GoogleSans-Regular',
    fontSize: 10.5,
    color: '#a89f91',
    textAlign: 'center',
    marginTop: 6,
  },

  /* POPOVER MODE ANCRÉ AU-DESSUS DE LA CAPSULE */
  popoverOverlay: {
    zIndex: 900,
  },
  modePopoverCard: {
    position: 'absolute',
    right: 16,
    width: Math.min(SCREEN_WIDTH * 0.76, 280),
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5cf9e',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 8,
  },
  modeModalTitle: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 10,
    color: '#a89f91',
    letterSpacing: 0.8,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  modeModalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 14,
    marginBottom: 4,
    backgroundColor: '#fcfaf5',
  },
  modeModalOptionActive: {
    backgroundColor: '#f8f4e6',
    borderWidth: 1,
    borderColor: '#dab372',
  },
  modeIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0e6cb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeIconCircleActive: {
    backgroundColor: '#dab372',
  },
  modeModalOptionTextCol: {
    flex: 1,
  },
  modeModalOptionName: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 12.5,
    color: '#3a1e12',
    marginBottom: 1,
  },
  modeModalOptionDesc: {
    fontFamily: 'GoogleSans-Regular',
    fontSize: 10.5,
    color: '#6b4028',
    lineHeight: 14,
  },

  /* DRAWER D'HISTORIQUE (COULISSANT DEPUIS LA GAUCHE) */
  drawerOverlay: {
    zIndex: 1000,
  },
  drawerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  drawerSheet: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 16,
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
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f0e6',
  },
  drawerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  drawerAvatar: {
    width: 34,
    height: 34,
  },
  drawerTitle: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 16,
    color: '#3a1e12',
  },
  drawerSubtitle: {
    fontFamily: 'GoogleSans-Medium',
    fontSize: 10.5,
    color: '#a26131',
    marginTop: 1,
  },
  drawerCloseButton: {
    padding: 6,
  },
  drawerNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fcfaf5',
    borderWidth: 1,
    borderColor: '#f0e6cb',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  drawerNewButtonDisabled: {
    opacity: 0.5,
  },
  drawerNewButtonText: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 13.5,
    color: '#3a1e12',
  },
  drawerNewButtonTextDisabled: {
    color: '#a8a29e',
  },
  drawerSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#faf8f2',
    borderWidth: 1,
    borderColor: '#f0e6cb',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 14,
  },
  drawerSearchInput: {
    flex: 1,
    fontFamily: 'GoogleSans-Regular',
    fontSize: 13,
    color: '#292524',
    padding: 0,
  },
  drawerList: {
    flex: 1,
  },
  drawerItemWrapper: {
    position: 'relative',
    marginBottom: 6,
    zIndex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  drawerItemActive: {
    backgroundColor: '#fcfaf5',
    borderWidth: 1,
    borderColor: '#f0e6cb',
  },
  drawerItemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  drawerItemTitle: {
    flex: 1,
    fontFamily: 'GoogleSans-Regular',
    fontSize: 13,
    color: '#44403c',
  },
  drawerItemTitleActive: {
    fontFamily: 'GoogleSans-Bold',
    color: '#3a1e12',
  },
  drawerItemMenuBtn: {
    padding: 6,
  },

  /* Renommer inline */
  renameInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  renameInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dab372',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 12.5,
    fontFamily: 'GoogleSans-Regular',
    color: '#292524',
  },
  renameActionBtn: {
    padding: 4,
  },

  /* Menu Popover Contextuel (Capture 1 : Épingler, Renommer, Supprimer) */
  sessionPopoverMenu: {
    position: 'absolute',
    right: 12,
    top: 40,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e7e5e4',
    paddingVertical: 6,
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 99,
    minWidth: 136,
  },
  sessionPopoverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  sessionPopoverText: {
    fontFamily: 'GoogleSans-Medium',
    fontSize: 12,
    color: '#292524',
  },

  /* Pied du tiroir : Clés API Développeur (Capture 1) */
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f5f0e6',
    paddingTop: 12,
    marginTop: 6,
  },
  developerKeyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 14,
  },
  developerKeyIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f4e6',
    borderWidth: 1,
    borderColor: '#f0e6cb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  developerKeyTextCol: {
    flex: 1,
  },
  developerKeyTitle: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 13,
    color: '#3a1e12',
  },
  developerKeySubtitle: {
    fontFamily: 'GoogleSans-Regular',
    fontSize: 11,
    color: '#a26131',
    marginTop: 1,
  },
});
