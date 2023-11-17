import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../firebaseConfig'; // Asegúrate de que la ruta es correcta

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
