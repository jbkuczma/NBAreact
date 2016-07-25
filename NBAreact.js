/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
import React from 'react';
import {
  StyleSheet
} from 'react-native';

import {Scene, Router} from 'react-native-router-flux';

import MainWindow from './App/Views/MainWindow';
import GameStatsPage from './App/Views/GameStatsPage';
import TeamStatsPage from './App/Views/TeamStatsPage';
import IndividualPlayerPage from './App/Views/IndividualPlayerPage';

var STORE = require('./App/Utilities/Store');

class NBAreact extends React.Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='Main' component={MainWindow} initial={true} hideNavBar={true} />
          <Scene key='GameStats' component={GameStatsPage} hideNavBar={false} navigationBarStyle={styles.gameStatsPageTab} />
          <Scene key='TeamStats' component={TeamStatsPage} hideNavBar={false} navigationBarStyle={styles.teamPageTab} backButtonImage={require('./App/Assets/Images/back_button_white.png')}/>
          <Scene key='IndividualPlayerPage' component={IndividualPlayerPage} hideNavBar={false} navigationBarStyle={styles.playerTab} />
        </Scene>
      </Router>
    )
  }
};

var styles = StyleSheet.create({
  gameStatsPageTab: {
    backgroundColor: '#03A9F4'
  },
  teamPageTab: {
    backgroundColor: STORE.navBarColorForTeamPage
  },
  playerTab: {
    backgroundColor: '#000',
    borderBottomWidth: 0
  }
});

module.exports = NBAreact;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
