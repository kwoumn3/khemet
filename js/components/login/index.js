
import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, InputGroup, Input, Button, Icon, View } from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import ApiRequest from '../../api/ApiRequest.js';
import * as firebase from 'firebase';

import login from './login-theme';
import styles from './styles';

const {
  replaceAt,
} = actions;

const bg = require('../../../images/BG.png');
const logo = require('../../../images/Khemet-Logo.png');

class Login extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      signedUsers: []
    };
    this.loginUser = this.loginUser.bind(this);
    this.ref = ApiRequest.getRef();
    this.usersRef = ApiRequest.getRef().child('users');

    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
  }

  loginUser() {
    console.log("here");
    // try {
    //   ApiRequest.loginUser(this.state.username, this.state.password);
    //   this.replaceRoute('comments', { username: this.state.username, password: this.state.password });
    // } catch(error) {
    //   console.log("We don't go to the next page");
    // }

    ApiRequest.loginUser(this.state.username, this.state.password)
      .then(() => {
        this.replaceRoute('comments', { username: this.state.username,
                                      password: this.state.password,
                                       });
      })
      .catch((error) => {
        console.log("caught");
        alert('Please enter valid email address/password');
        //console.error(error);
      });



  }


  componentDidMount() {
    //this.listenForUsers(this.usersListRef);
  }

  //test method that grabs first user's firstname

   replaceRoute(route) {

    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }



  render() {
    return (
      <Container style={{backgroundColor: '#88c1ae'}}>
        <Content theme={login}>

            <Image source={logo} style={Platform.OS === 'android' ? styles.aShadow : styles.iosShadow} />

            <View style={styles.bg}>
              <InputGroup borderType="rounded" style={[styles.inputGrp, { borderWidth: 0, paddingLeft: 15 }]}>
                <Icon name="ios-person-outline" />
                <Input
                  placeholder="Username"
                  onChangeText={username => this.setState({ username })}
                  style={styles.input}
                />
              </InputGroup>

              <InputGroup borderType="rounded" style={[styles.inputGrp, { borderWidth: 0, paddingLeft: 15 }]}>
                <Icon name="ios-unlock-outline" />
                <Input
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  style={styles.input}
                />
              </InputGroup>

              <Button
                rounded primary block large
                style={styles.loginBtn}
                textStyle={Platform.OS === 'android' ? { marginTop: -5, fontSize: 16 } : { fontSize: 16, marginTop: -5, fontWeight: '900' }}
                onPress={() => this.loginUser()}
              >
                  Login
              </Button>

              <View style={styles.otherLinksContainer}>
                <Grid>
                  <Col>
                    <Button transparent style={{ alignSelf: 'flex-start' }}
                    onPress={() => this.replaceRoute('signup')}
                    >
                      <Text style={styles.helpBtns}>
                          Create Account
                      </Text>
                    </Button>
                  </Col>
                  <Col>
                    <Button transparent style={{ alignSelf: 'flex-end' }}>
                      <Text style={styles.helpBtns}>
                          Need Help?
                      </Text>
                    </Button>
                  </Col>
                </Grid>
              </View>
            </View>



        </Content>
      </Container>
    );
  }
}

function getFirstFirstName() {
  //return this.state.signedUsers[0].firstname;
  return "hi";
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
