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
  Dimensions,
  Animated,
  TouchableHighlight
} from 'react-native';

class IndividualPlayerPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      gameStats: [],
      currentIndex: 0
    }
  }

  componentWillMount(){
    this.getGameStatsForYear();
  }

  getGameStatsForYear(){
    var season = '2015-16'; // IMPORTANT
    var url = 'http://stats.nba.com/stats/playergamelog?LeagueID=00&PerMode=PerGame&PlayerID=+' + this.props.player.person_id + '&Season=' + season + '&SeasonType=Regular+Season';
    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      var width = this.getWidth(jsonResponse.resultSets[0].rowSet[0]);
      this.setState({
        gameStats: jsonResponse.resultSets[0].rowSet,
        loaded: true,
        pts: new Animated.Value(width.pts),
        ast: new Animated.Value(width.ast),
        reb: new Animated.Value(width.reb),
        stl: new Animated.Value(width.stl),
        blk: new Animated.Value(width.blk),
        to: new Animated.Value(width.to),
        min: new Animated.Value(width.min),
        fgm: new Animated.Value(width.fgm),
        fga: new Animated.Value(width.fga),
        _3pm: new Animated.Value(width._3pm),
        _3pa: new Animated.Value(width._3pa),
        ftm: new Animated.Value(width.ftm),
        fta: new Animated.Value(width.fta)
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getWidth(data){
    const mapper = {pts: 24, min: 6, reb: 18, ast: 19, stl: 20, blk: 21, to: 22, fgm: 7, fga: 8, _3pm: 10, _3pa: 11, ftm: 13, fta: 14}; // position in data where those values can be found
    const deviceWidth = Dimensions.get('window').width;
    const maxWidth = 350;
    const indicators = ['pts', 'ast', 'reb', 'stl', 'blk', 'to', 'min', 'fgm', 'fga', '_3pm', '_3pa', 'ftm', 'fta'];
    const unit = {
      ptsUnit: Math.floor(maxWidth / 45),
      astUnit: Math.floor(maxWidth / 15),
      rebUnit: Math.floor(maxWidth / 20),
      stlUnit: Math.floor(maxWidth / 6),
      blkUnit: Math.floor(maxWidth / 7),
      toUnit: Math.floor(maxWidth / 10),
      minUnit: Math.floor(maxWidth / 60),
      fgmUnit: Math.floor(maxWidth / 55),
      fgaUnit: Math.floor(maxWidth / 55),
      _3pmUnit: Math.floor(maxWidth / 55),
      _3paUnit: Math.floor(maxWidth / 55),
      ftmUnit: Math.floor(maxWidth / 55),
      ftaUnit: Math.floor(maxWidth / 55)
    };
    let width = {};
    let widthCap; // Give with a max cap
    indicators.forEach(item => {
      widthCap = data[mapper[item]] * unit[`${item}Unit`] || 0; //nothing is displayed if value is 0
      width[item] = widthCap <= (deviceWidth - 50) ? widthCap : (deviceWidth - 50);
    });
    return width
  }

  handleAnimation(index){
    const timing = Animated.timing;
    const width = this.getWidth(this.state.gameStats[index]);
    const indicators = ['pts', 'ast', 'reb', 'stl', 'blk', 'to', 'min', 'fgm', 'fga', '_3pm', '_3pa', 'ftm', 'fta'];
    Animated.parallel(indicators.map(item => {
      return timing(this.state[item], {toValue: width[item]});
    })).start();
    this.setState({
      currentIndex: index
    });
  }

  onRight(){
    if (this.state.currentIndex > 0){
      this.handleAnimation(this.state.currentIndex - 1);
    }
  }

  onLeft(){
    if (this.state.currentIndex < this.state.gameStats.length - 1){
      this.handleAnimation(this.state.currentIndex + 1);
    }
  }

  render(){
    var player = this.props.player;
    var nextAvailable = this.state.currentIndex === 0 ? 0 : 1;
    var previousAvailable = this.state.currentIndex === this.state.gameStats.length - 1 ? 0 : 1;
    const {pts, ast, reb, stl, blk, to, min, fgm, fga, _3pm, _3pa, ftm, fta} = this.state;
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
            <Text style={{color: 'white', fontWeight: '200', fontSize: 24}}> {this.props.player.first_name}<Text style={{fontWeight: '500'}}> {this.props.player.last_name}</Text></Text>
            <Text style={{color: 'white', fontWeight: '200', fontSize: 24}}> #{this.props.player.jersey_number}</Text>
            <Text style={{color: 'white', fontWeight: '200', fontSize: 24}}> {this.props.player.position_full}</Text>
          </View>
        </View>
        <View>
          <View style={styles.statItem}>
            <Text style={styles.itemLabel}>Points</Text>
            <View style={styles.itemData}>
              {pts &&
                <Animated.View style={[styles.bar, styles.points, {width: pts}]} />
              }
              <Text style={styles.dataNumber}> {this.state.gameStats[this.state.currentIndex][24]}</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.itemLabel}>Rebounds</Text>
            <View style={styles.itemData}>
              {reb &&
                <Animated.View style={[styles.bar, styles.rebounds, {width: reb}]} />
              }
              <Text style={styles.dataNumber}> {this.state.gameStats[this.state.currentIndex][18]}</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.itemLabel}>Assists</Text>
            <View style={styles.itemData}>
              {ast &&
                <Animated.View style={[styles.bar, styles.assists, {width: ast}]} />
              }
              <Text style={styles.dataNumber}> {this.state.gameStats[this.state.currentIndex][19]}</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.itemLabel}>Steals</Text>
            <View style={styles.itemData}>
              {stl &&
                <Animated.View style={[styles.bar, styles.steals, {width: stl}]} />
              }
              <Text style={styles.dataNumber}> {this.state.gameStats[this.state.currentIndex][20]}</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.itemLabel}>Blocks</Text>
            <View style={styles.itemData}>
              {blk &&
                <Animated.View style={[styles.bar, styles.blocks, {width: blk}]} />
              }
              <Text style={styles.dataNumber}> {this.state.gameStats[this.state.currentIndex][21]}</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.itemLabel}>Turnovers</Text>
            <View style={styles.itemData}>
              {to &&
                <Animated.View style={[styles.bar, styles.turnovers, {width: to}]} />
              }
              <Text style={styles.dataNumber}> {this.state.gameStats[this.state.currentIndex][22]}</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.itemLabel}>Minutes</Text>
            <View style={styles.itemData}>
              {min &&
                <Animated.View style={[styles.bar, styles.minutes, {width: min}]} />
              }
              <Text style={styles.dataNumber}> {this.state.gameStats[this.state.currentIndex][6]}</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.itemLabel}>FGM/FGA </Text>
            <View style={styles.itemData}>
                <Animated.View style={[styles.bar, styles.attempted, {width: fga}]} />
                <Animated.View style={[styles.bar, styles.fgm, styles.overlayBar, {width: fgm}]} />
              <Text style={styles.dataNumber}> {this.state.gameStats[this.state.currentIndex][7]}/{this.state.gameStats[this.state.currentIndex][8]}</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.itemLabel}>3PM/3PA </Text>
            <View style={styles.itemData}>
                <Animated.View style={[styles.bar, styles.attempted, {width: _3pa}]} />
                <Animated.View style={[styles.bar, styles._3pm, styles.overlayBar, {width: _3pm}]} />
              <Text style={styles.dataNumber}> {this.state.gameStats[this.state.currentIndex][10]}/{this.state.gameStats[this.state.currentIndex][11]}</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.itemLabel}>FTM/FTA </Text>
            <View style={styles.itemData}>
                <Animated.View style={[styles.bar, styles.attempted, {width: fta}]} />
                <Animated.View style={[styles.bar, styles.ftm, styles.overlayBar, {width: ftm}]} />
              <Text style={styles.dataNumber}> {this.state.gameStats[this.state.currentIndex][13]}/{this.state.gameStats[this.state.currentIndex][14]}</Text>
            </View>
          </View>





          <View style={{alignItems: 'center', marginTop: 5}}>
            <Text style={styles.gameStatus}> {this.state.gameStats[this.state.currentIndex][5]} {this.state.gameStats[this.state.currentIndex][4].slice(3)} </Text>
          </View>
          <View style={styles.date}>
            <TouchableHighlight onPress={this.onLeft.bind(this)} underlayColor='#FFFFFF' style={{opacity: previousAvailable}}>
              <Image
                source={require('../Assets/Images/left_arrow.png')}
                style={{width: 40, height: 40, alignSelf: 'flex-start'}}
              />
            </TouchableHighlight>
            <Text style={styles.dateText}> {this.state.gameStats[this.state.currentIndex][3]} </Text>
            <TouchableHighlight onPress={this.onRight.bind(this)} underlayColor='#FFFFFF' style={{opacity: nextAvailable}}>
              <Image
                source={require('../Assets/Images/right_arrow.png')}
                style={{width: 40, height: 40, alignSelf: 'flex-end'}}
              />
            </TouchableHighlight>
          </View>
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
    backgroundColor: '#000'
  },
  imageBlock: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30
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
    marginBottom: 2,
    paddingHorizontal: 10,
    marginTop: 2
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
  overlayBar: {
    position: 'absolute',
    top: 3.5,
    left: 0
  },
  points: {
    backgroundColor: '#EC644B'
  },
  rebounds: {
    backgroundColor: '#F4D03F'
  },
  assists: {
    backgroundColor: '#F39C12'
  },
  steals: {
    backgroundColor: '#19B5FE'
  },
  blocks: {
    backgroundColor: '#3FC380'
  },
  turnovers: {
    backgroundColor: '#BF55EC'
  },
  minutes: {
    backgroundColor: '#8AA8AD'
  },
  fgm: {
    backgroundColor: '#ff8557'
  },
  attempted: {
    backgroundColor: '#8e8499'
  },
  _3pm: {
    backgroundColor: '#95E7ED'
  },
  ftm: {
    backgroundColor: '#FFEB3B'
  },
  dataNumber: {
    color: '#CBCBCB',
    fontSize: 14
  },
  //
  gameStatus: {
    fontSize: 20,
    fontWeight: '200'
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1
  },
  dateText: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '200'
  }
});

module.exports = IndividualPlayerPage;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
