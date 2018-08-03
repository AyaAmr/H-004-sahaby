import React, {Component} from 'react';
import axios from 'axios';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image } from 'react-native';
import { FONT_WEIGHT, Header, NativePicker } from '../components';

class LoadingRequest extends Header {

  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      gender_error: '',
      comments: '',
      step: 1,
      submit: false,
    }
  }
  render() {
    <View>
      <Image 
        style={{width: '100%', height: '100%'}} 
        source={require('../assets/images/request_background.png')}  
      />
      <View style={{ alignItems: 'center', justifyContent: 'center', left: 0, right: 0, bottom: 0, top: 0, position: 'absolute' }}>
        <Image 
          style={{ width: 62, height: 60, marginBottom: 30}}
          source={require('../assets/images/logo-white.png')}
        />
        <Text style={{ color: '#fff', fontFamily: 'arimo', fontSize: 15, marginBottom: 200 }}> Currently looking for a sahaby... </Text>
        <TouchableOpacity
        onPress={ () => {
          // call the cancel request endpoint
          this.props.cancelRequest();
        }}>
          <Text style={{ textDecorationLine: 'underline', color: '#4a4a4a', fontFamily: 'arimo', fontSize: 13}}> cancel request </Text>
        </TouchableOpacity>
      </View>
    </View>
  }
}
export { LoadingRequest }