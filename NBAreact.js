/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
import React from 'react';
import {
  StyleSheet
} from 'react-native';

import {Scene, Router} from 'react-native-router-flux';

import MainWindow from './App/Views/MainWindow';
import GameStatsPage from './App/Views/GameStatsPage';
import TeamStatsPage from './App/Views/TeamStatsPage';

class NBAreact extends React.Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='Main' component={MainWindow} initial={true} hideNavBar={true} />
          <Scene key='GameStats' component={GameStatsPage} hideNavBar={false} navigationBarStyle={styles.gameStatsPageTab} />
          <Scene key='TeamStats' component={TeamStatsPage} hideNavBar={false} navigationBarStyle={styles.teamPageTab} backButtonImage={require('./App/Assets/Images/back_button_green.png')}/>
        </Scene>
      </Router>
    )
  }
};

// want backButtonImage = './App/Assets/Images/back_button_green.png' for TeamStats
var styles = StyleSheet.create({
  gameStatsPageTab: {
    backgroundColor: '#03A9F4'
  },
  teamPageTab: {
    backgroundColor: '#4CAF50' // would prefer to use team color but not sure how
  }
});

module.exports = NBAreact;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
