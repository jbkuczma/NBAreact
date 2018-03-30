import React from 'react'
import {
  AppRegistry
} from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import NBA from './App/reducers'

import { getFormattedDate } from './App/utils/date'

const store = createStore(
  NBA,
  applyMiddleware(logger),
  applyMiddleware(thunk)
)

if(__DEV__) {
  console.disableYellowBox = true
  console.log(store.getState())
}

import NBAreact from './App/NBAreact'

const App = () => {
  return (
    <Provider store={store}>
      <NBAreact />
    </Provider>
  )
}

export default App

AppRegistry.registerComponent('Swish', () => App)
