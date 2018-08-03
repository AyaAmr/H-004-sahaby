import React, {Component} from 'react';
import axios from 'axios';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image } from 'react-native';
import { FONT_WEIGHT, Header, NativePicker } from '../components';
import { Request, LoadingRequest } from '../screens';
class RequestWrapper extends Header {
  componentDidMount() {
    AsyncStorage.getItem('request').then((result, err) => {
      if(result !== null) {
        this.setState({ submit: true });
      }
    });
  }
  render() {
    if(!this.state.submit) {
      return <Request/>
    } else {
      return <LoadingRequest cancelRequest = { () => {
        
        this.setState({ submit: false });
        // Cancel Request here
      }}/>
    }

  }

}

export { RequestWrapper };
