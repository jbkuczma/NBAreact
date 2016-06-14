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

  render() {
      return(
          <View style={styles.dateContainer}>
                <Text style={styles.dateText}> {this.getDate()} </Text>
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
        marginTop: 20,
        color: '#FFFFFF',
    }
});

module.exports = Date;
