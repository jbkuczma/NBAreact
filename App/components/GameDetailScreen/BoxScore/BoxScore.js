import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, FlatList, ScrollView, Platform } from 'react-native'
import { connect } from 'react-redux'
import PlayerBoxCell from './PlayerBoxCell'
import Loader from '../../common/Loader'
import { BOXSCORE_HEADERS } from './headers'

class BoxScore extends Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.state.params.title}`
  })

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      activeTeam: 'away'
    }
  }

  componentDidUpdate = (prevProps) => {
    const { loading } = this.state
    const { playersInLeague, boxscore } = this.props
    if (
      loading &&
      playersInLeague !== [] &&
      boxscore !== {}
    ) {
      this.setState({ loading: false });
    }
  }

  _selectTeam = (team) => {
    this.setState({
      activeTeam: team
    })
  }

  _createBoxscoreTable = () => {
    const { boxscore, awayTeamID, homeTeamID } = this.props;
    let players = boxscore.activePlayers
    players.unshift(BOXSCORE_HEADERS) // make the headers the first element
    if (players[0] === players[1] && players[0].personId === undefined && players[1].personId === undefined) {
      players.shift() // if we already have the headers as the first element, there will be a duplicate array of headers added. in that case one of the copies should be removed
    }

    const teamToShowID = this.state.activeTeam === 'away' ? awayTeamID : homeTeamID
    const playersToShow = players.filter((player) => {
      return player.personId === undefined || player.teamId === teamToShowID // include header array and players for specified team
    })

    return (
      <FlatList
        data={playersToShow}
        scrollEnabled={false}
        renderItem={(player) => (
          <PlayerBoxCell
            key={player.personId}
            player={player}
          />
        )}
      />
    )
  }

  _createPlayerlist = () => {
    const { boxscore, awayTeamID, homeTeamID, playersInLeague } = this.props;
    let players = boxscore.activePlayers

    const teamToShowID = this.state.activeTeam === 'away' ? awayTeamID : homeTeamID
    const playersToShow = players.filter((player) => {
      return player.personId === undefined || player.teamId === teamToShowID // include header array and players for specified team
    })

    const updatedPlayers = []

      // modifying original array; playersToShow
    playersToShow.forEach((player, index, arr) => {
      // skip header (first element)
      if (player.personId) {
        const desiredPlayer = playersInLeague.filter((somePlayer, index) => {
          return somePlayer.personId === player.personId
        })

        // edge case: Nene
        const name = desiredPlayer[0].lastName ? desiredPlayer[0].firstName.charAt(0) + '. ' + desiredPlayer[0].lastName : desiredPlayer[0].firstName

        const newPlayerData = {
          display_fi_last: name
        }

        player = {...player, ...newPlayerData}
        // arr[index] = player
        updatedPlayers.push(player)
      }
    })

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={[styles.playerNameCell, { borderBottomColor: '#D1D1D1', borderBottomWidth: 1 }]}>
          <Text style={styles.text}> Player </Text>
        </View>
        {
          updatedPlayers.map((player, idx) => {
            return (
              <View style={styles.playerNameCell} key={idx}>
                <Text style={styles.text}> {player.display_fi_last} </Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  render() {
    const { boxscore, awayTeam, homeTeam, playersInLeague } = this.props
    const { loading } = this.state
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111111' }}>
        { awayTeam && homeTeam &&
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <View style={styles.teams}>
              <View style={styles.teamsButtons}>
                <View style={[ styles.awayButton, this.state.activeTeam === 'away' ? styles.active : styles.inactive ]}>
                  <Button
                    title={awayTeam.abbreviation}
                    color={Platform.OS === 'ios' ? "#D3D3D3" : "#151516"}
                    onPress={() => { this._selectTeam('away') }}
                  />
                </View>
                <View style={[ styles.homeButton, this.state.activeTeam === 'home' ? styles.active : styles.inactive ]}>
                  <Button
                    title={homeTeam.abbreviation}
                    color={Platform.OS === 'ios' ? "#D3D3D3" : "#151516"}
                    onPress={() => { this._selectTeam('home') }}
                  />
                </View>
              </View>
            </View>
          </View>
        }
        <View style={styles.boxscore}>
          { loading && <Loader /> }
          { !loading && boxscore.activePlayers && playersInLeague &&
              <View>
                <ScrollView horizontal={false}  contentContainerStyle={{ flexDirection: 'row' }}>
                  <View style={{ width: 140 }}>
                    { this._createPlayerlist() }
                  </View>
                  <ScrollView horizontal={true} indicatorStyle='white' showsHorizontalScrollIndicator={true} bounces={false} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    { this._createBoxscoreTable() }
                  </ScrollView>
                </ScrollView>
              </View>
          }
          { !loading && !boxscore.activePlayers &&
            <Text style={styles.text}> Boxscore available after tip off </Text>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  teams: {
    flex: 1
  },
  teamsButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  awayButton: {
    flex: 1,
    backgroundColor: '#111111' // hack to hide space between tab navigator and team buttons
    // backgroundColor: '#151516'
  },
  homeButton: {
    flex: 1,
    backgroundColor: '#111111'
    // backgroundColor: '#151516'
  },
  active: {
    borderBottomWidth: 1,
    borderBottomColor: '#F7971E'
  },
  inactive: {

  },
  boxscore: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerNameCell: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 140
  },
  text: {
    textAlign: 'center',
    color: '#D3D3D3',
    fontFamily: 'Rubik-Light'
  }
})

function mapStateToProps(state) {
  return {
    gameID: state.scores.selectedGame.gameID,
    date: state.date.date,
    season: state.date.season,
    homeTeamID: state.scores.selectedGame.homeTeam.teamID,
    awayTeamID: state.scores.selectedGame.awayTeam.teamID,
    homeTeam: state.scores.selectedGame.homeTeam,
    awayTeam: state.scores.selectedGame.awayTeam,
    playersInLeague: state.league.playersInLeague,
    boxscore: state.scores.selectedGame.boxscore
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoxScore)

