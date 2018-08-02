import React, { Component } from 'react';
import Expo, { Facebook, Notifications, Font } from 'expo';
import axios from 'axios';
import { StatusBar } from 'react-native';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { Login, LoginSecond, LoginThird, LoginFourth, Home, PersonalInfo, Request } from './screens';

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
  LoginThird: {
    screen: LoginThird,
    title: 'Tell us More About you',
    navigationOptions: () => ({
      header: null,
    }),
  },
  LoginFourth: {
    screen: LoginFourth,
    title: 'What do You need',
   
  },
  Home: {
    screen: Home,
  },
  PersonalInfo: {
    screen: PersonalInfo,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Request: {
    screen: Request,
    navigationOptions: () => ({
      header: null,
    }),
  },
}, { initialRouteName: 'Request' });

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
      'arimo-italic': require('./assets/fonts/Arimo-Italic.ttf'),
      'arimo-bold': require('./assets/fonts/Arimo-Bold.ttf'),
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
