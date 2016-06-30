/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
import React from 'react';
import {
  View,
  StyleSheet,
  ListView,
  RefreshControl,
  Image,
  Text
} from 'react-native';

import GameCell from './GameCell';

import moment from 'moment';

var STORE = require('../Utilities/Store');

class ScoresPage extends React.Component {

  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      date: STORE.date,
      refreshing: false,
      db: [],
      dataSource: ds.cloneWithRows([]),
      loaded: false
    }
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount(){
    this.fetchGames();
  }

  // not sure if this is the 'proper react way' but it seems to be working
  componentDidMount(){
    setInterval( () => {
      if(this.state.date.toString() !== STORE.date){
        this.fetchGames();
      }
    }, 1000);
  }

  onRefresh(){
    this.setState({loaded: false});
    // var date = moment().format('L');
    var date = STORE.date;
    date = date.split('/');
    var month = date[0];
    var day = date[1];
    var year = date[2];
    date = year+month+day; //actual
        // date = '20160101'; //for dev
    // date = '20160619';
    // var url = 'http://data.nba.com/data/1h/json/cms/noseason/scoreboard/' + date + '/games.json';
    var url = 'http://data.nba.com/data/5s/json/cms/noseason/scoreboard/' + date + '/games.json';
    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse['sports_content']['games']['game']){
        var games = jsonResponse['sports_content']['games']['game'];
        this.setState({
          db: games,
          dataSource: this.state.dataSource.cloneWithRows(games),
          loaded: true
        });
      }
    })
    .catch((error) => {
      if(error instanceof SyntaxError){
        this.setState({
          db: [],
          loaded: true
        });
      }
    });
  }

  fetchGames(){
    // var date = moment().format('L');
    var date = STORE.date;
    date = date.split('/');
    var month = date[0];
    var day = date[1];
    var year = date[2];
    // date = year+month+day; //actual
        // date = '20160101'; //for dev
    // date = '20160619';
    // var url = 'http://data.nba.com/data/1h/json/cms/noseason/scoreboard/' + date + '/games.json';
    var url = 'http://data.nba.com/data/5s/json/cms/noseason/scoreboard/' + date + '/games.json';
    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse['sports_content']['games']['game']){
        var games = jsonResponse['sports_content']['games']['game'];
        this.setState({
          db: games,
          dataSource: this.state.dataSource.cloneWithRows(games),
          loaded: true,
          date: date
        });
      }
    })
    .catch((error) => {
      if(error instanceof SyntaxError){
        this.setState({
          db: [],
          loaded: true,
          date: date
        });
      }
    });
  }

  render() {
    if (!this.state.loaded){
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../Assets/Images/ring.gif')}
            style={{width: 70, height: 70}}
          />
        </View>
      )
    }
    if (!this.state.db.length > 0){
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Image
            source={require('../Assets/Images/nba.png')}
            style={{height: 250, width: 110}}
          />
          <Text> No games today </Text>
        </View>
      )
    }
    return (
      <View style={{flex: 1}}>
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          style={styles.listview}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) =>
            <GameCell
              game={rowData}
              onPress={() => this.props.goToGameStats(rowData)}
            />
          }
        />
      </View>
    )
  }
};

var styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 70
  },
  listview: {
    flex: 1,
    // backgroundColor: '#fefdfb',
    backgroundColor: '#FCFCFC',
    marginTop: 5
  }
});

module.exports = ScoresPage;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
