import { StackNavigator } from 'react-navigation'
import PlayerScreen from '../components/PlayerScreen'
import PlayerGameDetailScreen from '../components/PlayerGameDetailScreen'
import LeagueLeaders from '../components/LeagueLeaders'
import { defaultNavigationOptions } from './routerDefaults.js'

export const LeagueLeadersStack = StackNavigator({
  Home: {
    screen: LeagueLeaders,
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
