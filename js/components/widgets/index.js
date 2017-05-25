
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Image, View,TouchableOpacity, Platform } from 'react-native';

import {openDrawer} from '../../actions/drawer';

import {Container, Header, Content, Text, Button, Icon} from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';

import theme from '../../themes/base-theme';
import styles from './styles';

var primary = require('../../themes/variable').brandPrimary;

class Widgets extends Component {

    render() {
        return (
            <Container theme={theme}>
                <Image source={require('../../../images/glow2.png')} style={styles.container} >
                    <Header style={styles.headerFull}>
                      <HeaderContent activePage = 'widgets'/>
                    </Header>

                    <Content style={{marginBottom:(Platform.OS === 'ios') ? -50 : -10}}>
                        <View style={styles.overviewHeaderContainer}>
                            <Text style={styles.overviewHeader}>VENDOR HIGHLIGHT</Text>
                        </View>

                        <Image source={require('../../../images/nalia2.png')} style={styles.mainWidget}>
                            <Grid style={styles.mainWidgetContainer}>
                                <Col>

                                </Col>
                                <Col style={{alignItems: 'flex-end'}}>

                                </Col>
                            </Grid>

                            <Grid style={styles.weatherInfoContainer}>

                            </Grid>
                        </Image>

                        <Grid>
                            <Col>
                                <Image source={require('../../../images/nalia1.png')} style={styles.otherWidget}>
                                    <View style={styles.otherWidgetContainer}>

                                    </View>
                                </Image>
                            </Col>
                            <Col>
                                <Image source={require('../../../images/Widgets/widget3.png')} style={styles.otherWidget}>

                                </Image>
                            </Col>
                        </Grid>
                    </Content>
                </Image>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer())
    }
}

export default connect(null, bindAction)(Widgets);
