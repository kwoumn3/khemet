
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, Text, Icon, List, ListItem } from 'native-base';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import navigateTo from '../../actions/sideBarNav';
import styles from './style';

const singUp = require('../../../images/BG-signUp.png');

class SideBar extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Container>
        <Image style={styles.background} >
          <Content style={styles.drawerContent}>
            <List foregroundColor={'white'} >
              <ListItem
                button iconLeft
                onPress={() => this.navigateTo('comments')}
                style={styles.links}
              >
                <Icon name="ios-grid-outline" />
                <Text style={styles.linkText} >HOME</Text>
              </ListItem>

              <ListItem
                button iconLeft
                onPress={() => this.navigateTo('settings')}
                style={styles.links}
              >
                <Icon name="ios-keypad-outline" />
                <Text style={styles.linkText}>SETTINGS</Text>
              </ListItem>

              <ListItem
                button iconLeft
                onPress={() => this.navigateTo('calendar')}
                style={styles.links}
              >
                <Icon name="ios-keypad-outline" />
                <Text style={styles.linkText}>CALENDAR</Text>
              </ListItem>

              <ListItem
                button iconLeft
                onPress={() => this.navigateTo('widgets')}
                style={styles.links}
              >
                <Icon name="ios-keypad-outline" />
                <Text style={styles.linkText}>VENDORS</Text>
              </ListItem>

              <ListItem
                button iconLeft
                onPress={() => this.navigateTo('profile')}
                style={styles.links}
              >
                <Icon name="ios-keypad-outline" />
                <Text style={styles.linkText}>PROFILE</Text>
              </ListItem>

              <ListItem
                button iconLeft
                onPress={() => this.navigateTo('login')}
                style={styles.links}
              >
                <Icon name="ios-keypad-outline" />
                <Text style={styles.linkText}>SIGN OUT</Text>
              </ListItem>
            </List>
          </Content>
        </Image>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
