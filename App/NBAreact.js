// import React, { Component } from 'react'
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native'

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// })

// type Props = {};
// export default class NBAreact extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// })

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'

import ScoresScreen from './components/ScoresScreen'
import GameDetailScreen from './components/GameDetailScreen'
import StandingsScreen from './components/StandingsScreen'
import TeamsScreen from './components/TeamsScreen'
import BoxScore from './components/GameDetailScreen/BoxScore'
import PlayByPlay from './components/GameDetailScreen/PlayByPlay'

const GameDetailNavigator = TabNavigator({
  BoxScore: { screen: BoxScore },
  PlayByPlay: { screen: PlayByPlay }
}, {
  tabBarPosition: 'top',
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#ffffff',
    inactiveTintColor: '#cccccc',
    inactiveBackgroundColor: '#151516',
    activeBackgroundColor: '#151516',
    showIcon: false,
    indicatorStyle: {
      borderBottomColor: '#F7971E',
      borderBottomWidth: 2,
    },
    labelStyle:{
      fontSize: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    style:{
      backgroundColor: '#1F1F22',
    },
    tabStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    }
  },
})

const ScoresStack = StackNavigator({
  Home: {
    screen: ScoresScreen,
    navigationOptions: { header: null }
  },
  Game: {
    screen: GameDetailNavigator,
    navigationOptions: {
      headerTintColor: '#D3D3D3',
      headerStyle: {
        backgroundColor: '#1F1F22',
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        fontSize: 18,
      }
    }
  }
})

export default TabNavigator({
  Scores: { screen: ScoresStack },
  Standings: { screen: StandingsScreen },
  Teams: { screen: TeamsScreen }
},{
  tabBarOptions: {
    activeTintColor: '#F7971E',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: '#242424',
    }
  },
})
