import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "movie-review-platform-55a65.firebaseapp.com",
  projectId: "movie-review-platform-55a65",
  storageBucket: "movie-review-platform-55a65.firebasestorage.app",
  messagingSenderId: "183755800089",
  appId: "1:183755800089:web:ea5e63417b6925a4c27488"
};

// Ensure API key is set
if (!firebaseConfig.apiKey) {
  throw new Error('REACT_APP_FIREBASE_API_KEY environment variable is not set');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
