import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

class HeaderLogin extends Component {
  static navigationOptions = ({ navigation }) => {
    const rightButton = (<TouchableOpacity onPress = {() => {
      navigation.goBack(null);
      }}>
      <Image
        source={require('../assets/images/back.png')}
        style={{ width: 64, height: 64 }}/>
        
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
        headerTitleStyle: {
          color: '#000',
          fontFamily: 'arimo',
          marginTop: 20,
        },
        headerTintColor: '#FFFFFF',
        headerLeft: rightButton,
      });
  }
}
export { HeaderLogin };