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
      this.database = firebase.database();
  }


  async getCurrentUser() {
    return firebase.auth().currentUser;
  }

  async loginUser(email, pass) {

    await firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(() => {
        console.log("Successful login");

        //add user info to database

      })
      .catch((error) => {
         console.log("we have an error");
         throw error;
        // console.error(error);
      })

    var user = firebase.auth().currentUser;

    user.updateProfile({

      //displayName: "BillyB",
      //photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      console.log("Update Successful");

      }
    , function(error) {
      console.log("Whoops");
    });

  /*if (user != null) {
    user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: "+profile.providerId);
      console.log("  Provider-specific UID: "+profile.uid);
      console.log("  Display Name: "+profile.displayName);
      console.log("  First name Last name: "+profile.firstname+" "+profile.lastname);
      console.log("  Email: "+profile.email);
      console.log("  Org: "+profile.organization);
      console.log("  Photo URL: "+profile.photoURL);
      console.log("  Password: "+profile.password);
    });
  }*/
      //return true;
  }

  async signup(email, pass, first, last) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pass);
      console.log("Account Created");
      this.loginUser(email, pass);

      firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          console.log(firebaseUser);
          this.database.ref().child("users").child(firebaseUser.uid).set({
            email: email,
            firstname: first,
            lastname: last,
            organization: "",
            password: pass
          });
        } else {
          console.log("No user is logged in");
        }
      })
      //also how to set data in database
      /*database.ref('users/' + 'doodoo').set({
          email: email,
          firstname: first,
          lastname: last
      });*/
      //how to set data in database


      //attempt to retrieve list of users
      //var allUsersRef = firebase.database().ref('users/');

      /*allUsersRef.on('value', function(snapshot) {
        var allUsers = snapshot.val();
        console.log("here is snapshot!!" + "\n" + snapshot.val());
      })*/


        //get children as array

        //console.log(usersList);
    } catch(error) {
      console.log(error.toString());
    }
  }

  async setOrg(org) {
    try {
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          console.log("Adding org to user profile");
          this.database.ref().child("users").child(firebaseUser.uid).update({
            organization: org
          });
        } else {
          console.log("No user is logged in");
        }
      });

    } catch (error) {
      console.log(error.toString());
    }

  }

  getRef() {
    return firebaseApp.database().ref();
  }

  getInitFirebase() {
    return firebase;
  }

  getBase() {
    return firebase;
  }

 async getUid() {
   try {
     return new Promise(function (resolve, reject) {
       firebase.auth().onAuthStateChanged((firebaseUser) => {
         if (firebaseUser) {
           console.log("Firebase user is logged in");
           console.log(firebaseUser.uid);
           resolve(firebaseUser.uid);
         } else {
           reject(Error("No logged in user"));
         }
       })
     })
   } catch(err) {
     console.log(err);
   }
    // firebase.auth().onAuthStateChanged((firebaseUser) => {
    //   if (firebaseUser) {
    //     //console.log("uiduiduid    " +firebaseUser.uid);
    //     var giveuid = firebaseUser.uid;
    //     console.log("uiduiduid    " + giveuid);
    //     userUid = giveuid;
    //   } else {
    //     console.log("No user is logged in");
    //     userUid = "no name";
    //   }
    //   return userUid;
    // })
  }



  /*componentDidMount() {
    this.listenForItems(this.itemsRef);
  }*/
}

export default new ApiRequest();
