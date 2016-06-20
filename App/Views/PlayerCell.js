/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
// endpoints

// teamInfo: http://stats.nba.com/stats/teaminfocommon?LeagueID=00&SeasonType=Regular+Season&TeamID=${id}&season=${season} <-- could get wins/losses, stat ranking
// teamDetail: http://stats.nba.com/stats/teamplayerdashboard?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=Regular+Season&TeamID=${id}&VsConference=&VsDivision= <-- player stats for season
// teamDetailBasic: `http://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=${season}&TeamID=${id} <-- basic player info, position, number, height, weight, etc.


// http://stats.nba.com/media/players/230x185/${player.id}.png
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';

class PlayerCell extends React.Component {

  render(){
    var player = this.props.player;
    console.log(player);
    return (
      <View>
        <Text> fill with player info </Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({

});

module.exports = PlayerCell;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
