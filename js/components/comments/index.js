'use strict';

import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { actions } from 'react-native-navigation-redux-helpers';

import { Container, Header, Content, Text, Input, Button, Icon, Card, CardItem, Thumbnail,Tabs } from 'native-base';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { Grid, Col, Row } from 'react-native-easy-grid';

import theme from '../../themes/base-theme';
import styles from './style';
var primary = require('../../themes/variable').brandPrimary;

import CustomTabBar from '../channels/CustomTabBar';
import TabOne from './tabOne';
import TabTwo from './tabTwo';
import TabThree from './tabThree';
import Login from '../login/index.js';
import ApiRequest from '../../api/ApiRequest.js';

const {
  //popRoute,
  //pushRoute,
  replaceAt
} = actions;

let comm = 'hi';

class Comments extends Component {

    static propTypes = {
      replaceAt: React.PropTypes.func,
      //popRoute: React.PropTypes.func,
      //pushRoute: React.PropTypes.func,
      navigation: React.PropTypes.shape({
        key: React.PropTypes.string,
      }),
    }

    constructor(props) {
        super(props);
        this.state = {
            offset: {
                x:0,
                y:0
            },
            username: '',
            password: '',
            signedUsers: [],
            newPost: '',
            postList: [],
            isPostPushed: false
          };

          //this.clearText = this.clearText.bind(this);
          var firebase = ApiRequest.getBase();
          var firebaseRef = ApiRequest.getRef();

          /*var useruser = firebase.auth().currentUser;
          if (useruser != null) {
            userUid = useruser.uid;
          }*/
          this.userRef = firebaseRef.child('users/'+firebase.auth().currentUser.uid);
          console.log("NOQWSY "+this.userRef);

          this.userRef.on('value', (snap) => {


            this.theUser = snap.val().firstname;
            console.log("WELI EBAB"+this.theUser);
          });


          //this.userRef =  firebaseRef.child('users/');
          // console.log("wahtyah "+userRef);
          //var theFirstname = "..";

          // firebase.auth().onAuthStateChanged((firebaseUser) => {
          //   if (firebaseUser) {
          //     //console.log("lemmeseethat");
          //     userUid = firebaseUser.uid;
          //     //console.log("THISTHEID  "+userUid);
          //     this.userRef =  firebaseRef.child('users/'+userUid);
          //     //console.log("the ref: "+ userRef);
          //     this.userRef.on("value", function(snap) {
          //       useruser = snap.val().firstname;
          //     }, function(err) {
          //       console.log(err);
          //     });
          //
          //   } else {
          //     console.log("no user");
          //   }
          //   //console.log("HEREWEGO "+ this.userRef);
          //   console.log("user " + useruser );
          // })

          //console.log("try user again "+ useruser.userUid);
          //console.log("HEREWEGO2 "+ this.state.username);

          //console.log("before await");
          // var userUid = ApiRequest.getUid()
          // .then((id) => {
          //   console.log("doublecheck");
          //   console.log(id);
          //   this.userRef = firebaseRef.child('users/'+userUid);
          // })
          // .catch(() => {
          //   console.log("No logged in user");
          // });

          //this.userRef = firebaseRef.child('users/'+userUid);
          //this.userRef = firebaseRef.child('users/');
          // this.userRef.on('value', (snap) => {
          //
          //
          //   this.theUser = snap.val().firstname;
          //   console.log(this.theUser);
          // });
          //this.usersListRef = ApiRequest.getRef().child('users');

          this.postRef = firebaseRef.child('posts');



        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
    }


    listenForUsers(itemsRef) {
      itemsRef.on('value', (snap) => {

        // get children as an array
        var items = [];
        snap.forEach((child) => {
          items.push({
            //title: child.val().title,
            _key: child.key
          });
        });

        //console.log(this.state.signedUsers);
      });
    }

    componentDidMount() {
      //this.userRef
      this.userRef.on('value', (snap) => {

        // this.setState({
        //   username: snap.val().firstname
        // })
        // console.log("hopefullyausername: "+this.state.username);
        //this.userRef = firebaseRef.child('users/'+);
      });

      /*this.userRef.on('value', (dataSnapshot) => {
        this.setState({
          username: dataSnapshot.val()
        })
      });*/
      //console.log("EHAT IS THE USERNAME " + this.state.username);
      //updates when child is added
      this.postRef.on('child_added', (dataSnapshot) => {
        this.setState({
          postList: this.state.postList.concat({id: dataSnapshot.key, text: dataSnapshot.val()})
        })
      });
      //updates when child is removed
      this.postRef.on('child_removed', (dataSnapshot) => {
        this.setState({
          postList: this.state.postList.filter((x) => x.id != dataSnapshot.key)
        })
      });

    }

    copyPost(theText) {
      //console.log('before ' + this.state.newPost);
      comm = theText;
      this.setState({ newPost: theText});
    }


    postToFeed() {
      //console.log("are you seeing me")
      if (this.state.newPost != '') {

        this.postRef.push({
          post: this.state.newPost,
          user: this.theUser
        })
        /*WE SHOULD ADD TO STATIC/DYNAMIC CARD LIST HERE*/
        this.setState({
          newPost: '',
          isPostPushed: true
        });
          //postList: this.state.postList.concat([this.state.newPost]),
      } else {
        console.log("you are not posting anything");
      }
      //this.textInput.setNativeProps({text: ''});
      console.log("isinarrayAfterset: " +this.state.postList);
    }

    /*deleteFromFeed(toDelete) {
      this.postRef.child(toDelete.id).remove();
    }*/

      replaceRoute(route) {
        this.props.replaceAt('comments', { key: route }, this.props.navigation.key);
      }

    render() {

        return (
            <Container theme={theme}>

                    <Header style={styles.headerFull}>
                        <Grid style={styles.headerContainer} >
                            <Col style={styles.headerBtns} >
                                <Button transparent>
                                    <Icon1 name='user' style={styles.headerIcons} />
                                </Button>
                            </Col>
                            <Col style={styles.headerBtns}>

                            </Col>
                            <Col style={styles.headerBtns}>
                                <TouchableOpacity>
                                    <Image style={{width: 50, height: 50, bottom: 10}} resizeMode={Image.resizeMode.contain} source={require('../../../images/logo3.png')} />
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.headerBtns} >

                            </Col>
                            <Col style={styles.headerBtns}>

                            </Col>
                        </Grid>
                    </Header>

                    <View style={styles.commentHeadbg}>

                        <Tabs tabTextColor='black'>
                            <TabOne post = {this.state.postList} isPushed = {this.state.isPostPushed}
                              postRef = {this.postRef} theUser = {this.theUser} tabLabel='The Yard' />

                        </Tabs>
                    </View>

                    <View style={styles.commentBox}>
                        <View style={styles.attachIconContainer}>
                            <Icon name='ios-attach' style={styles.attachIcon} />
                        </View>
                        <Input
                          placeholder='Write something...' placeholderTextColor='#797979'
                          onChangeText={(text) => this.copyPost(text)}
                          style={styles.input} value = {this.state.newPost}/>

                        <TouchableOpacity style={styles.arrowForwardIconContainer}
                          onPress={this.postToFeed.bind(this)}
                          underlayColor = '#dddddd'>
                            <Icon name='ios-arrow-forward'  style={styles.arrowForwardIcon} />

                        </TouchableOpacity>
                    </View>

            </Container>
        )

    }

}


function bindAction(dispatch) {
    return {
      //popRoute: key => dispatch(popRoute(key)),
      //pushRoute: (routekey, route, key) => dispatch(replaceAt(routekey, route, key)),
      replaceAt: (routekey, route, key) => dispatch(replaceAt(routekey, route, key)),
    };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});


export default connect(mapStateToProps, bindAction)(Comments);
