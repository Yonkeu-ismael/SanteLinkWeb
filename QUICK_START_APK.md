# 🚀 Guide Rapide - Génération APK Android

## 📋 Prérequis

### 1. Installer les outils nécessaires
```bash
# Ouvrir PowerShell en tant qu'administrateur
.\scripts\install-prerequisites.ps1
```

### 2. Vérifier l'installation
```bash
.\scripts\manage-apk.ps1 info
```

## 🔧 Génération de l'APK

### Option 1: Script principal (recommandé)
```bash
# Générer APK debug
.\scripts\manage-apk.ps1 build

# Générer APK release
.\scripts\manage-apk.ps1 build -BuildType release
```

### Option 2: Scripts npm
```bash
# Générer APK debug
npm run build:apk

# Générer APK release
npm run build:apk-release
```

### Option 3: Étapes manuelles
```bash
# 1. Build de l'application web
npm run build

# 2. Synchronisation avec Capacitor
npx cap sync android

# 3. Génération de l'APK
cd android
.\gradlew.bat assembleDebug    # Pour debug
.\gradlew.bat assembleRelease  # Pour release
```

## 📱 Installation sur appareil

### 1. Connecter l'appareil
- Connectez votre appareil Android via USB
- Activez le débogage USB dans les paramètres développeur
- Autorisez l'ordinateur sur l'appareil

### 2. Installer l'APK
```bash
# Installation automatique
.\scripts\manage-apk.ps1 install

# Ou installation manuelle
adb install SanteLink-debug.apk
```

## 📁 Emplacement des fichiers

- **APK généré** : `SanteLink-debug.apk` ou `SanteLink-release.apk`
- **APK original** : `android/app/build/outputs/apk/debug/app-debug.apk`

## 🚨 Dépannage rapide

### Erreur "ADB not found"
```bash
# Réinstaller les prérequis
.\scripts\install-prerequisites.ps1
```

### Erreur "No devices connected"
```bash
# Vérifier la connexion
adb devices
```

### Erreur "Gradle build failed"
```bash
# Nettoyer et réessayer
.\scripts\manage-apk.ps1 clean
.\scripts\manage-apk.ps1 build
```

### Erreur "Permission denied"
```bash
# Désinstaller l'ancienne version
adb uninstall com.santelink.app
# Réinstaller
.\scripts\manage-apk.ps1 install
```

## 📊 Commandes utiles

```bash
# Informations du projet
.\scripts\manage-apk.ps1 info

# Nettoyer tous les builds
.\scripts\manage-apk.ps1 clean

# Générer et installer en une commande
.\scripts\manage-apk.ps1 build-and-install

# Vérifier les appareils connectés
adb devices

# Voir les logs de l'application
adb logcat | findstr "SanteLink"
```

## 🎯 Workflow recommandé

1. **Développement** : `npm run dev`
2. **Test web** : Tester dans le navigateur
3. **Build web** : `npm run build`
4. **Test mobile** : `.\scripts\manage-apk.ps1 build-and-install`
5. **Itération** : Répéter les étapes 1-4

## 📞 Support

En cas de problème :
1. Vérifiez les prérequis : `.\scripts\manage-apk.ps1 info`
2. Consultez le README.md complet
3. Vérifiez les logs d'erreur
4. Nettoyez et réessayez : `.\scripts\manage-apk.ps1 clean`
