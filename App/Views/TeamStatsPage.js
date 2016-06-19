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
      loaded: false,
      teamStatsRecord: [],
      teamStatsLeague: []
    }
  }

  rankingSuffix(number){
    switch(parseInt(number)){
      case 1:
        return "1st";
        break;
      case 2:
        return "2nd";
        break;
      case 3:
        return "3rd";
        break;
      default:
        return number+'th';
        break;
    }
  }

  componentWillMount(){
    this.getTeamStats();
  }

  getTeamStats(){
    var team = this.props.team;
    var teamID = TeamMap[team].id;
    var season = '2015-16';
    var url = 'http://stats.nba.com/stats/teaminfocommon?LeagueID=00&SeasonType=Regular+Season&TeamID=' + teamID + '&season=' + season;
    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      console.log(jsonResponse);
      this.setState({
        loaded: true,
        teamStatsRecord: jsonResponse.resultSets[0].rowSet,
        teamStatsLeague: jsonResponse.resultSets[1].rowSet
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render(){
    var teamColor = TeamMap[this.props.team].color;
    if (!this.state.loaded){
      return <View><Text> Fetching data </Text></View>;
    }
    console.log(this.state.teamStatsRecord);
    console.log(this.state.teamStatsLeague);
    return (
      <View style={styles.body}>
        <View style={[styles.header, {backgroundColor: TeamMap[this.state.teamStatsRecord[0][4].toLowerCase()].color}]}>
          <View style={styles.city}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#FFFFFF'}}> {this.state.teamStatsRecord[0][2]} </Text>
            <Text style={{fontWeight: '200', fontSize: 12, color: '#FFFFFF'}}> {this.state.teamStatsRecord[0][3]} </Text>
          </View>
          <View style={styles.logo}>
            <Image
              source={TeamMap[this.state.teamStatsRecord[0][4].toLowerCase()].logo}
              style={{width: 70, height: 70, alignSelf: 'flex-start'}}
            />
          </View>
          <View style={styles.rankings1}>
            <Text> Wins: {this.state.teamStatsRecord[0][8]} </Text>
            <Text> Losses: {this.state.teamStatsRecord[0][9]} </Text>
            <Text> {this.rankingSuffix(this.state.teamStatsRecord[0][12])} in the {this.state.teamStatsRecord[0][5]} </Text>
            <Text> {this.rankingSuffix(this.state.teamStatsRecord[0][11])} in the {this.state.teamStatsRecord[0][6]} </Text>
            </View>
          </View>
          <View style={styles.secondHeader}>
            <Text> PPG {this.state.teamStatsLeague[0][4]} ({this.state.teamStatsLeague[0][5]}) </Text>
            <Text> OPP PPG {this.state.teamStatsLeague[0][10]} ({this.state.teamStatsLeague[0][9]}) </Text>
            <Text> RPG {this.state.teamStatsLeague[0][6]} ({this.state.teamStatsLeague[0][5]}) </Text>
            <Text> APG {this.state.teamStatsLeague[0][8]} ({this.state.teamStatsLeague[0][7]}) </Text>
          </View>
        <View style={{flex: 1}}>
          <Text> add listview of players </Text>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  body: {
    // flex: 2,
    // marginTop: 62
    flexDirection: 'column'
  },
  header: {
      marginTop: 62,
      height: 100,
      flexDirection: 'row'
  },
  city: {
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1.5,
      marginLeft: 15
  },
  logo: {
    flex: 1,
    justifyContent: 'center'
  },
  rankings1: {
      flex: 1.5,
      justifyContent: 'center',
      marginRight: 15
  },
  secondHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

module.exports = GameStatsTeam;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
