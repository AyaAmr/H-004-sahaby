import React, {Component} from 'react';
import Expo, { Facebook, Notifications } from 'expo';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image } from 'react-native';
import { FONT_WEIGHT } from '../components';
import { navigation } from 'react-navigation';
// import registerForNotifications from '../services/push_notifications';



class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      fb: false,
      loading: true,
    }
  }
  loginWithFacebook = async () => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('1310780835722582', {
      permissions: ['public_profile']
    });
    if(type === 'cancel') {
      console.log('failed');
      return;
    } 
    console.log(token);
    return axios({
      method: 'POST',
      url: 'http://e10aedd3.ngrok.io/api/auth/login_with_fb',
      data: { fb_token: token},
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      const { data } = response.data;
      AsyncStorage.multiSet([['token', data.access_token], ['user', JSON.stringify(data.user)]]).then(() => {
        this.setState({ fb: true, user: data.user }, () => {
          return response.data;
        });
      });
    }).catch((error) => {
      return error.response;
    });
  }
  componentDidMount() {
    AsyncStorage.multiGet(['token', 'user'], (err, result) => {
      if(result[0].length > 0) {
        this.setState({ user: JSON.parse(result[1][1]), fb: true });
      }
      this.setState({ loading: false });

    })
  }
  
 
  render() {
    if(this.state.loading) {
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator/></View>);
    }
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 69, height: 85}}
          source={require('../assets/images/logo.png')}
        />
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: '#985830', fontSize: 22, fontFamily: 'lateef' }} >في الحج، اطلب العون من صحابي</Text>
        </View>
        <TouchableOpacity style={{
          width: 220,
          paddingVertical: 10,
          backgroundColor: '#4267b2',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#4267b2',
          marginTop: 20,
        }}
        onPress={ () => {
          this.loginWithFacebook();
        }}>
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold'}}>Login With Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          width: 220,
          paddingVertical: 10,
          backgroundColor: '#985830',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#985830',
          marginTop: 20,
        }}
        onPress={ () => {
          this.props.navigation.navigate('LoginSecond');
        }}>
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontFamily: 'arimo'}}>Login With Phone</Text>
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

export { Login };
