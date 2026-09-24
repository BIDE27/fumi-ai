import React, { useState, useRef, useEffect } from 'react';
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
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { askFumiMobile } from '../services/fumiApi';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState<'adaptive' | 'fast' | 'thinking'>('adaptive');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || loading) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: textToSend,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const history = newMessages.slice(-6).map((m) => ({
        role: m.role,
        text: m.content,
      }));

      const res = await askFumiMobile({
        question: textToSend,
        history,
        chatMode,
      });

      const aiMsg: Message = {
        id: `a_${Date.now()}`,
        role: 'assistant',
        content: res.text,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errMsg: Message = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: "Désolée, une erreur de réseau est survenue. Relancez-moi !",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0d0b" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* HEADER MOBILE */}
        <View style={styles.header}>
          <View style={styles.headerProfile}>
            <View style={styles.avatarBorder}>
              <Image
                source={require('../../assets/fumi_avatar.png')}
                style={styles.avatarImage}
              />
            </View>
            <View>
              <Text style={styles.headerTitle}>FUMI AI</Text>
              <Text style={styles.headerSubtitle}>SOUVERAINE &amp; AFRICAINE</Text>
            </View>
          </View>

          {/* SÉLECTEUR DE MODE */}
          <View style={styles.modeContainer}>
            <TouchableOpacity
              onPress={() => setChatMode('fast')}
              style={[styles.modeButton, chatMode === 'fast' && styles.modeButtonActive]}
            >
              <Text style={[styles.modeText, chatMode === 'fast' && styles.modeTextActive]}>Rapide</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setChatMode('adaptive')}
              style={[styles.modeButton, chatMode === 'adaptive' && styles.modeButtonActive]}
            >
              <Text style={[styles.modeText, chatMode === 'adaptive' && styles.modeTextActive]}>Adaptatif</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setChatMode('thinking')}
              style={[styles.modeButton, chatMode === 'thinking' && styles.modeButtonActive]}
            >
              <Text style={[styles.modeText, chatMode === 'thinking' && styles.modeTextActive]}>Réflexion</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* LISTE DES MESSAGES OU ÉCRAN D'ACCUEIL */}
        {messages.length === 0 ? (
          <ScrollView contentContainerStyle={styles.welcomeContainer}>
            <Image
              source={require('../../assets/fumi_avatar.png')}
              style={styles.welcomeAvatar}
            />
            <Text style={styles.welcomeTitle}>Kú dɔ̀ zànzǎn !</Text>
            <Text style={styles.welcomeSubtitle}>
              Je suis FUMI, l'IA souveraine africaine. Je résous vos questions de code, de sciences et de traditions.
            </Text>

            {/* SUGGESTIONS PROACTIVES */}
            <View style={styles.suggestionsContainer}>
              <TouchableOpacity
                style={styles.suggestionCard}
                onPress={() => sendMessage("Quelles sont les énergies cosmiques du jour selon le calendrier Fêzan ?")}
              >
                <Text style={styles.suggestionTitle}>✨ Sagesse du Fêzan</Text>
                <Text style={styles.suggestionDesc}>Connaître l'énergie du jour et ses conseils d'action.</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.suggestionCard}
                onPress={() => sendMessage("Écris une fonction React Native pour gérer un panier d'achats.")}
              >
                <Text style={styles.suggestionTitle}>💻 Code &amp; Développement</Text>
                <Text style={styles.suggestionDesc}>Générer du code moderne et testé.</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.suggestionCard}
                onPress={() => sendMessage("Explique-moi les 16 signes mères du Fâ avec leurs tracés.")}
              >
                <Text style={styles.suggestionTitle}>📜 16 Signes Mères du Fâ</Text>
                <Text style={styles.suggestionDesc}>Comprendre les matrices de l'oracle ancestral.</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.bubbleContainer,
                  item.role === 'user' ? styles.userBubbleContainer : styles.aiBubbleContainer,
                ]}
              >
                {item.role === 'assistant' && (
                  <Image
                    source={require('../../assets/fumi_avatar.png')}
                    style={styles.chatAvatar}
                  />
                )}
                <View
                  style={[
                    styles.bubble,
                    item.role === 'user' ? styles.userBubble : styles.aiBubble,
                  ]}
                >
                  <Text style={item.role === 'user' ? styles.userText : styles.aiText}>
                    {item.content}
                  </Text>
                </View>
              </View>
            )}
          />
        )}

        {/* INDICATEUR DE CHARGEMENT */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#d1984b" />
            <Text style={styles.loadingText}>FUMI réfléchit avec sagesse...</Text>
          </View>
        )}

        {/* BARRE D'ENTRÉE TACTILE (TOUCH TARGET >= 44px) */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            placeholder="Posez votre question à Fumi..."
            placeholderTextColor="#8a8075"
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, (!input.trim() || loading) && styles.sendButtonDisabled]}
            onPress={() => sendMessage()}
            disabled={!input.trim() || loading}
          >
            <Text style={styles.sendButtonText}>➔</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f0d0b',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#241f19',
    backgroundColor: '#16120e',
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarBorder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    padding: 1.5,
    backgroundColor: '#d1984b',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  headerTitle: {
    color: '#fcfaf5',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerSubtitle: {
    color: '#dab372',
    fontSize: 9,
    fontWeight: 'bold',
  },
  modeContainer: {
    flexDirection: 'row',
    backgroundColor: '#110d0a',
    borderRadius: 12,
    padding: 2,
    borderWidth: 1,
    borderColor: '#2b2319',
  },
  modeButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    minHeight: 32,
    justifyContent: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#d1984b',
  },
  modeText: {
    fontSize: 11,
    color: '#a89f91',
    fontWeight: '600',
  },
  modeTextActive: {
    color: '#0f0d0b',
  },
  welcomeContainer: {
    padding: 24,
    alignItems: 'center',
  },
  welcomeAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#d1984b',
  },
  welcomeTitle: {
    color: '#fcfaf5',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    color: '#9e9486',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 24,
  },
  suggestionsContainer: {
    width: '100%',
    gap: 10,
  },
  suggestionCard: {
    backgroundColor: '#181410',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2d251d',
  },
  suggestionTitle: {
    color: '#dab372',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  suggestionDesc: {
    color: '#b0a698',
    fontSize: 11,
  },
  messageList: {
    padding: 16,
    gap: 14,
  },
  bubbleContainer: {
    flexDirection: 'row',
    gap: 8,
    maxWidth: '85%',
  },
  userBubbleContainer: {
    alignSelf: 'flex-end',
  },
  aiBubbleContainer: {
    alignSelf: 'flex-start',
  },
  chatAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginTop: 4,
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userBubble: {
    backgroundColor: '#a26131',
  },
  aiBubble: {
    backgroundColor: '#1a1612',
    borderWidth: 1,
    borderColor: '#2e251c',
  },
  userText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
  },
  aiText: {
    color: '#fcfaf5',
    fontSize: 14,
    lineHeight: 21,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  loadingText: {
    color: '#dab372',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#241f19',
    backgroundColor: '#14110e',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#1e1914',
    borderWidth: 1,
    borderColor: '#362c21',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#fcfaf5',
    fontSize: 16, // Empêche le zoom auto sur iOS
    maxHeight: 120,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#d1984b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  sendButtonText: {
    color: '#0f0d0b',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
