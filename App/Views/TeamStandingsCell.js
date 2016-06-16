import React, {Component,} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import TeamMap from '../Utilities/TeamMap';

class TeamStandingsCell extends React.Component {
    render(){
        var team = this.props.team;
        var teamStats = team.team_stats;
        // console.log(team);
        return(
            <View style={
                {
                    flex: 1,
                    height: 50,
                    // backgroundColor: TeamMap[team.abbreviation.toLowerCase()].color,
                    marginBottom: 20,
                    marginRight: 10,
                    marginLeft: 10,
                    // overflow: 'hidden',
                }
            }>
                <View style={{flex:1,flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                    <Image
                        style={{height: 40,
                            width: 40,
                            marginLeft: 10,}}
                            source={TeamMap[team.abbreviation.toLowerCase()].logo}
                    />
                    </View>
                    <View style={{flex:3,flexDirection: 'row',  alignItems: 'center'}}>
                        <View style={{flex:1}}>
                        <Text> {teamStats.wins} </Text>
                        </View>
                        <View style={{flex:1}}>
                        <Text> {teamStats.losses} </Text>
                        </View>
                        <View style={{flex:1}}>
                        <Text> {teamStats.l10} </Text>
                        </View>
                        <View style={{flex:0.75}}>
                        <Text> {teamStats.streak} </Text>
                        </View>
                    </View>
                </View>
                <View style={{marginLeft: 15,
                marginRight: 15,
                height: 1,
                backgroundColor: '#000',}} />
            </View>
        )
    }
}

var styles = StyleSheet.create({

});

module.exports = TeamStandingsCell;
