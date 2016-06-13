import React, {Component,} from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';

class MainWindow extends React.Component {
  render() {
      return(
          <ScrollableTabView
            style={{marginTop: 20, }}
            renderTabBar={() => <DefaultTabBar />}
          >
            <Text tabLabel='Scores'> Games scores will go here </Text>
            <Text tabLabel='Standings'>Conference standings will go here</Text>
          </ScrollableTabView>
      )
  }
};

module.exports = MainWindow;
