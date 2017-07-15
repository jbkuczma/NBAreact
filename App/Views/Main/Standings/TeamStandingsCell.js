/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

import TeamMap from '../Utilities/TeamMap';

import { Actions } from 'react-native-router-flux';

class TeamStandingsCell extends React.Component {

  onPress(team){
    Actions.TeamStats({team: team.abbreviation.toLowerCase()});
  }

  render(){
    var team = this.props.team;
    var teamStats = team.team_stats;
    return (
      <View style={styles.row}>
        <TouchableHighlight onPress={this.onPress.bind(this, team)} underlayColor='#FFFFFF'>
          <View style={styles.rowContent}>
            <View style={{flex: 1}}>
              <Image
                style={styles.logo}
                source={TeamMap[team.abbreviation.toLowerCase()].logo}
              />
            </View>
            <View style={styles.numbersForRowContainer}>
              <View style={{flex: 1}}>
                <Text> {teamStats.wins} </Text>
              </View>
              <View style={{flex: 1}}>
                <Text> {teamStats.losses} </Text>
              </View>
              <View style={{flex: 1}}>
                <Text> {teamStats.l10} </Text>
              </View>
              <View style={{flex: 0.75}}>
                <Text> {teamStats.streak} </Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.divider} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  row: {
    flex: 1,
    height: 50,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10
  },
  rowContent: {
    flex: 1,
    flexDirection: 'row'
  },
  logo: {
    height: 40,
    width: 40,
    marginLeft: 10,
    marginBottom: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  numbersForRowContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  divider: {
    marginLeft: 15,
    marginRight: 15,
    height: 1,
    backgroundColor: '#000'
  }
});

module.exports = TeamStandingsCell;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
