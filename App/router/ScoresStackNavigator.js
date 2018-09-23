import { StackNavigator } from 'react-navigation'
import ScoresScreen from '../components/ScoresScreen'
import { GameDetailNavigator } from './GameDetailNavigator'
import { defaultNavigationOptions } from './routerDefaults'

export const ScoresStack = StackNavigator({
  Home: {
    screen: ScoresScreen,
    navigationOptions: { header: null }
  },
  Game: {
    screen: GameDetailNavigator,
    navigationOptions: defaultNavigationOptions
  }
})
