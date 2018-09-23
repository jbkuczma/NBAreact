import React from 'react'
import {
  AppRegistry
} from 'react-native'
import { Provider } from 'react-redux'
import NBAreact from './App/NBAreact'
import store from './App/store'

if(__DEV__) {
  console.disableYellowBox = true
  console.log(store.getState())
}

const App = () => {
  return (
    <Provider store={store}>
      <NBAreact />
    </Provider>
  )
}

export default App

AppRegistry.registerComponent('Swish', () => App)
