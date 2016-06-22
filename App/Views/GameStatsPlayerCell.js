/* eslint-disable semi, space-before-function-paren, space-before-blocks*/

// http://stats.nba.com/media/players/230x185/${player.id}.png
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';

class GameStatsPlayerCell extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    var player = this.props.player;
    return (
      <View style={styles.body}>
        <View style={styles.imageBlock}>
          <Image
            source={{uri: 'http://stats.nba.com/media/players/230x185/' + player.person_id + '.png'}}
            style={styles.playerImage}
          />
        </View>
        <View style={styles.playerName}>
          <Text style={{fontSize: 12}}> {player.first_name} {player.last_name}</Text>
          <Text style={{fontSize: 10}}> #{player.jersey_number} </Text>
          <Text style={{fontSize: 10}}> {player.position_short} </Text>
        </View>
        <View style={styles.gameStats}>
          <View style={styles.statsLine1}>
            <View style={styles.gameStatsItem}>
              <Text> {player.minutes} </Text>
              <Text> MINUTES PLAYED </Text>
            </View>
          </View>

          <View style={styles.statsLine2}>
            <View style={styles.gameStatsItem}>
              <Text> {player.points} </Text>
              <Text> PTS </Text>
            </View>
            <View style={styles.gameStatsItem}>
              <Text> {parseInt(player.rebounds_offensive) + parseInt(player.rebounds_defensive)} </Text>
              <Text> REB </Text>
            </View>
            <View style={styles.gameStatsItem}>
              <Text> {player.assists} </Text>
              <Text> AST </Text>
            </View>
          </View>

        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  body: {
    height: 60,
    backgroundColor: '#FCFCFC',
    flexDirection: 'row',
    borderColor: '#E1E1E1',
    borderBottomWidth: 0.5
  },
  imageBlock: {
    flex: 1,
    justifyContent: 'center'
  },
  playerImage: {
    height: 50,
    width: 50,
    marginTop: 3,
    marginLeft: 2,
    borderRadius: 25
  },
  playerName: {
    marginLeft: 3,
    flex: 1.5,
    justifyContent: 'center'
  },
  gameStats: {
    flex: 3,
    // flexDirection: 'row',
    // justifyContent: 'space-between'
    justifyContent: 'center'
  },
  gameStatsItem: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginRight: 10
  },
  statsLine1: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  statsLine2: {
     flexDirection: 'row',
     justifyContent: 'center'
  }
});

module.exports = GameStatsPlayerCell;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
