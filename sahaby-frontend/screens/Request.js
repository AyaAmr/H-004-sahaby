import React, {Component} from 'react';
import axios from 'axios';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image } from 'react-native';
import { FONT_WEIGHT } from '../components';

class Request extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      gender_error: '',
      comments: ''
    }
  }
  componentDidMount() {
  }

  submit = async () => {
      return 'lool';
  }

  render() {
    if(this.state.loading) {
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator/></View>);
    }
    return (
      <View style={styles.container}>
        <Text style={{ color: '#000', fontSize: 18, fontFamily: 'arimo', marginTop: 50, marginBottom: 15 }}> Ask for a sahaby </Text>
        <View style={{ alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress= {() => this.setState({ gender: 'male', gender_error: ''})}
            style={{
              width: "32%",
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              borderWidth: 1,
              marginRight: 5,
              borderColor: this.state.gender === 'male' ? '#ECBC7C' : '#9B9B9B' }}>
              <Text style={{fontSize: 14, color: this.state.gender === 'male' ? '#ECBC7C' : '#9B9B9B' }}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress= {() => this.setState({ gender: 'female', gender_error: ''})}
            style={{
              width: "32%",
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              borderWidth: 1,
              marginRight: 5,
              borderColor: this.state.gender === 'female' ? '#ECBC7C' : '#9B9B9B' }}>
              <Text style={{fontSize: 14, color: this.state.gender === 'female' ? '#ECBC7C' : '#9B9B9B' }}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress= {() => this.setState({ gender: 'any', gender_error: ''})}
            style={{
              width: "32%",
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              borderWidth: 1,
              marginRight: 5,
              borderColor: this.state.gender === 'any' ? '#ECBC7C' : '#9B9B9B' }}>
              <Text style={{fontSize: 14, color: this.state.gender === 'any' ? '#ECBC7C' : '#9B9B9B' }}>Doesn't Matter</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: 'red', fontSize: 14, fontFamily: 'arimo', marginTop: 10  }} >{this.state.gender_error}</Text>
        <Text style={{ color: '#9B9B9B', fontSize: 14, fontFamily: 'arimo', marginTop: 10 }}> Comments </Text>
        <TextInput
          style={{
            height: 210,
            textAlignVertical: 'top',
            borderWidth: 1,
            borderColor: '#F1F1F1',
            paddingHorizontal: 16,
            borderRadius: 8,
            marginTop: 10,
            color: '#000',
            fontFamily: 'arimo-italic',
            fontSize: 16,
          }}
          underlineColorAndroid='rgba(0, 0, 0, 0)'
          autoCorrect={false}
          placeholder = '(Optional)'
          onChangeText={ (text) => {
            this.setState({ comments: text });
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
          if (this.state.gender === '') {
            this.setState({ gender_error: 'Please choose your prefered gender type' });
          }
        }}>
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
