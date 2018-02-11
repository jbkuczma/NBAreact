import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class ScoresScreen extends Component<Props> {
    render() {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text> Scores </Text>
        </View>
        );
    }
}