import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import NBA from '../../utils/nba'

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

    const matchup = game.matchup.match(/(@|vs\.)\s[a-zA-Z]+/)[0].replace('.', '')

    return(
      <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, height: 100 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text> </Text>
          <Text style={styles.textSecondary}> {game.wl} </Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10  }}>
          <Text style={styles.textSecondary}> {game.game_date} </Text>
          <Text style={styles.textSecondary}> {matchup} </Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 5, marginRight: 5 }}>
          {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textPrimary}>
              {game.pts} <Text style={styles.textSecondary}>pts</Text>
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textPrimary}>
              {game.reb} <Text style={styles.textSecondary}>reb</Text>
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textPrimary}>
              {game.ast} <Text style={styles.textSecondary}>ast</Text>
            </Text>
          </View> */}
          <Text style={styles.textSecondary}> away score - home score </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const games = this.props.games.playoffs.concat(this.props.games.regularSeason)
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
