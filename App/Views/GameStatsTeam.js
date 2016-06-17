//http://data.nba.com/data/10s/json/cms/noseason/game/${gameDate}/${gameId}/boxscore.json

import React, {Component,} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import ScrollableTabView, {
    DefaultTabBar,
} from 'react-native-scrollable-tab-view';

import TeamMap from '../Utilities/TeamMap';

class GameStatsTeam extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            homeStats: [],
            awayStats: [],
        }
    }

    componentWillMount(){
        this.getGameStats();
    }

    getGameStats(){
        var game = this.props.game;
        var date = game.date;
        var gameID = game.id;
        var url = 'http://data.nba.com/data/10s/json/cms/noseason/game/' + date + '/' + gameID + '/boxscore.json';
        fetch(url)
        .then((response) => response.json())
        .then((jsonResponse) => {
            var homeStats = jsonResponse.sports_content.game.home;
            var awayStats = jsonResponse.sports_content.game.visitor;
            this.setState({
                homeStats: homeStats,
                awayStats: awayStats,
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render(){
        var game = this.props.game;
        var h1 = h2 = h3 = h4 = hFinal = a1 = a2 = a3 = a4 = aFinal = 0;
        console.log(game);
        return(
            <View style={styles.main}>
                <View style={styles.scoreboardHeader}>
                    <Text> Q1 </Text>
                    <Text> Q2 </Text>
                    <Text> Q3 </Text>
                    <Text> Q4 </Text>
                    <Text> Final </Text>
                </View>
                <View style={styles.quarterScores}>
                    <View style={styles.awayScores}>
                        <Text style={{marginTop: 15}}> {this.state.awayStats.abbreviation} </Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.homeScores}>
                        <Text style={{marginBottom: 15}}> {this.state.homeStats.abbreviation} </Text>
                    </View>
                    <View style={styles.verticalScores} />
                </View>
                <View style={styles.line} />
                <View style={styles.head}>
                    <Text> {this.state.awayStats.nickname} </Text>
                    <View style={styles.vertical} />
                    <Text> Stats </Text>
                    <View style={styles.vertical} />
                    <Text> {this.state.homeStats.nickname} </Text>
                </View>
                <View style={styles.line} />
                <View style={styles.body}>

                </View>
            </View>
        )
    }
}

let screenHeight = Dimensions.get("window").height;

var styles = StyleSheet.create({
    main: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#FCFCFC',
    },
    quarterScores: {
        flex: 0.2,
    },
    scoreboardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 70,
        marginRight: 30,
        marginTop: 10,
        marginBottom: -20,
    },
    head: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    body: {
        flex: 1,
        flexDirection: 'row',
    },
    line: {
        marginLeft: 5,
        marginRight: 5,
        height: 1,
        backgroundColor: '#000',
    },
    vertical: {
        marginLeft: 15,
        marginRight: 15,
        width: 1,
        marginTop: -10,
        marginBottom: -10,
        backgroundColor: '#000',
    },
    verticalScores: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: -10,
        width: 1,
        backgroundColor: '#000',
    },
    awayScores: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
    },
    homeScores: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
    }
});

module.exports = GameStatsTeam;
