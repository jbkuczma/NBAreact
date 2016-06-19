/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
// teamInfo: http://stats.nba.com/stats/teaminfocommon?LeagueID=00&SeasonType=Regular+Season&TeamID=${id}&season=${season} <-- could get wins/losses, stat ranking
// teamDetail: http://stats.nba.com/stats/teamplayerdashboard?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=Regular+Season&TeamID=${id}&VsConference=&VsDivision= <-- player stats for season
// teamDetailBasic: `http://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=${season}&TeamID=${id} <-- basic player info, position, number, height, weight, etc.

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';

import TeamMap from '../Utilities/TeamMap';

class GameStatsTeam extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false
    }
  }

  componentWillMount(){
    this.getTeamStats();
  }

  getTeamStats(){
    var team = this.props.team;
    var teamID = TeamMap[team].id;
    console.log(teamID);
    var season = '2015-16';
    var url = 'http://stats.nba.com/stats/teaminfocommon?LeagueID=00&SeasonType=Regular+Season&TeamID=' + teamID + '&season=' + season;
    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      console.log(jsonResponse);
      this.setState({
        loaded: true
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render(){
    var teamColor = TeamMap[this.props.team].color;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ backgroundColor: '#FCFCFC' }}>
          <Text> team stats page </Text>
         </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({

});

module.exports = GameStatsTeam;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
