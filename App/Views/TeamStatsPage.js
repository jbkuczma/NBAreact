/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
// teamInfo: http://stats.nba.com/stats/teaminfocommon?LeagueID=00&SeasonType=Regular+Season&TeamID=${id}&season=${season} <-- could get wins/losses, stat ranking
// teamDetail: http://stats.nba.com/stats/teamplayerdashboard?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=Regular+Season&TeamID=${id}&VsConference=&VsDivision= <-- player stats for season
// teamDetailBasic: `http://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=${season}&TeamID=${id} <-- basic player info, position, number, height, weight, etc.

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ListView,
  Dimensions
} from 'react-native';

import TeamMap from '../Utilities/TeamMap';
import PlayerCell from './PlayerCell';

let windowHeight = Dimensions.get('window').height;

class GameStatsTeam extends React.Component {

  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      loaded: false,
      teamStatsRecord: [],
      teamStatsLeague: [],
      playerStats: [],
      playersBasicStats: [],
      dataSource: ds.cloneWithRows([]),
    }
  }

  rankingSuffix(number){
    switch (parseInt(number)){
      case 1:
        return '1st';
        break;
      case 2:
        return '2nd';
        break;
      case 3:
        return '3rd';
        break;
      default:
        return number + 'th';
        break;
    }
  }

  componentWillMount(){
    this.getTeamStats();
    this.getPlayers();
    this.getBasicPlayerInfo();
  }

  getTeamStats(){
    var team = this.props.team;
    var teamID = TeamMap[team].id;
    var season = '2015-16'; // IMPORTANT
    var url = 'http://stats.nba.com/stats/teaminfocommon?LeagueID=00&SeasonType=Regular+Season&TeamID=' + teamID + '&season=' + season;
    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      this.setState({
        // loaded: true,
        teamStatsRecord: jsonResponse.resultSets[0].rowSet,
        teamStatsLeague: jsonResponse.resultSets[1].rowSet
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getPlayers(){
    var season = '2015-16'; // IMPORTANT
    var team = this.props.team;
    var teamID = TeamMap[team].id;
    var url = 'http://stats.nba.com/stats/teamplayerdashboard?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season=' + season + '&SeasonSegment=&SeasonType=Regular+Season&TeamID=' + teamID + '&VsConference=&VsDivision';
    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      this.setState({
        playerStats: jsonResponse.resultSets[1].rowSet,
        dataSource: this.state.dataSource.cloneWithRows(jsonResponse.resultSets[1].rowSet)
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getBasicPlayerInfo(){
    var season = '2015-16'; // IMPORTANT
    var teamID = TeamMap[this.props.team].id;
    var url = 'http://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=' + season + '&TeamID=' + teamID; // <-- basic player info, position, number, height, weight, etc.
    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      this.setState({
        playersBasicStats: jsonResponse.resultSets[0].rowSet,
        loaded: true
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
            <Text style={styles.leagueRankingsText}> Wins: {this.state.teamStatsRecord[0][8]} </Text>
            <Text style={styles.leagueRankingsText}> Losses: {this.state.teamStatsRecord[0][9]} </Text>
            <Text style={styles.leagueRankingsText}> {this.rankingSuffix(this.state.teamStatsRecord[0][11])} in the {this.state.teamStatsRecord[0][5]} </Text>
            <Text style={styles.leagueRankingsText}> {this.rankingSuffix(this.state.teamStatsRecord[0][12])} in the {this.state.teamStatsRecord[0][6]} </Text>
          </View>
        </View>
        <View style={styles.teamStatsRankings}>
          <View style={styles.rankingItem}>
            <Text style={styles.itemLabel}> PPG </Text>
            <Text style={styles.itemData}> {this.state.teamStatsLeague[0][4]} </Text>
            <Text style={styles.itemData}> ({this.rankingSuffix(this.state.teamStatsLeague[0][3])}) </Text>
          </View>
          <View style={styles.rankingItem}>
            <Text style={styles.itemLabel}> OPP PPG </Text>
            <Text style={styles.itemData}> {this.state.teamStatsLeague[0][10]} </Text>
            <Text style={styles.itemData}> ({this.rankingSuffix(this.state.teamStatsLeague[0][9])}) </Text>
          </View>
          <View style={styles.rankingItem}>
            <Text style={styles.itemLabel}> RPG </Text>
            <Text style={styles.itemData}> {this.state.teamStatsLeague[0][6]} </Text>
            <Text style={styles.itemData}> ({this.rankingSuffix(this.state.teamStatsLeague[0][5])}) </Text>
          </View>
          <View style={styles.rankingItem}>
            <Text style={styles.itemLabel}> APG </Text>
            <Text style={styles.itemData}> {this.state.teamStatsLeague[0][8]} </Text>
            <Text style={styles.itemData}> ({this.rankingSuffix(this.state.teamStatsLeague[0][7])}) </Text>
          </View>
        </View>
        <ListView
          style={{backgroundColor: '#FCFCFC', height: windowHeight - 240, marginTop: 15}}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) =>
            <PlayerCell
              player={rowData}
              team={this.props.team}
              roster={this.state.playersBasicStats}
            //   onPress={() => this.props.goToGameStats(rowData)}
            />
          }
        />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  body: {
    // flex: 2,
    // marginTop: 62
    flexDirection: 'column',
    backgroundColor: '#FCFCFC'
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
  leagueRankingsText: {
    fontWeight: '400',
    fontSize: 12,
    color: '#FCFCFC'
  },
  secondHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  teamStatsRankings: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 65
  },
  rankingItem: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  itemLabel: {
    color: '#4a5669',
    fontSize: 12,
    fontWeight: '200'
  },
  itemData: {
    color: '#404a5a',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 2,
    position: 'relative',
    top: 2
  }
});

module.exports = GameStatsTeam;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
