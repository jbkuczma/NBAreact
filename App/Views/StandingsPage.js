//endpoints
//url http://data.nba.com/data/json/cms/YEAR/league/standings.json
// YEAR will be start of season -> ex: 2015/2016 season, YEAR would be 2016

import React, {Component,} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Button from '../Components/Button';

class StandingsPage extends React.Component {
  render() {
      return(
          <View style={styles.view}>
            <View style={styles.buttonContainer}>
                <Button text="Eastern" style={styles.easternButton}/>
                <Button text="Western" style={styles.westernButton}/>
            </View>
          </View>
      )
  }
};

var styles = StyleSheet.create({
    view: {
        flex:2,
        // backgroundColor: '#ed805e',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    easternButton: {
        color: '#FFFFFF',
        // backgroundColor: '#0067AC',
        backgroundColor: '#536DFE',
        width: 200,
        height: 35,
        textAlign: 'center',
        flex: 1,
    },
    westernButton: {
        color: '#FFFFFF',
        // backgroundColor: '#ED254B',
        backgroundColor: '#FF5252',
        width: 200,
        height: 35,
        textAlign: 'center',
    },
});

module.exports = StandingsPage;
