'use strict';

import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { actions } from 'react-native-navigation-redux-helpers';

import { Container, Header, Content, Text, Input, Button, Icon, Card, CardItem, Thumbnail,Tabs } from 'native-base';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { openDrawer } from '../../actions/drawer';
import HeaderContent from './../headerContent/';

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

  replaceAt
} = actions;

let comm = 'hi';

class Comments extends Component {

    static propTypes = {
      replaceAt: React.PropTypes.func,
      openDrawer: React.PropTypes.func,
      //popRoute: React.PropTypes.func,
      //pushRoute: React.PropTypes.func,
      navigation: React.PropTypes.shape({
        key: React.PropTypes.string,
      }),
    }

    constructor(props) {
        //hold user info in these states
        super(props);
        this.state = {
            offset: {
                x:0,
                y:0
            },
            password: '',
            signedUsers: [],
            newPost: '',
            postList: [],
            isPostPushed: false
          };

          //setup references for firebase. not sure if it matters which one i use
          var firebase = ApiRequest.getBase();
          var firebaseRef = ApiRequest.getRef();

          //takes user uid reference from firebase
          this.userRef = firebaseRef.child('users/'+firebase.auth().currentUser.uid);

          //sets this.theUser to first name of current user
          this.userRef.on('value', (snap) => {
            this.theUser = snap.val().firstname;
            console.log("here we are "+this.theUser);
          });

          //sets this.postRef to reference for posts in firebase
          this.postRef = firebaseRef.child('posts');
          this.holdPosts = [];

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
    }

    componentDidMount() {
      //this.userRef
      this.userRef.on('value', (snap) => {

      });



      //updates app when child is added to database
      this.postRef.on('child_added', (dataSnapshot) => {
        this.holdPosts.push({id: dataSnapshot.key, text: dataSnapshot.val()});

        this.setState({
          //postList: this.state.postList.concat({id: dataSnapshot.key, text: dataSnapshot.val()})
          postList: this.state.postList.concat(this.holdPosts)
        })
        console.log(dataSnapshot.val());
      });

      //updates when child is removed from database. **no way to delete from client side yet.***
      this.postRef.on('child_removed', (dataSnapshot) => {
        this.holdPosts = this.holdPosts.filter((x) => x.id != dataSnapshot.key);
        this.setState({
          postList: this.state.postList.filter((x) => x.id != dataSnapshot.key)
        })
      });

      /*this.postRef.once("value", (snapshot) => {
        snapshot.forEach(function(childSnapshot) {
            this.setState({
              postList: this.state.postList.concat({id: childSnapshot.key, text: childSnapshot.val()})
            })
          });
          console.log(postList);
        });*/

    }

    copyPost(theText) {
      //console.log('before ' + this.state.newPost);
      comm = theText;
      this.setState({ newPost: theText});
    }


    signOutUser() {
      firebase.auth().signOut().then(function() {
        this.replaceRoute('login');
      })
    }


    postToFeed() {
      //check if text was written in input box. if so then push to firebase
      if (this.state.newPost != '') {

        this.postRef.push({
          post: this.state.newPost,
          user: this.theUser
        })
        //set newpost to blank to reset input box
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
                        <HeaderContent activePage = 'comments'/>
                    </Header>

                    <View style={styles.commentHeadbg}>

                        <Tabs tabTextColor='black'>
                            <TabOne post = {this.state.postList} isPushed = {this.state.isPostPushed}
                              postRef = {this.postRef} theUser = {this.theUser} tabLabel='The Yard'/>

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
      openDrawer: ()=>dispatch(openDrawer()),
      replaceAt: (routekey, route, key) => dispatch(replaceAt(routekey, route, key)),
    };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});


export default connect(mapStateToProps, bindAction)(Comments);
