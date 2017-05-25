'use strict';

var React = require('react-native');
var { StyleSheet, Dimensions, Platform } = React;

var primary = require('../../themes/variable').brandPrimary;

module.exports = StyleSheet.create({
    bg: {
      backgroundColor: primary
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
