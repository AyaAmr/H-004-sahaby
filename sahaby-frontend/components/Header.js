import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

class Header extends Component {
  static navigationOptions = ({ navigation }) => {
    const rightButton = (<TouchableOpacity onPress = {() => {
      navigation.goBack(null);
      }}>
      <Image
        source={require('../assets/images/menu.png')}
        style={{ width: 25, height: 16 }}/>
      </TouchableOpacity>)
    return (
      {
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
          shadowRadius: 0,
          shadowColor: "transparent",
          borderBottomWidth: 0,
          backgroundColor: '#fff',
          borderBottomColor: 'transparent',
        },
        headerTitle: (
          <Image source={require('./some/mainLogo.png')}/>
        ),
        headerTintColor: '#FFFFFF',
        headerLeft: rightButton,
      });
  }
}
export { Header };