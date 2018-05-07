import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Button, Platform } from 'react-native'
import { connect } from 'react-redux'
import Roster from './Roster'
import Games from './Games'
import Loader from '../common/Loader'
import NBA from '../../utils/nba'
import { getTeamFromTeamMap } from '../../utils/nba'
import TeamMap from '../../utils/TeamMap'

class TeamHeader extends Component<Props> {

  constructor() {
    super()
  }

  _getRank(number) {
    switch (parseInt(number)){
      case 1:
        return '1st'
      case 2:
        return '2nd'
      case 3:
        return '3rd'
      default:
        return number + 'th'
    }
  }

  render() {
    const teamColor = getTeamFromTeamMap(this.props.teamID).color // default color could be '#BE0E2C'
    // const teamLogo = getTeamFromTeamMap(this.props.teamID).logo
    const teamLogo = null

    const teamStatsToRender = [
      {
        label: 'PPG',
        stat: this.props.teamSeasonRanks.pts_pg,
        rank: this.props.teamSeasonRanks.pts_rank
      },
      {
        label: 'OPP PPG',
        stat: this.props.teamSeasonRanks.opp_pts_pg,
        rank: this.props.teamSeasonRanks.opp_pts_rank
      },
      {
        label: 'RPG',
        stat: this.props.teamSeasonRanks.reb_pg,
        rank: this.props.teamSeasonRanks.reb_rank
      },
      {
        label: 'APG',
        stat: this.props.teamSeasonRanks.ast_pg,
        rank: this.props.teamSeasonRanks.ast_rank
      }
    ]

    return (
      <View style={styles.header}>
        {/* begin team info */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
              teamLogo &&
              <Image
                style={styles.logo}
                source={teamLogo}
              />
            }
          </View>
          <View style={{ flex: 2, flexDirection: 'column' }}>
            <View  style={{ flex: 1 }}>
              <Text style={styles.textPrimary}> {this.props.teamInfo.team_city} {this.props.teamInfo.team_name} </Text>
            </View>
            <View  style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.textSecondary}> Wins-{this.props.teamInfo.w} </Text>
                <Text style={styles.textThird}> {this._getRank(this.props.teamInfo.conf_rank)} in the {this.props.teamInfo.team_conference} </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.textSecondary}> Losses-{this.props.teamInfo.l} </Text>
                <Text style={styles.textThird}> {this._getRank(this.props.teamInfo.div_rank)} in the {this.props.teamInfo.team_division} </Text>
              </View>
            </View>
          </View>
        </View>
        {/* end team info */}
        {/* begin team stat rankings */}
        <View style={styles.teamRanks}>
          {
            teamStatsToRender.map((stat, index) => {
              // last item should not get extra styles
              const extraStyle = index !== teamStatsToRender.length - 1 ? { borderRightWidth: 1, borderRightColor: teamColor } : {}
              return (
                <View style={[styles.teamRankCell, extraStyle]}>
                  <Text style={styles.textSecondary}> {stat.label} </Text>
                  <Text style={styles.textSecondary}> {stat.stat} </Text>
                  <Text style={styles.textThird}> ({this._getRank(stat.rank)}) </Text>
                </View>
              )
            })
          }
        </View>
        {/* end team stat rankings */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#D3D3D3'
  },
  textPrimary: {
    color: '#D3D3D3',
    fontSize: 22,
    fontFamily: 'Rubik-Light'
  },
  textSecondary: {
    color: '#D3D3D3',
    fontSize: 18,
    fontFamily: 'Rubik-Light'
  },
  textThird: {
    color: '#D3D3D3',
    fontSize: 14,
    fontFamily: 'Rubik-Light'
  },
  header: {
    height: 180,
    backgroundColor: '#171717',
    flexDirection: 'column'
  },
  teamRanks: {
    flex: 1,
    flexDirection: 'row'
  },
  teamRankCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  logo: {
    height: 90,
    width: 90,
  }
})

function mapStateToProps(state) {
  return {
    season: state.date.season,
    teamID: state.scores.selectedTeam.teamID
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamHeader)
