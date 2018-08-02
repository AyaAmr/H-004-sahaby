import React, {Component} from 'react';
import Expo, { Facebook, Notifications } from 'expo';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image, TextInput } from 'react-native';
import { FONT_WEIGHT, NativePicker, HeaderLogin } from '../components';
// import registerForNotifications from '../services/push_notifications';



class LoginThird extends HeaderLogin {
  
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      language: '',
      errorCountry: '',
      errorLanguage: '',
    }
  }

  componentDidMount() {

  }
  setSelectedCountry = (country) => {
    this.setState({ country });
  }
  setSelectedLanguage = (language) => {
    this.setState({ language });
  }
 
  render() {
    const languages = [
      { label: 'English', value: 0 },
      { label: 'Arabic', value: 1 },
      { label: 'French', value: 2 },
      { label: 'German', value: 3 },
      { label: 'Indian', value: 4 },
      { label: 'Japanese', value: 5 },
    ];
    const countries = [
      { label: 'Saudi Arabia', value: 0 },
      { label: 'Egypt', value: 1 },
      { label: 'Bahrain', value: 2 },
      { label: 'USA', value: 3 },
    ];

    return (
      <View style={styles.container}>
        <View style={{ position: 'absolute', bottom: 0, right: 0}}>
          <Image
            style={{ width: 300, height: 300 }}
            source={require('../assets/images/bg.png')}
          />
        </View>
        <View style={{ marginTop: 37 }}>
          <Text style={{ color: '#9B9B9B', fontSize: 14, fontFamily: 'arimo', marginBottom: 10 }} >Country</Text>
          <NativePicker
            options={countries}
            pickerStyle={{
              height: 40,
              borderColor: '#e6e6e6',
              width: 280,
              justifyContent: 'space-between',
            }}
            pickerTextStyle={{ fontSize: 16, color: '#000', fontFamily: 'arimo-italic' }}
            selectedValue={(option) => { this.setSelectedCountry(option); }}
          />
          <Text style={{ color: 'red', fontSize: 14, fontFamily: 'arimo' }} >{this.state.errorCountry}</Text>
        </View>
        <View style={{ marginTop: 35 }}>
          <Text style={{ color: '#9B9B9B', fontSize: 14, fontFamily: 'arimo', marginBottom: 10 }} >Language</Text>
          <NativePicker
            options={languages}
            pickerStyle={{
              height: 40,
              width: 280,
              justifyContent: 'space-between',
            }}
            pickerTextStyle={{ fontSize: 16, color: '#000', fontFamily: 'arimo-italic' }}
            selectedValue={(option) => { this.setSelectedLanguage(option); }}
          />
          <Text style={{ color: 'red', fontSize: 14, fontFamily: 'arimo' }} >{this.state.errorCountry}</Text>
        </View>
        <TouchableOpacity style={{
          width: 220,
          paddingVertical: 10,
          backgroundColor: '#985830',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#985830',
          marginTop: 70,
          height: 48,
        }}
        onPress={ () => {
          if(this.state.language === '') {
            this.setState({ errorLang: 'Please select a language' });
          }
          if(this.state.country === '') {
            this.setState({ errorLang: 'Please select a country' });
          }
          if (this.state.country !== '' && this.state.language !== '') {
            // Go somewhere
          }
        }}>
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontFamily: 'arimo-bold', fontSize: 13, marginTop: 5}}>GET STARTED</Text>
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

export { LoginThird };
