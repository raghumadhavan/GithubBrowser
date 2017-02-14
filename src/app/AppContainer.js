import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  TabBarIOS,
  NavigatorIOS,
  ActivityIndicator
} from 'react-native';
var Feed = require('./Feed');
var Search = require('./Search');
import { AuthService } from './AuthService';
export class AppContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
        selectedTab : 'feed'
    }
  }
  render(){
    return (
      <TabBarIOS style= {styles.container}>
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab=='feed'}
          icon={require('../img/inbox.png')}
          onPress={()=>this.setState({selectedTab: 'feed'})}>
          <NavigatorIOS style={{
            flex: 1,
          }}
          initialRoute = {{
            component : Feed,
            title: "Feed"
          }}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title="Search"
            selected={this.state.selectedTab=='search'}
            icon={require('../img/search.png')}
            onPress={()=>this.setState({selectedTab: 'search'})}>
            <NavigatorIOS style={{
              flex: 1,
            }}
            initialRoute = {{
              component : Search,
              title: "Search"
            }}/>
          </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}
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
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  }
});
module.exports = AppContainer;
