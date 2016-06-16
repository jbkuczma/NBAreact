//endpoints
//url http://data.nba.com/data/json/cms/YEAR/league/standings.json <-- LEAGUE standings
// YEAR will be start of season -> ex: 2015/2016 season, YEAR would be 2016

import React, {Component,} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  ListView,
} from 'react-native';

import TeamStandingsCell from './TeamStandingsCell';
import Button from '../Components/Button';
// <View style={styles.buttonContainer}>
//     <Button text="Eastern" style={styles.easternButton}/>
//     <Button text="Western" style={styles.westernButton}/>
// </View>
class StandingsPage extends React.Component {

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.state = {
            standings: [],
            dataSource: ds.cloneWithRows([]),
            loaded: false,
        }
    }

    componentWillMount(){
        this.fetchStandings();
    }

    fetchStandings(){
        var year = 2015;
        var url = 'http://data.nba.com/data/json/cms/'+year+'/league/standings.json';
        fetch(url)
        .then((response) => response.json())
        .then((jsonResponse) => {
            var standings = jsonResponse.sports_content.standings.team;
            this.setState({
                standings: standings,
                dataSource: this.state.dataSource.cloneWithRows(standings),
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
  render() {
      return(
          <View style={styles.view}>
                <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 10,
                                marginLeft: 20,
                                marginRight: 20,
                            }}>
                    <Text> Team </Text>
                    <Text> Wins </Text>
                    <Text> Losses </Text>
                    <Text> Last 10 </Text>
                    <Text> Streak </Text>
                </View>
                <View style={styles.line} />
                <ListView
                    // style={styles.listview}
                    dataSource = {this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID) =>
                        <TeamStandingsCell
                            team={rowData}
                            // onPress={() => this.props.onPress(rowData)}
                        />
                    }
                />
          </View>
      )
  }
};

var styles = StyleSheet.create({
    view: {
        flex:1,
        backgroundColor: '#FCFCFC'
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
        flex: 1,
    },
    line: {
        marginLeft: 15,
        marginRight: 15,
        height: 1,
        backgroundColor: '#000',
    }
});

module.exports = StandingsPage;
