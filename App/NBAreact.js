import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation'

import ScoresScreen from './components/ScoresScreen'
import GameDetailScreen from './components/GameDetailScreen'
import StandingsScreen from './components/StandingsScreen'
import TeamScreen from './components/TeamScreen'
import PlayerScreen from './components/PlayerScreen'
import PlayerGameDetailScreen from './components/PlayerGameDetailScreen'
import TeamStats from './components/GameDetailScreen/TeamStats'
import BoxScore from './components/GameDetailScreen/BoxScore'
import PlayByPlay from './components/GameDetailScreen/PlayByPlay'
import LeagueLeaders from './components/LeagueLeaders'

import SearchBar from './components/common/SearchBar'

const defaultNavigationOptions = {
  headerTintColor: '#D3D3D3',
  headerStyle: {
    backgroundColor: '#171717',
    borderBottomWidth: 0
  },
  headerTitleStyle: {
    fontSize: 18,
  }
}

const GameDetailNavigator = TabNavigator({
  'Team Stats': { screen: TeamStats },
  'Boxscore': { screen: BoxScore },
  'Play by Play': { screen: PlayByPlay }
}, {
  tabBarPosition: 'top',
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: '#FFFFFF',
    inactiveTintColor: '#777777',
    inactiveBackgroundColor: '#151516',
    activeBackgroundColor: '#171717',
    showIcon: false,
    indicatorStyle: {
      borderBottomColor: '#F7971E',
      borderBottomWidth: 2,
    },
    labelStyle:{
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    style:{
      backgroundColor: '#111111'
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
    navigationOptions: defaultNavigationOptions
  }
})

const StandingsStack = StackNavigator({
  Home: {
    screen: StandingsScreen,
    navigationOptions: { header: null }
  },
  Team: {
    screen: TeamScreen,
    navigationOptions: defaultNavigationOptions
  },
  Player: {
    screen: PlayerScreen,
    navigationOptions: defaultNavigationOptions
  },
  Game: {
    screen: GameDetailNavigator,
    navigationOptions: defaultNavigationOptions
  },
  PlayerGameDetail: {
    screen: PlayerGameDetailScreen,
    navigationOptions: defaultNavigationOptions
  }
})

const LeagueLeadersStack = StackNavigator({
  Home: {
    screen: LeagueLeaders,
    navigationOptions: {
      headerStyle: {
        // backgroundColor: '#111111'
      }
    }
  },
  Player: {
    screen: PlayerScreen,
    navigationOptions: defaultNavigationOptions
  },
  PlayerGameDetail: {
    screen: PlayerGameDetailScreen,
    navigationOptions: defaultNavigationOptions
  }
})

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
        iconName = require('./Assets/icons/scoreboard.png')
      } else if (routeName === 'Standings') {
        iconName = require('./Assets/icons/trophy.png')
      } else if (routeName === 'Leaders') {
        iconName = require('./Assets/icons/bars.png')
        iconStyle = { height: 28, width: 28 }
      }

      return <Image source={iconName} style={[ iconStyle, { tintColor: tintColor }]} />
    },

    // NOTE: this works as intended however there are side effects that I'm not comfortable releasing yet
    // tabBarOnPress: ({ scene, jumpToIndex }) => {
    //   const { route, focused, index } = scene
    //   if (focused) {
    //     if (route.index > 0) {
    //       const { routeName, key } = route.routes[1]
    //       navigation.dispatch(
    //         NavigationActions.back({ key })
    //       )
    //     }
    //   } else {
    //     jumpToIndex(index)
    //   }
    // },
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
