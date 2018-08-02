import React, {Component} from 'react';
import Expo, { Facebook, Notifications } from 'expo';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image, TextInput } from 'react-native';
import { FONT_WEIGHT, HeaderLogin } from '../components';
// import registerForNotifications from '../services/push_notifications';



class LoginSecond extends HeaderLogin {
  
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      error: '',
    }
  }

  componentDidMount() {

  }
  
 
  render() {

    return (
      <View style={styles.container}>
        <View style={{ position: 'absolute', bottom: 0, right: 0}}>
          <Image
            style={{ width: 300, height: 300 }}
            source={require('../assets/images/bg.png')}
          />
        </View>
        <Image
          style={{ width: 69, height: 85}}
          source={require('../assets/images/logo.png')}
        />
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: '#985830', fontSize: 22, fontFamily: 'lateef' }} >في الحج، اطلب العون من صحابي</Text>
        </View>
        <View style={{ marginTop: 56 }}>
          <Text style={{ color: '#9B9B9B', fontSize: 14, fontFamily: 'arimo' }} >Phone number</Text>
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
            keyboardType = {'numeric'}
            placeholder = {'Phone number'}
            onChangeText={ (text) => {
              this.setState({ phone: text });
            }}
            value={this.state.phone}
          />
          <Text style={{ color: 'red', fontSize: 14, fontFamily: 'arimo' }} >{this.state.error}</Text>
        </View>
        <TouchableOpacity style={{
          width: 220,
          paddingVertical: 10,
          backgroundColor: '#985830',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#985830',
          marginTop: 70,
          fontFamily: 'arimo-bold',
          fontWeight: 600,
          height: 48,
        }}
        onPress={ () => {
          if(this.state.phone === '') {
            this.setState({ error: 'Please enter a phone number' });
          } else {
            // Submit Here
            {/* this.loginWithFacebook(); */}
          }
        }}>
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontFamily: 'arimo-bold', marginTop: 5}}>GET STARTED</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export { LoginSecond };
