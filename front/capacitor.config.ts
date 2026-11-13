import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic-app',
  webDir: 'dist/angular2/browser',
  server: {
    // La API y el bucket son http://, así que la app también tiene que ser http
    // para que el WebView no bloquee los pedidos (mixed content).
    androidScheme: 'http',
    cleartext: true,
  },
};

export default config;
