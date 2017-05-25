'use strict';

import React, { Component } from 'react';
import { Image, View, Switch, TouchableOpacity, Platform } from 'react-native';
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

        this.onValueChange = this.onValueChange.bind(this);

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
    };

    this.constructor.childContextTypes = {
        theme: React.PropTypes.object,
       }
    }

    onValueChange(value){
      this.setState({locationSwitch: value});
    }

   resetRoute(route) {
        this.props.resetRoute(route);
    }

    replaceRoute(route) {
      this.props.replaceAt('settings', { key: route }, this.props.navigation.key);
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
                                onPress={() => alert('Icon Example Pressed')}
                              />
                              <SettingsList.Item
                                title='Email'
                                onPress={() => Alert.alert('Different Colors Example Pressed')}/>
                              <SettingsList.Item
                                title='Current Chapter'
                                onPress={() => Alert.alert('Different Colors Example Pressed')}/>
                              <SettingsList.Item
                                title='School'
                                onPress={() => Alert.alert('Different Colors Example Pressed')}/>
                              <SettingsList.Item
                                title='Occupation'
                                onPress={() => Alert.alert('Different Colors Example Pressed')}/>
                              <SettingsList.Item
                                hasNavArrow={false}
                                switchState={this.state.locationSwitch}
                                switchOnValueChange={this.onValueChange}
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
