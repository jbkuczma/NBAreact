//endpoints
//url: http://data.nba.com/data/10s/json/cms/noseason/game/${gameDate}/${gameId}/boxscore.json
//detailed view of game stats. will have to check if team stats is included

//teamInfo: http://stats.nba.com/stats/teaminfocommon?LeagueID=00&SeasonType=Regular+Season&TeamID=${id}&season=${season} <-- could get wins/losses, stat ranking
//teamDetail: http://stats.nba.com/stats/teamplayerdashboard?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=Regular+Season&TeamID=${id}&VsConference=&VsDivision= <-- player stats for season
//teamDetailBasic: `http://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=${season}&TeamID=${id} <-- basic player info, position, number, height, weight, etc.

import React, {Component,} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import TeamMap from '../Utilities/TeamMap';

class GameCell extends React.Component {
    render(){
        var game = this.props.game;
        var homeTeam = game.home;
        var awayTeam = game.visitor;
        return(
            <View style={
                {
                    backgroundColor: TeamMap[homeTeam.abbreviation.toLowerCase()].color,
                    marginBottom: 10,
                    marginRight: 30,
                    marginLeft: 30,
                    overflow: 'hidden',
                }
            }>
                <View style={styles.container}>
                    <View style={styles.teamInfo}>
                        <Image
                            style={styles.logo}
                            source={TeamMap[awayTeam.abbreviation.toLowerCase()].logo}
                        />
                        <Text style={styles.teamText}> {awayTeam.city} </Text>
                        <Text style={styles.teamText2}> {awayTeam.nickname} </Text>
                    </View>
                    <View style={styles.gameInfo}>
                        <Text style={styles.gameInfoText}> {game.period_time.period_status} </Text>
                        <View style={styles.gameScoresView}>
                            <Text style={styles.gameScores}> {awayTeam.score} </Text>
                            <View style={styles.divider} />
                            <Text style={styles.gameScores}> {homeTeam.score} </Text>
                        </View>
                    </View>
                    <View style={styles.teamInfo}>
                        <Image
                            style={styles.logo}
                            source={TeamMap[homeTeam.abbreviation.toLowerCase()].logo}
                        />
                        <Text style={styles.teamText}> {homeTeam.city} </Text>
                        <Text style={styles.teamText2}> {homeTeam.nickname}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        height: 90,
        marginHorizontal: 12,
        marginBottom: 10,
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
    },
    teamInfo: {
        alignItems: 'center',
        flex: 2,
    },
    awayText: {
        flex: 1.5,
        fontSize: 14,
        color: '#FFFFFF',
    },
    teamText: {
        fontSize: 10,
        color: '#FFFFFF',
    },
    teamText2: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    homeText: {
        flex: 1.5,
        fontSize: 14,
        color: '#FFFFFF',
    },
    logo: {
        height: 50,
        width: 50,
        marginTop: 10,
    },
    gameInfo: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    gameInfoText: {
        color: '#FFFFFF',
        marginTop: 15,
    },
    gameScoresView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        marginTop: 17,
    },
    gameScores: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
        width: 40,
    },
    divider: {
        backgroundColor: '#e9e9e9',
        height: 30,
        width: 1,
        marginLeft: 5,
        marginRight: 5,
    }
});

module.exports = GameCell;
