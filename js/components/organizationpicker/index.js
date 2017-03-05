'use strict';

import React, { Component } from 'react';
import { Image, Platform, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';

import { Container, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";

import theme from '../login/login-theme';
import styles from './styles';
import {addOrganization} from '../../actions/user';

const alphaShield = require('../../../images/aphiashield.png');
const akaShield = require('../../../images/akashield.png');
const kappaShield = require('../../../images/kapsishield.png');
const omegaShield = require('../../../images/omegashield.png');
const deltaShield = require('../../../images/dstshield.png');
const sigmaShield = require('../../../images/pbsshield.png');
const zetaShield = require('../../../images/zphibshield.png');
const sgrhoShield = require('../../../images/sgrhoshield.png');
const iotaShield = require('../../../images/iotashield.png');

class OrganizationPicker extends Component {
  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      organization: ''
    };
    this.constructor.childContextTypes = {
      theme: React.PropTypes.object,
    };
    this.onPressAlpha = this.onPressAlpha.bind(this);
    this.onPressAKA = this.onPressAKA.bind(this);
    this.onPressKappa = this.onPressKappa.bind(this);
    this.onPressOmega = this.onPressOmega.bind(this);
    this.onPressDelta = this.onPressDelta.bind(this);
    this.onPressSigma = this.onPressSigma.bind(this);
    this.onPressZeta = this.onPressZeta.bind(this);
    this.onPressSGRho = this.onPressSGRho.bind(this);
    this.onPressIota = this.onPressIota.bind(this);
    this.dispatchOrg = this.dispatchOrg.bind(this);
  }

  replaceRoute(route) {
    this.props.replaceAt('orgPage', { key: route }, this.props.navigation.key);
  }

  dispatchOrg(organization) {
    this.props.addOrganization(organization);
  }

  render () {
    return (
      <View>
        <Text style={styles.signupHeader}>
          Select an Organization
        </Text>
        <Grid>
          <Col>
            <Row>
              <TouchableHighlight underlayColor="gray" onPress={this.onPressAlpha}>
                <Image source={alphaShield} style={styles.img}/>
              </TouchableHighlight>
            </Row>
            <Row>
              <TouchableHighlight underlayColor="gray" onPress={this.onPressOmega}>
                <Image source={omegaShield} style={styles.img}/>
              </TouchableHighlight>
            </Row>
            <Row>
              <TouchableHighlight underlayColor="gray" onPress={this.onPressZeta}>
                <Image source={zetaShield} style={styles.img}/>
              </TouchableHighlight>
            </Row>
          </Col>
          <Col>
            <Row>
              <TouchableHighlight underlayColor="gray" onPress={this.onPressAKA}>
                <Image source={akaShield} style={styles.img}/>
              </TouchableHighlight>
            </Row>
            <Row>
              <TouchableHighlight underlayColor="gray" onPress={this.onPressDelta}>
                <Image source={deltaShield} style={styles.img}/>
              </TouchableHighlight>
            </Row>
            <Row>
              <TouchableHighlight underlayColor="gray" onPress={this.onPressSGRho}>
                <Image source={sgrhoShield} style={styles.img}/>
              </TouchableHighlight>
            </Row>
          </Col>
          <Col>
            <Row>
              <TouchableHighlight underlayColor="gray" onPress={this.onPressKappa}>
                <Image source={kappaShield} style={styles.img}/>
              </TouchableHighlight>
            </Row>
            <Row>
              <TouchableHighlight underlayColor="gray" onPress={this.onPressSigma}>
                <Image source={sigmaShield} style={styles.img}/>
              </TouchableHighlight>
            </Row>
            <Row>
              <TouchableHighlight underlayColor="gray" onPress={this.onPressIota}>
                <Image source={iotaShield} style={styles.img}/>
              </TouchableHighlight>
            </Row>
          </Col>
        </Grid>
      </View>
    )
  }

  onPressAlpha() {
    this.dispatchOrg("Alpha Phi Alpha")
  }

  onPressAKA() {
    this.dispatchOrg("Alpha Kappa Alpha")
  }

  onPressKappa() {
    this.dispatchOrg("Kappa Alpha Psi")
  }

  onPressOmega() {
    this.dispatchOrg("Omega Psi Phi")
  }

  onPressDelta() {
    this.dispatchOrg("Delta Sigma Theta")
  }

  onPressSigma() {
    this.dispatchOrg("Phi Beta Sigma")
  }

  onPressZeta() {
    this.dispatchOrg("Zeta Phi Beta")
  }

  onPressSGRho() {
    this.dispatchOrg("Sigma Gamma Rho")
  }

  onPressIota() {
    this.dispatchOrg("Iota Phi Theta")
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    addOrganization: (organization) => dispatch(addOrganization(organization))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  credentials: state.credentials
});

export default connect(mapStateToProps, bindActions)(OrganizationPicker);
