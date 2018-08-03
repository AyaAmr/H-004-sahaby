import React, {Component} from 'react';
import Expo, { Facebook, Notifications } from 'expo';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image, FlatList } from 'react-native';
import { FONT_WEIGHT, HeaderVolunteer } from '../components';

class HomeVolunteer extends HeaderVolunteer {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    this.setState({ token: token});
    return axios({
      method: 'GET',
      url: 'https://staging.robustastudio.com/H-004-sahaby/sahaby-backend/public/api/volunteers/1/requests',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiTWF5YXIgTS4gRWxNb2hyIiwiZmJfaWQiOiIxMDE1NjQ2NTQ5MjA5NDM1NiIsInVwZGF0ZWRfYXQiOiIyMDE4LTA4LTAzIDAzOjEzOjA0IiwiY3JlYXRlZF9hdCI6IjIwMTgtMDgtMDMgMDM6MTM6MDQiLCJpZCI6Mn0.PBnhlcItzhP3rtqSSo_gNo1GxEuqdTxazU7iPX1lkJo',
      },
    }).then((response) => {
      this.setState({ loading: false });
      const { data } = response.data;
      this.setState({ volunteerRequests: data.volunteerRequests });
    }).catch(err => {
      this.setState({ loading: false });
    })
  }
  getImage = (need) => {
    switch(need) {
      case 1: 
        return (
          <Image style={{ width: 32, height: 32 }}
          source={require('../assets/images/w-active.png')}/>
        );
      case 2: 
        return (
          <Image style={{ width: 42, height: 32 }}
          source={require('../assets/images/eye-actove.png')}/>
        );
      case 3: 
        return (
          <Image style={{ width: 22, height: 32 }}
          source={require('../assets/images/ear-active.png')}/>
        );
      case 4: 
        return (
          <Image style={{width: 41, height: 9}}
          source={require('../assets/images/other-active.png')}/>
        );
    }
  }



  render() {
    if(this.state.loading) {
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}><ActivityIndicator/></View>);
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.volunteerRequests}
          renderItem={({ item }) => {
            return (
              <View style={{
                marginVertical: 10,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#E4E3E3',
                padding: 15,
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={{ flexDirection: 'row'}}>
                    <Image style={{ width: 60, height: 60, resizeMode: 'cover', borderRadius: 8 }}source={{ uri: item.user.image }}/>
                    <View style={{marginLeft: 15}}>
                      <Text style={{ color: '#4A4A4A',fontFamily: 'arimo', fontSize: 17, marginBottom: 10}}>{item.user.name}</Text>
                      {this.getImage(item.user.type_need_id)}
                    </View>
                  </View>
                  <View>
                    <View>
                      <Text  style={{ position: 'absolute', top: -5, right:20, color: '#4A4A4A',fontFamily: 'arimo', fontSize: 13}}>{`${item.request_since} min`}</Text>
                    </View>
                    { this.state.requestAccepted !== item.id &&
                      <TouchableOpacity
                        style={{
                          width: 75,
                          paddingVertical: 10,
                          backgroundColor: '#985830',
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: '#985830',
                          marginTop: 20,
                          alignItems: 'center'
                        }}
                        onPress={() => {
                          return axios({
                            method: 'POST',
                            url: `https://staging.robustastudio.com/H-004-sahaby/sahaby-backend/public/api//requests/${item.id}/accept`,
                            headers: {
                              'Content-Type': 'application/json',
                              Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiTWF5YXIgTS4gRWxNb2hyIiwiZmJfaWQiOiIxMDE1NjQ2NTQ5MjA5NDM1NiIsInVwZGF0ZWRfYXQiOiIyMDE4LTA4LTAzIDAzOjEzOjA0IiwiY3JlYXRlZF9hdCI6IjIwMTgtMDgtMDMgMDM6MTM6MDQiLCJpZCI6Mn0.PBnhlcItzhP3rtqSSo_gNo1GxEuqdTxazU7iPX1lkJo',
                            },
                          }).then((response) => {
                            this.setState({ requestAccepted: item.id });
                          }).catch(err => {
                            this.setState({ loading: false });
                          })
                        }}
                      >
                      <Text style={{ color: '#fff', fontSize: 13, fontFamily: 'arimo-bold'}}>Confirm</Text></TouchableOpacity>
                    }
                    { this.state.requestAccepted === item.user_id &&
                      <Text style={{ color: '#985830', fontSize: 13, fontFamily: 'arimo-bold'}}>Request Accepted</Text>
                    }
                  </View>

                </View>
              </View>
            )
          }
          }
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
    paddingHorizontal: 20,
  },
});

export { HomeVolunteer };
