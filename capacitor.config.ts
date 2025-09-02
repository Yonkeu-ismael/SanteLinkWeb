import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.santelink.app',
  appName: 'SanteLink',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    allowNavigation: [
      'https://api.santelink.dev.rancher.nebulageekinfra.com/*',
      'http://localhost:*',
      'https://localhost:*'
    ]
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: '#1A5276'
    },
    Keyboard: {
      resize: 'body',
      style: 'default',
      resizeOnFullScreen: true
    },

    App: {
      url: 'https://santelink.app'
    },

    // Google Identity Services est géré côté web
    // Pas de configuration OAuth2 nécessaire pour Capacitor
  },
  android: {
    allowMixedContent: true,
    webContentsDebuggingEnabled: true,
    captureInput: true,
    mixedContentMode: 'always',
    // Activer les fonctionnalités natives
    useLegacyBridge: false,
    // Permettre l'accès aux fonctionnalités système
    allowBackup: true,
    // Activer les gestes natifs
    enableWebContentsDebugging: true
  },
  ios: {
    // Configuration iOS pour les fonctionnalités natives
    scheme: 'SanteLink',
    limitsNavigationsToAppBoundDomains: false
  }
};

export default config;
