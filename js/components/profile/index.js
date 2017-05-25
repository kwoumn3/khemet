'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, TouchableOpacity, Platform } from 'react-native';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import { Container, Header, Content, Text, Button, Icon, Thumbnail } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import HeaderContent from './../headerContent/';
import Comments from '../comments/index.js';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import Icon1 from 'react-native-vector-icons/FontAwesome';
import theme from '../../themes/base-theme';
import styles from './styles';
import ApiRequest from '../../api/ApiRequest.js';


const {
  popRoute,
  pushRoute,
  replaceAt,
} = actions;

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = ApiRequest.getBase().storage().ref('profilePics').child(ApiRequest.getBase().auth().currentUser.uid)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}


class Profile extends Component {

    static propTypes = {
      replaceAt: React.PropTypes.func,
      popRoute: React.PropTypes.func,
      openDrawer: React.PropTypes.func,
      navigateTo: React.PropTypes.func,
      navigation: React.PropTypes.shape({
        key: React.PropTypes.string,
      }),
    }

    constructor(props) {
      super(props);

      this.state = {
          avatarSource: null,
          imgBase64: '',
          uploadURL: '',
      }

      this.firebase = ApiRequest.getBase();
      this.firebaseRef = ApiRequest.getRef();

      //takes user uid reference from firebase
      this.userRef = this.firebaseRef.child('users/'+this.firebase.auth().currentUser.uid);

      // Get a reference to the storage service, which is used to create references in your storage bucket
      //this.imagesRef = this.firebase.storage().ref().child('profilePics');



      //sets this.theUser to first name of current user
      this.userRef.on('value', (snap) => {
        this.theUserName = snap.val().firstname + " " + snap.val().lastname;
        console.log(this.theUserName);
        this.org = snap.val().organization;
        this.emailaddress = snap.val().emailaddress;
        this.filename = snap.val().filename;
      });


    }





    selectPhotoTapped() {
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };

      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled photo picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          var source, temp;
          // You can display the image using either:
          //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

          temp = response.data;

          //Or:
          if (Platform.OS === 'android') {
            source = {uri: response.uri, isStatic: true};
          } else {
            source = {uri: response.uri.replace('file://', ''), isStatic: true};
          }

          this.setState({
            avatarSource: source,
            imgBase64: temp,
          });

          uploadImage(response.uri)
          .then(url => this.setState({ uploadURL: url }))
          .catch(error => console.log("error on upload: "+error))
          // Points to 'profilePic/filename.jpg'
          // Note that you can use variables to create child values
          console.log("RESPONSE5");
          //console.log("RESPONSE3  " + response.blob);
          var filename = this.emailaddress+'.jpg';
          /*var spaceRef = this.imagesRef.child(filename);
          var uploadTask = spaceRef.putString('data:image/jpeg;photoImgBase64, '+response.data, 'data_url').then(function(snapshot) {
            console.log('Uploaded a base64 string!');
          }).catch((err) => console.log("rejected111:", err));*/

          /*// Listen for state changes, errors, and completion of the upload.
          uploadTask.on(this.firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case this.firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case this.firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
              }
            }, function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

              case 'storage/canceled':
                // User canceled the upload
                break;

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          }, function() {
            // Upload completed successfully, now we can get the download URL
            var downloadURL = uploadTask.snapshot.downloadURL;
          });*/


          this.firebaseRef.child("users").child(this.firebase.auth().currentUser.uid).update({
            photoUrl: source,
            photoImgBase64: temp,
            filename: this.firebase.auth().currentUser.uid,
          });

          /*var user = firebase.auth().currentUser;
          user.updateProfile({
            photoURL: source
          }).then(function() {
            console.log("Photo Uploaded");

            }
          , function(error) {
            console.log("Whoops");
          });*/
        }
      });
    }


    componentDidMount() {

      this.userRef = this.firebaseRef.child('users/'+this.firebase.auth().currentUser.uid);

      this.userRef.on('value', (snap) => {
        this.theUserName = snap.val().firstname + " " + snap.val().lastname;
        this.org = snap.val().organization;
        this.emailaddress = snap.val().emailaddress;
        this.filename = snap.val().filename;
      });

    }

    navigateTo(route) {
      this.props.navigateTo(route, 'home');
    }

    popRoute() {
      this.props.popRoute(this.props.navigation.key);
    }

    replaceRoute(route) {
      this.props.replaceAt('profile', { key: route }, this.props.navigation.key);
    }

    render() {
        return (
            <Container theme={theme}>

                <Header style={styles.headerFull}>
                  <HeaderContent activePage = 'profile'/>
                </Header>

                    <View style={styles.profileInfoContainer}>
                        <TouchableOpacity style={{alignSelf: 'center'}} onPress={this.selectPhotoTapped.bind(this)}>
                          { this.state.avatarSource === null ? <Thumbnail source={require('../../../images/contacts/nopic.png')} style={styles.profilePic} /> :
                            <Thumbnail source={this.state.avatarSource} style={styles.profilePic} />
                          }
                        </TouchableOpacity>
                        <View style={styles.profileInfo}>
                            <TouchableOpacity>
                                <Text style={styles.profileUser}>{this.theUserName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text note  style={styles.profileUserInfo}>{this.org}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.linkTabs}>
                        <Grid>
                            <Col>
                                <TouchableOpacity  style={styles.linkTabs_header}>
                                    <Text style={styles.linkTabs_tabCounts}>13</Text>
                                    <Text note style={styles.linkTabs_tabName}>Comments</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col>
                                <TouchableOpacity  style={styles.linkTabs_header}>
                                    <Text style={styles.linkTabs_tabCounts}>12</Text>
                                    <Text note style={styles.linkTabs_tabName}>Channels</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col>
                                <TouchableOpacity  style={styles.linkTabs_header}>
                                    <Text style={styles.linkTabs_tabCounts}>52</Text>
                                    <Text note style={styles.linkTabs_tabName}>Bookmarks</Text>
                                </TouchableOpacity>
                            </Col>
                        </Grid>
                    </View>

                    <Content style={{marginBottom:(Platform.OS === 'ios') ? -50 : -10}}>
                        <View style={{backgroundColor: '#fff'}}>
                            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.navigateTo('home')}>
                                <Image source={require('../../../images/NewsIcons/1.jpg')} style={styles.newsImage} />
                                <View style={styles.newsContent}>
                                    <Text numberOfLines={2} style={styles.newsHeader}>
                                        Lorem Ipsum is simply dummy text of the printing
                                    </Text>
                                    <Grid style={{marginTop: 25}}>
                                        <Col>
                                            <TouchableOpacity>
                                                <Text style={styles.newsLink}>CDC</Text>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col>
                                            <TouchableOpacity style={styles.newsTypeView}>
                                                <Text style={styles.newsTypeText}>ENVIRONMENT</Text>
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.navigateTo('home')}>
                                <Image source={require('../../../images/NewsIcons/3.jpg')} style={styles.newsImage} />
                                <View style={styles.newsContent}>
                                    <Text numberOfLines={2} style={styles.newsHeader}>
                                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                                    </Text>
                                    <Grid style={{marginTop: 25}}>
                                        <Col>
                                            <TouchableOpacity>
                                                <Text style={styles.newsLink}>SPACE.com</Text>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col>
                                            <TouchableOpacity style={styles.newsTypeView}>
                                                <Text style={styles.newsTypeText}>SCIENCE</Text>
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.navigateTo('home')}>
                                <Image source={require('../../../images/NewsIcons/4.jpg')} style={styles.newsImage} />
                                <View style={styles.newsContent}>
                                    <Text numberOfLines={2} style={styles.newsHeader}>It has survived not only five centuries</Text>
                                    <Grid style={{marginTop: 25}}>
                                        <Col>
                                            <TouchableOpacity>
                                                <Text style={styles.newsLink}>SKY.com</Text>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col>
                                            <TouchableOpacity style={styles.newsTypeView}>
                                                <Text style={styles.newsTypeText}>WORLD</Text>
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.navigateTo('home')}>
                                <Image source={require('../../../images/NewsIcons/10.jpg')} style={styles.newsImage} />
                                <View style={styles.newsContent}>
                                    <Text numberOfLines={2} style={styles.newsHeader}>
                                        Lorem Ipsum is simply dummy text of the printing
                                    </Text>
                                    <Grid style={{marginTop: 25}}>
                                        <Col>
                                            <TouchableOpacity>
                                                <Text style={styles.newsLink}>ANI.com</Text>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col>
                                            <TouchableOpacity style={styles.newsTypeView}>
                                                <Text style={styles.newsTypeText}>ANIMATION</Text>
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.navigateTo('home')}>
                                <Image source={require('../../../images/NewsIcons/9.jpg')} style={styles.newsImage} />
                                <View style={styles.newsContent}>
                                    <Text numberOfLines={2} style={styles.newsHeader}>
                                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                                    </Text>
                                    <Grid style={{marginTop: 25}}>
                                        <Col>
                                            <TouchableOpacity>
                                                <Text style={styles.newsLink}>STYLE.com</Text>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col>
                                            <TouchableOpacity style={styles.newsTypeView}>
                                                <Text style={styles.newsTypeText}>FASHION</Text>
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.navigateTo('home')}>
                                <Image source={require('../../../images/NewsIcons/12.jpg')} style={styles.newsImage} />
                                <View style={styles.newsContent}>
                                    <Text numberOfLines={2} style={styles.newsHeader}>It has survived not only five centuries</Text>
                                    <Grid style={{marginTop: 25}}>
                                        <Col>
                                            <TouchableOpacity>
                                                <Text style={styles.newsLink}>ART.com</Text>
                                            </TouchableOpacity>
                                        </Col>
                                        <Col>
                                            <TouchableOpacity style={styles.newsTypeView}>
                                                <Text style={styles.newsTypeText}>ART</Text>
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Content>

            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: key => dispatch(popRoute(key)),
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
        replaceAt: (routekey, route, key) => dispatch(replaceAt(routekey, route, key)),
    }
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Profile);
