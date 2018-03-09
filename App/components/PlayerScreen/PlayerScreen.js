import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import NBA from '../../utils/nba'
import TeamMap from '../../utils/TeamMap'

class PlayerScreen extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.fetchPlayer()
    console.log(this.props.player)
    // this.nba.getSeasonPlayerGameLog(203507, this.props.season)

  }

  _getTeamFromTeamMap(teamID) {
    const team = Object.keys(TeamMap).find((x) => {
      return TeamMap[x].id == teamID
    })
    return TeamMap[team]
  }

  fetchPlayer() {

  }


  render() {
    const teamColor = this._getTeamFromTeamMap(this.props.teamID).color // default color could be '#BE0E2C'

    return (
      <View style={{ flex: 1, backgroundColor: '#111111' }}>
        <Text style={styles.textPrimary}> Player </Text>
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
})

function mapStateToProps(state) {
  return {
    season: state.date.season,
    teamID: state.scores.selectedTeam.teamID,
    player: state.scores.selectedPlayer.player
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerScreen)
