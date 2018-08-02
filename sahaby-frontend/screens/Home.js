import React, {Component} from 'react';
import Expo, { Facebook, Notifications } from 'expo';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image } from 'react-native';
import { FONT_WEIGHT } from '../components';
// import registerForNotifications from '../services/push_notifications';



class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }

  createRequets = async () => {
      return 'Hiii';
  }

  render() {
    if(this.state.loading) {
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator/></View>);
    }
    return (
      <View style={styles.container}>
        <Text style={{ color: 'black', fontSize: 26, marginTop: 50}}> Welcome, Amal! </Text>
        <Text style={{ color: '#b5b5b5', fontSize: 16, marginTop: 17, marginBottom: 88}}> 35 sahaby are available right now </Text>
        <View style={{ alignItems:'center' }}>
          <TouchableOpacity
            style={{
                height: 192,
                width: 188,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#985830',
                borderRadius:100
              }}
          >
          <Image
            style={{ width: 62, height: 60}}
            source={require('../assets/images/logo-white.png')}
          />
          <Text style={{ color: 'white' }}> Ask for sahaby </Text>
          onPress={ () => {
            this.createRequest();
          }}>
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
    marginTop: 45,
    paddingHorizontal: 20,
  },
});

export { Home };
