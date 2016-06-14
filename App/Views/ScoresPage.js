import React, {Component,} from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  ListView,
} from 'react-native';

import TeamMap from '../Utilities/TeamMap';

import moment from 'moment';

class ScoresPage extends React.Component {

    constructor(props){
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
    }

    componentWillMount(){
        this.fetchGames();
    }

    fetchGames(){
        var date = moment().format('L');
        date = date.split('/');
        var month = date[0];
        var day = date[1];
        var year = date[2];
        // date = year+month+day; //actual
        // date= '20160101'; //for dev
        var url = 'http://data.nba.com/data/1h/json/cms/noseason/scoreboard/'+date+'/games.json';
        fetch(url)
        .then((response) => response.json())
        .then((jsonResponse) => {
            var games = jsonResponse['sports_content']['games']['game'];
            console.log(games);
        })
        .catch((error) => {
            console.log(error);
        });
    }


    render() {
        return(
            <View>
                <Text> Scores will go here </Text>
                <Image
                    style={styles.logo}
                    source={require('../Assets/Images/chi.png')}
                />
            </View>
        )
    }
};

var styles = StyleSheet.create({
    logo: {
        width: 70,
        height: 70,
    }
});

module.exports = ScoresPage;
