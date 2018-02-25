import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import NBA from '../../../utils/nba'
import TeamMap from '../../../utils/TeamMap'
import LeadTracker from './LeadTracker'
import TeamStatsTable from './TeamStatsTable'

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
        teamStats: gameStats[0].stats ? gameStats[0].stats : null,
        leadTracker: gameStats[1],
        miniBoxscore: gameStats[2],
        loading: false
      })
    })
  }

  _renderQuarterScoresChart() {
    const homeWins = this.state.miniBoxscore.basicGameData.hTeam.win
    const homeLosses = this.state.miniBoxscore.basicGameData.hTeam.loss
    const awayWins = this.state.miniBoxscore.basicGameData.vTeam.win
    const awayLosses = this.state.miniBoxscore.basicGameData.vTeam.loss
    const awayTeamColor = TeamMap[this.props.awayTeam.abbreviation.toLowerCase()] ? TeamMap[this.props.awayTeam.abbreviation.toLowerCase()].color : '#1C3F80'
    const homeTeamColor = TeamMap[this.props.homeTeam.abbreviation.toLowerCase()] ? TeamMap[this.props.homeTeam.abbreviation.toLowerCase()].color : '#BE0E2C'

    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* Header */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          {
            // space for team name in header
            [' ', 'Q1', 'Q2', 'Q3', 'Q4', 'T'].map((quarter) => {
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: awayTeamColor }}>
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: homeTeamColor }}>
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

  _renderGameStatus() {
    const gameStatus = this.state.miniBoxscore.basicGameData.clock && this.state.miniBoxscore.basicGameData.period.current != 0 ?
      `Q${this.state.miniBoxscore.basicGameData.period.current} ${this.state.miniBoxscore.basicGameData.clock}`
    :
      !this.state.miniBoxscore.basicGameData.clock && this.state.miniBoxscore.basicGameData.period.current === 4 ?
        `Final`
      :
        !this.state.miniBoxscore.basicGameData.clock && this.state.miniBoxscore.basicGameData.period.isHalftime ?
          `Halftime`
        :
          ` ` // game hasn't started
    return (
      <Text style={styles.text}> {gameStatus} </Text>
    )
  }

  render() {
    console.log(this.state)
    const awayTeamColor = TeamMap[this.props.awayTeam.abbreviation.toLowerCase()] ? TeamMap[this.props.awayTeam.abbreviation.toLowerCase()].color : '#1C3F80'
    const homeTeamColor = TeamMap[this.props.homeTeam.abbreviation.toLowerCase()] ? TeamMap[this.props.homeTeam.abbreviation.toLowerCase()].color : '#BE0E2C'

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
          (this.state.teamStats && this.state.teamStats && this.state.leadTracker && this.state.miniBoxscore) &&

          <ScrollView contentContainerStyle={styles.teamStatsContainer}>
            {/* <View style={{ flex: 1.5, flexDirection: 'row', marginBottom: 10 }}> */}
            <View style={{ height: 120, flexDirection: 'row', marginBottom: 10 }}>
              <View style={styles.teamQuarterScores}>
                <View style={styles.teamQuarterHeader}>
                  { this._renderGameStatus() }
                </View>
                <View style={styles.teamQuarterChart}>
                  {this._renderQuarterScoresChart()}
                </View>
              </View>
            </View>
            <View style={styles.leadTracker}>
              <View style={styles.leadTrackerHeader}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center', color: '#D3D3D3', fontSize: 18 }}> Lead Tracker </Text>
                </View>
                <LeadTracker
                  homeTeamID={this.props.homeTeam.teamID}
                  awayTeamID={this.props.awayTeam.teamID}
                  homeTeamColor={homeTeamColor}
                  awayTeamColor={awayTeamColor}
                  leadtracker={this.state.leadTracker}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ textAlign: 'center', color: '#D3D3D3', fontSize: 18 }}> Times Tied: {this.state.teamStats.timesTied} </Text>
                  <Text style={{ textAlign: 'center', color: '#D3D3D3', fontSize: 18 }}> Lead Changes: {this.state.teamStats.leadChanges} </Text>
                </View>
              </View>
            </View>
            <View style={styles.teamComparison}>
              <TeamStatsTable
                awayTeamColor={awayTeamColor}
                homeTeamColor={homeTeamColor}
                stats={this.state.teamStats}
              />
            </View>
          </ScrollView>
        }
        {
          (!this.state.loading && (!this.state.teamStats || !this.state.teamStats || !this.state.leadTracker || !this.state.miniBoxscore)) &&
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.text}> Teams stats avaliable after tip off </Text>
          </View>
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
    // flex: 1,
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
    // flex: 3
    height: 260,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  leadTrackerHeader: {
    flex: 1,
    justifyContent: 'center'
  },
  /******************/
  /* team comparison */
  teamComparison: {
    flex: 1,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderTopWidth: 1,
    borderTopColor: '#D3D3D3',
    flexDirection: 'row'
  },
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
