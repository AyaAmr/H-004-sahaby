import React, {Component} from 'react';
import axios from 'axios';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image } from 'react-native';
import { FONT_WEIGHT, Header, NativePicker } from '../components';
import { Request, LoadingRequest } from '../screens';

class RequestWrapper extends Header {
  state = {
    submit: false
  };
  componentDidMount() {
    AsyncStorage.getItem('request').then((result, err) => {
      if(result !== null) {
        this.setState({ submit: true });
      }
    });
  }
  render() {
    if(!this.state.submit) {
      return <Request isSubmitted = { (submit) => {
        this.setState({ submit: submit });
      }}/>
    } else {
      return <LoadingRequest
      cancelRequest = { async ()  =>  {
        const token = await AsyncStorage.getItem('token');
        return axios({
          method: 'PATCH',
          url: 'https://staging.robustastudio.com/H-004-sahaby/sahaby-backend/public/api/requests/1/cancel',
          headers: {
            Authorization: token,
          },
        }).then((response) => {
          this.setState({ submit: false });
          AsyncStorage.setItem('submit', null);
          
        }).catch((error) => {
          AsyncStorage.setItem('submit', null);
          this.setState({ submit: false });
          return error.response;
        });
      }}
      isSubmitted = { (submit) => {
        this.setState({ submit: submit });
      }}/>
    }

  }

}

export { RequestWrapper };
