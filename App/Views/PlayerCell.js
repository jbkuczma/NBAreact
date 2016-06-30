/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';

class PlayerCell extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      basicPlayerInfo: []
    };
  }

  componentWillMount(){
    this.setBasicInfo();
  }

  setBasicInfo(){
    var roster = this.props.roster;
    var playerName = this.props.player[2];
    for (var i = 0; i < roster.length; i++){
      if (roster[i][3] === playerName){
        this.setState({
          basicPlayerInfo: roster[i]
        });
        break;
      }
    }
  }

  render(){
    var player = this.props.player;
    if (this.state.basicPlayerInfo === []){
      return <View><Text> fetching data </Text></View>
    }
    if (parseInt(this.state.basicPlayerInfo[4])){ // if no number is returned, they are no longer on the team despite callback response
      return (
        <View style={styles.body}>
          <View style={styles.imageBlock}>
            <Image
              source={{uri: 'http://stats.nba.com/media/players/230x185/' + player[1] + '.png'}}
              style={styles.playerImage}
            />
          </View>
          <View style={styles.playerPositionNumber}>
            <Text style={{fontSize: 10}}> {player[2]} </Text>
            <Text style={{fontSize: 9}}> #{this.state.basicPlayerInfo[4]}</Text>
            <Text style={{fontSize: 9}}> {this.state.basicPlayerInfo[5]}</Text>
            <Text style={{fontSize: 8}}> Years Pro: {this.state.basicPlayerInfo[10]}</Text>
          </View>
          <View style={styles.data}>
            <View style={styles.playerData}>
              <Text style={{fontSize: 10, marginRight: 10}}> Age: {this.state.basicPlayerInfo[9]}</Text>
              <Text style={{fontSize: 10, marginRight: 10}}> Height: {this.state.basicPlayerInfo[6]}</Text>
              <Text style={{fontSize: 10, marginRight: 10}}> Weight: {this.state.basicPlayerInfo[7]}</Text>
            </View>
            <View style={styles.playerGameData1}>
              <View style={[styles.playerDataItem, {flex: 2}]}>
                <Text style={styles.playerDataNumber}> {player[3]}</Text>
                <Text style={styles.playerDataLabel}> GP </Text>
              </View>
              <View style={[styles.playerDataItem, {flex: 1}]}>
                <Text style={styles.playerDataNumber}> {player[7]}</Text>
                <Text style={styles.playerDataLabel}> MIN </Text>
              </View>
            </View>
            <View style={styles.playerGameData}>
              <View style={styles.playerDataItem}>
                <Text style={styles.playerDataNumber}> {player[27]}</Text>
                <Text style={styles.playerDataLabel}> PPG </Text>
              </View>
              <View style={styles.playerDataItem}>
                <Text style={styles.playerDataNumber}> {player[19]}</Text>
                <Text style={styles.playerDataLabel}> RPG </Text>
              </View>
              <View style={styles.playerDataItem}>
                <Text style={styles.playerDataNumber}> {player[20]}</Text>
                <Text style={styles.playerDataLabel}> APG </Text>
              </View>
            </View>
          </View>
        </View>
      )
    } else {
      return null
    }
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
    marginTop: 5,
    marginLeft: 2,
    borderRadius: 25
  },
  playerPositionNumber: {
    marginLeft: 15,
    flex: 2,
    justifyContent: 'center'
  },
  data: {
    flex: 5,
    marginRight: 5,
    justifyContent: 'center'
  },
  playerData: {
    flexDirection: 'row'
  },
  playerGameData1: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  playerGameData: {
    flexDirection: 'row'
  },
  playerDataItem: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginRight: 10,
    flex: 1
  },
  playerDataNumber: {
    color: '#404a5a',
    fontSize: 12,
    fontWeight: 'bold',
    position: 'relative',
    top: 1
  },
  playerDataLabel: {
    color: '#4a5669',
    fontSize: 10,
    fontWeight: '200'
  }
});

module.exports = PlayerCell;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
