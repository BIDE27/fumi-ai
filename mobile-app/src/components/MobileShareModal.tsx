import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Share,
  Linking,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface MobileShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionTitle: string;
  sessionId: string;
}

export default function MobileShareModal({
  isOpen,
  onClose,
  sessionTitle,
  sessionId,
}: MobileShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const cleanTitle = sessionTitle?.trim() || "Discussion Fumi";
  const shareUrl = `https://fumi-ai.vercel.app?share=${encodeURIComponent(sessionId)}`;
  const shareText = `« ${cleanTitle} » — Fumi IA\n${shareUrl}`;

  const handleCopy = async () => {
    await Clipboard.setStringAsync(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    try {
      await Share.share({
        title: cleanTitle,
        message: shareText,
        url: shareUrl,
      });
    } catch {
      handleCopy();
    }
  };

  const handleWhatsApp = async () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    const canOpen = await Linking.canOpenURL(waUrl);
    if (canOpen) {
      await Linking.openURL(waUrl);
    } else {
      handleNativeShare();
    }
  };

  const handleTelegram = async () => {
    const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`« ${cleanTitle} » — Fumi IA`)}`;
    const canOpen = await Linking.canOpenURL(tgUrl);
    if (canOpen) {
      await Linking.openURL(tgUrl);
    } else {
      handleNativeShare();
    }
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <View style={styles.sheetContainer}>
          {/* Poignée supérieure */}
          <View style={styles.dragHandle} />

          {/* En-tête */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={styles.shareIconBox}>
                <Feather name="share-2" size={17} color="#f59e0b" />
              </View>
              <View>
                <Text style={styles.title}>Partager la discussion</Text>
                <Text style={styles.subtitle}>Un instantané public et sécurisé est généré</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              accessibilityLabel="Fermer"
            >
              <Feather name="x" size={20} color="#a8a29e" />
            </TouchableOpacity>
          </View>

          {/* Boîte URL du lien sécurisé */}
          <View style={styles.urlBox}>
            <Text style={styles.urlText} numberOfLines={1}>
              {shareUrl}
            </Text>
          </View>

          {/* Boutons d'action principaux : Copier & Partager */}
          <View style={styles.actionGrid}>
            <TouchableOpacity
              style={[styles.actionBtn, copied && styles.actionBtnCopied]}
              onPress={handleCopy}
              activeOpacity={0.8}
            >
              <Feather
                name={copied ? "check" : "copy"}
                size={16}
                color={copied ? "#ffffff" : "#fbbf24"}
              />
              <Text style={[styles.actionBtnText, copied && styles.actionBtnTextCopied]}>
                {copied ? 'Copié !' : 'Copier'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={handleNativeShare}
              activeOpacity={0.8}
            >
              <Feather name="share-2" size={16} color="#fbbf24" />
              <Text style={styles.actionBtnText}>Partager</Text>
            </TouchableOpacity>
          </View>

          {/* Carte Aperçu pour le destinataire */}
          <View style={styles.previewCard}>
            <Text style={styles.previewLabel}>APERÇU POUR LE DESTINATAIRE</Text>
            <View style={styles.previewTitleBox}>
              <Text style={styles.previewTitleText} numberOfLines={2}>
                {cleanTitle}
              </Text>
            </View>
          </View>

          {/* Partage direct rapide vers Réseaux Sociaux */}
          <View style={styles.socialSection}>
            <Text style={styles.socialSectionLabel}>Partage direct rapide :</Text>
            <View style={styles.socialButtonsRow}>
              {/* WhatsApp */}
              <TouchableOpacity
                style={styles.whatsappBtn}
                onPress={handleWhatsApp}
                activeOpacity={0.8}
              >
                <View style={styles.whatsappDot} />
                <Text style={styles.whatsappText}>WhatsApp</Text>
              </TouchableOpacity>

              {/* Telegram */}
              <TouchableOpacity
                style={styles.telegramBtn}
                onPress={handleTelegram}
                activeOpacity={0.8}
              >
                <Feather name="send" size={13} color="#38bdf8" />
                <Text style={styles.telegramText}>Telegram</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Note de sécurité */}
          <Text style={styles.securityNote}>
            🔒 Seuls les messages actuels sont partagés. Vos autres conversations et votre compte restent strictement privés.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheetContainer: {
    backgroundColor: '#0c0a09',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: '#292524',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 20,
  },
  dragHandle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#44403c',
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  shareIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(217, 119, 6, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 16,
    color: '#f5f5f4',
  },
  subtitle: {
    fontFamily: 'GoogleSans-Regular',
    fontSize: 11,
    color: '#a8a29e',
    marginTop: 1,
  },
  closeBtn: {
    padding: 6,
  },
  urlBox: {
    backgroundColor: '#1c1917',
    borderWidth: 1,
    borderColor: '#292524',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  urlText: {
    fontFamily: 'GoogleSans-Regular',
    fontSize: 12,
    color: '#d6d3d1',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1c1917',
    borderWidth: 1,
    borderColor: '#292524',
    paddingVertical: 11,
    borderRadius: 14,
  },
  actionBtnCopied: {
    backgroundColor: '#059669',
    borderColor: '#10b981',
  },
  actionBtnText: {
    fontFamily: 'GoogleSans-Medium',
    fontSize: 13,
    color: '#e7e5e4',
  },
  actionBtnTextCopied: {
    color: '#ffffff',
  },
  previewCard: {
    backgroundColor: 'rgba(28, 25, 23, 0.75)',
    borderWidth: 1,
    borderColor: '#292524',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
  },
  previewLabel: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 9.5,
    color: '#f59e0b',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  previewTitleBox: {
    backgroundColor: '#0c0a09',
    borderWidth: 1,
    borderColor: '#44403c',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  previewTitleText: {
    fontFamily: 'GoogleSans-Medium',
    fontSize: 13,
    color: '#f5f5f4',
  },
  socialSection: {
    marginBottom: 14,
  },
  socialSectionLabel: {
    fontFamily: 'GoogleSans-Regular',
    fontSize: 11,
    color: '#a8a29e',
    marginBottom: 8,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  whatsappBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(5, 150, 105, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.35)',
    paddingVertical: 9,
    borderRadius: 12,
  },
  whatsappDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10b981',
  },
  whatsappText: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 12,
    color: '#34d399',
  },
  telegramBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(2, 132, 199, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(2, 132, 199, 0.35)',
    paddingVertical: 9,
    borderRadius: 12,
  },
  telegramText: {
    fontFamily: 'GoogleSans-Bold',
    fontSize: 12,
    color: '#38bdf8',
  },
  securityNote: {
    fontFamily: 'GoogleSans-Regular',
    fontSize: 10,
    color: '#78716c',
    textAlign: 'center',
    lineHeight: 14,
  },
});
