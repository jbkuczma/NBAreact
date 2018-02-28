import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class TeamScreen extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Teams </Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamScreen)
