import React, {Component} from 'react';
import axios from 'axios';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image, Dimensions } from 'react-native';
import { FONT_WEIGHT, HeaderLogin } from '../components';
import { ImagePicker, Permissions, Camera } from 'expo';

class PersonalInfo extends HeaderLogin {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      name_error: '',
      gender: '',
      gender_error: '',
      photo: null,
      photo_error: '',
      loading: false,
    }
  }
  componentDidMount() {
  }

  submit = async () => {
    if (this.state.name === '') {
      this.setState({ name_error: 'Please insert name' });
    }
    if (this.state.photo === null) {
      this.setState({ photo_error: 'Please insert photo' });
    }
    if(this.state.name !== '' && this.state.photo !== null) {
      this.setState({ loading: true });
      const source = { uri: this.state.photo.uri, type: this.state.photo.type };
      const formData = new FormData();
      Object.keys(source).forEach(key => formData.append(key, source[key]));
      const { params } = this.props.navigation.state;
      const body = { ...params, ... {
        image: formData,
        name: this.state.name,
      }};
      const token = await AsyncStorage.getItem('token');
      return axios({
        method: 'POST',
        url: 'https://staging.robustastudio.com/H-004-sahaby/sahaby-backend/public/api/users/create_profile',
        data: body,
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        const { data } = response.data;
        AsyncStorage.setItem('user', JSON.stringify(data.user)).then(() => {
          this.setState({ loading: false });
          this.props.navigation.navigate('Home');
        });
      }).catch((error) => {
        this.setState({ loading: false });
        return error.response;
      });
    }
  }

  pickImage = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
    if(status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [3, 2],
      });
      console.log(result);
      if (!result.cancelled) {
        this.setState({ photo: result });
      }
    }
  };


  // getLocationAsync = async () => {
  //   const { Camera, Permissions } = Expo;
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   if (status === 'granted') {
  //     return this._pickImage;
  //   } else {
  //     throw new Error('Camera permission not granted');
  //   }
  // }

  render() {
    let { photo } = this.state;
    if(this.state.loading) {
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator/></View>);
    }
    return (
      <View style={styles.container}>
        <View>
          <Text style={{ color: '#9B9B9B', fontSize: 14, fontFamily: 'arimo', marginLeft: 15 }} >Full Name</Text>
          <TextInput
            style={{
              width: Dimensions.get('window').width - 70,
              height: 48,
              marginLeft: 15,
              borderWidth: 1,
              borderColor: '#F1F1F1',
              paddingHorizontal: 16,
              borderRadius: 8,
              marginTop: 10,
              color: '#000',
              fontFamily: 'arimo-italic',
              fontSize: 16,
            }}
            underlineColorAndroid='rgba(0, 0, 0, 0)'
            autoCorrect={false}
            placeholder = {''}
            onChangeText={ (text) => {
              this.setState({ name: text });
            }}
            value={this.state.name}
          />
          <Text style={{ color: 'red', fontSize: 14, fontFamily: 'arimo' }} >{this.state.name_error}</Text>
        </View>
        <View style={{ marginTop: 45, marginBottom: 40 }}>
          <Text style={{ marginBottom: 10, color: '#9B9B9B', fontSize: 14, fontFamily: 'arimo', marginLeft: 15 }}> Your Photo</Text>
          <View style={{ alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => this.pickImage()}
              style={{ width: 300, height: 200, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderColor: '#9B9B9B',  borderWidth: 1 }}>
              {photo === null &&
                <View style={{alignItems: 'center'}}>
                  <Image
                    style={{ marginTop: 40, marginBottom: 18, width: 32, height: 27}}
                    source={require('../assets/images/camera.png')}
                  />
                  <Text style={{ marginBottom: 10, color: '#9B9B9B', fontSize: 14, fontFamily: 'arimo' }}> Upload image</Text>
                </View>
              }
              {photo &&
                <Image
                  source={{ uri: photo.uri }}
                  style={{ width: 300, height: 200 }} />}
            </TouchableOpacity>
            <Text style={{ color: 'red', fontSize: 14, fontFamily: 'arimo' }} >{this.state.photo_error}</Text>

          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={ () => {
              this.submit();
            }}
            style={{
              height: 50,
              width: 288,
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:'#985830',
              borderRadius:10,
            }}
          >
            {!this.state.loading &&
              <Text style={{ color: 'white', fontFamily: 'arimo-bold', }}> START USING SAHABY </Text>
            }
            {this.state.loading &&
              <ActivityIndicator/>
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 45,
    paddingHorizontal: 20,
  },
});

export { PersonalInfo };
