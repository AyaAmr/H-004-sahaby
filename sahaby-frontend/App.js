import React, { Component } from 'react';
import Expo, { Facebook, Notifications, Font } from 'expo';
import axios from 'axios';
import { StatusBar } from 'react-native';
import { StyleSheet, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { Login, LoginSecond, LoginThird, LoginFourth, Home, PersonalInfo } from './screens';

const LoginNav = createStackNavigator({
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
    
    navigationOptions: () => ({
      title: 'Tell Us more about you',
    }),
  },
  LoginFourth: {
    screen: LoginFourth,
    
    navigationOptions: () => ({
      title: 'What do you need?',
    }),
   
  },
  Home: {
    screen: Home,
  },
  PersonalInfo: {
    screen: PersonalInfo,
    navigationOptions: () => ({
      title: 'Your info',
    }),
  },
}, { initialRouteName: 'PersonalInfo' });

const MainNav = createStackNavigator({

  Home: {
    screen: Home,
  },
}, { initialRouteName: 'Home' });

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
    // AsyncStorage.multiGet(['token', 'user'], (err, result) => {
    //   if(result[0].length > 0) {
    //     this.setState({ user: JSON.parse(result[1][1]), fb: true });
    //   }
    //   this.setState({ loading: false });

    // })

  }

  render() {
    if(this.state.fontLoaded) {
      return(<LoginNav/>);

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
