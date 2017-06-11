'use strict';

import React, { Component } from 'react';
import { Image, View, AlertIOS, Switch, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import HeaderContent from './../headerContent/';

import { Container, Header, Content, Text, Button, Icon, Thumbnail, InputGroup, Input } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import theme from '../../themes/base-theme';
import styles from './styles';
import SettingsList from 'react-native-settings-list';
import Geocoder from 'react-native-geocoder';
import ApiRequest from '../../api/ApiRequest.js';
var primary = require('../../themes/variable').brandPrimary;

const {
  reset,
  replaceAt,
} = actions;

class Settings extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    reset: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

    constructor(props) {
        super(props);

        this.onLocationChange = this.onLocationChange.bind(this);
        this.updateOccupation = this.updateOccupation.bind(this);
        this.updateSchool = this.updateSchool.bind(this);
        this.updateChapter = this.updateChapter.bind(this);
        this.updateDisplayName = this.updateDisplayName.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updateCrossYear = this.updateCrossYear.bind(this);

        this.state = {
            locationSwitch: false,
            monSwitch: true,
            tueSwitch: false,
            wedSwitch: false,
            thuSwitch: false,
            friSwitch: false,
            satSwitch: false,
            sunSwitch: false,
            Username: '',
            email: '',
            password: '',
            offset: {
               x:0,
               y:0
             }
        }

        this.firebase = ApiRequest.getBase();
        this.firebaseRef = ApiRequest.getRef();

        //takes user uid reference from firebase
        this.userRef = this.firebaseRef.child('users/'+this.firebase.auth().currentUser.uid);


    this.constructor.childContextTypes = {
        theme: React.PropTypes.object,
       }
    }

    onLocationChange(value){
      this.setState({locationSwitch: value});
      //ADD BELOW TO GETLOCATION FUNCTION
        navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = JSON.stringify(position);
          this.setState({initialPosition});
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          var userCoordinates = {
            lat: lat,
            lng: lng
          };
          Geocoder.geocodePosition(userCoordinates).then(res => {
            this.userRef.update({
                    location: res[0].locality })
          })
          .catch(err => console.log(err))
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      //eND GETLOCATION BUTTON
      if (value) {console.log("Location is Turned On");console.log(value)}
      else {console.log("Location is Turned Off");}
    }

   resetRoute(route) {
        this.props.resetRoute(route);
    }

    replaceRoute(route) {
      this.props.replaceAt('settings', { key: route }, this.props.navigation.key);
    }

    updateOccupation() {
      AlertIOS.prompt('Update Occupation',
        null,
        [{text: 'Update', onPress: (value) => this.userRef.update({
                occupation: value })}, {text: 'Cancel'}] );
    }

    updateChapter() {
      AlertIOS.prompt('Update Chapter',
        null,
        [{text: 'Update', onPress: (value) => this.userRef.update({
                chapter: value })}, {text: 'Cancel'}] );
    }

    updateCrossYear() {
      AlertIOS.prompt('Update Cross Year',
        null,
        [{text: 'Update', onPress: (value) => this.userRef.update({
                crossYear: value })}, {text: 'Cancel'}] );
    }

    updateLocation() {

    }

    updateDisplayName() {
      AlertIOS.alert('Currently Cannot Edit Display Name');
    }

    updateEmail() {
      AlertIOS.alert('Currently Cannot Edit Email');
    }

    updateSchool() {
      AlertIOS.prompt('Update School',
        null,
        [{text: 'Update', onPress: (value) => this.userRef.update({
                school: value })}, {text: 'Cancel'}] );
    }

    render() {
        return (
            <Container theme={theme} >

              <Header style={styles.headerFull}>
                  <HeaderContent activePage = 'settings'/>
              </Header>

                    <Content style={{marginBottom:(Platform.OS === 'ios') ? -50 : -10}}>
                        <View  style={styles.bg}>
                          <View style={{borderBottomWidth:1, backgroundColor:'#434343',borderColor:'#000000'}}>
                            <Text style={{alignSelf:'center',marginTop:5,marginBottom:10,fontWeight:'bold',fontSize:16}}>Settings</Text>
                          </View>
                          <View style={{flex:1, marginTop:0, backgroundColor:'#FFF'}}>
                            <SettingsList borderColor="#FFF">
                              <SettingsList.Header headerText='User Info' headerStyle={{color:'#89c2af', fontWeight:'bold'}}/>
                              <SettingsList.Item
                                itemWidth={50}
                                title='Display Name'
                                onPress={() => this.updateDisplayName()}/>
                              <SettingsList.Item
                                title='Email'
                                onPress={() => this.updateEmail()}/>
                              <SettingsList.Item
                                title='Chapter Crossed'
                                onPress={() => this.updateChapter()}/>
                              <SettingsList.Item
                                  title='Cross Year/Semester'
                                  onPress={() => this.updateCrossYear()}/>
                              <SettingsList.Item
                                title='School'
                                onPress={() => this.updateSchool()}/>
                              <SettingsList.Item
                                title='Occupation'
                                onPress={() => this.updateOccupation()}/>
                              <SettingsList.Item
                                hasNavArrow={false}
                                switchState={this.state.locationSwitch}
                                switchOnValueChange={this.onLocationChange}
                                hasSwitch={true}
                                title='Turn On Locations'/>

                            </SettingsList>
                          </View>
                        </View>
                    </Content>

            </Container>
        )
    }
}


function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        replaceAt: (routekey, route, key) => dispatch(replaceAt(routekey, route, key)),
        reset: key => dispatch(reset([{ key: 'login' }], key, 0))
    }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Settings);
