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
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      loaded: false,
      homePlayerStats: [],
      awayPlayerStats: []
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
      console.log(jsonResponse);
      var homePlayers = jsonResponse.sports_content.game.home.players.player;
      var awayPlayers = jsonResponse.sports_content.game.visitor.players.player;
      this.setState({
        loaded: true,
        homePlayerStats: homePlayers,
        awayPlayerStats: awayPlayers
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
          <Text> {game.visitor.city} </Text>
        </View>
        <View>
          <Text> {game.home.city} </Text>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({

});

module.exports = GameStatsPlayers;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
