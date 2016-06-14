import React, {Component,} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';

import ScrollableTabView, {
    DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import ScoresPage from './ScoresPage';
import StandingsPage from './StandingsPage';
import Date from '../Components/Date';

class MainWindow extends React.Component {
  render() {
      return(
          <View>
            <StatusBar
                // backgroundColor= '#E66840'
                backgroundColor='#FF5722'
                barStyle= 'light-content'
            />
            <Date />
            <ScrollableTabView
                style={styles.tabBar}
                renderTabBar={() => <DefaultTabBar style={styles.tabBar2}/>}
                tabBarActiveTextColor='#FFFFFF'
                tabBarInactiveTextColor='#e5e5e5'
                tabBarUnderlineColor='#FFCCBC'
            >
                <ScoresPage tabLabel='Scores' />
                <StandingsPage tabLabel='Standings' />
            </ScrollableTabView>
        </View>
      )
  }
};

var styles = StyleSheet.create({
    tabBar: {
        // marginTop: 5,
    },
    tabBar2: {
        // backgroundColor: '#BD4C29',
        backgroundColor: '#E64A19',
    }
});

module.exports = MainWindow;
