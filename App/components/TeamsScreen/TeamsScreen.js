import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class TeamsScreen extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Teams </Text>
      </View>
    );
  }
}