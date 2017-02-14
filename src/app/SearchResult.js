import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  ListView,
  Image,
  StyleSheet
} from 'react-native';
class SearchResult extends Component{
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds,
      showProgress: true,
      searchQuery: props.searchQuery
    };
  }
  componentDidMount(){
    this.doSearch();
  }
  doSearch(){
    var url = 'https://api.github.com/search/repositories?q=' +
    encodeURIComponent(this.state.searchQuery);

    fetch(url)
      .then((response)=>response.json())
      .then((responseData)=>{
        this.setState({
          repositories: responseData.repositories,
          dataSource: this.state.dataSource
            .cloneWithRows(responseData.items)
        });
      })
      .finally(()=> {
        this.setState({
          showProgress: false
        });
      });
  }
  renderRow(rowData) {
    return (
              <View>
              <Text style={{
                fontSize: 20,
                fontWeight: '600'
              }}>
              {rowData.full_name}
              </Text>
              <View style ={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                marginBottom: 20
              }}>
              <View style={styles.repoCell}>
              <Image source={require('../img/inbox.png')}
              style={styles.repoCellIcon}>
              </Image>
              <Text style={styles.repoCellLable}>
              {rowData.stargazers_count}
              </Text>
            </View>
              </View>
            </View>
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
var styles = StyleSheet.create({
  repoCell: {
    width : 50,
    alignItems : 'center'
  },
  repoCellIcon: {
    width : 20,
    height: 20
  },
  repoCellLable:{
    textAlign: 'center'
  }
})

module.exports = SearchResult;
