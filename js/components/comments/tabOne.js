'use strict';

import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';

import { Container, Header, Content, Text, Button, Icon, Tabs, Card, CardItem,Thumbnail } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';

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

      //console.log(this.trythis());

      this.posts = [];
    }

    trythis() {
      var hold = Comments.sayHi;
      //console.log("inside trythis: " + hold);
      return Comments.sayHi;
    }

          static propTypes = {
            popRoute: React.PropTypes.func,
            pushRoute: React.PropTypes.func,
            navigation: React.PropTypes.shape({
              key: React.PropTypes.string,
            }),
          }


          pushRoute(route) {
            this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
          }


    render() {
      //console.log("please be stuff here " + this.props.post);
      //if (this.props.isPushed) {
        //console.log("check it out " + typeof this.props.post);
        var posts =[]
        for (var a in this.props.post) {
          posts.push({id: this.props.post[a].id, post: this.props.post[a].text.post});
          //console.log(a, this.state.postList[a].text.post);
        }
        posts.reverse();
        if (posts != []) {
        return (
            <Container style={{backgroundColor: '#e0e0e0'}}>
            <Content theme={theme} style={{marginBottom:(Platform.OS === 'ios') ? -50 : -10}}>
            <View style={{backgroundColor: '#e0e0e0'}}>
             {posts.map(function(p) {
              //console.log("please be stuff here " + p);
             return (


                <Card foregroundColor='#222' style={styles.card} key={p.id}>
                    <CardItem style={styles.cardHeader}  header>
                        <Thumbnail source={require('../../../images/contacts/sanket.png')} style={Platform.OS === 'android' ? {borderRadius: 40} : {}} />
                        <Text style={styles.cmtName}>Gabriel</Text>
                        <Icon name='ios-time-outline'  style={styles.timeIcon} />
                        <Text style={styles.date}>May 24, 11:00 AM</Text>
                        <Icon name='ios-heart-outline' style={styles.likeIcon} />
                        <Text style={styles.date}>12</Text>
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
