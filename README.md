# 🏥 SanteLink Web Application

Application web et mobile de santé connectée développée avec Vue 3, Capacitor et Android.

## 🚀 Technologies utilisées

- **Frontend** : Vue 3 + TypeScript + Vite
- **Mobile** : Capacitor 7.0.2
- **UI Framework** : Element Plus
- **Styling** : Sass/SCSS
- **Internationalisation** : i18n personnalisé
- **Thème** : Système de thème clair/sombre
- **Build** : Vite + Gradle (Android)

## 📱 Fonctionnalités

### 🌐 Web
- Interface responsive (desktop, tablette, mobile)
- Thème clair/sombre
- Support multilingue (FR/EN)
- Formulaires d'authentification
- Gestion des utilisateurs

### 📱 Mobile (Android)
- Application native Android
- Fonctionnalités natives (clavier, navigation)
- Optimisations mobiles
- Support hors ligne

## 🛠️ Installation et configuration

### Prérequis

- **Node.js** : 18+ 
- **Java JDK** : 21+ (OpenJDK recommandé)
- **Android SDK** : API 33+
- **Gradle** : 8.0+
- **ADB** : Android Debug Bridge

### 1. Installation des dépendances

```bash
# Cloner le projet
git clone <repository-url>
cd SanteLinkWeb

# Installer les dépendances
npm install

# Installer Capacitor CLI globalement
npm install -g @capacitor/cli
```

### 2. Configuration Android

```bash
# Ajouter la plateforme Android
npx cap add android

# Installer les plugins Capacitor
npm install @capacitor/app @capacitor/keyboard

# Synchroniser les assets
npx cap sync android
```

### 3. Configuration de l'environnement

#### Variables d'environnement
Créer un fichier `.env` :
```env
VITE_APP_API_BASE=https://api.santelink.dev.rancher.nebulageekinfra.com
VITE_APP_VERSION=1.0.0
```

#### Configuration Capacitor
Le fichier `capacitor.config.ts` est configuré pour :
- Navigation autorisée vers l'API
- Support du contenu mixte
- Débogage Android activé
- Fonctionnalités natives activées

## 🏗️ Build et déploiement

### Build Web

```bash
# Build de développement
npm run dev

# Build de production
npm run build

# Build avec mode spécifique
npm run build -- --mode production
```

### Build Android

```bash
# Synchroniser les assets
npx cap sync android

# Build debug
cd android
.\gradlew assembleDebug

# Build release (nécessite un keystore)
.\gradlew assembleRelease
```

### Génération d'APK

```bash
# Créer un keystore de debug
keytool -genkey -v -keystore app\debug.keystore \
  -storepass android -alias androiddebugkey \
  -keypass android -keyalg RSA -keysize 2048 \
  -validity 10000 -dname "CN=Android Debug,O=Android,C=US"

# Signer l'APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore app\debug.keystore -storepass android \
  -keypass android "SanteLink-v5.apk" androiddebugkey
```

## 📱 Installation sur appareil

### Préparation de l'appareil

1. **Activer le mode développeur** :
   - Paramètres > À propos du téléphone
   - Appuyer 7 fois sur "Numéro de build"

2. **Activer le débogage USB** :
   - Paramètres > Options pour les développeurs
   - Activer "Débogage USB"

### Installation via ADB

```bash
# Vérifier la connexion
adb devices

# Installer l'APK
adb install "SanteLink-v5.apk"

# Lancer l'application
adb shell am start -n com.santelink.app/.MainActivity

# Désinstaller si nécessaire
adb uninstall com.santelink.app
```

## 🔧 Configuration avancée

### Plugins Capacitor

#### @capacitor/app
- Gestion du cycle de vie de l'application
- Navigation et redirection
- Gestion des événements système

#### @capacitor/keyboard
- Gestion du clavier virtuel
- Redimensionnement automatique
- Styles personnalisés

### Configuration Android

#### AndroidManifest.xml
- Permissions réseau et système
- Configuration de sécurité
- Support des fonctionnalités natives

#### network_security_config.xml
- Configuration de sécurité réseau
- Support du trafic en clair
- Domaines autorisés

## 🎨 Interface utilisateur

### Responsive Design

- **Desktop (>1200px)** : Layout horizontal avec image à droite
- **Tablette (≤1200px)** : Layout vertical, image en haut
- **Mobile (≤768px)** : Layout vertical optimisé, image masquée

### Thèmes

- **Clair** : Fond blanc, texte sombre
- **Sombre** : Fond sombre, texte clair
- **Système** : Suit les préférences système

### Langues

- **Français** : Langue par défaut
- **Anglais** : Support complet
- **Persistance** : Sauvegarde dans localStorage

## 🚨 Dépannage

### Problèmes courants

#### Build échoue
```bash
# Nettoyer le cache
npm run clean
rm -rf node_modules
npm install

# Nettoyer Android
cd android
.\gradlew clean
```

#### APK ne s'installe pas
```bash
# Vérifier la signature
jarsigner -verify -verbose -certs "SanteLink-v5.apk"

# Désinstaller l'ancienne version
adb uninstall com.santelink.app
```

#### Problèmes de réseau
- Vérifier `network_security_config.xml`
- Contrôler les permissions dans `AndroidManifest.xml`
- Tester la connectivité API

### Logs et débogage

```bash
# Logs Android
adb logcat | grep "SanteLink"

# Logs Capacitor
adb logcat | grep "Capacitor"

# Redémarrer ADB
adb kill-server
adb start-server
```

## 📋 Structure du projet

```
SanteLinkWeb/
├── src/
│   ├── views/           # Pages de l'application
│   ├── components/      # Composants réutilisables
│   ├── i18n/           # Internationalisation
│   ├── utils/          # Utilitaires
│   └── config/         # Configuration
├── android/             # Code Android natif
├── public/              # Assets statiques
├── capacitor.config.ts  # Configuration Capacitor
└── package.json         # Dépendances
```

## 🔄 Versions

### v5 (Actuelle)
- ✅ Image du haut sans texte
- ✅ Suppression du plugin StatusBar
- ✅ Optimisations responsive
- ✅ Fonctionnalités natives

### v4
- ✅ Responsive tablette optimisé
- ✅ Section-2 masquée en mobile
- ✅ Espace vide supprimé

### v3
- ✅ Support des fonctionnalités natives
- ✅ Optimisations réseau
- ✅ Gestion des erreurs

## 📞 Support

Pour toute question ou problème :
- Vérifier la documentation Capacitor
- Consulter les logs Android
- Tester sur différents appareils
- Vérifier la configuration réseau

## 📄 Licence

© SanteLink 2025 - Tous droits réservés
