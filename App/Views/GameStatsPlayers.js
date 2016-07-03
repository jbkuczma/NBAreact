/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ListView,
  Dimensions,
  Image
} from 'react-native';

import TeamMap from '../Utilities/TeamMap';
import GameStatsPlayerCell from './GameStatsPlayerCell';

let windowHeight = Dimensions.get('window').height;

class GameStatsPlayers extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      homePlayerStats: [],
      awayPlayerStats: [],
      allPlayers: {},
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
        allPlayersDataSource: this.state.allPlayersDataSource.cloneWithRowsAndSections(allPlayers)
      });
    })
    .catch((error) => {
      this.setState({
        loaded: true,
        allPlayers: [],
        allPlayersDataSource: this.state.allPlayersDataSource.cloneWithRowsAndSections([])
      });
    });
  }

  render(){
    var awayTeamColor = TeamMap[this.props.game.visitor.abbreviation.toLowerCase()].color;
    var homeTeamColor = TeamMap[this.props.game.home.abbreviation.toLowerCase()].color;
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
    if(this.state.loaded && this.state.allPlayers.length === 0){
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text> There was an error retrieving your data </Text>
        </View>
      )
    }
    return (
      <View>
        <View>
          <ListView
            style={{height: windowHeight - 112}}
            dataSource={this.state.allPlayersDataSource}
            renderRow={(rowData, sectionID, rowID) =>
              <GameStatsPlayerCell
                player={rowData}
              />
            }
            renderSectionHeader={(rowData, sectionID, rowID) =>
              <View style={[styles.header, TeamMap[this.props.game.visitor.abbreviation.toLowerCase()].city === sectionID ? {backgroundColor: awayTeamColor} : {backgroundColor: homeTeamColor}]}>
                <Text style={styles.headerText}> {sectionID} </Text>
              </View>
            }
          />
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#e2e2e2'
  },
  headerText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 16,
    color: '#FFFFFF'
  }
});

module.exports = GameStatsPlayers;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
