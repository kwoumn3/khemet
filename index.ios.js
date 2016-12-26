
import { AppRegistry } from 'react-native';
import setup from './js/setup';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDscOMPAjF1Q286bt4R3w2IA_6RAlk1RmI",
  authDomain: "<your-auth-domain>",
  storageBucket: "gs://project-6478449439913979648.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent('Khemet', setup);
