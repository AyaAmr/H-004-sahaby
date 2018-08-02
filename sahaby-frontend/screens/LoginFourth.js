import React, {Component} from 'react';
import Expo, { Facebook, Notifications } from 'expo';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image, TextInput } from 'react-native';
import { FONT_WEIGHT, NativePicker } from '../components';
// import registerForNotifications from '../services/push_notifications';



class LoginFourth extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
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
    

    return (
      <View style={styles.container}>
        <Text style={{ color: '#9B9B9B', fontSize: 14, fontFamily: 'arimo', marginVertical: 35, marginLeft: 15 }} >I need Assistance with</Text>
        <View style={{ alignItems: 'center'}}>
          <View style={{ flexDirection: 'row', marginBottom: 27}}>
            <TouchableOpacity
              onPress= {() => this.setState({ selected: 0})}
              style={{
                width: 140,
                height: 140,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                marginRight: 27,
                borderColor: this.state.selected === 0 ? '#ECBC7C' : '#9B9B9B' }}>
                <Image
                  style={{ width: 52, height: 52, marginBottom: 10}}
                  source={this.state.selected === 0 ? require('../assets/images/w-active.png') : require('../assets/images/w-dull.png')}
                />
                <Text style={{fontSize: 14, color: this.state.selected === 0 ? '#ECBC7C': '#9B9B9B' }}>wheelchair</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress= {() => this.setState({ selected: 1})}
              style={{
                width: 140,
                height: 140,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: this.state.selected === 1 ? '#ECBC7C' : '#9B9B9B' }}>
                <Image
                  style={{ width: 62, height: 52, marginBottom: 10}}
                  source={this.state.selected === 1 ? require('../assets/images/eye-actove.png') : require('../assets/images/eye-dull.png')}
                />
                <Text style={{fontSize: 14, color: this.state.selected ===  1? '#ECBC7C': '#9B9B9B' }}>Vision</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 27}}>
            <TouchableOpacity
              onPress= {() => this.setState({ selected: 2 })}
              style={{
                width: 140,
                height: 140,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                marginRight: 27,
                borderColor: this.state.selected === 2 ? '#ECBC7C' : '#9B9B9B' }}>
                <Image
                  style={{ width: 42, height: 52, marginBottom: 10}}
                  source={this.state.selected === 2 ? require('../assets/images/ear-active.png') : require('../assets/images/ear-dull.png')}
                />
                <Text style={{fontSize: 14, color: this.state.selected === 2 ? '#ECBC7C': '#9B9B9B' }}>Hearing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress= {() => this.setState({ selected: 3})}
              style={{
                width: 140,
                height: 140,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: this.state.selected === 3 ? '#ECBC7C' : '#9B9B9B' }}>
                <Image
                  style={{ width: 61, height: 29, marginBottom: 30}}
                  source={this.state.selected === 3 ? require('../assets/images/other-active.png') : require('../assets/images/other-dull.png')}
                />
                <Text style={{fontSize: 14, color: this.state.selected === 3 ? '#ECBC7C': '#9B9B9B' }}>Other</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'red', fontSize: 14, fontFamily: 'arimo', marginTop: 50 }} >{this.state.error}</Text>

          <TouchableOpacity style={{
            width: 220,
            paddingVertical: 10,
            backgroundColor: '#985830',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#985830',
            marginTop: 20,
            height: 48,
            alignItems: 'center'
        }}
        onPress={ () => {
          if (this.state.selected === -1) {
            this.setState({ error: 'Please Choose what you need to help' });
          }
          else {
            const number = this.state.selected + 1;
          }
        
        }}>
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontFamily: 'arimo-bold', fontSize: 13, marginTop: 5}}>FINALIZE PROFILE</Text>
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
    paddingHorizontal: 20,
  },
});

export { LoginFourth };
