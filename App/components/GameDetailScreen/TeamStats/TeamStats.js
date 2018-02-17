import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import NBA from '../../../utils/nba'

class TeamStats extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
      teamStats: null,
      leadTracker: [],
      miniBoxscore: null,
      loading: true
    }
  }

  componentDidMount() {
    this.fetchGameStats()
  }

  fetchGameStats() {
    Promise.all([
      this.nba.getBoxscore(this.props.gameID, this.props.date),
      this.nba.getLeadTrackerForGame(this.props.gameID, this.props.date),
      this.nba.getMiniBoxscore(this.props.gameID, this.props.date)
    ])
    .then((gameStats) => {
      this.setState({
        teamStats: gameStats[0].stats ? gameStats[0].stats : {},
        leadTracker: gameStats[1],
        miniBoxscore: gameStats[2],
        loading: false
      })
    })
  }

  _renderQuarterScoresChart() {
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>
          {
            this.state.miniBoxscore.basicGameData.vTeam.linescore.map((quarter) => {
              return (
                <Text style={styles.text}> {quarter.score} </Text>
              )
            })
          }
          <View style={{ flex: 1 }}>
            <Text style={styles.text}> {this.state.miniBoxscore.basicGameData.vTeam.score} </Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {
            this.state.miniBoxscore.basicGameData.hTeam.linescore.map((quarter) => {
              return (
                <Text style={styles.text}> {quarter.score} </Text>
              )
            })
          }
          <Text style={styles.text}> {this.state.miniBoxscore.basicGameData.hTeam.score} </Text>
        </View>
      </View>
    )
  }

  render() {
    console.log(this.state)
    return (
      <View style={{ flex: 1, backgroundColor: '#111111' }}>
        {
          this.state.loading &&
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator
              size="large"
              color="#F7971E"
            />
          </View>
        }
        {
          (this.state.teamStats && this.state.leadTracker && this.state.miniBoxscore) &&

          <ScrollView contentContainerStyle={styles.teamStatsContainer}>
            <View style={styles.teamQuarterScores}>
              <View style={styles.teamQuarterHeader}>
                <Text style={styles.text}> Time in game (?) </Text>
              </View>
              <View style={styles.teamQuarterHeader}>
                {/*
                away
                home
                */}
                {this._renderQuarterScoresChart()}
              </View>
            </View>
            <View style={styles.leadTracker}>
              <View style={styles.leadTrackerHeader}>
                <Text style={styles.text}> Lead Tracker </Text>
              </View>
              <View style={styles.leadTrackerHeader}>
                <Text style={styles.text}> Chart </Text>
              </View>
              <View style={styles.leadTrackerHeader}>
                {/* <Text style={styles.text}> Times Tied: {this.state.teamStats.timesTied} </Text>
                <Text style={styles.text}> Lead Changes: {this.state.teamStats.leadChangs} </Text> */}
              </View>
              <View style={styles.leaedTrackerChart}>

              </View>
            </View>
            <View style={styles.teamComparison}>
              <View style={styles.teamComparisonHeader}>
                <Text style={styles.text}> Team stats </Text>
              </View>
            </View>
          </ScrollView>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#D3D3D3'
  },
  teamStatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#111111'
  },
  teamQuarterScores: {
    flex: 1,
    backgroundColor: 'yellow',
    flexDirection: 'column'
  },
  leadTracker: {
    flex: 2,
    backgroundColor: 'orange',
    flexDirection: 'row'
  },
  teamQuarterHeader: {
    flex: 1,
    justifyContent: 'center'
  },
  leadTrackerHeader: {
    flex: 1,
    justifyContent: 'center'
  },
  teamComparison: {
    flex: 2,
    backgroundColor: 'red',
    flexDirection: 'row'
  },
  teamComparisonHeader: {
    flex: 1,
    justifyContent: 'center'
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
)(TeamStats)
