import { combineReducers } from 'redux'
import scores from './scores'
import date from './date'

const NBA = combineReducers({
  scores,
  date
})

export default NBA
