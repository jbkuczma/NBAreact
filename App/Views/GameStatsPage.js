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

    render(){
        var game = this.props.game;
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
