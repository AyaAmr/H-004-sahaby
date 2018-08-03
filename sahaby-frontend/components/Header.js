import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

class Header extends Component {
  static navigationOptions = ({ navigation }) => {
    const rightButton = (<TouchableOpacity onPress = {() => {
      navigation.goBack(null);
      }}>
      <Image
        source={require('../assets/images/menu.png')}
        style={{ width: 25, height: 16, marginLeft: 25, marginTop: 5 }}/>
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
          <Image source={require('../assets/images/mainLogo.png')}
            style={{ width: 44, height: 29, marginTop: 10}}/>
        ),
        headerTintColor: '#FFFFFF',
        headerLeft: rightButton,
      });
  }
}
export { Header };