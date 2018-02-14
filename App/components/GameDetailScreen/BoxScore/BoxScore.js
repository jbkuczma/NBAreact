import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, FlatList, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import PlayerBoxCell from './PlayerBoxCell'
import NBA from '../../../utils/nba'

const headers = ['Player', 'Pos', 'Min', 'Pts', 'Ast', 'Reb', 'Stl', 'Blk', '+/-', 'FGM', 'FGA', 'FG%', '3PM', '3PA', '3P%', 'FTM', 'FTA', 'FT%', 'OREB', 'DREB', 'TOV', 'PF']


class BoxScore extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
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

  _filterPlayers(players, team) {

  }

  fetchBoxscore() {
    this.nba.getBoxscore(this.props.gameID, this.props.date)
    .then((data) => {
      const homePlayers = ''
      const awayPlayers = ''
      this.setState({
        boxscore: data.stats ? data.stats : {},
        homeTeamID: data.basicGameData.hTeam.teamId,
        awayTeamID: data.basicGameData.vTeam.teamId,
        homeTeam: data.basicGameData.hTeam.triCode,
        awayTeam: data.basicGameData.vTeam.triCode
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
    const teamToShowID = this.state.active === 'away' ? this.state.awayTeamID : this.state.homeTeamID
    const playersToShow = players.filter((player) => {
      return player.personId === undefined || player.teamId === teamToShowID // include header array and players for specified team
    })
    return (
      <ScrollView style={{ flex: 1 }} horizontal={true}>
        <FlatList
          data={playersToShow}
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
          this.state.awayTeam && this.state.awayTeam &&
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <View style={styles.teams}>
              <View style={styles.teamsButtons}>
                <View style={[ styles.awayButton, this.state.activeTeam === 'away' ? styles.active : styles.inactive ]}>
                  <Button
                    title={this.state.awayTeam}
                    color="#D3D3D3"
                    onPress={() => { this._selectTeam('away') }}
                  />
                </View>
                <View style={[ styles.homeButton, this.state.activeTeam === 'home' ? styles.active : styles.inactive ]}>
                  <Button
                    title={this.state.homeTeam}
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
            Object.keys(this.state.boxscore).length === 0 ?
              <Text style={{ textAlign: 'center', color: '#D3D3D3' }}> Boxscore unavailable </Text>
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
    backgroundColor: '#1F1F1F'
  },
  homeButton: {
    flex: 1,
    backgroundColor: '#1F1F1F'
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
    gameID: state.scores.selectedGame,
    date: state.date.date,
    season: state.date.season
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

