import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: 'AIzaSyC9dI6DDUB0hF1iRXhwflYvk-8KnyRc_Ak',
  authDomain: 'home-library-e3cc8.firebaseapp.com',
  databaseURL: 'https://home-library-e3cc8.firebaseio.com',
  projectId: 'home-library-e3cc8',
  storageBucket: 'home-library-e3cc8.appspot.com',
  messagingSenderId: '255349747735',
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;
