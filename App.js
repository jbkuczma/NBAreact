import React from 'react'
import {
  AppRegistry
} from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import NBA from './App/reducers'

import { getFormattedDate } from './App/utils/date'

const store = createStore(
  NBA
)

console.log(store.getState())
console.disableYellowBox = true // for development

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
