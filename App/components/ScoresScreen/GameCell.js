import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class GameCell extends Component<Props> {
  render() {
    console.log(this.props.game)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> test </Text>
      </View>
    )
  }
}
