

const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

// const primary = require('../../themes/variable').brandPrimary;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  iosShadow: {
    flex: 1,
    width: (deviceHeight < 500) ? 80 : (deviceWidth / 2) + 12,
    resizeMode: 'contain',
    height: (deviceHeight < 500) ? 80 : (deviceHeight / 10),
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
    backgroundColor: 'rgba(106,106,106,0.3)',
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
    backgroundColor: 'rgba(106,106,106,1)',
  },
  helpBtns: {
    opacity: 0.9,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,1)',
  },
  otherLinksContainer: {
    flexDirection: 'row',
  },
});
