# 📱 FUMI AI — Application Mobile React Native (iOS & Android)

Application mobile officielle de discussion avec **FUMI AI**, développée avec React Native et Expo.

---

## 🚀 Démarrage Rapide

### 1. Installation des dépendances
```bash
cd mobile-app
npm install
```

### 2. Lancer l'application
```bash
# Démarrer le serveur Expo
npx expo start

# Lancer sur simulateur iOS (Mac uniquement)
npx expo start --ios

# Lancer sur émulateur Android
npx expo start --android
```

### 3. Tester sur votre smartphone physique
1. Installez l'application **Expo Go** depuis l'App Store (iOS) ou le Google Play Store (Android).
2. Scannez le QR Code affiché dans votre terminal.
3. Chattez en direct avec FUMI AI sur votre téléphone !

---

## 🎨 Caractéristiques Mobiles
- **Touch Targets >= 44x44px** conformes aux recommandations Apple HIG et Material Design.
- **Taille de police des inputs >= 16px** pour empêcher le zoom automatique indésirable sur iOS Safari / WebKit.
- **Protection des zones d'encoche et de barre d'accueil** avec `react-native-safe-area-context`.
- **Mode sombre & palettes or/cuivre** identitaires de FUMI.
