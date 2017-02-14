/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import { Login } from './src/app/Login';
var AppContainer = require('./src/app/AppContainer');
var AuthService = require('./src/app/AuthService');

var  GithubBrowser = React.createClass({
  componentDidMount(){
    AuthService.getAuthInfo((err,authInfo)=>{
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  },
  render() {
    if(this.state.checkingAuth){
      return (
        <View style={styles.container}>
        <ActivityIndicator animating={true}
        size="large" style={styles.loader}/>
        </View>
      )
    }
    if(this.state.isLoggedIn){
      return (
      <View>
      <TouchableHighlight style={styles.button} onPress={(exec)=>
        this.setState({isLoggedIn :false})}>
      <Text style={styles.buttonText}>Log out!</Text>
      </TouchableHighlight>
      <AppContainer />
      </View>
      );
    } else {
      return (
        <Login  onLogin={this.onLogin} />
      );

    }

  },
  onLogin(){
    console.log('successfully logged in can show diffrent View');
    this.setState({isLoggedIn :true});
  },
  getInitialState(){
    return {
      isLoggedIn:false,
      checkingAuth: true
    }
  }

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    height: 18,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 30,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: '#FFF',
    alignSelf: 'center'
  }
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
