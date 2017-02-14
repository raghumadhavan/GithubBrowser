import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { AuthService } from './AuthService';

var buffer = require('buffer');
export class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      showProgress: false
    }
  }
  render(){
    var errorCtrl = <View />;
    if(!this.state.success && this.state.badCredentials){
      errorCtrl = <Text style={styles.error}>
      username and password combination did not work
      </Text>;
    }
    if(!this.state.success && this.state.UnkownError){
      errorCtrl = <Text style={styles.error}>
       We experienced an unexpected issue
      </Text>;
    }
    return (

      <View style = {styles.container}>
      <Image style = {styles.logo} source = {require('../img/Octocat.png')}></Image>
      <Text style = {styles.heading}>Github browser</Text>
      <TextInput style = {styles.input} placeholder = "Github username"
      onChangeText={(text) => this.setState({username: text})}>
      </TextInput>
      <TextInput style= {styles.input} placeholder = "Github password"
      secureTextEntry = {true} onChangeText= {(text) => this.setState({password: text})}>
      </TextInput>
      <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
      <Text style={styles.buttonText}>Log in</Text>
      </TouchableHighlight>
      {errorCtrl}
      <ActivityIndicator animating={this.state.showProgress} size="large"
      style={styles.loader}/>
      </View>
    )
  }
  onLoginPressed(){
    this.setState({showProgress: true})
    var AuthService = require('./AuthService')
     AuthService.login({
      username :this.state.username,
      password : this.state.password
    }, (results) => {
      this.setState(Object.assign({
        showProgress :false
      }, results));
      if(results.success && this.props.onLogin){
        this.props.onLogin();
      }
    });


  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width:66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderColor: '#48bbec',
    borderWidth: 1
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader:{
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop :10
  }
})
