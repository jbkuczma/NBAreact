import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import NBA from '../reducers'

const store = createStore(
  NBA,
  applyMiddleware(logger),
  applyMiddleware(thunk)
)

export default store
