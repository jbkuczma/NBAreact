import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class BoxScore extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> BoxScore </Text>
      </View>
    )
  }
}

