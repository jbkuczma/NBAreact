import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import NBA from '../../../utils/nba'
import TeamMap from '../../../utils/TeamMap'

class TeamStatsTable extends Component<Props> {
  render() {
    console.log(this.props.stats)
    return (
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 10, backgroundColor: 'blue' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.text}> Stats </Text>
          </View>
          <View style={{ flex: 2, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}> {this.props.awayTeam.abbreviation} </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.text}> {this.props.homeTeam.abbreviation} </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.text}> row </Text>
          <Text style={styles.text}> row </Text>
          <Text style={styles.text}> row </Text>
          <Text style={styles.text}> row </Text>
          <Text style={styles.text}> row </Text>
          <Text style={styles.text}> row </Text>
          <Text style={styles.text}> row </Text>
          <Text style={styles.text}> row </Text>
          <Text style={styles.text}> row </Text>
          <Text style={styles.text}> row </Text>
          <Text style={styles.text}> row </Text>
          <Text style={styles.text}> row </Text>
          <Text style={styles.text}> row </Text>
          <Text style={styles.text}> row </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#D3D3D3'
  }
})

function mapStateToProps(state) {
  return {
    gameID: state.scores.selectedGame.gameID,
    awayTeam: state.scores.selectedGame.awayTeam,
    homeTeam: state.scores.selectedGame.homeTeam,
    date: state.date.date
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamStatsTable)
