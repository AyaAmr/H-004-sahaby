import React, {Component} from 'react';
import Expo, { Facebook, Notifications } from 'expo';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image } from 'react-native';
import { FONT_WEIGHT, Header } from '../components';

class Home extends Header {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('user').then((result, err) => {
      this.setState({ user: JSON.parse(result),
      loading: false });
    });
  }

  createRequest = async () => {
      return 'Hiii';
  }

  render() {
    if(this.state.loading) {
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}><ActivityIndicator/></View>);
    }
    return (
      <View style={styles.container}>
        <Text style={{ color: '#4A4A4A', fontSize: 26}}>{`Welcome, ${this.state.user.name}`}</Text>
        {/* <Text style={{ color: '#b5b5b5', fontSize: 16, marginTop: 10, marginBottom: 88}}> 35 sahaby are available right now </Text> */}
        <View style={{ alignItems:'center', marginTop: 98 }}>
          <TouchableOpacity
          onPress={ () => {
            this.props.navigation.navigate('RequestWrapper');
          }}
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

export { Home };
