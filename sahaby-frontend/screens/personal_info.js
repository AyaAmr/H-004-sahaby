import React, {Component} from 'react';
import Expo, { Facebook, Notifications } from 'expo';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image } from 'react-native';
import { FONT_WEIGHT } from '../components';
// import registerForNotifications from '../services/push_notifications';



class PersonalInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fb: false,
      loading: true,
    }
  }
  componentDidMount() {
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
          width: 180,
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
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#985830',
          marginTop: 70,
        }}
        onPress={ () => {
          this.loginWithFacebook();
        }}>
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontFamily: 'arimo'}}>CONTINUE</Text>
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
