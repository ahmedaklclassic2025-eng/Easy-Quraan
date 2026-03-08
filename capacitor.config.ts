import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.easyquraan.app',
  appName: 'Easy Quraan',
  webDir: 'dist',
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
