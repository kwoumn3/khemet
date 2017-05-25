
const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

module.exports = StyleSheet.create({
  header: {
    width: Dimensions.get('window').width,
    paddingLeft: 15,
    paddingRight: 15,
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingTop: Platform.OS === 'android' ? 5 : 0,
  },
  headerFull: {
    backgroundColor: '#89c2af',
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20
  },
  headerContainer: {
    marginTop: (Platform.OS === 'android') ? -10 : undefined,
    marginLeft: (Platform.OS === 'android') ? -5 : undefined
  },
  headerBtns : {
      padding: 10,
      alignSelf: 'center'
  },
  headerIcons : {
      fontSize: 30,
      color: '#FFFFFF',
      paddingTop: (Platform.OS === 'android') ? 10 : undefined
  },
  headerTextIcon: {
      fontSize: 28,
      paddingTop: 10,
      marginTop: Platform.OS === 'android' ? -10 : 0
  },
  btnHeader: {
    paddingTop: 10,
  },
  imageHeader: {
    height: 25,
    width: 95,
    resizeMode: 'contain',
    marginTop: 10,
  },
});
