import * as firebase from 'firebase';
import React, { Component } from 'react';
import Geocoder from 'react-native-geocoder';

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

      this.state = {
        initialPosition: 'unknown',
        lastPosition: 'unknown',
        lat: 'unknown',
        lng: 'unknown',
        locality: ''
      };


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
    console.log("New logged in user uid: " + user.uid);

    /*user.updateProfile({

      //displayName: "BillyB",
      //photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      console.log("Update Successful");

      }
    , function(error) {
      console.log("Whoops");
    });*/
  }

  async signup(email, pass, first, last) {
      try {

        await firebase.auth().createUserWithEmailAndPassword(email, pass);
        console.log("Account Created");
        this.loginUser(email, pass);

        //ADD BELOW TO GETLOCATION FUNCTION
        navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = JSON.stringify(position);
          this.setState({initialPosition});
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          console.log("lat: "  + lat);
          console.log("lng: "  + lng);
          var userCoordinates = {
            lat: lat,
            lng: lng
          };
          Geocoder.geocodePosition(userCoordinates).then(res => {
            this.setState({locality: res[0].locality});
            console.log("user address: " + res[0].locality);
          })
          .catch(err => console.log(err))
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      //eND GETLOCATION BUTTON

        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + uid).set({
          email: email,
          firstname: first,
          lastname: last,
          organization: "",
          password: pass,
          chapter: "",
          crossYear: "",
          displayName: first + " " + last,
          occupation: "",
          school: "",
          posts: [],
          friends: [],
          profilePic: "",
          location: this.state.locality,
          likedPosts: [],
          isPrivate: false,
          eventCalendar: [],
          photoUrl: "",
          photoImgBase64: ""
        });

      } catch(error) {
        console.log("Did not successfully sign up: " + error.toString());
      }
  }

  async setOrg(org) {
    try {

      var uid = firebase.auth().currentUser.uid;
      firebase.database().ref('users/' + uid).update({
        organization: org
      });

    } catch (error) {
      console.log("Could not add org: " + error.toString());
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



  componentDidMount() {


  }

  componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watchID);
  }


}



export default new ApiRequest();
