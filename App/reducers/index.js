import { combineReducers } from 'redux'
import scores from './scores.reducers'
import date from './date.reducers'
import league from './league.reducers'
import team from './team.reducers'

const NBA = combineReducers({
  scores,
  date,
  league,
  team
})

export default NBA
