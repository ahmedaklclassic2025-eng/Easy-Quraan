import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';

// Configure StatusBar for mobile
if (Capacitor.isNativePlatform()) {
  StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
  StatusBar.setBackgroundColor({ color: '#00000000' }).catch(() => {});
  StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {});
  
  // Hide splash screen after app loads
  SplashScreen.hide().catch(() => {});
}

createRoot(document.getElementById("root")!).render(<App />);
