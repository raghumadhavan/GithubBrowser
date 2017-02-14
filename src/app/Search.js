import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { AuthService } from './AuthService';
var SearchResult = require('./SearchResult');
export class Search extends Component{
  constructor (props){
    super(props);
    this.state = {

    }
  }
  render(){
    return (

      <View style = {styles.container}>
      <TextInput style = {styles.input} placeholder = "Search Query"
      onChangeText={(text) => this.setState({searchQuery: text})}>
      </TextInput>
      <TouchableHighlight style={styles.button} onPress={this.onSearchPressed.bind(this)}>
      <Text style={styles.buttonText}>Search</Text>
      </TouchableHighlight>
      </View>
    )
  }
  onSearchPressed(){
  this.props.navigator.push({
    component: SearchResult,
    title : 'Results',
    passProps : {
      searcQuery: this.state.searcQuery
    }
  });

  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 100,
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
  }
})
module.exports = Search;
