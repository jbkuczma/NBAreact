//http://data.nba.com/data/10s/json/cms/noseason/game/${gameDate}/${gameId}/boxscore.json

import React, {Component,} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

import TeamMap from '../Utilities/TeamMap';

class GameStatsPage extends React.Component {

    constructor(props){
        super(props);
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
            console.log(jsonResponse);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render(){
        var game = this.props.game;
        // console.log(game);
        return(
            <View style={styles.main}>
                <Text> hi how are ya? </Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FCFCFC',
    }
});

module.exports = GameStatsPage;
