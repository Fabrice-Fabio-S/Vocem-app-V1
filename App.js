import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, AppRegistry} from 'react-native';
import Voice from 'react-native-voice';

class App extends Component {
  state = {
    count: 0
  }
  constructor(props) {
    super(props)
    this.state = {
       recognized: '',
       started: '',
       results: [],
   };
        
    Voice.onSpeechStart = this.onSpeechStart.bind(this)
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
    Voice.onSpeechResults = this.onSpeechResults.bind(this) 
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  }
  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }
  onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }

  onStartButtonPress(e){
    Voice.start('en-US');
  }

  onPress = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  
  async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

 render() {
  return (
    <View>
      <Text style={styles.transcript}>
          Transcript
      </Text>
      {this.state.results.map((result, index) => <Text style={styles.transcript}> {result}</Text>
      )}
      <Button style={styles.transcript}
      onPress={this._startRecognition.bind(this)}
      title="Start"></Button>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  },
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '400%',
  },
})

export default App;

//react-native unlink @react-native-voice/voice
