import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  ListView,
  Image
} from 'react-native';

var moment = require('moment');
var PushPayload = require('./PushPayload')
export class Feed extends Component{
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds,
      showProgress: true
    };
  }
  componentDidMount(){
    this.fetchFeed();
  }
  fetchFeed(){
    require('./AuthService').getAuthInfo((err, authInfo) =>{
      var url ='https://api.github.com/users/'
            + authInfo.user.login
            + '/received_events';
            fetch(url, {
              headers: authInfo.header
            })
            .then((response)=>
            response.json())
            .then((responseData) => {
              var feedItems =
              responseData.filter((ev)=>
                ev.type == 'IssueCommentEvent');
                this.setState({
                  dataSource:this.state.dataSource.cloneWithRows(feedItems),
                  showProgress: false
                });
            })
    });
  }
  pressRow(rowData){
    this.props.navigator.push({
      title: 'Comment Event',
      component : PushPayload,
      passProps: {
        commentEvent : rowData
      }
    })
  }
  renderRow(rowData) {
    return (
      <TouchableHighlight style= {{
          flex :1,
          flexDirection: 'row'
        }}
        onPress = { () => this.pressRow(rowData)}
        underlayColor = '#ddd' >
              <View style ={{
                flex :1,
                flexDirection: 'row',
                padding: 20,
                alignItems: 'center',
                borderColor: '#D7D7D7',
                borderBottomWidth: 1
              }}>
                  <Image source={{uri: rowData.actor.avatar_url}}
                  style={{
                    height: 36,
                    width: 36,
                    borderRadius: 18
                  }} />
                  <View style={{
                      paddingLeft: 20
                  }}>
                  <Text style={{}}>
                    {moment(rowData.created_at).fromNow()}
                  </Text>
                  <Text style={{ fontSize: 12,
                      fontWeight: 'bold', }}>
                    {rowData.actor.login} commented on
                  </Text>
                  <Text style={{}}>
                  {rowData.payload.comment.issue_url.replace('https://api.github.com/repos/select2/','')}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                   at {rowData.repo.name}
                  </Text>
                  </View>
              </View>
            </TouchableHighlight>
    );
  }
  render(){
    if(this.state.showProgress){
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
        <ActivityIndicator size="large"
        animating={true} />
        </View>
      );
    }
    return (
    <View style={{
      flex: 1,
      justifyContent: 'flex-start'
    }}>
        <ListView dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}>
        </ListView>
    </View>
    )
  }
}

module.exports = Feed;
