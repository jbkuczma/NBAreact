import React, {Component,} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import ScrollableTabView, {
    DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import ScoresPage from './ScoresPage';
import StandingsPage from './StandingsPage';

class MainWindow extends React.Component {
  render() {
      return(
          <ScrollableTabView
            style={styles.tabBar}
            renderTabBar={() => <DefaultTabBar style={styles.tabBar2}/>}
          >
            <ScoresPage tabLabel='Scores' />
            <StandingsPage tabLabel='Standings' />
          </ScrollableTabView>
      )
  }
};

var styles = StyleSheet.create({
    tabBar: {
        marginTop: 40,
    },
    tabBar2: {
        backgroundColor: '#CCC',
    }
});

module.exports = MainWindow;
