import { combineReducers } from 'redux'
import scores from './scores'
import date from './date'
import league from './league'

const NBA = combineReducers({
  scores,
  date,
  league
})

export default NBA
