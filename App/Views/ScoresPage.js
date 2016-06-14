import React, {Component,} from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

class ScoresPage extends React.Component {
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
