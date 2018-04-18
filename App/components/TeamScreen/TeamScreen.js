import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Button, Platform } from 'react-native'
import { connect } from 'react-redux'
import Roster from './Roster'
import Games from './Games'
import Loader from '../common/Loader'
import NBA from '../../utils/nba'
import { getTeamFromTeamMap } from '../../utils/nba'
import TeamMap from '../../utils/TeamMap'

class TeamScreen extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
      loading: true,
      teamInfo: null,
      teamSeasonRanks: null,
      teamRoster: null,
      teamGamelog: null,
      pageToShow: 'roster'
    }
  }

  componentDidMount() {
    this.fetchTeam()
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

  fetchTeam() {
    const teamInfo = {
      season: this.props.season,
      teamID: this.props.teamID
    }
    const rosterInfo = {
      season: this.props.season +  '-' + this.props.season.toString().substr(-2), // season has to be 2017-18
      teamID: this.props.teamID
    }

    let teamName = getTeamFromTeamMap(this.props.teamID).team.toLowerCase()

    // special cases
    teamName = teamName === '76ers' ? 'sixers' : teamName
    teamName = teamName === 'trail blazers' ? 'blazers' : teamName

    Promise.all([
      this.nba.getTeam(teamInfo),
      this.nba.getRoster(rosterInfo),
      this.nba.getTeamSchedule(this.props.season, teamName)
    ])
    .then((data) => {
      this.setState({
        loading: false,
        teamInfo: data[0].TeamInfoCommon[0],
        teamSeasonRanks: data[0].TeamSeasonRanks[0],
        teamRoster: data[1].CommonTeamRoster,
        teamGamelog: data[2].league.standard
      })
    })
  }

  _selectPageToShow(pageToShow) {
    this.setState({
      pageToShow: pageToShow
    })
  }

  render() {
    const teamColor = getTeamFromTeamMap(this.props.teamID).color // default color could be '#BE0E2C'
    // const teamLogo = getTeamFromTeamMap(this.props.teamID).logo
    const teamLogo = null

    return (
      <View style={{ flex: 1, backgroundColor: '#111111' }}>
        {
          this.state.loading &&
          <Loader />
        }
        {
          this.state.teamInfo && this.state.teamSeasonRanks &&
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
                    <Text style={styles.textPrimary}> {this.state.teamInfo.team_city} {this.state.teamInfo.team_name} </Text>
                  </View>
                  <View  style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.textSecondary}> Wins-{this.state.teamInfo.w} </Text>
                      <Text style={styles.textThird}> {this._getRank(this.state.teamInfo.conf_rank)} in the {this.state.teamInfo.team_conference} </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.textSecondary}> Losses-{this.state.teamInfo.l} </Text>
                      <Text style={styles.textThird}> {this._getRank(this.state.teamInfo.div_rank)} in the {this.state.teamInfo.team_division} </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* end team info */}
              {/* begin team stat rankings */}
              <View style={styles.teamRanks}>
                <View style={[styles.teamRankCell, { borderRightWidth: 1, borderRightColor: teamColor}]}>
                  <Text style={styles.textSecondary}> PPG </Text>
                  <Text style={styles.textSecondary}> {this.state.teamSeasonRanks.pts_pg} </Text>
                  <Text style={styles.textThird}> ({this._getRank(this.state.teamSeasonRanks.pts_rank)}) </Text>
                </View>
                <View style={[styles.teamRankCell, { borderRightWidth: 1, borderRightColor: teamColor}]}>
                  <Text style={styles.textSecondary}> OPPG </Text>
                  <Text style={styles.textSecondary}> {this.state.teamSeasonRanks.opp_pts_pg} </Text>
                  <Text style={styles.textThird}> ({this._getRank(this.state.teamSeasonRanks.opp_pts_rank)}) </Text>
                </View>
                <View style={[styles.teamRankCell, { borderRightWidth: 1, borderRightColor: teamColor}]}>
                  <Text style={styles.textSecondary}> RPG </Text>
                  <Text style={styles.textSecondary}> {this.state.teamSeasonRanks.reb_pg} </Text>
                  <Text style={styles.textThird}> ({this._getRank(this.state.teamSeasonRanks.reb_rank)}) </Text>
                </View>
                <View style={styles.teamRankCell}>
                  <Text style={styles.textSecondary}> APG </Text>
                  <Text style={styles.textSecondary}> {this.state.teamSeasonRanks.ast_pg} </Text>
                  <Text style={styles.textThird}> ({this._getRank(this.state.teamSeasonRanks.ast_rank)}) </Text>
                </View>
              </View>
              {/* end team stat rankings */}
            </View>
        }
        {
          !this.state.loading &&
          <View style={styles.buttons}>
            <View style={[ styles.button, this.state.pageToShow === 'roster' ? { borderBottomWidth: 2, borderBottomColor: teamColor } : styles.inactive ]}>
              <Button
                title="Roster"
                color={Platform.OS === 'ios' ? "#D3D3D3" : "#151516"}
                onPress={() => { this._selectPageToShow('roster') }}
              />
            </View>
            <View style={[ styles.button, this.state.pageToShow === 'games' ? { borderBottomWidth: 2, borderBottomColor: teamColor } : styles.inactive ]}>
              <Button
                title="Games"
                color={Platform.OS === 'ios' ? "#D3D3D3" : "#151516"}
                onPress={() => { this._selectPageToShow('games') }}
              />
            </View>
          </View>
        }
        {
          !this.state.loading && this.state.teamRoster && this.state.pageToShow === 'roster' ?
            <Roster
              navigator={this.props.navigation}
              team={this.state.teamRoster}
            />
          :
          !this.state.loading && this.state.teamGamelog  && this.state.pageToShow === 'games' ?
            <Games
              navigator={this.props.navigation}
              games={this.state.teamGamelog}
            />
          :
            <View></View>
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
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  button: {
    flex: 1,
    backgroundColor: '#111111'
  },
  inactive: {

  },
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
)(TeamScreen)
