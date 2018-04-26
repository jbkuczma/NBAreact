import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import NBA from '../../../utils/nba'
import TeamMap from '../../../utils/TeamMap'

class TeamStatsTable extends Component<Props> {

  createStatHeaderMapArray(team) {
    return [
      `${team.totals.fgm}-${team.totals.fga}`,
      `${team.totals.fgp}%`,
      `${team.totals.ftm}-${team.totals.fta}`,
      `${team.totals.ftp}%`,
      `${team.totals.tpm}-${team.totals.tpa}`,
      `${team.totals.tpp}%`,
      `${team.totals.assists}`,
      `${team.totals.totReb}`,
      `${team.totals.offReb}`,
      `${team.totals.turnovers}`,
      `${team.totals.steals}`,
      `${team.totals.blocks}`,
      `${team.fastBreakPoints}`,
      `${team.pointsInPaint}`,
      `${team.pointsOffTurnovers}`,
      `${team.biggestLead}`
    ]
  }

  createStatHeaderColorMapArray(awayTeam, homeTeam, awayTeamColor, homeTeamColor) {
    return [
      parseInt(homeTeam.totals.fgm)         > parseInt(awayTeam.totals.fgm)         ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.totals.fgp)         > parseInt(awayTeam.totals.fgp)         ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.totals.ftm)         > parseInt(awayTeam.totals.ftm)         ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.totals.ftp)         > parseInt(awayTeam.totals.ftp)         ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.totals.tpm)         > parseInt(awayTeam.totals.tpm)         ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.totals.tpp)         > parseInt(awayTeam.totals.tpp)         ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.totals.assists)     > parseInt(awayTeam.totals.assists)     ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.totals.totReb)      > parseInt(awayTeam.totals.totReb)      ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.totals.offReb)      > parseInt(awayTeam.totals.offReb)      ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.totals.turnovers)   < parseInt(awayTeam.totals.turnovers)   ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.totals.steals)      > parseInt(awayTeam.totals.steals)      ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.totals.blocks)      > parseInt(awayTeam.totals.blocks)      ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.fastBreakPoints)    > parseInt(awayTeam.fastBreakPoints)    ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.pointsInPaint)      > parseInt(awayTeam.pointsInPaint)      ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.pointsOffTurnovers) > parseInt(awayTeam.pointsOffTurnovers) ? homeTeamColor : awayTeamColor,
      parseInt(homeTeam.biggestLead)        > parseInt(awayTeam.biggestLead)        ? homeTeamColor : awayTeamColor
    ]
  }

  _renderRows() {
    const {
      awayTeamColor,
      homeTeamColor
    } = this.props

    const statHeader = ['FG', 'FG%', 'FT', 'FT%', '3PT', '3PT%', 'ASSISTS', 'REBOUNDS', 'OFF REBOUNDS', 'TOV', 'STEALS', 'BLOCKS', 'FAST BREAK PTS', 'PTS IN PAINT', 'PTS OFF TOV', 'BIGGEST LEAD']
    const awayTeamStatMap = this.createStatHeaderMapArray(this.props.stats.vTeam)
    const homeTeamStatMap = this.createStatHeaderMapArray(this.props.stats.hTeam)
    const colorMap = this.createStatHeaderColorMapArray(this.props.stats.vTeam, this.props.stats.hTeam, awayTeamColor, homeTeamColor)

    return (
      statHeader.map((header, index) => {
        return (
          <View style={{ flex: 1, flexDirection: 'row', height: 30, marginTop: 7 }} key={index}>
            <View style={{ flex: 1, borderLeftWidth: 3, borderLeftColor: colorMap[index], marginBottom: 14 }}>
              <Text style={styles.text}> {header} </Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}> {awayTeamStatMap[index]} </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}> {homeTeamStatMap[index]} </Text>
              </View>
            </View>
          </View>
        )
      })
    )
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', marginTop: 10 }}>
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
        <View style={{ flex: 1, marginTop: 5 }}>
          { this._renderRows() }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#D3D3D3',
    // fontFamily: 'Rubik-Light'
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
