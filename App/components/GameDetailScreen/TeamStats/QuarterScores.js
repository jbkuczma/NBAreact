import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TeamMap from '../../../utils/TeamMap'
import Loader from '../../common/Loader'

class QuarterScores extends Component<Props> {

  constructor() {
    super()
  }

  _renderQuarterScores(data, teamColor, renderBottom=false) {
    const linescoreData = data.linescore
    const teamAbbreviation = data.triCode
    const teamTotalScore = data.score
    const linescores = linescoreData.length > 0 ? linescoreData : [{ score: 0}, { score: 0}, { score: 0}, { score: 0},]
    const borderBottomWidth = renderBottom ? 1 : 0

    return (
      <View style={{ flex: 1, flexDirection: 'row', borderBottomColor: '#D1D1D1', borderBottomWidth: borderBottomWidth }}>
        <View style={[ styles.defaultCenteredView, { backgroundColor: teamColor } ]}>
          <Text style={styles.text}> { teamAbbreviation } </Text>
        </View>
        {
          linescores.map((quarter, index) => {
            return (
              <View style={styles.defaultCenteredView} key={index}>
                <Text style={styles.text}> {quarter.score} </Text>
              </View>
            )
          })
        }
        <View style={styles.defaultCenteredView}>
          <Text style={styles.text}> {teamTotalScore || 0} </Text>
        </View>
      </View>
    )
  }

  _renderQuarterScoresChart() {
    const homeWins = this.props.miniBoxscore.basicGameData.hTeam.win
    const homeLosses = this.props.miniBoxscore.basicGameData.hTeam.loss
    const awayWins = this.props.miniBoxscore.basicGameData.vTeam.win
    const awayLosses = this.props.miniBoxscore.basicGameData.vTeam.loss
    const awayTeamColor = TeamMap[this.props.awayTeam.abbreviation.toLowerCase()] ? TeamMap[this.props.awayTeam.abbreviation.toLowerCase()].color : '#1C3F80'
    const homeTeamColor = TeamMap[this.props.homeTeam.abbreviation.toLowerCase()] ? TeamMap[this.props.homeTeam.abbreviation.toLowerCase()].color : '#BE0E2C'

    // space for team name in header
    let miniBoxscoreHeader = [' ', 'Q1', 'Q2', 'Q3', 'Q4', 'T']

    if (this.props.miniBoxscore.basicGameData.vTeam.linescore.length > 4 && this.props.miniBoxscore.basicGameData.hTeam.linescore.length > 4) {
      const numberOfPeriods = this.props.miniBoxscore.basicGameData.vTeam.linescore.length
      const numberOfOvertimes = numberOfPeriods - 4
      // Q4 is at index 4
      let overtimePeriodArrayIndex = 5

      for (overtimePeriod = 1; overtimePeriod <= numberOfOvertimes; overtimePeriod++) {
        const overtimePeriodString = `OT${overtimePeriod}`
        // insert overtime string at specific index, remove 0 items from array while inserting
        miniBoxscoreHeader.splice(overtimePeriodArrayIndex, 0, overtimePeriodString)
        overtimePeriodArrayIndex+=1
      }
    }

    return (
      <View style={[ styles.defaultCenteredView, { flexDirection: 'column' }]}>
        {/* Header */}
        <View style={[ styles.defaultCenteredView, { flexDirection: 'row' }]}>
          {
            miniBoxscoreHeader.map((quarter, index) => {
              return (
                <View style={styles.defaultCenteredView} key={index}>
                  <Text style={styles.text}> {quarter} </Text>
                </View>
              )
            })
          }
        </View>
        {/* End Header */}
        {/* Away Quarter Scores */}
        { this._renderQuarterScores(
            this.props.miniBoxscore.basicGameData.vTeam,
            awayTeamColor,
            renderBottom=true
          )
        }
        {/* End Away Quarter Scores */}
        {/* Home Quarter Scores */}
        { this._renderQuarterScores(
            this.props.miniBoxscore.basicGameData.hTeam,
            homeTeamColor
          )
        }
        {/* End Home Quarter Scores */}
      </View>
    )
  }

  _renderGameStatus() {
    const gameStatus = this.props.miniBoxscore.basicGameData.clock && this.props.miniBoxscore.basicGameData.period.current != 0 ?
      `Q${this.props.miniBoxscore.basicGameData.period.current} ${this.props.miniBoxscore.basicGameData.clock}`
    :
      !this.props.miniBoxscore.basicGameData.clock && this.props.miniBoxscore.basicGameData.period.current === 4 ?
        `Final`
      :
        !this.props.miniBoxscore.basicGameData.clock && this.props.miniBoxscore.basicGameData.period.isHalftime ?
          `Halftime`
        :
          ` ` // game hasn't started
    return (
      <Text style={styles.text}> {gameStatus} </Text>
    )
  }

  render() {
    const awayTeamColor = TeamMap[this.props.awayTeam.abbreviation.toLowerCase()] ? TeamMap[this.props.awayTeam.abbreviation.toLowerCase()].color : '#1C3F80'
    const homeTeamColor = TeamMap[this.props.homeTeam.abbreviation.toLowerCase()] ? TeamMap[this.props.homeTeam.abbreviation.toLowerCase()].color : '#BE0E2C'

    return (
      <View style={{ height: 120, flexDirection: 'row', marginBottom: 10 }}>
        <View style={styles.teamQuarterScores}>
          <View style={styles.teamQuarterHeader}>
            { this._renderGameStatus() }
          </View>
          <View style={styles.teamQuarterChart}>
            { this._renderQuarterScoresChart() }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#D3D3D3'
  },
  defaultCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
)(QuarterScores)
