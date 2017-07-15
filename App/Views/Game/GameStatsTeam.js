/* eslint-disable semi, space-before-function-paren, space-before-blocks*/

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import TeamMap from '../../Utilities/TeamMap';

class GameStatsTeam extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      homeStats: [],
      awayStats: [],
      homeScores: this.props.game.home,
      awayScores: this.props.game.visitor,
      homeRecord: '',
      awayRecord: '',
      loaded: false
    }
  }

  componentWillMount(){
    this.getGameStats();
  }

  // retrieves game stats for a specific game
  getGameStats(){
    var game = this.props.game;
    var date = game.date;
    var gameID = game.id;
    var url = 'http://data.nba.com/data/10s/json/cms/noseason/game/' + date + '/' + gameID + '/boxscore.json';
    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      var homeStats = jsonResponse.sports_content.game.home;
      var awayStats = jsonResponse.sports_content.game.visitor;
      this.setState({
        homeStats: homeStats,
        awayStats: awayStats,
        loaded: true
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render(){
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
    var h1 = 0;
    var h2 = 0;
    var h3 = 0;
    var h4 = 0;
    var hFinal = 0;
    var a1 = 0;
    var a2 = 0;
    var a3 = 0;
    var a4 = 0;
    var aFinal = 0;
    if (this.state.awayScores.linescores && this.state.homeScores.linescores){
      switch (this.state.awayScores.linescores.period.length){
        case 1:
          a1 = this.state.awayScores.linescores.period[0].score;
          break;
        case 2:
          a1 = this.state.awayScores.linescores.period[0].score;
          a2 = this.state.awayScores.linescores.period[1].score;
          break;
        case 3:
          a1 = this.state.awayScores.linescores.period[0].score;
          a2 = this.state.awayScores.linescores.period[1].score;
          a3 = this.state.awayScores.linescores.period[2].score;
          break;
        case 4:
          a1 = this.state.awayScores.linescores.period[0].score;
          a2 = this.state.awayScores.linescores.period[1].score;
          a3 = this.state.awayScores.linescores.period[2].score;
          a4 = this.state.awayScores.linescores.period[3].score;
          break;
        default:
          a1 = 0;
          a2 = 0;
          a3 = 0;
          a4 = 0;
          break;
      }
      switch (this.state.homeScores.linescores.period.length){
        case 1:
          h1 = this.state.homeScores.linescores.period[0].score;
          break;
        case 2:
          h1 = this.state.homeScores.linescores.period[0].score;
          h2 = this.state.homeScores.linescores.period[1].score;
          break;
        case 3:
          h1 = this.state.homeScores.linescores.period[0].score;
          h2 = this.state.homeScores.linescores.period[1].score;
          h3 = this.state.homeScores.linescores.period[2].score;
          break;
        case 4:
          h1 = this.state.homeScores.linescores.period[0].score;
          h2 = this.state.homeScores.linescores.period[1].score;
          h3 = this.state.homeScores.linescores.period[2].score;
          h4 = this.state.homeScores.linescores.period[3].score;
          break;
        default:
          h1 = 0;
          h2 = 0;
          h3 = 0;
          h4 = 0;
          break;
      }
    }
    aFinal = parseInt(a1) + parseInt(a2) + parseInt(a3) + parseInt(a4);
    hFinal = parseInt(h1) + parseInt(h2) + parseInt(h3) + parseInt(h4);
    return (
      <View style={styles.main}>
        <View style={styles.scoreHead}>
          <View style={styles.scoreboardHeader}>
            <View style={styles.scoreboardHeaderLabel}>
              <Text />
            </View>
            <View style={styles.scoreboardHeaderLabel}>
              <Text> Q1 </Text>
            </View>
            <View style={styles.scoreboardHeaderLabel}>
              <Text> Q2 </Text>
            </View>
            <View style={styles.scoreboardHeaderLabel}>
              <Text> Q3 </Text>
            </View>
            <View style={styles.scoreboardHeaderLabel}>
              <Text> Q4 </Text>
            </View>
            <View style={styles.scoreboardHeaderLabel}>
              <Text> Final </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.quarterScores}>
            <View style={styles.teamScores}>
              <View style={styles.teamQuarterCell}>
                <Text> {this.state.awayStats.abbreviation} </Text>
              </View>
              <View style={styles.teamQuarterCell}>
                <Text> {a1} </Text>
              </View>
              <View style={styles.teamQuarterCell}>
                <Text> {a2} </Text>
              </View>
              <View style={styles.teamQuarterCell}>
                <Text> {a3} </Text>
              </View>
              <View style={styles.teamQuarterCell}>
                <Text> {a4} </Text>
              </View>
              <View style={styles.teamQuarterCellEnd}>
                <Text> {aFinal} </Text>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.teamScores}>
              <View style={styles.teamQuarterCell}>
                <Text> {this.state.homeStats.abbreviation} </Text>
              </View>
              <View style={styles.teamQuarterCell}>
                <Text> {h1} </Text>
              </View>
              <View style={styles.teamQuarterCell}>
                <Text> {h2} </Text>
              </View>
              <View style={styles.teamQuarterCell}>
                <Text> {h3} </Text>
              </View>
              <View style={styles.teamQuarterCell}>
                <Text> {h4} </Text>
              </View>
              <View style={styles.teamQuarterCellEnd}>
                <Text> {hFinal} </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.head}>
          <TouchableHighlight onPress={() => Actions.TeamStats({team: this.state.awayStats.abbreviation.toLowerCase()})} underlayColor='#FFFFFF'>
            <Image
              style={styles.logo}
              source={TeamMap[this.state.awayStats.team_key.toLowerCase()].logo}
            />
          </TouchableHighlight>
          <View style={styles.vertical} />
          <Text> Stats </Text>
          <View style={styles.vertical} />
          <TouchableHighlight onPress={() => Actions.TeamStats({team: this.state.homeStats.abbreviation.toLowerCase()})} underlayColor='#FFFFFF'>
            <Image
              style={styles.logo}
              source={TeamMap[this.state.homeStats.team_key.toLowerCase()].logo}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.line} />
        <View style={styles.body}>
          <View style={styles.statsColumn}>
            <Text> {this.state.awayStats.stats.points === '' ? '0' : this.state.awayStats.stats.points} </Text>
            <Text> {this.state.awayStats.stats.field_goals_made === '' ? '-' : this.state.awayStats.stats.field_goals_made + '/' + this.state.awayStats.stats.field_goals_attempted + '(' + this.state.awayStats.stats.field_goals_percentage + '%)'} </Text>
            <Text> {this.state.awayStats.stats.three_pointers_made === '' ? '-' : this.state.awayStats.stats.three_pointers_made + '/' + this.state.awayStats.stats.three_pointers_attempted + '(' + this.state.awayStats.stats.three_pointers_percentage + '%)'} </Text>
            <Text> {this.state.awayStats.stats.free_throws_made === '' ? '-' : this.state.awayStats.stats.free_throws_made + '/' + this.state.awayStats.stats.free_throws_attempted + '(' + this.state.awayStats.stats.free_throws_percentage + '%)'} </Text>
            <Text> {this.state.awayStats.stats.assists === '' ? '0' : this.state.awayStats.stats.assists} </Text>
            <Text> {this.state.awayStats.stats.rebounds_offensive === '' ? '0' : this.state.awayStats.stats.rebounds_offensive} </Text>
            <Text> {this.state.awayStats.stats.rebounds_defensive === '' ? '0' : this.state.awayStats.stats.rebounds_defensive} </Text>
            <Text> {this.state.awayStats.stats.steals === '' ? '0' : this.state.awayStats.stats.steals} </Text>
            <Text> {this.state.awayStats.stats.blocks === '' ? '0' : this.state.awayStats.stats.blocks} </Text>
            <Text> {this.state.awayStats.stats.turnovers === '' ? '0' : this.state.awayStats.stats.turnovers} </Text>
            <Text> {this.state.awayStats.stats.fouls === '' ? '0' : this.state.awayStats.stats.fouls} </Text>
          </View>
          <View style={styles.statsColumn}>
            <Text> Points </Text>
            <Text> Field Goals </Text>
            <Text> 3 Pointers </Text>
            <Text> Free Throws </Text>
            <Text> Assists </Text>
            <Text> O. Rebounds </Text>
            <Text> D. Rebounds </Text>
            <Text> Steals </Text>
            <Text> Blocks </Text>
            <Text> Turnovers </Text>
            <Text> Fouls </Text>
          </View>
          <View style={styles.statsColumn}>
            <Text> {this.state.homeStats.stats.points === '' ? '0' : this.state.homeStats.stats.points} </Text>
            <Text> {this.state.homeStats.stats.field_goals_made === '' ? '-' : this.state.homeStats.stats.field_goals_made + '/' + this.state.homeStats.stats.field_goals_attempted + '(' + this.state.homeStats.stats.field_goals_percentage + '%)'} </Text>
            <Text> {this.state.homeStats.stats.three_pointers_made === '' ? '-' : this.state.homeStats.stats.three_pointers_made + '/' + this.state.homeStats.stats.three_pointers_attempted + '(' + this.state.homeStats.stats.three_pointers_percentage + '%)'} </Text>
            <Text> {this.state.homeStats.stats.free_throws_made === '' ? '-' : this.state.homeStats.stats.free_throws_made + '/' + this.state.homeStats.stats.free_throws_attempted + '(' + this.state.homeStats.stats.free_throws_percentage + '%)'} </Text>
            <Text> {this.state.homeStats.stats.assists === '' ? '0' : this.state.homeStats.stats.assists} </Text>
            <Text> {this.state.homeStats.stats.rebounds_offensive === '' ? '0' : this.state.homeStats.stats.rebounds_offensive} </Text>
            <Text> {this.state.homeStats.stats.rebounds_defensive === '' ? '0' : this.state.homeStats.stats.rebounds_defensive} </Text>
            <Text> {this.state.homeStats.stats.steals === '' ? '0' : this.state.homeStats.stats.steals} </Text>
            <Text> {this.state.homeStats.stats.blocks === '' ? '0' : this.state.homeStats.stats.blocks} </Text>
            <Text> {this.state.homeStats.stats.turnovers === '' ? '0' : this.state.homeStats.stats.turnovers} </Text>
            <Text> {this.state.homeStats.stats.fouls === '' ? '0' : this.state.homeStats.stats.fouls} </Text>
          </View>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FCFCFC'
  },
  quarterScores: {
    flex: 1
    // marginLeft: 15
  },
  scoreHead: {
      flex: 0.5
  },
  scoreboardHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    justifyContent: 'space-between',
    // marginLeft: 75,
    // marginRight: 15,
    marginLeft: 12,
    marginRight: 20,
    marginTop: 10,
    // marginBottom: -5,
    flex: 0.5
  },
  scoreboardHeaderLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10
  },
  logo: {
    width: 70,
    height: 70,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10
  },
  line: {
    marginLeft: 5,
    marginRight: 5,
    height: 1,
    backgroundColor: '#000'
  },
  vertical: {
    marginLeft: 15,
    marginRight: 15,
    width: 1,
    marginTop: -10,
    marginBottom: -10,
    backgroundColor: '#000'
  },
  verticalScores: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: -10,
    width: 1,
    backgroundColor: '#000'
  },
  teamScores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,
    marginRight: 30,
    flex: 1,
    // marginTop: 10,
    marginLeft: 20
  },
  teamQuarterCell: {
    borderRightWidth: 1,
    borderRightColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  teamQuarterCellEnd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statsColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  }
});

module.exports = GameStatsTeam;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
