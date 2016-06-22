/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
//  http://data.nba.com/data/10s/json/cms/noseason/game/${gameDate}/${gameId}/boxscore.json

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ListView
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import TeamMap from '../Utilities/TeamMap';

class GameStatsPlayers extends React.Component {

  constructor(props){
    super(props);
    var ds1 = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    // var ds2 = new ListView.DataSource({
    //   rowHasChanged: (r1, r2) => r1 !== r2
    // });
    var ds2 = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      loaded: false,
      homePlayerStats: [],
      awayPlayerStats: [],
      allPlayers: {},
    //   awayPlayersDataSource: ds1.cloneWithRows([]),
    //   homePlayersDataSource: ds2.cloneWithRows([])
      allPlayersDataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      })
    };
  }

  componentWillMount(){
    this.getGamePlayerStats();
  }

  getGamePlayerStats(){
    var game = this.props.game;
    var date = game.date;
    var gameID = game.id;
    var url = 'http://data.nba.com/data/10s/json/cms/noseason/game/' + date + '/' + gameID + '/boxscore.json';
    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      var homePlayers = jsonResponse.sports_content.game.home.players.player;
      var awayPlayers = jsonResponse.sports_content.game.visitor.players.player;
      var allPlayers = {};
      allPlayers[game.visitor.city] = awayPlayers;
      allPlayers[game.home.city] = homePlayers;
      this.setState({
        loaded: true,
        homePlayerStats: homePlayers,
        awayPlayerStats: awayPlayers,
        allPlayers: allPlayers,
        // awayPlayersDataSource: this.state.awayPlayersDataSource.cloneWithRows(awayPlayers),
        // homePlayersDataSource: this.state.homePlayersDataSource.cloneWithRows(homePlayers)
        allPlayersDataSource: this.state.allPlayersDataSource.cloneWithRowsAndSections(allPlayers)
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render(){
      // this.props.game.vistor/home.abbreviation/nickname/team_key
    var game = this.props.game;
    // console.log(game);
    if (!this.state.loaded){
      return (
        <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
          <Image
            source={require('../Assets/Images/ring.gif')}
            style={{width: 70, height: 70}}
          />
        </View>
      )
    }
    console.log(this.state.homePlayerStats);
    return (
      <View>
        <View>

          <ListView
            dataSource={this.state.allPlayersDataSource}
            renderRow={(rowData, sectionID, rowID) =>
              <View><Text> 1 </Text></View>
            }
            renderSectionHeader={(rowData, sectionID, rowID) =>
              <View><Text> {sectionID} </Text></View>
            }
          />
        </View>

      </View>
    )
  }
}

var styles = StyleSheet.create({

});

module.exports = GameStatsPlayers;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
