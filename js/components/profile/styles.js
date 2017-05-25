
'use strict';

var React = require('react-native');
var { StyleSheet, Platform,Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
var primary = require('../../themes/variable').brandPrimary;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null
    },
    profileInfoContainer: {
        backgroundColor: "#FFFFFF",
        paddingTop: 10
    },
    profileUser: {
        alignSelf: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom:0,
        marginTop:20,
        color: "#434343"
    },
    profileUserInfo: {
        alignSelf: 'center',
        opacity: 0.8,
        fontWeight: 'bold',
        color: "#808080"
    },
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    profileInfo: {
        alignSelf: 'center',
        paddingTop: 5,
        paddingBottom: 10
    },
    linkTabs: {
        backgroundColor: '#fff'
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
    linkTabs_header: {
        padding: 15,
        alignSelf: 'center'
    },
    linkTabs_tabCounts: {
        fontSize: 22,
        fontWeight: 'bold',
        color: primary,
        alignSelf: 'center',
        paddingBottom: Platform.OS === 'android' ? 3 : 0
    },
    linkTabs_tabName: {
        color: '#444',
        fontWeight: 'bold',
        fontSize: (deviceWidth < 330) ? 13 : 15
    },
    newsImage: {
        width: 100,
        height: 120
    },
    newsContent: {
        flexDirection: 'column',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#ddd'
    },
    newsHeader: {
        color: '#444',
        fontWeight: 'bold'
    },
    newsLink: {
        color: '#666',
        fontSize: 12,
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    newsTypeView: {
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        alignSelf: 'flex-end'
    },
    newsTypeText: {
        color: '#666',
        fontSize: 12,
        fontWeight: 'bold',
        paddingBottom: 5
    }
});
