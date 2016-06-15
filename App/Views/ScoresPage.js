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

    render() {
        return(
            <View>
                <Text>
                    hi how are ya
                </Text>
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
