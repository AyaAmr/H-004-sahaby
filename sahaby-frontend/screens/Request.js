import React, {Component} from 'react';
import axios from 'axios';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image } from 'react-native';
import { FONT_WEIGHT, Header, NativePicker } from '../components';

class Request extends Header {

  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      gender_error: '',
      comments: '',
      step: 1,
      submit: false,
    }
  }

  setSelected = (country) => {
    this.setState({ step: country.value });
  }

  submit = async () => {
    if (this.state.gender === '') {
      this.setState({ gender_error: 'Please choose your prefered gender type' });
    } else {
      const body = {
        'text_notes': this.state.comments,
        'preferred_gender': this.state.gender,
        step_id: this.state.step,
      }
    const token = await AsyncStorage.getItem('token');
    return axios({
      method: 'POST',
      url: 'https://staging.robustastudio.com/H-004-sahaby/sahaby-backend/public/api/requests',
      data: body,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      AsyncStorage.setItem('request', "true");
      this.props.isSubmitted(true);
    }).catch((error) => {
      this.props.isSubmitted(true);
      this.setState({ loading: false, error: 'You have already requested another trip' });
      return error.response;
    });
  }
}

  render() {
    const steps =[
      { label: 'Tawaf Qodoum', value: 1 },
      { label: 'Yawm al tarweya', value: 2 },
      { label: 'Arafa', value: 3 },
      { label: 'Mozdalafa', value: 4 },
      { label: 'Jamarat', value: 5 },
      { label: 'Efada', value: 6 },
      { label: 'Safa and Marwa', value: 7 },
    ];
    if(this.state.loading) {
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator/></View>);
    }
    return (
      <View style={styles.container}>
        <Text style={{ color: '#4A4A4A', fontSize: 18, fontFamily: 'arimo', marginTop: 50, marginBottom: 15 }}> Ask for a sahaby </Text>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress= {() => this.setState({ gender: 1, gender_error: ''})}
            style={{
              width: "31%",
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              borderWidth: 1,
              marginRight: 5,
              borderColor: this.state.gender === 1 ? '#ECBC7C' : '#9B9B9B' }}>
              <Text style={{fontSize: 14, color: this.state.gender === 1 ? '#ECBC7C' : '#9B9B9B' }}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress= {() => this.setState({ gender: 2, gender_error: ''})}
            style={{
              width: "31%",
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              borderWidth: 1,
              marginRight: 5,
              borderColor: this.state.gender === 2 ? '#ECBC7C' : '#9B9B9B' }}>
              <Text style={{fontSize: 14, color: this.state.gender === 2 ? '#ECBC7C' : '#9B9B9B' }}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress= {() => this.setState({ gender: 3, gender_error: ''})}
            style={{
              width: "31%",
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              borderWidth: 1,
              marginRight: 5,
              borderColor: this.state.gender === 3 ? '#ECBC7C' : '#9B9B9B' }}>
              <Text style={{fontSize: 14, color: this.state.gender === 3 ? '#ECBC7C' : '#9B9B9B' }}>Doesn't Matter</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: 'red', fontSize: 14, fontFamily: 'arimo', marginTop: 10  }} >{this.state.gender_error}</Text>
        <View style={{ marginTop: 37 }}>
          <Text style={{ color: '#9B9B9B', fontSize: 14, fontFamily: 'arimo', marginBottom: 10 }} >Hajj Step</Text>
          <NativePicker
            options={steps}
            pickerStyle={{
              height: 40,
              borderColor: '#e6e6e6',
              width: 280,
              justifyContent: 'space-between',
            }}
            pickerTextStyle={{ fontSize: 16, color: '#000', fontFamily: 'arimo-italic' }}
            selectedValue={(option) => { this.setSelected(option); }}
          />
          <Text style={{ color: 'red', fontSize: 14, fontFamily: 'arimo' }} >{this.state.errorCountry}</Text>
        </View>
        <Text style={{ color: '#9B9B9B', fontSize: 14, fontFamily: 'arimo', marginTop: 10 }}> Comments </Text>
        <TextInput
          multiline={true}
          style={{
            height: 190,
            textAlignVertical: 'top',
            borderWidth: 1,
            borderColor: '#F1F1F1',
            paddingHorizontal: 16,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#985830',
            marginTop: 20,
            height: 48,
            alignItems: 'center'
          }}
          value={this.state.comments}
        />
        
        <TouchableOpacity style={{
          paddingVertical: 10,
          backgroundColor: '#985830',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#985830',
          marginTop: 20,
          height: 48,
          alignItems: 'center'
        }}
        onPress={ () => {
          this.submit();
          }
        }>
          <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontFamily: 'arimo-bold', fontSize: 13, marginTop: 5}}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});

export { Request };
