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
      loading: true,
      gameStats: null
    }
  }

  componentDidMount() {
    this.fetchPlayer()
    console.log(this.props.player)
    this.nba.getSeasonPlayerGameLog(this.props.player.player_id, this.props.season)
    .then((results) => {
      this.setState({
        loading: false,
        gameStats: results
      })
    })
  }

  _getTeamFromTeamMap(teamID) {
    const team = Object.keys(TeamMap).find((x) => {
      return TeamMap[x].id == teamID
    })
    return TeamMap[team]
  }

  fetchPlayer() {

  }

  _formatHeight(height) {
    const feet = height.split('-')[0]
    const inch = height.split('-')[1]

    return (
      <Text style={styles.textPrimary}>{feet}<Text style={styles.textSecondary}>ft</Text> <Text style={styles.textPrimary}>{inch}</Text><Text style={styles.textSecondary}>in</Text> </Text>
    )
  }


  render() {
    const {
      player,
      teamID
    } = this.props

    const teamColor = this._getTeamFromTeamMap(this.props.teamID).color // default color could be '#BE0E2C'
    const playerImageURL = this.nba.getPlayerImage(this.props.player.player_id)

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
          !this.state.loading &&
          <View style={styles.playerHeader}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={styles.playerImage}
                source={{ uri: playerImageURL }}
              />
            </View>
            <View  style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.textPrimary}> #{player.num} {player.player} </Text>
              <Text style={styles.textPrimary}> Years Pro: {player.exp} </Text>
              <Text style={styles.textPrimary}> {this._formatHeight(player.height)} | {player.weight}<Text style={styles.textSecondary}>lbs</Text> </Text>
              <Text style={styles.textSecondary}> {player.school} </Text>
            </View>
          </View>
        }
        {
          !this.state.loading && this.state.gameStats &&
          <View style={styles.playerStatsContainer}>

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
  playerImage: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  textPrimary: {
    color: '#D3D3D3',
    fontSize: 24,
    fontFamily: 'Rubik-Light'
  },
  textSecondary: {
    color: '#D3D3D3',
    fontSize: 18,
    fontFamily: 'Rubik-Light'
  },
  playerHeader: {
    backgroundColor: '#171717',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  playerStatsContainer: {
    flex: 1
  }
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
