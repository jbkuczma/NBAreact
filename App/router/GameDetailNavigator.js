import { TabNavigator } from 'react-navigation'
import TeamStats from '../components/GameDetailScreen/TeamStats'
import BoxScore from '../components/GameDetailScreen/BoxScore'
import PlayByPlay from '../components/GameDetailScreen/PlayByPlay'


export const GameDetailNavigator = TabNavigator({
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
