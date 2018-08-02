import React, { Component } from 'react';
import Expo, { Facebook, Notifications, Font } from 'expo';
import axios from 'axios';
import { StatusBar } from 'react-native';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { Login, LoginSecond, Home, PersonalInfo } from './screens';


const MainNav = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: () => ({
      header: null,
    }),
  },
  LoginSecond: {
    screen: LoginSecond,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Home: {
    screen: Home,
    navigationOptions: () => ({
      header: null,
    }),
  },
  PersonalInfo: {
    screen: PersonalInfo,
    navigationOptions: () => ({
      header: null,
    }),
  },
}, { initialRouteName: 'PersonalInfo' });


export default class App extends Component {
  state = {
    fontLoaded: false,
  };
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await Font.loadAsync({
      'lateef': require('./assets/fonts/Lateef.ttf'),
      'arimo': require('./assets/fonts/Arimo.ttf'),
    });
    this.setState({ fontLoaded: true });

  }

  render() {
    if(this.state.fontLoaded) {
      return(<MainNav/>);

    } else {
      return <View></View>
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
