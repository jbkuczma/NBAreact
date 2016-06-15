import React, {Component,} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import TeamMap from '../Utilities/TeamMap';

class GameCell extends React.Component {
    render(){
        var game = this.props.game;
        var homeTeam = game.home;
        var awayTeam = game.visitor;
        console.log(TeamMap[homeTeam.abbreviation.toLowerCase()]);
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
                    <Text style={styles.awayText}> {awayTeam.abbreviation} </Text>
                    <Text style={styles.homeText}> {homeTeam.abbreviation} </Text>

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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    awayText: {
        color: '#FFFFFF',
    },
    homeText: {
        color: '#FFFFFF',
    }
});

module.exports = GameCell;
