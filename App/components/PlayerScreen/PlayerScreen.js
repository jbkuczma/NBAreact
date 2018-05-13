import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, FlatList, Modal, TouchableOpacity, Platform, Button } from 'react-native'
import { connect } from 'react-redux'
import Loader from '../common/Loader'
import NBA from '../../utils/nba'
import { getTeamFromTeamMap } from '../../utils/nba'
import TeamMap from '../../utils/TeamMap'
import CareerStatsTable from './CareerStatsTable';

class PlayerScreen extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
      loading: true,
      gameStats: null,
      careerStats: null,
      statsToShow: 'current'
    }
  }

  componentDidMount() {
    this.fetchPlayer()
  }

  fetchPlayer() {
    const playerID = this.props.player.player_id || this.props.player.personId // player_id is provided from roster, personId is provided from searching for a player
    Promise.all([
      this.nba.getSeasonPlayerGameLog(playerID, this.props.season),
      this.nba.getPlayerDashboardByYear(playerID, this.props.season)
    ])
    .then((results) => {
      this.setState({
        loading: false,
        gameStats: results[0],
        careerStats: results[1]
      })
    })
  }

  _formatHeight() {
    const feet = this.props.player.height ? this.props.player.height.split('-')[0] : this.props.player.heightFeet
    const inch = this.props.player.height ? this.props.player.height.split('-')[1] : this.props.player.heightInches

    return (
      <Text style={styles.textPrimary}>
        {feet}<Text style={styles.textSecondary}>ft</Text>
        {inch}<Text style={styles.textSecondary}>in</Text>
      </Text>
    )
  }

  _renderGamelog() {
    const stats = this.state.gameStats.playoffs.concat(this.state.gameStats.regularSeason)
    return (
      <FlatList
        data={stats}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderGameStat}
      />
    )
  }

  _renderCareerStats() {
    const stats = this.state.careerStats
    return (
      <CareerStatsTable
        stats={stats}
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
          {
            stats.map((stat, index) => {
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
    const {
      player,
      teamID
    } = this.props

    const teamColor = getTeamFromTeamMap(this.props.teamID).color // default color could be '#BE0E2C'
    // const playerImageURL = this.nba.getPlayerImage(this.props.player.player_id || this.props.player.personId)
    const playerImageURL = null

    // from roster screen | from search player & league leaders
    const playerName = this.props.player.player   || this.props.player.firstName + ' ' + this.props.player.lastName
    const playerWeight = this.props.player.weight || this.props.player.weightPounds
    const experience = this.props.player.exp      || this.props.player.yearsPro
    const school = this.props.player.school       || this.props.player.collegeName
    const number = this.props.player.num          || this.props.player.jersey

    const seasonAverages = this.state.careerStats ? [
      { stat: this.state.careerStats.OverallPlayerDashboard[0].min, text: 'MPG' },
      { stat: this.state.careerStats.OverallPlayerDashboard[0].pts, text: 'PPG' },
      { stat: this.state.careerStats.OverallPlayerDashboard[0].reb, text: 'RPG' },
      { stat: this.state.careerStats.OverallPlayerDashboard[0].ast, text: 'APG' }
    ] : []

    return (
      <View style={{ flex: 1, backgroundColor: '#111111' }}>
        {
          this.state.loading &&
          <Loader />
        }
        {
          !this.state.loading &&
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
            {
              this.state.careerStats &&
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                {
                  seasonAverages.map((stat, index) => {
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
        {
          !this.state.loading &&
          <View style={styles.buttons}>
            <View style={[ styles.button, this.state.statsToShow === 'current' ? { borderBottomWidth: 2, borderBottomColor: teamColor } : styles.inactive ]}>
              <Button
                title="Current Season"
                color={Platform.OS === 'ios' ? "#D3D3D3" : "#151516"}
                onPress={() => { this._selectStatsToShow('current') }}
              />
            </View>
            <View style={[ styles.button, this.state.statsToShow === 'career' ? { borderBottomWidth: 2, borderBottomColor: teamColor } : styles.inactive ]}>
              <Button
                title="Career Stats"
                color={Platform.OS === 'ios' ? "#D3D3D3" : "#151516"}
                onPress={() => { this._selectStatsToShow('career') }}
              />
            </View>
          </View>
        }
        {
          !this.state.loading && this.state.gameStats &&
          <View style={styles.playerStatsContainer}>
            {
              this.state.statsToShow === 'current' ?
                this._renderGamelog()
              :
                this._renderCareerStats()
            }
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
