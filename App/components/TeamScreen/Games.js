import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import NBA, { getTeamFromTeamMap } from '../../utils/nba'
import { formatDateString } from '../../utils/date'

class Games extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this._renderGame = this._renderGame.bind(this)
  }

  _keyExtractor(game){
    return game.game_id
  }

  _renderGame(game) {
    // const _this = this
    game = game.item

    // const matchup = game.matchup.match(/(@|vs\.)\s[a-zA-Z]+/)[0].replace('.', '')

    // return(
    //   <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, height: 100 }}>
    //     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    //       <Text> </Text>
    //       <Text style={styles.textSecondary}> {game.wl} </Text>
    //     </View>
    //     <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10  }}>
    //       <Text style={styles.textSecondary}> {game.game_date} </Text>
    //       <Text style={styles.textSecondary}> {matchup} </Text>
    //     </View>
    //     <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 5, marginRight: 5 }}>
    //       <Text style={styles.textSecondary}> away score - {game.pts} </Text>
    //     </View>
    //   </TouchableOpacity>
    // )
    const homeTeam = getTeamFromTeamMap(game.hTeam.teamId).team
    const awayTeam = getTeamFromTeamMap(game.vTeam.teamId).team
    const isSelectedTeamHome = game.hTeam.teamId === this.props.teamID
    const homeScore = game.hTeam.score
    const awayScore = game.vTeam.score
    const outcome = isSelectedTeamHome ? (parseInt(homeScore) > parseInt(awayScore) ? 'W' : 'L') : (parseInt(awayScore) > parseInt(homeScore) ? 'W' : 'L')
    const matchup = isSelectedTeamHome ? `vs ${awayTeam}` : `@ ${homeTeam}`
    const date = formatDateString(game.startDateEastern)

    return(
      <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, height: 100 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text> </Text>
          <Text style={styles.textSecondary}> {outcome} </Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10  }}>
          <Text style={styles.textSecondary}> {date} </Text>
          <Text style={styles.textSecondary}> {matchup} </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 5, marginRight: 5 }}>
          <Text style={styles.textSecondary}> {awayScore} - {homeScore} </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    // const games = this.props.games.playoffs.concat(this.props.games.regularSeason)
    const games = this.props.games.filter((game) => {
      return game.statusNum === 3
    }).reverse()
    console.log(games)
    return (
      <FlatList
        data={games}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderGame}
      />
    )
  }
}

const styles = StyleSheet.create({
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
  gameCell: {
    flex: 1,
    marginTop: 5
  },
})

function mapStateToProps(state) {
  return {
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
)(Games)
