'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Platform } from 'react-native';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import { Container, Header, Content, Text, Button, Card, CardItem, List, ListItem, Left, Body, Right, Icon, Thumbnail } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';
import Comments from '../comments/index.js';
import Icon1 from 'react-native-vector-icons/FontAwesome';

import theme from '../../themes/base-theme';
import styles from './styles';
import ApiRequest from '../../api/ApiRequest.js';


const {
  popRoute,
  pushRoute,
  replaceAt,
} = actions;



class UserList extends Component {

    static propTypes = {
      replaceAt: React.PropTypes.func,
      popRoute: React.PropTypes.func,
      openDrawer: React.PropTypes.func,
      navigateTo: React.PropTypes.func,
      navigation: React.PropTypes.shape({
        key: React.PropTypes.string,
      }),
    }

    constructor(props) {
      super(props);

      this.firebase = ApiRequest.getBase();
      this.firebaseRef = ApiRequest.getRef();

      //takes user uid reference from firebase
      this.userRef = this.firebaseRef.child('users/'+this.firebase.auth().currentUser.uid);

      this.friendsRef = this.firebaseRef.child('users/'+this.firebase.auth().currentUser.uid+"/friends");
      //get ref of all users
      this.allUsersRef = this.firebaseRef.child('users/');

      this.state = {
        userList: [],
      }



      this.holdstuff = [];
      this.addFriend = this.addFriend.bind(this);
      //this.searchUsers = [];
    }



    componentDidMount() {

      //updates app when child is added to database
      this.allUsersRef.on('child_added', (dataSnapshot) => {
        this.holdstuff.push({id: dataSnapshot.key, name: dataSnapshot.val().firstname, email: dataSnapshot.val().email});

        this.setState({
          //postList: this.state.postList.concat({id: dataSnapshot.key, text: dataSnapshot.val()})
          userList: this.holdstuff
        })
      });

      this.allUsersRef.on('child_removed', (dataSnapshot) => {
        this.holdstuff = this.holdstuff.filter((x) => x.id != dataSnapshot.key);
        this.setState({
          userList: this.state.userList.filter((x) => x.id != dataSnapshot.key)
        })
      });
      /*for (var a in this.state.userList) {
        var ref = this.firebaseRef.child('users/'+this.state.userList[a]);
        ref.on('value', (snap)=> {
          this.searchUsers.push({name: snap.val().firstname, email: snap.val().email});
        })
      }*/
    }

    addFriend(p){
      this.friendsRef.child(p.id).set({
        friendName: p.name
      });
      // var friendslist = [];
      // for (var b in friendslist) {
      //   this.userRef.on('value', (snap) => {
      //     friendslist = snap.val().friends;
      //   })
      // }
      // this.userRef.onupdate({
      //     friends: friends.push(p.id) })
    }

    navigateTo(route) {
      this.props.navigateTo(route, 'home');
    }

    popRoute() {
      this.props.popRoute(this.props.navigation.key);
    }

    replaceRoute(route, p) {
      this.props.replaceAt('userlist', { key: route }, p, this.props.navigation.key);
    }

    render() {
      //this.searchUsers = [];
      var searchUsers = [];
      for (var a in this.state.userList) {
          searchUsers.push({id: this.state.userList[a].id, name: this.state.userList[a].name, email: this.state.userList[a].email});
      }

        return (
            <Container theme={theme}>

                <Header style={styles.headerFull}>
                  <HeaderContent activePage = 'userlist'/>
                </Header>

                <View >
                {searchUsers.map((p) => (
                  <Card>
                    <CardItem style={{backgroundColor: 'transparent', flexDirection:'row'}} key={p.id}>

                      <View style={{flex:0, paddingRight:3}}>
                        <TouchableOpacity
                        onPress={()=> this.replaceRoute('profile',p)}>
                          <Thumbnail source={require('../../../images/contacts/nopic.png')} />
                        </TouchableOpacity>
                      </View>
                      <View style={{flex:1}}>
                        <Text style={{color: 'black'}}>{p.name}</Text>
                        <Text note style={{color: 'black', fontWeight: '100'}}>{p.email}</Text>
                      </View>
                      <View style={{flex:0, alignItems:'center'}}>
                        <TouchableOpacity
                          onPress={()=> this.addFriend(p)} style={{alignItems:'center'}}>
                          <Icon1 name='plus' style={{color:"#F3A458", alignItems:'center', textAlign:'center'}}/>
                        </TouchableOpacity>
                      </View>
                    </CardItem>
                  </Card>
                   )
                )}

                </View>

            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: key => dispatch(popRoute(key)),
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
        replaceAt: (routekey, route, viewUser, key) => dispatch(replaceAt(routekey, route, viewUser, key)),
    }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(UserList);
