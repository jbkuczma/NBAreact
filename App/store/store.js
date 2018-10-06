import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import NBA from '../reducers'
import NBAsagas from '../sagas'

const sagaMiddeleware = createSagaMiddleware()

const store = createStore(
  NBA,
  applyMiddleware(logger),
  applyMiddleware(sagaMiddeleware),
)

sagaMiddeleware.run(NBAsagas)

export default store
