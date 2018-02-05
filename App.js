import React from 'react'
import {
  AppRegistry
} from 'react-native'

import NBAreact from './App/NBAreact'

const App = () => {
  return (
    <NBAreact />
  )
}

export default App

AppRegistry.registerComponent('NBAreact', () => App)