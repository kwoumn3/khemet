
'use strict';

var React = require('react-native');
var { StyleSheet, Platform,Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
var primary = require('../../themes/variable').brandPrimary;

module.exports = StyleSheet.create({
    container: {
        width: null,
        height: null,
        flex: 1
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
    commentHeadbg: {
        backgroundColor: primary,
        flex: 1
    },
    commentHeader : {
        alignSelf: 'center',
        fontWeight: '900',
        fontSize: 20,
        marginTop: 20
    },
    channelBtn1: {
        borderWidth: 1,
        borderColor: Platform.OS === 'android' ? '#ddd' : 'rgba(255,255,255,0.5)'
    },
    card: {
        backgroundColor: '#fff',
        borderWidth: 3
    },
    cardHeader: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        height: 30,
        padding:0,
        paddingRight:15,
        paddingLeft:15,
        flexDirection:'row',
        alignItems:'center',
    },
    cardItem: {
        backgroundColor: 'transparent',
        padding: 0,
        paddingLeft:15,
        paddingRight:15,
        borderBottomWidth: 0,
        height:80,
    },
    postFont: {
      fontSize:13,
      marginTop:5,
    },
    timeIcon: {
        fontSize: 16,
        marginLeft: (deviceWidth < 330) ? 5 : 15,
        marginRight: (deviceWidth < 330) ? (Platform.OS === 'android' ? -8 : -8) : (Platform.OS === 'android' ? -20 : -20),
        color: '#666',
        marginTop: Platform.OS === 'android' ? 2 : 1
    },
    date: {
        textAlign: 'center',
        fontWeight: '300',
        fontSize: 12,
        color: '#666',
        lineHeight: 16,
        marginLeft: Platform.OS === 'android' ? 10 : 0,
        marginRight: 0,
        flex:1,
        // marginTop: Platform.OS === 'android' ? 5 : -5
    },
    likeCount: {
      textAlign: 'right',
      fontWeight: '300',
      fontSize: 12,
      color: '#666',
      lineHeight: 16,
      paddingBottom: 7,
      paddingLeft: 75,
      marginLeft: Platform.OS === 'android' ? 10 : -20,
      marginRight: 10,
    },likeCountBot: {
      fontWeight: '300',
      fontSize: 12,
      color: '#666',
    },
    likeIconBot: {
        fontSize: 16,
        lineHeight:20,
        alignSelf:'center',
        flex: 0,
    },
    likeIconTop: {
        fontSize: 16,
        marginRight: (deviceWidth < 330) ? -75 : -110,
        marginLeft: -30,
        paddingLeft: 30,
        paddingBottom: 5,
        marginTop: Platform.OS === 'android' ? 0 : 1,

    },
    trashIcon: {
      flex:0,

    }
    ,
    commentBox: {
        backgroundColor: '#EEE',
        flexDirection: 'row',
        height: 55,
        alignItems: 'center'
    },
    attachIconContainer: {
        padding: 10,
        // paddingTop: 10
    },
    attachIcon : {
        color: '#797979',
        fontSize: 27
    },
    input: {
        color: '#222'
    },
    arrowForwardIcon: {
        alignSelf: 'flex-end',
        color: primary
    },
    arrowForwardIconContainer: {
        paddingRight: 20,
        paddingTop: 5
    },
    cmtName: {
      fontSize: (deviceWidth < 330) ? 15 : 17,
      fontWeight:'bold',
      flex:1,
    }
});
