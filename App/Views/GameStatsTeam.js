/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
//  http://data.nba.com/data/10s/json/cms/noseason/game/${gameDate}/${gameId}/boxscore.json

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
      homeStats: [],
      awayStats: [],
      homeScores: this.props.game.home,
      awayScores: this.props.game.visitor,
      loaded: false
    }
  }

  componentWillMount(){
    this.getGameStats();
  }

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
      return <View><Text> Fetching data </Text></View>;
    }
    // var game = this.props.game;
    var h1, h2, h3, h4, hFinal, a1, a2, a3, a4, aFinal = 0;
    // console.log(game);
    console.log(this.state.awayStats);
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
    }
    aFinal = parseInt(a1) + parseInt(a2) + parseInt(a3) + parseInt(a4);
    hFinal = parseInt(h1) + parseInt(h2) + parseInt(h3) + parseInt(h4);
    return (
      <View style={styles.main}>
        <View style={styles.scoreboardHeader}>
          <Text> Q1 </Text>
          <Text> Q2 </Text>
          <Text> Q3 </Text>
          <Text> Q4 </Text>
          <Text> Final </Text>
        </View>
        <View style={styles.quarterScores}>
          <View style={styles.awayScores}>
            <Text style={{marginTop: 5}}> {this.state.awayStats.abbreviation} </Text>
            <Text style={{marginTop: 5}}> {a1} </Text>
            <Text style={{marginTop: 5}}> {a2} </Text>
            <Text style={{marginTop: 5}}> {a3} </Text>
            <Text style={{marginTop: 5}}> {a4} </Text>
            <Text style={{marginTop: 5}}> {aFinal} </Text>
          </View>
          <View style={styles.line} />
          <View style={styles.homeScores}>
            <Text style={{marginBottom: 5}}> {this.state.homeStats.abbreviation} </Text>
            <Text style={{marginBottom: 5}}> {h1} </Text>
            <Text style={{marginBottom: 5}}> {h2} </Text>
            <Text style={{marginBottom: 5}}> {h3} </Text>
            <Text style={{marginBottom: 5}}> {h4} </Text>
            <Text style={{marginBottom: 5}}> {hFinal} </Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.head}>
          <Image
            style={{height: 70, width: 70}}
            source={TeamMap[this.state.awayStats.team_key.toLowerCase()].logo}
          />
          <View style={styles.vertical} />
          <Text> Stats </Text>
          <View style={styles.vertical} />
          <Image
            style={{height: 70, width: 70}}
            source={TeamMap[this.state.homeStats.team_key.toLowerCase()].logo}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.body}>
          <View style={styles.statsColumn}>
            <Text> {this.state.awayStats.stats.points} </Text>
            <Text> {this.state.awayStats.stats.field_goals_made + '/' + this.state.awayStats.stats.field_goals_attempted + '(' + this.state.awayStats.stats.field_goals_percentage + '%)'} </Text>
            <Text> {this.state.awayStats.stats.three_pointers_made + '/' + this.state.awayStats.stats.three_pointers_attempted + '(' + this.state.awayStats.stats.three_pointers_percentage + '%)'} </Text>
            <Text> {this.state.awayStats.stats.free_throws_made + '/' + this.state.awayStats.stats.free_throws_attempted + '(' + this.state.awayStats.stats.free_throws_percentage + '%)'} </Text>
            <Text> {this.state.awayStats.stats.assists} </Text>
            <Text> {this.state.awayStats.stats.rebounds_offensive} </Text>
            <Text> {this.state.awayStats.stats.rebounds_defensive} </Text>
            <Text> {this.state.awayStats.stats.steals} </Text>
            <Text> {this.state.awayStats.stats.blocks} </Text>
            <Text> {this.state.awayStats.stats.turnovers} </Text>
            <Text> {this.state.awayStats.stats.fouls} </Text>
          </View>
          <View style={styles.statsColumn}>
            <Text> Points </Text>
            <Text> Field Goals </Text>
            <Text> 3 Pointers </Text>
            <Text> Free Throws </Text>
            <Text> Assists </Text>
            <Text> Offensive Rebounds </Text>
            <Text> Defensive Rebounds </Text>
            <Text> Steals </Text>
            <Text> Blocks </Text>
            <Text> Turnovers </Text>
            <Text> Fouls </Text>
          </View>
          <View style={styles.statsColumn}>
            <Text> {this.state.homeStats.stats.points} </Text>
            <Text> {this.state.homeStats.stats.field_goals_made + '/' + this.state.homeStats.stats.field_goals_attempted + '(' + this.state.homeStats.stats.field_goals_percentage + '%)'} </Text>
            <Text> {this.state.homeStats.stats.three_pointers_made + '/' + this.state.homeStats.stats.three_pointers_attempted + '(' + this.state.homeStats.stats.three_pointers_percentage + '%)'} </Text>
            <Text> {this.state.homeStats.stats.free_throws_made + '/' + this.state.homeStats.stats.free_throws_attempted + '(' + this.state.homeStats.stats.free_throws_percentage + '%)'} </Text>
            <Text> {this.state.homeStats.stats.assists} </Text>
            <Text> {this.state.homeStats.stats.rebounds_offensive} </Text>
            <Text> {this.state.homeStats.stats.rebounds_defensive} </Text>
            <Text> {this.state.homeStats.stats.steals} </Text>
            <Text> {this.state.homeStats.stats.blocks} </Text>
            <Text> {this.state.homeStats.stats.turnovers} </Text>
            <Text> {this.state.homeStats.stats.fouls} </Text>
          </View>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  main: {
    flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    backgroundColor: '#FCFCFC'
  },
  quarterScores: {
    flex: 0.2
  },
  scoreboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 85,
    marginRight: 30,
    marginTop: 10,
    marginBottom: -5
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // justifyContent: 'center',
    alignItems: 'center', // orignal not here <- for vertical lines
    marginLeft: 30, // orignal 10
    marginRight: 30, // orignal 10
    marginTop: 10,
    marginBottom: 10
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10
        // marginBottom: 10,
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
  awayScores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,
    marginRight: 30,
    flex: 1,
    marginTop: 10,
    marginLeft: 10
  },
  homeScores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,
    marginRight: 30,
    flex: 1,
    marginTop: 10,
    marginLeft: 10
  },
  statsColumn: {
    flexDirection: 'column',
    alignItems: 'center'
  }
});

module.exports = GameStatsTeam;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
