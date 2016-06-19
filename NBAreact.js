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
  // render() {
  //     return (
  //         <MainWindow />
  //     )
  // }
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='Main' component={MainWindow} initial={true} hideNavBar={true} />
          <Scene key='GameStats' component={GameStatsPage} hideNavBar={false} navigationBarStyle={styles.gameStatsPageTab} />
          <Scene key='TeamStats' component={TeamStatsPage} hideNavBar={false} />
        </Scene>
      </Router>
    )
  }
};

var styles = StyleSheet.create({
  gameStatsPageTab: {
    backgroundColor: '#03A9F4'
  }
});

module.exports = NBAreact;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
