import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAlbwrVurvqb_y9LkCsR9iXrdr_qBWU2NI",
  authDomain: "e-shop-7cf7a.firebaseapp.com",
  projectId: "e-shop-7cf7a",
  storageBucket: "e-shop-7cf7a.firebasestorage.app",
  messagingSenderId: "876340644307",
  appId: "1:876340644307:web:ba3684173d4e8676a40726",
  measurementId: "G-9TGT9JCDG2",
};
// initialize fire base
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };
