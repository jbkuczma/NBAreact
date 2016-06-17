import React, {Component,} from 'react';
import {
  Text,
  View,
  StyleSheet,
  PixelRatio,
  Platform,
  Navigator,
} from 'react-native';

import {Scene, Router} from 'react-native-router-flux';

import MainWindow from './App/Views/MainWindow';
import GameStatsPage from './App/Views/GameStatsPage';

class NBAreact extends React.Component {
  // render() {
  //     return (
  //         <MainWindow />
  //     )
  // }
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Main" component={MainWindow} initial={true} hideNavBar={true}/>
          <Scene key="GameStats" component={GameStatsPage} hideNavBar={false} navigationBarStyle={styles.gameStatsPageTab} />
        </Scene>
      </Router>
    )
  }
};

var styles = StyleSheet.create({
   // gameStatsPage: {
   //     backgroundColor: '#FCFCFC',
   // },
   gameStatsPageTab: {
       backgroundColor: '#03A9F4',
   },
});

module.exports = NBAreact;
