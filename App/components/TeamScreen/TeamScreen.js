import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Button, Platform } from 'react-native'
import { connect } from 'react-redux'
import Roster from './Roster'
import Games from './Games'
import Loader from '../common/Loader'
import NBA from '../../utils/nba'
import { getTeamFromTeamMap } from '../../utils/nba'
import TeamMap from '../../utils/TeamMap'
import TeamHeader from './TeamHeader';

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
            <TeamHeader
              teamInfo={this.state.teamInfo}
              teamSeasonRanks={this.state.teamSeasonRanks}
            />
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
