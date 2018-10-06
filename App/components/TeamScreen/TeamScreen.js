import React, { Component } from 'react'
import { View, StyleSheet, Image, Button, Platform } from 'react-native'
import { connect } from 'react-redux'
import Roster from './Roster'
import Games from './Games'
import Loader from '../common/Loader'
import { getTeamFromTeamMap } from '../../utils/nba'
import TeamHeader from './TeamHeader';

class TeamScreen extends Component<Props> {

  constructor(props) {
    super(props)

    this.state = {
      pageToShow: 'roster'
    }
  }

  _selectPageToShow(pageToShow) {
    this.setState({ pageToShow })
  }

  _renderSelectedPage() {
    const { pageToShow } = this.state
    const { fetchingTeam, roster, gamelog } = this.props

    const page = pageToShow === 'roster' ?
      <Roster
        navigator={this.props.navigation}
        team={roster}
      />
    :
      <Games
        navigator={this.props.navigation}
        games={gamelog}
      />

    return (
      !fetchingTeam && roster && gamelog ?
        page
      :
        <View />
    )
  }

  render() {
    const { fetchingTeam, info, seasonRanks, teamID } = this.props
    const teamColor = getTeamFromTeamMap(teamID).color // default color could be '#BE0E2C'
    // const teamLogo = getTeamFromTeamMap(this.props.teamID).logo
    const teamLogo = null

    return (
      <View style={{ flex: 1, backgroundColor: '#111111' }}>
        {
          fetchingTeam &&
          <Loader />
        }
        {
          info && seasonRanks &&
            <TeamHeader
              teamInfo={info}
              teamSeasonRanks={seasonRanks}
            />
        }
        {
          !fetchingTeam &&
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
        { this._renderSelectedPage() }
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
    teamID: state.scores.selectedTeam.teamID,
    fetchingTeam: state.team.fetchingTeam,
    info: state.team.info,
    seasonRanks: state.team.seasonRanks,
    roster: state.team.roster,
    gamelog: state.team.gamelog
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
