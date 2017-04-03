'use strict';

import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';

import { Container, Header, Content, Text, Button, Icon, Tabs, Card, CardItem,Thumbnail, Body, Left } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';

import Icon1 from 'react-native-vector-icons/FontAwesome';
import theme from '../../themes/base-theme';
import styles from './style';
import ApiRequest from '../../api/ApiRequest.js';
import Comments from './index';

const {
  pushRoute
} = actions;

var CardList = require('@remobile/react-native-card-list');

var {width, height} = Dimensions.get('window');
var forNow = 'For Now...';

var LIST = [];

class TabOne extends Component {
    constructor(props) {
      super(props);
      var firebaseRef = ApiRequest.getRef();

      this.postRef = firebaseRef.child('posts');
      this.state = {
        newPost: '',
        postSource: 'postSource...'
      }

      var firebaseRef = ApiRequest.getRef();
      //this.usersListRef = ApiRequest.getRef().child('users');

      this.postRef = firebaseRef.child('posts');


      this.posts = [];
      this.deleteFromFeed = this.deleteFromFeed.bind(this);
    }


          static propTypes = {
            popRoute: React.PropTypes.func,
            pushRoute: React.PropTypes.func,
            navigation: React.PropTypes.shape({
              key: React.PropTypes.string,
            }),
          }

          sayhello(p) {
            console.log("hello!!!!!!!!!");
          }

          /*componentDidMount() {
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

          }*/

          deleteFromFeed(p) {
            console.log("AAAAAAAAAAAAAAAAA!");
            this.props.postRef.child(p.id).remove();
          }





          pushRoute(route) {
            this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
          }


    render() {
        var thisguy = this.props.theUser;
        var posts =[]
        for (var a in this.props.post) {
          posts.push({id: this.props.post[a].id, post: this.props.post[a].text.post
                                                ,user: this.props.post[a].text.user});
          //console.log(a, this.state.postList[a].text.post);
          //this.deleteFromFeed(a); <Button transparent onPress={()=> this.deleteFromFeed.bind(this, p)}>
        }
        posts.reverse();
        if (posts != []) {
        return (
            <Container style={{backgroundColor: '#e0e0e0'}}>
            <Content theme={theme} style={{marginBottom:(Platform.OS === 'ios') ? -50 : -10}}>
            <View style={{backgroundColor: '#e0e0e0'}}>
             {posts.map(function (p) {
               return (
                  <Card foregroundColor='#222' style={{ flex: 0 }} key={p.id}>
                      <CardItem   header>
                          <Text style={styles.cmtName}>{p.user}</Text>
                          <Text style={styles.date}>11:00 AM</Text>
                          <Icon name='ios-heart-outline' style={styles.likeIcon} />
                          <Text style={styles.likeCount}>12</Text>
                          <Icon1 name='trash'  style={styles.trashIcon} />
                      </CardItem>

                      <CardItem style={styles.cardItem} key={p} content>
                          <Text >
                            {p.post}
                          </Text>

                      </CardItem>

                  </Card>

                );


             })}


           </View>

           </Content>
           </Container>
         );

      } else {
        return (
          <Container>
          <Content theme={theme} style={{marginBottom:(Platform.OS === 'ios') ? -50 : -10}}>
          <View style={{backgroundColor: '#FFF'}}>
          <Card foregroundColor='#222' style={styles.card}>

              <CardItem style={styles.cardItem} >
                  <Text>
                      There are no posts right now..
                  </Text>
              </CardItem>
          </Card>


          </View>

          </Content>
          </Container>
        );
    }
    return null;

    }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(TabOne);