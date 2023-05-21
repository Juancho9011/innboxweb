import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  // Agrega tus credenciales de Firebase aquí
  apiKey: 'API_KEY',
  authDomain: 'AUTH_DOMAIN',
  projectId: 'PROJECT_ID',
  // ...
};

firebase.initializeApp(firebaseConfig);

export default firebase;
