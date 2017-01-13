const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

// const primary = require('../../themes/variable').brandPrimary;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  img: {
    resizeMode: 'contain',
    width: 90,
    height: 90
  },
  signupHeader: {
      alignSelf: 'center',
      fontSize: 22,
      padding: 10,
      fontWeight: 'bold',
      marginTop: Platform.OS === 'android' ? (deviceHeight / 30) : ((deviceHeight / 30) + 10)
  },
  iosShadow: {
    flex: 1,
    width: (deviceHeight < 500) ? 80 : (deviceWidth / 4) + 12,
    resizeMode: 'contain',
    height: (deviceHeight < 500) ? 50 : (deviceHeight / 15),
    alignSelf: 'center',
    marginTop: (deviceWidth < 330) ? (deviceHeight / 15) : (deviceHeight / 6),
  },
  aShadow: {
    flex: 1,
    width: (deviceWidth / 3) + 8,
    height: (deviceHeight / 20),
    padding: 20,
    alignSelf: 'center',
    marginTop: (deviceWidth < 330) ? (deviceHeight / 15) : ((deviceHeight / 5) - 60),
  },
  inputGrp: {
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 20,
  },
  input: {
    paddingLeft: 15,
  },
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  bg: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 70,
    marginTop: (deviceHeight < 500) ? (Platform.OS === 'android' ? 20 : 0) : (Platform.OS === 'android' ? ((deviceHeight / 6) - 45) : ((deviceHeight / 6) - 10)),
  },
  loginBtn: {
    marginTop: 10,
    height: 50,
  },
  helpBtns: {
    opacity: 0.9,
    fontSize: 14,
    fontWeight: 'bold',
  },
  otherLinksContainer: {
    flexDirection: 'row',
  },
});
