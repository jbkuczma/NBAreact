import React, {Component,} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';

// import moment from 'moment-timezone';
import moment from 'moment';

class Date extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            numberOfGames: 0,
            loaded: false,
        }
    }

    componentWillMount(){
        this.fetchGames();
    }

    getDate(){
        var date1 = moment().format('LLLL');
        date1 = date1.split(' ');
        var day = date1[0].replace(',','');
        var dayNum = date1[2].replace(',','');
        var month = date1[1];
        var combinedDate = day + ', ' + month + ' ' + dayNum
        return combinedDate;
    }


    fetchGames(){
        var date = moment().format('L');
        date = date.split('/');
        var month = date[0];
        var day = date[1];
        var year = date[2];
        // date = year+month+day; //actual
        date= '20160101'; //for dev
        // date='20160616';
        var url = 'http://data.nba.com/data/1h/json/cms/noseason/scoreboard/'+date+'/games.json';
        fetch(url)
        .then((response) => response.json())
        .then((jsonResponse) => {
            if(jsonResponse['sports_content']['games']['game']){
                var games = jsonResponse['sports_content']['games']['game'];
                console.log(games);
                this.setState({
                    numberOfGames: games.length,
                    loaded: true,
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }



  render() {
      console.log(this.state.numberOfGames);
      return(
        <View style={styles.dateContainer}>
            <Text style={styles.dateText}> {this.getDate()} </Text>
            <Text style={styles.numberOfGamesText}>
                {!this.state.loaded ? 'Checking number of games' :
                    (() => {
                        switch(this.state.numberOfGames === 0){
                            case true: return "There are no games today";
                            case false: switch(this.state.numberOfGames === 1){
                                case true: return "There is 1 game today";
                                case false: return "There are " + this.state.numberOfGames + " games today";
                            }
                        }
                    })()
                }
            </Text>
        </View>
      )
  }
};

var styles = StyleSheet.create({
    dateContainer: {
        // backgroundColor: '#E66840',
        backgroundColor: '#FF5722',
        padding: 35,
    },
    dateText: {
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    numberOfGamesText: {
        fontSize: 12,
        marginTop: 10,
        textAlign: 'center',
        color: '#FFFFFF',
    },
});

module.exports = Date;
