import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDsudtUPLOC0UGLtsNRc37XJ4FhnNvSec0',
  authDomain: 'outio-9027f.firebaseapp.com',
  projectId: 'outio-9027f',
  storageBucket: 'outio-9027f.appspot.com',
  messagingSenderId: '531241029307',
  appId: '1:531241029307:web:d6e8e3d60bfe9bb063239e',
  measurementId: 'G-KK4MY9188R',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
