import React, {Component} from 'react';
import Expo, { Facebook, Notifications } from 'expo';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image, TextInput } from 'react-native';
import { FONT_WEIGHT, HeaderLogin } from '../components';

// import registerForNotifications from '../services/push_notifications';



class LoginSecond extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      error: '',
      loading: false,
    }
  }

  componentDidMount() {

  }
  goToNext = () => {
    this.props.navigation.navigate('LoginThird', { phone: this.state.phone });
  }
  
 
  render() {

    return (
      <View style={styles.container}>
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
        <TouchableOpacity
          loading={this.state.loading}
          style={{
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
            this.setState({ loading: true });
            return axios({
              method: 'POST',
              url: 'https://staging.robustastudio.com/H-004-sahaby/sahaby-backend/public/api/auth/user/signup',
              data: { phone_number: this.state.phone },
              headers: {
                'Content-Type': 'application/json',
              },
            }).then((response) => {
              const { data } = response.data;
              AsyncStorage.multiSet([['token', data.access_token], ['user', JSON.stringify(data.user)]]).then(() => {
                console.log(data);
                this.setState({ loading: false });
                this.goToNext();
                
              });
            }).catch((error) => {
              this.setState({ loading: false });
              return error.response;
            });
          }
        }}>
          { !this.state.loading && 
            <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontFamily: 'arimo-bold', marginTop: 5}}>GET STARTED</Text>

          }
          { this.state.loading && 
            <ActivityIndicator/>
          }
        </TouchableOpacity>
        <TouchableOpacity
          disabled={this.state.loading}
          onPress = {() => {
            AsyncStorage.setItem('volunteer', "1").then(() => {
              this.goToNext();
            });
          }}
          style={{position: 'absolute', bottom: 40, borderTopWidth: 1, left: 10, right: 10, alignItems: 'center', borderTopColor: '#F5F5F5' }}>
          <Text style={{ paddingTop: 30, color: '#9B9B9B', textDecorationLine: 'underline' }}>Volunteer Register</Text>
         
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
