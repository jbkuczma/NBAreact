import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import NBA from '../../../utils/nba'

class TeamStats extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {

    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> { this.props.gameID } </Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    gameID: state.scores.selectedGame
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamStats)
