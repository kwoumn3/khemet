'use strict';

import React, { Component } from 'react';
import { Image, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

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
          var firebaseRef = ApiRequest.getRef();
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
          post: this.state.newPost
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

      /*popRoute() {

        this.props.popRoute(this.props.navigation.key);
      }*/

      replaceRoute(route) {
        this.props.replaceAt('comments', { key: route }, this.props.navigation.key);
      }

    /*  pushRoute(route) {
        this.props.replaceAt('comments', { key: route}, this.props.navigation.key);
      }
*/
    render() {

      //console.log("herererer " + this.state.postList.length);
        return (
            <Container theme={theme}>

                    <Header style={styles.headerFull}>
                        <Grid style={styles.headerContainer} >
                            <Col style={styles.headerBtns} >
                                <Button transparent onPress={() => this.replaceRoute('profile')}>
                                    <Icon1 name='user' style={styles.headerIcons} />
                                </Button>
                            </Col>
                            <Col style={styles.headerBtns}>
                                <Button transparent>
                                    <Icon name='ios-chatboxes-outline' style={styles.headerIcons} />
                                </Button>
                            </Col>
                            <Col style={styles.headerBtns}>
                                <TouchableOpacity>
                                    <Image style={{width: 50, height: 50, bottom: 10}} resizeMode={Image.resizeMode.contain} source={require('../../../images/logo3.png')} />
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.headerBtns} >
                                <Button transparent>
                                    <Icon name='ios-bookmarks-outline'  style={styles.headerIcons} />
                                </Button>
                            </Col>
                            <Col style={styles.headerBtns}>
                                <Button transparent>
                                    <Icon name='ios-download-outline' style={styles.headerIcons} />
                                </Button>
                            </Col>
                        </Grid>
                    </Header>

                    <View style={styles.commentHeadbg}>

                        <Tabs tabTextColor='black'>
                            <TabOne post = {this.state.postList} isPushed = {this.state.isPostPushed} tabLabel='Top' />
                            <TabOne post = {this.state.postList} isPushed = {this.state.isPostPushed} tabLabel='Recent' />
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
