import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCEjrAL3VcN8cr9SPgnyH2nBPP-e7ccKOg",
  authDomain: "portfolio-image-db.firebaseapp.com",
  projectId: "portfolio-image-db",
  storageBucket: "portfolio-image-db.appspot.com",
  messagingSenderId: "105011500676",
  appId: "1:105011500676:web:e2bced56f4e81b1d3094d1",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
