'use strict';

import React, { Component } from 'react';
import { Image, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';

import { Container, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';

import theme from '../login/login-theme';
import styles from './styles';
import ApiRequest from '../../api/ApiRequest.js';
import {addFirstName, addLastName, addEmailAddress, addPassword, addOrganization} from '../../actions/user'


const {
  reset,
} = actions;

class SignUp extends Component {


    static propTypes = {
      reset: React.PropTypes.func,
      navigation: React.PropTypes.shape({
        key: React.PropTypes.string,
      }),
    }

    constructor(props) {
        super(props);
        this.state = {
            offset: {
              email: '',
              password: '',
              firstname: '',
              lastname: '',
              confirmPassword: '',
                x:0,
                y:0
            }
        };
        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
    }

    resetRoute(route) {
      this.props.resetRoute(route);
    }

    signupOnClick(email, password, firstname,lastname) {
      this.props.reset(this.props.navigation.key);
      this.props.addFirstName(this.state.firstname);
      this.props.addLastName(this.state.lastname);
      this.props.addEmailAddress(this.state.email);
      this.props.addPassword(this.state.password);
      ApiRequest.signup(email, password, firstname, lastname);
      var checkit = ApiRequest.getCurrentUser();
      if (checkit) {
        console.log("PASS REGISTRATION, THIS IS CURRENT USER: " + ApiRequest.getCurrentUser().email);
      } else {
        console.log("No user");
      }

    }

    render() {
        return (
            <Container style={{backgroundColor: '#88c1ae'}}>
                    <View theme={theme}>

                            <Content padder scrollEnabled={false}>
                                <Text style={styles.signupHeader}>
                                    CREATE ACCOUNT
                                </Text>
                                <View style={styles.signupContainer}>
                                    <InputGroup borderType='rounded' style={styles.inputGrp}>
                                        <Input
                                        placeholder='First Name'
                                        style={styles.input}
                                        onChangeText={firstname => this.setState({ firstname })}
                                        />
                                    </InputGroup>
                                    <InputGroup borderType='rounded' style={styles.inputGrp}>
                                        <Input
                                        placeholder='Last Name'
                                        style={styles.input}
                                        onChangeText={lastname => this.setState({ lastname })}
                                        />
                                    </InputGroup>
                                    <InputGroup borderType='rounded' style={styles.inputGrp}>
                                        <Input
                                        placeholder='Email Address'
                                        style={styles.input}
                                        onChangeText={email => this.setState({ email })}
                                        />
                                    </InputGroup>

                                    <InputGroup borderType='rounded' style={styles.inputGrp}>
                                        <Input
                                        placeholder='Password'
                                        secureTextEntry={true}
                                        style={styles.input}
                                        onChangeText={password => this.setState({ password })}
                                        />
                                    </InputGroup>
                                    <InputGroup borderType='rounded' style={styles.inputGrp}>
                                        <Input
                                        placeholder='Confirm Password'
                                        style={styles.input}
                                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                        />
                                    </InputGroup>

                                    <Button
                                        rounded transparent  block
                                        onPress={ () =>
                                          {
                                            this.signupOnClick(this.state.email, this.state.password, this.state.firstname, this.state.lastname);
                                          }
                                        }
                                        style={styles.signupBtn}
                                    >
                                        Continue
                                    </Button>

                                    <TouchableOpacity>
                                        <Text style={styles.termsText}>Terms & Conditions</Text>
                                    </TouchableOpacity>
                                </View>
                            </Content>
                      
                    </View>
            </Container>
        )
    }
}


function bindAction(dispatch) {
    return {
        addFirstName: (firstName) => dispatch(addFirstName(firstName)),
        addLastName: (lastName) => dispatch(addLastName(lastName)),
        addEmailAddress: (emailAddress) => dispatch(addEmailAddress(emailAddress)),
        addPassword: (password) => dispatch(addPassword(password)),
        reset: key => dispatch(reset([{ key: 'orgPage' }], key, 0)),
    };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  credentials: state.credentials
});

export default connect(mapStateToProps, bindAction)(SignUp);
