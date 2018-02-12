import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class GameCell extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Game </Text>
      </View>
    );
  }
}
