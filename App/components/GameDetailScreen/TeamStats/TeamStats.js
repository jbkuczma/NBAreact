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
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* Header */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {
            // space for team name header
            [' ', 'Q1', 'Q2', 'Q3', 'Q4', 'Final'].map((quarter) => {
              return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.text}> {quarter} </Text>
                </View>
              )
            })
          }
        </View>
        {/* End Header */}
        {/* Away Quarter Scores */}
        <View style={{ flex: 1, flexDirection: 'row', borderBottomColor: '#D1D1D1', borderBottomWidth: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}> {this.state.miniBoxscore.basicGameData.vTeam.triCode} </Text>
          </View>
          {
            this.state.miniBoxscore.basicGameData.vTeam.linescore.length > 0 ?
              this.state.miniBoxscore.basicGameData.vTeam.linescore.map((quarter) => {
                return (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}> {quarter.score} </Text>
                  </View>
                )
              })
            :
              [0, 0, 0, 0].map((value) => {
                return (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}> {value} </Text>
                  </View>
                )
              })
          }
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}> {this.state.miniBoxscore.basicGameData.vTeam.score || 0} </Text>
          </View>
        </View>
        {/* End Away Quarter Scores */}
        {/* Home Quarter Scores */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}> {this.state.miniBoxscore.basicGameData.hTeam.triCode} </Text>
          </View>
          {
            this.state.miniBoxscore.basicGameData.hTeam.linescore.length > 0 ?
              this.state.miniBoxscore.basicGameData.hTeam.linescore.map((quarter) => {
                return (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}> {quarter.score} </Text>
                  </View>
                )
              })
            :
              [0, 0, 0, 0].map((value) => {
                return (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}> {value} </Text>
                  </View>
                )
              })
          }
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.text}> {this.state.miniBoxscore.basicGameData.hTeam.score || 0} </Text>
          </View>
        </View>
        {/* End Home Quarter Scores */}
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
            <View style={{ flex: 1.5, flexDirection: 'row', marginBottom: 10 }}>
              <View style={styles.teamQuarterScores}>
                <View style={styles.teamQuarterHeader}>
                  <Text style={styles.text}> Time in game (?) </Text>
                </View>
                <View style={styles.teamQuarterChart}>
                  {/*
                  away
                  home
                  */}
                  {this._renderQuarterScoresChart()}
                </View>
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
  /* quarter scores */
  teamQuarterScores: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10
  },
  teamQuarterHeader: {
    flex: 1,
    justifyContent: 'center'
  },
  teamQuarterChart: {
    flex: 2,
    justifyContent: 'center'
  },
  /******************/
  /* lead tracker chart */
  leadTracker: {
    flex: 2,
    backgroundColor: 'orange',
    flexDirection: 'row'
  },
  leadTrackerHeader: {
    flex: 1,
    justifyContent: 'center'
  },
  /******************/
  /* team comparison */
  teamComparison: {
    flex: 2,
    backgroundColor: 'red',
    flexDirection: 'row'
  },
  teamComparisonHeader: {
    flex: 1,
    justifyContent: 'center'
  }
  /******************/
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
