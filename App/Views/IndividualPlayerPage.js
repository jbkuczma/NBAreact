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
  Dimensions,
  Animated,
  TouchableHighlight
} from 'react-native';

import TeamMap from '../Utilities/TeamMap';

class IndividualPlayerPage extends React.Component {

  constructor(props){
    super(props);
    const width = {pts: 30};
    this.state = {
      loaded: false,
      gameStats: [],
      pts: new Animated.Value(width.pts),
      currentIndex: 0
    }
  }

  getGameStatsForYear(){
    var season = '2015-16'; // IMPORTANT
    var url = 'http://stats.nba.com/stats/playergamelog?LeagueID=00&PerMode=PerGame&PlayerID=+' + this.props.player.person_id + '&Season=' + season + '&SeasonType=Regular+Season';
    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      this.setState({
        gameStats: jsonResponse.resultSets[0].rowSet,
        loaded: true,
        width: this.getWidth(jsonResponse.resultSets[0].rowSet[0])
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getWidth(data){
      const deviceWidth = Dimensions.get('window').width;
      const maxWidth = 350;
      const indicators = ['pts'];
      const unit = {
        ptsUnit: Math.floor(maxWidth / 45)
      };
      let width = {};
      let widthCap; // Give with a max cap
      indicators.forEach(item => {
        widthCap = data[item] * unit[`${item}Unit`] || 5
        width[item] = widthCap <= (deviceWidth - 50) ? widthCap : (deviceWidth - 50)
      });

      return width
  }

  handleAnimation(index){
    const timing = Animated.timing;
    const width = {pts: Math.random() * (350 - 20) + 20};
    const indicators = ['pts'];
    Animated.parallel(indicators.map(item => {
      return timing(this.state[item], {toValue: width[item]})
    })).start();
    this.setState({
      currentIndex: index
    });
  }

  onLeft(){
     if(this.state.currentIndex < this.state.gameStats.length - 1 && this.state.currentIndex !== 0){
         this.handleAnimation(this.state.currentIndex - 1);
     }
  }

  onRight(){
      if(this.state.currentIndex >= 0 && this.state.currentIndex < this.state.gameStats.length){
          this.handleAnimation(this.state.currentIndex + 1);
      }
  }

  componentWillMount(){
    this.getGameStatsForYear();
  }

  render(){
    var player = this.props.player;
    const {pts} = this.state;
    if (!this.state.loaded || this.state.gameStats === []){
      return (
        <View style={{flex: 1, justifyContent: 'center',alignItems: 'center', backgroundColor: '#FCFCFC'}}>
          <Image
            source={require('../Assets/Images/ring.gif')}
            style={{width: 70, height: 70}}
          />
        </View>
      )
    }
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

            <View style={styles.statItem}>
              <Text style={styles.itemLabel}>Points</Text>
              <View style={styles.itemData}>
                {pts &&
                  <Animated.View style={[styles.bar, styles.points, {width: pts}]} />
                }
                <Text style={styles.dataNumber}> {this.state.gameStats[this.state.currentIndex][24]}</Text>
              </View>
            </View>



            <Text onPress={this.onRight.bind(this)}>Click me to test animation going forward in array!</Text>
            <Text> {this.state.gameStats[this.state.currentIndex][3]} </Text>
            <Text onPress={this.onLeft.bind(this)}>Click me to test animation going backwards in array!</Text>

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
    height: 120,
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
     marginBottom: 7,
     shadowColor: '#151515',
     shadowOpacity: 0.9,
     shadowRadius: 2,
     shadowOffset: {
       height: 1,
       width: 0
     }
  },
  playerName: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 15,
    marginBottom: 8
  },
  // play around with
  statItem: {
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10
  },
  itemLabel: {
    color: '#CBCBCB',
    flex: 1,
    fontSize: 14,
    position: 'relative',
    top: 1
  },
  itemData: {
    flex: 2,
    flexDirection: 'row'
  },
  bar: {
   alignSelf: 'center',
   borderRadius: 5,
   height: 10,
   marginRight: 9
  },
  points: {
    backgroundColor: '#F55443'
  },
  dataNumber: {
    color: '#CBCBCB',
    fontSize: 14
  }
});

module.exports = IndividualPlayerPage;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
