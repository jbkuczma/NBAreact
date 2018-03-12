import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import NBA from '../../../utils/nba'
import TeamMap from '../../../utils/TeamMap'

class TeamStatsTable extends Component<Props> {

  _renderRows() {
    const {
      awayTeamColor,
      homeTeamColor
    } = this.props

    const statHeader = ['FG', 'FG%', 'FT', 'FT%', '3PT', '3PT%', 'ASSISTS', 'REBOUNDS', 'OFF REBOUNDS', 'TOV', 'STEALS', 'BLOCKS', 'FAST BREAK PTS', 'PTS IN PAINT', 'PTS OFF TOV', 'BIGGEST LEAD']
    const statHeaderMapping = [
      {
        home: `${this.props.stats.hTeam.totals.fgm}-${this.props.stats.hTeam.totals.fga}`,
        away: `${this.props.stats.vTeam.totals.fgm}-${this.props.stats.vTeam.totals.fga}`,
        color: this.props.stats.hTeam.totals.fgm > this.props.stats.vTeam.totals.fgm ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.totals.fgp}%`,
        away: `${this.props.stats.vTeam.totals.fgp}%`,
        color: this.props.stats.hTeam.totals.fgp > this.props.stats.vTeam.totals.fgp ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.totals.ftm}-${this.props.stats.hTeam.totals.fta}`,
        away: `${this.props.stats.vTeam.totals.ftm}-${this.props.stats.vTeam.totals.fta}`,
        color: this.props.stats.hTeam.totals.ftm > this.props.stats.vTeam.totals.ftm ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.totals.ftp}%`,
        away: `${this.props.stats.vTeam.totals.ftp}%`,
        color: this.props.stats.hTeam.totals.ftp > this.props.stats.vTeam.totals.ftp ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.totals.tpm}-${this.props.stats.hTeam.totals.tpa}`,
        away: `${this.props.stats.vTeam.totals.tpm}-${this.props.stats.vTeam.totals.tpa}`,
        color: this.props.stats.hTeam.totals.tpm > this.props.stats.vTeam.totals.tpm ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.totals.tpp}%`,
        away: `${this.props.stats.vTeam.totals.tpp}%`,
        color: this.props.stats.hTeam.totals.tpp > this.props.stats.vTeam.totals.tpp ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.totals.assists}`,
        away: `${this.props.stats.vTeam.totals.assists}`,
        color: this.props.stats.hTeam.totals.assists > this.props.stats.vTeam.totals.assists ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.totals.totReb}`,
        away: `${this.props.stats.vTeam.totals.totReb}`,
        color: this.props.stats.hTeam.totals.totReb > this.props.stats.vTeam.totals.totReb ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.totals.offReb}`,
        away: `${this.props.stats.vTeam.totals.offReb}`,
        color: this.props.stats.hTeam.totals.offReb > this.props.stats.vTeam.totals.offReb ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.totals.turnovers}`,
        away: `${this.props.stats.vTeam.totals.turnovers}`,
        color: this.props.stats.hTeam.totals.turnovers < this.props.stats.vTeam.totals.turnovers ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.totals.steals}`,
        away: `${this.props.stats.vTeam.totals.steals}`,
        color: this.props.stats.hTeam.totals.steals > this.props.stats.vTeam.totals.steals ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.totals.blocks}`,
        away: `${this.props.stats.vTeam.totals.blocks}`,
        color: this.props.stats.hTeam.totals.blocks > this.props.stats.vTeam.totals.blocks ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.fastBreakPoints}`,
        away: `${this.props.stats.vTeam.fastBreakPoints}`,
        color: this.props.stats.hTeam.fastBreakPoints > this.props.stats.vTeam.fastBreakPoints ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.pointsInPaint}`,
        away: `${this.props.stats.vTeam.pointsInPaint}`,
        color: this.props.stats.hTeam.pointsInPaint > this.props.stats.vTeam.pointsInPaint ? homeTeamColor : awayTeamColor
      },
      {
        home: `${this.props.stats.hTeam.pointsOffTurnovers}`,
        away: `${this.props.stats.vTeam.pointsOffTurnovers}`,
        color: this.props.stats.hTeam.pointsOffTurnovers > this.props.stats.vTeam.pointsOffTurnovers ? homeTeamColor : awayTeamColor
      }
      ,
      {
        home: `${this.props.stats.hTeam.biggestLead}`,
        away: `${this.props.stats.vTeam.biggestLead}`,
        color: this.props.stats.hTeam.biggestLead > this.props.stats.vTeam.biggestLead ? homeTeamColor : awayTeamColor
      }
    ]

    return (
      statHeader.map((header, index) => {
        return (
          <View style={{ flex: 1, flexDirection: 'row', height: 30, marginTop: 7 }} key={index}>
            <View style={{ flex: 1, borderLeftWidth: 3, borderLeftColor: statHeaderMapping[index].color, marginBottom: 14 }}>
              <Text style={styles.text}> {header} </Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}> {statHeaderMapping[index].away} </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.text}> {statHeaderMapping[index].home} </Text>
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
