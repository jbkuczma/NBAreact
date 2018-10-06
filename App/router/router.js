import React from 'react'
import { Image } from 'react-native'
import { TabNavigator, NavigationActions } from 'react-navigation'
import { ScoresStack } from './ScoresStackNavigator'
import { StandingsStack } from './StandingsStackNavigator'
import { LeagueLeadersStack } from './LeagueLeadersStackNavigator.js'

export default TabNavigator({
  Scores: { screen: ScoresStack },
  Standings: { screen: StandingsStack },
  Leaders: { screen: LeagueLeadersStack }
},{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state
      let iconName
      let iconStyle = { height: 42, width: 42 }
      if (routeName === 'Scores') {
        iconName = require('../Assets/icons/scoreboard.png')
      } else if (routeName === 'Standings') {
        iconName = require('../Assets/icons/trophy.png')
      } else if (routeName === 'Leaders') {
        iconName = require('../Assets/icons/bars.png')
        iconStyle = { height: 28, width: 28 }
      }

      return <Image source={iconName} style={[ iconStyle, { tintColor: tintColor }]} />
    },
    tabBarOnPress: ({ scene, jumpToIndex }) => {
      const { route, focused, index } = scene
      if (focused) {
        if (route.index > 0) {
          const { routeName, key } = route.routes[1]
          navigation.dispatch(
            NavigationActions.back({ key })
          )
        }
      } else {
        jumpToIndex(index)
      }
    },
  }),
  tabBarOptions: {
    activeTintColor: '#F7971E',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: '#171717',
    }
  },
  tabBarPosition: 'bottom'
})
