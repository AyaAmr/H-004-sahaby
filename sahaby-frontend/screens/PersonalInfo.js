import React, {Component} from 'react';
import axios from 'axios';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image } from 'react-native';
import { FONT_WEIGHT } from '../components';
import { ImagePicker, Permissions, Camera } from 'expo';

class PersonalInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      name_error: '',
      gender: '',
      gender_error: '',
      photo: null,
      photo_error: '',
    }
  }
  componentDidMount() {
  }

  submit = async () => {
      return 'lool';
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ photo: result.uri });
    }
  };

  getLocationAsync = async () => {
    const { Camera, Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      return this._pickImage;
    } else {
      throw new Error('Camera permission not granted');
    }
  }

  render() {
    let { photo } = this.state;
    if(this.state.loading) {
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator/></View>);
    }
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 50 }}>
          <Text style={{ color: '#9B9B9B', fontSize: 14, fontFamily: 'arimo' }} >Full Name</Text>
          <TextInput
            style={{
              width: '100%',
              width: 280,
              height: 48,
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
          <Text style={{ marginBottom: 10, color: '#9B9B9B', fontSize: 14, fontFamily: 'arimo' }}> Your Photo</Text>
          <View style={{ height: 134, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderWidth: 1 }}>
            <Image
              style={{ marginTop: 40, marginBottom: 18, width: 32, height: 27}}
              source={require('../assets/images/camera.png')}
            />
            <Text style={{ marginBottom: 10, color: '#9B9B9B', fontSize: 14, fontFamily: 'arimo' }}> upload image</Text>
            <Button
              title=""
              onPress={this.getLocationAsync()}
            />
            {photo &&
              <photo source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
          </View>
        </View>
        <TouchableOpacity
          style={{
              height: 50,
              width: 288,
              alignItems:'center',
              justifyContent:'center',
              backgroundColor:'#985830',
              borderRadius:10
            }}
        >
        <Text style={{ color: 'white' }}> START USING SAHABY </Text>
        onPress={ () => {
          this.submit();
        }}>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 45,
    paddingHorizontal: 20,
  },
});

export { PersonalInfo };
