import * as firebase from 'firebase';

class ApiRequest {
  constructor() {
    // Initialize Firebase
      var firebaseConfig = {
          apiKey: "AIzaSyDscOMPAjF1Q286bt4R3w2IA_6RAlk1RmI",
          authDomain: "project-6478449439913979648.firebaseapp.com",
          databaseURL: "https://project-6478449439913979648.firebaseio.com",
          storageBucket: "project-6478449439913979648.appspot.com",
          messagingSenderId: "270546287787"
      };
      const firebaseApp = firebase.initializeApp(firebaseConfig);
  }

  async signup(email, pass) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pass);
      console.log("Account Created");
    } catch(error) {
      console.log(error.toString());
    }
  }
}

export default new ApiRequest();
