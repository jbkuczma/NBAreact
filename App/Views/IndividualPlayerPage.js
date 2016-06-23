/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
// player stats for season: http://stats.nba.com/stats/playergamelog?LeagueID=00&PerMode=PerGame&PlayerID=PLAYER_ID&Season=SEASON&SeasonType=Regular+Season
// http://stats.nba.com/stats/shotchartdetail?Period=0&VsConference=&LeagueID=00&LastNGames=0&TeamID=0&Position=&Location=&Outcome=&ContextMeasure=FGA&DateFrom=&StartPeriod=&DateTo=&OpponentTeamID=0&ContextFilter=&RangeType=&Season=SEASON&AheadBehind=&PlayerID=PLAYER_ID&EndRange=&VsDivision=&PointDiff=&RookieYear=&GameSegment=&Month=0&ClutchTime=&StartRange=&EndPeriod=&SeasonType=Regular+Season&SeasonSegment=&GameID= // SHOTS TAKEN
// http://stats.nba.com/stats/playergamelog?LeagueID=00&PerMode=PerGame&PlayerID=PLAYER_ID&Season=SEASON&SeasonType=Regular+Season // STATS FOR EACH GAME
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

class IndividualPlayerPage extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    var player = this.props.player;
    return (
        <View style={styles.body}>
          <View style={styles.header}>
            <View style={styles.imageBlock}>
              <Image
                source={{uri: 'http://stats.nba.com/media/players/230x185/' + player.person_id + '.png'}}
                style={styles.playerImage}
              />
            </View>
            <View style={styles.playerName}>
              <Text style={{color:'white', fontWeight: '200', fontSize: 24}}> {this.props.player.first_name}<Text style={{fontWeight: '500'}}> {this.props.player.last_name}</Text></Text>
              <Text style={{color:'white', fontWeight: '200', fontSize: 24}}> #{this.props.player.jersey_number}</Text>
              <Text style={{color:'white', fontWeight: '200', fontSize: 24}}> {this.props.player.position_full}</Text>
            </View>
          </View>
          <View>
            <Text> fill with stats from each game for the season; make some sort of graph? </Text>
            <Text> create some sort of shot chart for player(really would like to implement this idea) </Text>
          </View>
        </View>
    )
  }
}

var styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    backgroundColor: '#FCFCFC',
    height: Dimensions.get('window').height
  },
  header: {
    marginTop: 62,
    height: 110,
    flexDirection: 'row',
    backgroundColor: '#000',
  },
  imageBlock: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  playerImage: {
    //  flex: 1.5,
     height: 100,
     width: 100,
     borderRadius: 50,
     marginBottom: 7
  },
  playerName: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 15
  }
});

module.exports = IndividualPlayerPage;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
