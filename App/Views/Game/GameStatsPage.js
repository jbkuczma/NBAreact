/* eslint-disable semi, space-before-function-paren, space-before-blocks*/

import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import ScrollableTabView, {
    DefaultTabBar
} from 'react-native-scrollable-tab-view';

import GameStatsTeam from './GameStatsTeam';
import GameStatsPlayers from './GameStatsPlayers';

class GameStatsPage extends React.Component {

  render(){
    var game = this.props.game;
    return (
      <View style={styles.main}>
        <ScrollableTabView
          renderTabBar={() => <DefaultTabBar style={{marginTop: 62, backgroundColor: '#0288D1', borderColor: '#0288D1'}} />}
          tabBarActiveTextColor='#FFFFFF'
          tabBarInactiveTextColor='#e5e5e5'
          tabBarUnderlineColor='#b3dbf1'
        >
          <GameStatsTeam tabLabel='Teams' game={game} />
          <GameStatsPlayers tabLabel='Players' game={game} />
        </ScrollableTabView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FCFCFC'
  }
});

module.exports = GameStatsPage;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
