import * as firebase from 'firebase';
import React, { Component } from 'react';

var database;
var usersList = [];

var firebaseConfig = {
    apiKey: "AIzaSyDscOMPAjF1Q286bt4R3w2IA_6RAlk1RmI",
    authDomain: "project-6478449439913979648.firebaseapp.com",
    databaseURL: "https://project-6478449439913979648.firebaseio.com",
    storageBucket: "project-6478449439913979648.appspot.com",
    messagingSenderId: "270546287787"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class ApiRequest extends Component {
  constructor(props) {
    // Initialize Firebase
      super(props);
      //this.itemsRef = firebaseApp.database().ref();

      /*myFirebaseRef.set({
        title: "Hello World!",
        author: "Simon"
      });*/

      // Get a reference to the database service
      database = firebase.database();
  }

  async signup(email, pass, first, last) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pass);
      console.log("Account Created");
      //also how to set data in database
      database.ref('users/' + 'doodoo').set({
          email: email,
          firstname: first,
          lastname: last
      });
      //how to set data in database


      //attempt to retrieve list of users
      var allUsersRef = firebase.database().ref('users/');

      allUsersRef.on('value', function(snapshot) {
        var allUsers = snapshot.val();
        console.log("here is snapshot!!" + "\n" + snapshot.val());
      })
        //get children as array

        //console.log(usersList);
    } catch(error) {
      console.log(error.toString());
    }
  }

  getRef() {
    return firebaseApp.database().ref();
  }





  /*componentDidMount() {
    this.listenForItems(this.itemsRef);
  }*/
}

export default new ApiRequest();
