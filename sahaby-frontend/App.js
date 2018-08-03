import React, { Component } from 'react';
import Expo, { Facebook, Notifications, Font } from 'expo';
import axios from 'axios';
import { StatusBar } from 'react-native';
import { StyleSheet, View, TouchableOpacity, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { Login, LoginSecond, LoginThird, LoginThirdV, LoginFourth, Home, PersonalInfo, Request, VolunteerInfo, RequestWrapper, LoginFourthV, HomeVolunteer } from './screens';

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
      title: 'Tell us more about you',
    }),
  },
  LoginThirdV: {
    screen: LoginThirdV,
    navigationOptions: () => ({
      title: 'Tell me more about you',
    }),
  },
  LoginFourth: {
    screen: LoginFourth,
    navigationOptions: () => ({
      title: 'What do you need?',
    }),
  },
  LoginFourthV: {
    screen: LoginFourthV,
    navigationOptions: () => ({
      title: 'What can you offer?',
    }),
  },
  Home: {
    screen: Home,
  },
  VolunteerInfo: {
    screen: VolunteerInfo,
    navigationOptions: () => ({
      title: 'Your info',
    }),
  },
  PersonalInfo: {
    screen: PersonalInfo,
    navigationOptions: () => ({
      title: 'Your info',
    }),
  },
}, { initialRouteName: 'Login' });

const MainNav = createStackNavigator({
  Home: {
    screen: Home,
  },
  RequestWrapper: {
    screen: RequestWrapper,
  },
  VolunteerInfo: {
    screen: VolunteerInfo,
   
  },
  HomeVolunteer: {
    screen: HomeVolunteer,
  },
}, { initialRouteName: 'VolunteerInfo' });

export default class App extends Component {
  state = {
    fontLoaded: false,
    loggedn: false,
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
    AsyncStorage.multiGet(['token', 'volunteer'], (err, result) => {
      if(result[0].length > 0) {
        this.setState({ loggedIn: true });
      }
      if(result[1].length > 0) {
        this.setState({ volunteer: true });
      }
      this.setState({ loading: false });

    })
    if(token !== null) {
      this.setState({ loggedIn : true});
    }
  }

  render() {
    const MainNav = createStackNavigator({
      Home: {
        screen: Home,
      },
      RequestWrapper: {
        screen: RequestWrapper,
      },
      VolunteerInfo: {
        screen: VolunteerInfo,
       
      },
      HomeVolunteer: {
        screen: HomeVolunteer,
      },
    }, { initialRouteName: this.state.volunteer ? 'VolunteerInfo' : 'Home' });
    
    if(this.state.fontLoaded) {
      if(this.state.loggedIn) {
        return(<LoginNav/>);
      } else {
        return(<MainNav/>);
      }

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
