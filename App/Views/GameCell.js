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

import TeamMap from '../Utilities/TeamMap';

class GameCell extends React.Component {

  goToGameStats(game){
    Actions.GameStats({game: game});
  }

  render(){
    var game = this.props.game;
    var homeTeam = game.home;
    var awayTeam = game.visitor;
    /* will cause the number of games to be inconsistent with the number of game cells
       displayed, but the game cells that aren't displayed are for games with
       teams that aren't in the NBA. Only seems to be an off-season/minor league (D-Team?)
       issue.
    */
    if (!TeamMap[awayTeam.abbreviation.toLowerCase()] || !TeamMap[homeTeam.abbreviation.toLowerCase()]){
        return null;
    }
    return (
      <View>
        <TouchableHighlight style={{
          backgroundColor: TeamMap[homeTeam.abbreviation.toLowerCase()].color,
          marginBottom: 10,
          marginRight: 30,
          marginLeft: 30,
          overflow: 'hidden'
        }}
          onPress={this.goToGameStats.bind(this, game)}
          underlayColor='#FFFFFF'
        >
          <View style={styles.container}>
            <View style={styles.teamInfo}>
              <Image
                style={styles.logo}
                source={TeamMap[awayTeam.abbreviation.toLowerCase()].logo}
              />
              <Text style={styles.teamText}> {awayTeam.city} </Text>
              <Text style={styles.teamText2}> {awayTeam.nickname} </Text>
            </View>
            <View style={styles.gameInfo}>
              <Text style={styles.gameInfoText}> {game.period_time.period_status} </Text>
              <Text style={{color: '#FFFFFF', fontSize: 12, marginBottom: -15}}> {(game.period_time.game_clock === '' || game.period_time.period_status === 'Halftime') ? '' : game.period_time.game_clock} </Text>
              <View style={styles.gameScoresView}>
                <Text style={styles.gameScores}> {awayTeam.score} </Text>
                <View style={styles.divider} />
                <Text style={styles.gameScores}> {homeTeam.score} </Text>
              </View>
            </View>
            <View style={styles.teamInfo}>
              <Image
                style={styles.logo}
                source={TeamMap[homeTeam.abbreviation.toLowerCase()].logo}
              />
              <Text style={styles.teamText}> {homeTeam.city} </Text>
              <Text style={styles.teamText2}> {homeTeam.nickname}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    height: 90,
    marginHorizontal: 12,
    marginBottom: 10,
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row'
  },
  teamInfo: {
    alignItems: 'center',
    flex: 2
  },
  awayText: {
    flex: 1.5,
    fontSize: 14,
    color: '#FFFFFF'
  },
  teamText: {
    fontSize: 10,
    color: '#FFFFFF'
  },
  teamText2: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF'
  },
  homeText: {
    flex: 1.5,
    fontSize: 14,
    color: '#FFFFFF'
  },
  logo: {
    height: 50,
    width: 50,
    marginTop: 10
  },
  gameInfo: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  gameInfoText: {
    color: '#FFFFFF',
    marginTop: 15
  },
  gameScoresView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    marginTop: 17
  },
  gameScores: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    width: 40
  },
  divider: {
    backgroundColor: '#e9e9e9',
    height: 30,
    width: 1,
    marginLeft: 5,
    marginRight: 5
  }
});

module.exports = GameCell;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
