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
import { Field, reduxForm } from 'redux-form'

const {
  reset,
  pushRoute
} = actions;

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  if (!values.emailAddress) {
    errors.emailAddress = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailAddress)) {
    errors.emailAddress = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  return errors
}


const renderFirstName = ({input: {onBlur, onChange}, meta: {touched, error}}) => {
  const hasError = (touched && error !== undefined);
  const noError = (touched && !error);

  return (
    <InputGroup iconRight error borderType='rounded' style={styles.inputGrp}>
    {hasError && <Icon name='ios-close-circle' style={{color:'red'}}/>}
    {noError && <Icon name='ios-checkmark-circle' style={{color:'#00C497'}}/>}
      <Input
      placeholder = 'First Name'
      style={styles.input}
      onChangeText={onChange}
      onBlur={ val => onBlur(val) }
      />
    </InputGroup>
  )
}

const renderLastName = ({input: {onBlur, onChange}, meta: {touched, error}}) => {
  const hasError = (touched && error !== undefined);
  const noError = (touched && !error);
  return (
    <InputGroup iconRight error borderType='rounded' style={styles.inputGrp}>
    {hasError && <Icon name='ios-close-circle' style={{color:'red'}}/>}
    {noError && <Icon name='ios-checkmark-circle' style={{color:'#00C497'}}/>}
      <Input
      placeholder = 'Last Name'
      style={styles.input}
      onChangeText={onChange}
      onBlur={ val => onBlur(val) }
      />
    </InputGroup>
  )
}

const renderEmailAddress = ({input: {onBlur, onChange}, meta: {touched, error}}) => {
  const hasError = (touched && error !== undefined);
  const noError = (touched && !error);
  return (
    <InputGroup iconRight error borderType='rounded' style={styles.inputGrp}>
    {hasError && <Icon name='ios-close-circle' style={{color:'red'}}/>}
    {noError && <Icon name='ios-checkmark-circle' style={{color:'#00C497'}}/>}
      <Input
      placeholder = 'Email Address'
      style={styles.input}
      onChangeText={onChange}
      onBlur={ val => onBlur(val) }
      />
    </InputGroup>
  )
}

const renderPassword = ({input: {onBlur, onChange}, meta: {touched, error}}) => {
  const hasError = (touched && error !== undefined);
  const noError = (touched && !error);
  return (
    <InputGroup iconRight error borderType='rounded' style={styles.inputGrp}>
    {hasError && <Icon name='ios-close-circle' style={{color:'red'}}/>}
    {noError && <Icon name='ios-checkmark-circle' style={{color:'#00C497'}}/>}
      <Input
      placeholder = 'Password'
      secureTextEntry={true}
      style={styles.input}
      onChangeText={onChange}
      onBlur={ val => onBlur(val) }
      />
    </InputGroup>
  )
}

const renderConfirmPassword = ({input: {onBlur, onChange}, meta: {touched, error}}) => {
  const hasError = (touched && error !== undefined);
  const noError = (touched && !error);
  return (
    <InputGroup iconRight error borderType='rounded' style={styles.inputGrp} >
    {hasError && <Icon name='ios-close-circle' style={{color:'red'}}/>}
    {noError && <Icon name='ios-checkmark-circle' style={{color:'#00C497'}}/>}
      <Input
      placeholder = 'Confirm Password'
      secureTextEntry={true}
      style={styles.input}
      onChangeText={onChange}
      onBlur={ val => onBlur(val) }
      />
    </InputGroup>
  )
}

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

    render() {
      const {handleSubmit, touched, error} = this.props

      const onSubmit = (values, dispatch) => {
        this.props.addFirstName(values.firstName)
        this.props.addLastName(values.lastName)
        this.props.addEmailAddress(values.emailAddress)
        this.props.addPassword(values.password)
      }

      return (
          <Container>
                  <View theme={theme}>
                      <Image source={require('../../../images/BG-signUp.png')} style={styles.background} >
                          <Content padder scrollEnabled={false}>
                              <Text style={styles.signupHeader}>
                                  CREATE ACCOUNT
                              </Text>
                              <View style={styles.signupContainer}>
                                <Field name = "firstName" component = {renderFirstName} />
                                <Field name = "lastName" component = {renderLastName} />
                                <Field name = "emailAddress" component = {renderEmailAddress} />
                                <Field name = "password" component = {renderPassword} />
                                <Field name = "confirmPassword" component = {renderConfirmPassword} />
                                <Button
                                    rounded transparent  block
                                    onPress={handleSubmit(onSubmit)}
                                    style={styles.signupBtn}
                                >
                                    Continue
                                </Button>

                                <TouchableOpacity>
                                    <Text style={styles.termsText}>Terms & Conditions</Text>
                                </TouchableOpacity>
                              </View>
                          </Content>
                      </Image>
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
    };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  credentials: state.credentials
});

/*export default connect(mapStateToProps, bindAction)(SignUp);*/
SignUp = reduxForm({
  form: 'signup',
  validate,
  onSubmitSuccess: (result, dispatch, props) => {
    dispatch(pushRoute({ key: 'orgPage' }, props.navigation.key));
  }
})(SignUp);

SignUp = connect(mapStateToProps, bindAction)(SignUp);

export default SignUp
