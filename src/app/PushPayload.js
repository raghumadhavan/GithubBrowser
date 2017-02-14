import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ListView,
  Image
} from 'react-native';

var moment = require('moment');
export class PushPayload extends Component{
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.commentEvent.payload.comment),
      commentEvent: props.commentEvent
    };
  }
  render(){
    return (
      <View style={{
        flex:1,
        paddingTop: 80,
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
      <Image source = {{ uri:this.state.commentEvent.actor.avatar_url}}
        style = {{
          height : 120,
          width: 120,
          borderRadius: 60
        }}
        />
        <Text style={{
          paddingTop: 20,
          paddingBottom : 20,
          fontSize: 20
        }}>
        {moment(this.state.commentEvent.payload.comment.created_at).fromNow()}
        </Text>
        <Text>{this.state.commentEvent.actor.login}</Text>
        <Text style={{fontSize :15 ,
        fontWeight :'bold' }}>Commented : {'\n'}</Text>
        <Text style={{
          fontSize :12,
          justifyContent: 'center'
        }}>{'\n',this.state.commentEvent.payload.comment.body} </Text>
        <Text style={{
          fontSize :10,
          justifyContent: 'center',
          fontWeight: 'bold'
        }}>on issue {this.state.commentEvent.payload.comment.issue_url.replace('https://api.github.com/repos/select2/','')}</Text>
        <Text style={{
          fontSize :10,
          justifyContent: 'center',
          fontWeight: 'bold'
        }}>at {this.state.commentEvent.repo.name} </Text>
      </View>
    )

  }
}

module.exports = PushPayload;
