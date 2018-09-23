import { StackNavigator } from 'react-navigation'
import StandingsScreen from '../components/StandingsScreen'
import TeamScreen from '../components/TeamScreen'
import PlayerScreen from '../components/PlayerScreen'
import PlayerGameDetailScreen from '../components/PlayerGameDetailScreen'
import { GameDetailNavigator } from './GameDetailNavigator'
import { defaultNavigationOptions } from './routerDefaults'

export const StandingsStack = StackNavigator({
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
