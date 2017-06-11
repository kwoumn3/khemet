
import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Icon, View, Button } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Icon1 from 'react-native-vector-icons/FontAwesome';


import { openDrawer } from '../../actions/drawer';
import styles from './styles';

const {
  popRoute,
  replaceAt,
} = actions;

const headerLogo = require('../../../images/Header-Logo.png');

class HeaderContent extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  replaceRoute(route) {
    this.props.replaceAt(this.props.activePage, { key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <View>
        <Grid style={styles.headerContainer} >
            <Col style={styles.headerBtns}>
            <Button transparent style={styles.headerBtns} style={{marginTop:2}} onPress={() => this.replaceRoute('login')}>
                <Icon1 name='sign-out' style={styles.headerIcons} />
            </Button>
            </Col>

            <Col style={styles.headerBtns}>
                <Button transparent style={styles.headerBtns} onPress={() => this.replaceRoute('userlist')}>
                  <Icon1 name="search" style={styles.headerIcons} />
                </Button>
            </Col>
            <Col style={styles.headerBtns}>
                <TouchableOpacity onPress={() => this.replaceRoute("comments")}>
                    <Image style={{width: 50, height: 50, bottom: 10}} source={require('../../../images/logo3.png')} />
                </TouchableOpacity>
            </Col>
            <Col style={styles.headerBtns} >
                <Button transparent style={styles.headerBtns} >
                  <Icon1 name="envelope" style={styles.headerIcons} />
                </Button>
            </Col>
            <Col style={styles.headerBtns}>
            <Button transparent style={styles.headerBtns} style={{marginTop:3}} onPress={this.props.openDrawer} >
              <Icon name="ios-menu" />
            </Button>
            </Col>
        </Grid>

      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    replaceAt: (routekey, route, key) => dispatch(replaceAt(routekey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(HeaderContent);
