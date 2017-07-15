/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
// url http://data.nba.com/data/json/cms/YEAR/league/standings.json <-- LEAGUE standings
// YEAR will be start of season -> ex: 2015/2016 season, YEAR would be 2016

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ListView,
  Platform
} from 'react-native';

var STORE = require('../../../Utilities/Store');

import TeamStandingsCell from './TeamStandingsCell';

class StandingsPage extends React.Component {

  constructor(props){
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      year: STORE.year,
      standings: [],
      dataSource: ds.cloneWithRows([]),
      loaded: false
    }
  }

  componentWillMount(){
    this.fetchStandings();
  }

  componentDidMount(){
    setInterval( () => {
      if(this.state.year !== STORE.year){
        this.fetchStandings();
      }
    }, 1000);
  }

  // retrieves league standings for a given year
  fetchStandings(){
    var year = STORE.year;
    var url = 'http://data.nba.com/data/json/cms/' + year + '/league/standings.json';
    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      var standings = jsonResponse.sports_content.standings.team;
      this.setState({
        year: year,
        standings: standings,
        dataSource: this.state.dataSource.cloneWithRows(standings)
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.view}>
        <View style={styles.listHeader}>
          <Text> Team </Text>
          <Text> Wins </Text>
          <Text> Losses </Text>
          <Text> Last 10 </Text>
          <Text> Streak </Text>
        </View>
        <View style={styles.line} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) =>
            <TeamStandingsCell
              team={rowData}
              onPress={() => this.props.onPress(rowData)}
            />
          }
        />
      </View>
    )
  }
};

var styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Platform.OS === 'android' ? '#d8dade' : '#FCFCFC'
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  line: {
    marginLeft: 15,
    marginRight: 15,
    height: 1,
    backgroundColor: '#000'
  }
});

module.exports = StandingsPage;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
