import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import PlayerBoxCell from './PlayerBoxCell'
import NBA from '../../../utils/nba'

const headers = ['Player', 'Pos', 'Min', 'Pts', 'Ast', 'Reb', 'Stl', 'Blk', '+/-', 'FGM', 'FGA', 'FG%', '3PM', '3PA', '3P%', 'FTM', 'FTA', 'FT%', 'OREB', 'DREB', 'TOV', 'PF']

class BoxScore extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
      loading: true,
      boxscore: {},
      homeTeamStats: [],
      awayTeamStats: [],
      homeTeam: null,
      awayTeam: null,
      activeTeam: 'away'
    }
  }

  componentDidMount() {
    this.fetchBoxscore()
  }

  fetchBoxscore() {
    this.nba.getBoxscore(this.props.gameID, this.props.date)
    .then((data) => {
      const homePlayers = ''
      const awayPlayers = ''
      this.setState({
        loading: false,
        boxscore: data.stats ? data.stats : {},
      })
    })
  }

  _selectTeam(team) {
    this.setState({
      activeTeam: team
    })
  }

  _createBoxscoreTable(stats) {
    let players = stats.activePlayers
    players.unshift(headers) // make the headers the first element
    if (players[0] === players[1] && players[0].personId === undefined && players[1].personId === undefined) {
      players.shift() // if we already have the headers as the first element, there will be a duplicate array of headers added. in that case one of the copies should be removed
    }

    const teamToShowID = this.state.activeTeam === 'away' ? this.props.awayTeamID : this.props.homeTeamID
    const playersToShow = players.filter((player) => {
      return player.personId === undefined || player.teamId === teamToShowID // include header array and players for specified team
    })

    const updatedPlayers = []

    // modifying original array; playersToShow
    playersToShow.forEach((player, index, arr) => {
      // skip header
      if (index != 0) {
        const obj = {
          PlayerID: player.personId
        }
        this.nba.getPlayer(obj)
        .then((data) => {
          const newPlayerData = {
            display_fi_last: data.CommonPlayerInfo[0].display_fi_last
          }
          player = {...player, ...newPlayerData}
          // arr[index] = player
          updatedPlayers.push(player)
        })
      } else {
        updatedPlayers.push(player)
      }
    })

    // BUG: sometimes boxscore doesnt appear until you scorll
    return (
      <ScrollView style={{ flex: 1 }} horizontal={true}>
        <FlatList
          data={updatedPlayers}
          renderItem={(player) => (
            <PlayerBoxCell
              player={player}
            />
          )}
        />
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111111' }}>

        {
          this.props.awayTeam && this.props.awayTeam &&
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <View style={styles.teams}>
              <View style={styles.teamsButtons}>
                <View style={[ styles.awayButton, this.state.activeTeam === 'away' ? styles.active : styles.inactive ]}>
                  <Button
                    title={this.props.awayTeam.abbreviation}
                    color="#D3D3D3"
                    onPress={() => { this._selectTeam('away') }}
                  />
                </View>
                <View style={[ styles.homeButton, this.state.activeTeam === 'home' ? styles.active : styles.inactive ]}>
                  <Button
                    title={this.props.homeTeam.abbreviation}
                    color="#D3D3D3"
                    onPress={() => { this._selectTeam('home') }}
                  />
                </View>
              </View>
            </View>
          </View>
        }
        <View style={styles.boxscore}>
          {
            this.state.loading ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator
                  size="large"
                  color="#F7971E"
                />
              </View>
            :
              Object.keys(this.state.boxscore).length === 0 ?
                <Text style={{ textAlign: 'center', color: '#D3D3D3' }}> Boxscore available after tip off </Text>
              :
                this._createBoxscoreTable(this.state.boxscore)
          }
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  teams: {
    flex: 1,
  },
  teamsButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  awayButton: {
    flex: 1,
    backgroundColor: '#151516'
  },
  homeButton: {
    flex: 1,
    backgroundColor: '#151516'
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
    awayTeam: state.scores.selectedGame.awayTeam
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

