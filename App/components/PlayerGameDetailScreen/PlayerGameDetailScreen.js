import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Loader from '../common/Loader'
import { connect } from 'react-redux'
import NBA from '../../utils/nba'

class PlayerGameDetailScreen extends Component<Props> {

  constructor() {
    super()
    this.state = {
      loading: false,
    }
  }

  render() {
    return (
      <View style={[styles.defaultCenteredView, { backgroundColor: '#111111'}]}>
        {
          this.state.loading &&
          <Loader />
        }
        <Text> player detail </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  defaultCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

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
)(PlayerGameDetailScreen)
