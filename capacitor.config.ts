import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.particlegenerations.app',
  appName: 'particle-generations',
  webDir: 'docs/',
  server: {
    androidScheme: 'https'
  }
};

export default config;
