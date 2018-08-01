import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Voice from 'react-native-voice';


export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
  }
  componentDidMount() {
    getLocationAsync();
  }
  onStartButtonPress(e){
    Voice.start('en-US');
  }
  async function getLocationAsync() {
    const { Permissions } = Expo;
    const { status } = await Permissions.getAsync(Permissions.NSMicrophoneUsageDescription);
    const { status1 } = await Permissions.getAsync(Permissions.NSSpeechRecognitionUsageDescription);
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.');
    }
    if (status1 !== 'granted') {
      alert('Hey!!! You might want to enable notifications for my app, they are good.');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <TouchableOpacity onClick={ () => this.onStartButtonPress()}>Voicee</TouchableOpacity>


      </View>
    );
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
