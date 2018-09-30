import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, Platform, Button } from 'react-native'
import { connect } from 'react-redux'
import Loader from '../common/Loader'
import { getTeamFromTeamMap } from '../../utils/nba'
import CareerStatsTable from './CareerStatsTable';

class PlayerScreen extends Component<Props> {

  constructor(props) {
    super(props)

    this.state = {
      statsToShow: 'current'
    }
  }

  _formatHeight() {
    const { player } = this.props
    const feet = player.height ? player.height.split('-')[0] : player.heightFeet
    const inch = player.height ? player.height.split('-')[1] : player.heightInches

    return (
      <Text style={styles.textPrimary}>
        {feet}<Text style={styles.textSecondary}>ft</Text>
        {inch}<Text style={styles.textSecondary}>in</Text>
      </Text>
    )
  }

  _renderGamelog() {
    const { gameStats } = this.props
    const stats = gameStats.playoffs.concat(gameStats.regularSeason)
    return (
      <FlatList
        data={stats}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderGameStat}
      />
    )
  }

  _renderCareerStats() {
    const { careerStats } = this.props
    return (
      <CareerStatsTable
        stats={careerStats}
      />
    )
  }

  _goToGame = (gameStats) => {
    const gameStatsForPlayer = {
      gameStats: gameStats
    }

    // this.props.selectGameForPlayer(gameStats)
    this.props.navigation.navigate('PlayerGameDetail', { stats: gameStats })
  }

  _renderGameStat = (game) => {
    game = game.item

    /**
     * remove team from matchup
     * ex: TOR @ NYK -> @ NYK
     * ex: TOR vs. WAS -> vs WAS
     */
    const matchup = game.matchup.match(/(@|vs\.)\s[a-zA-Z]+/)[0].replace('.', '')
    const stats = [
      { stat: game.pts, text: 'pts' },
      { stat: game.reb, text: 'reb' },
      { stat: game.ast, text: 'ast' }
    ]

    return (
      <TouchableOpacity style={{ flexDirection: 'column', marginLeft: 10, marginRight: 10, height: 100, borderBottomColor: '#444444', borderBottomWidth: 1 }} onPress={() => { this._goToGame(game) }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={[styles.textSecondary, { textAlign: 'left'}]}> {game.game_date} </Text>
        </View>
        <View style={[styles.defaultCenteredView, { flexDirection: 'row' }]}>
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Text style={[styles.textSecondary, { textAlign: 'left'}]}> {game.wl} {matchup} </Text>
          </View>
          { stats.map((stat, index) => {
              return (
                <View style={styles.defaultCenteredView} key={index}>
                  <Text style={styles.textPrimary}>
                    {stat.stat} <Text style={styles.textSecondary}>{stat.text}</Text>
                  </Text>
                </View>
              )
            })
          }
        </View>
      </TouchableOpacity>
    )
  }

  _keyExtractor(game) {
    return game.game_id
  }

  _selectStatsToShow(statsToShow) {
    this.setState({
      statsToShow: statsToShow
    })
  }

  render() {
    const { player, teamID, careerStats, gameStats, fetchingPlayer } = this.props
    const { statsToShow } = this.state

    const teamColor = getTeamFromTeamMap(teamID).color // default color could be '#BE0E2C'
    // const playerImageURL = this.nba.getPlayerImage(this.props.player.player_id || this.props.player.personId)
    const playerImageURL = null

    // from roster screen | from search player & league leaders
    const playerName = player.player   || player.firstName + ' ' + player.lastName
    const playerWeight = player.weight || player.weightPounds
    const experience = player.exp      || player.yearsPro
    const school = player.school       || player.collegeName
    const number = player.num          || player.jersey

    const seasonAverages = careerStats ? [
      { stat: careerStats.OverallPlayerDashboard[0].min, text: 'MPG' },
      { stat: careerStats.OverallPlayerDashboard[0].pts, text: 'PPG' },
      { stat: careerStats.OverallPlayerDashboard[0].reb, text: 'RPG' },
      { stat: careerStats.OverallPlayerDashboard[0].ast, text: 'APG' }
    ] : []

    return (
      <View style={{ flex: 1, backgroundColor: '#111111' }}>
        { fetchingPlayer && <Loader /> }
        { !fetchingPlayer &&
          <View style={[styles.playerHeader, { borderBottomColor: teamColor, borderBottomWidth: 3 }]}>
            <View style={{ flexDirection: 'row' }}>
              { playerImageURL &&
                <View style={styles.defaultCenteredView}>
                  <Image
                    style={styles.playerImage}
                    source={{ uri: playerImageURL }}
                  />
                </View>
              }
              <View  style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.textPrimary}> #{number} {playerName} </Text>
                <Text style={styles.textPrimary}> Years Pro: {experience} </Text>
                <Text style={styles.textPrimary}> {this._formatHeight()} | {playerWeight}<Text style={styles.textSecondary}>lbs</Text> </Text>
                <Text style={styles.textSecondary}> {school} </Text>
              </View>
            </View>
            { careerStats &&
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                { seasonAverages.map((stat, index) => {
                    const extraStyle = index < seasonAverages.length - 1 ? { borderRightColor: teamColor, borderRightWidth: 1 } : { }
                    return (
                      <View style={[styles.defaultCenteredView, extraStyle]} key={index}>
                        <Text style={styles.textSecondary}>
                          {stat.stat} <Text style={styles.text}> {stat.text} </Text>
                        </Text>
                      </View>
                    )
                  })
                }
              </View>
            }
          </View>
        }
        { !fetchingPlayer &&
          <View style={styles.buttons}>
            <View style={[ styles.button, statsToShow === 'current' ? { borderBottomWidth: 2, borderBottomColor: teamColor } : styles.inactive ]}>
              <Button
                title="Current Season"
                color={Platform.OS === 'ios' ? "#D3D3D3" : "#151516"}
                onPress={() => { this._selectStatsToShow('current') }}
              />
            </View>
            <View style={[ styles.button, statsToShow === 'career' ? { borderBottomWidth: 2, borderBottomColor: teamColor } : styles.inactive ]}>
              <Button
                title="Career Stats"
                color={Platform.OS === 'ios' ? "#D3D3D3" : "#151516"}
                onPress={() => { this._selectStatsToShow('career') }}
              />
            </View>
          </View>
        }
        {
          !fetchingPlayer && gameStats &&
          <View style={styles.playerStatsContainer}>
            { statsToShow === 'current' ? this._renderGamelog() : this._renderCareerStats() }
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  defaultCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    color: '#D3D3D3',
    fontSize: 14,
    fontFamily: 'Rubik-Light'
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
    flexDirection: 'column'
  },
  playerStatsContainer: {
    flex: 1
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
    teamID: state.scores.selectedTeam.teamID,
    player: state.scores.selectedPlayer.player,
    fetchingPlayer: state.player.fetchingPlayer,
    gameStats: state.player.gameStats,
    careerStats: state.player.careerStats
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
