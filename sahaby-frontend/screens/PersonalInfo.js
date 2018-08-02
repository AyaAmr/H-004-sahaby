import React, {Component} from 'react';
import axios from 'axios';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, Image } from 'react-native';
import { FONT_WEIGHT } from '../components';

class PersonalInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }

  submit = async () => {
      return 'Hiii';
  }

  render() {
    if(this.state.loading) {
      return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator/></View>);
    }
    return (
      <View style={styles.container}>
        <Text style={{ color: '#b5b5b5', fontSize: 26, marginTop: 50}}> Full Name </Text>
        <TextInput style={{ borderColor: 'grey', borderWidth: 1, marginBottom: 32 }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 45,
    paddingHorizontal: 20,
  },
});

export { PersonalInfo };
