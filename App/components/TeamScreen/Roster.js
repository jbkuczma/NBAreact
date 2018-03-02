import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import NBA from '../../utils/nba'

class Roster extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this._renderPlayer = this._renderPlayer.bind(this)
  }

  _formatPosition(position) {
    switch (position) {
      case 'C-F':
        return 'Center-Forward'
      case 'F-G':
        return 'Forward-Guard'
      case 'G-F':
        return 'Guard-Forward'
      case 'F':
        return 'Forward'
      case 'G':
        return 'Guard'
      case 'C':
        return 'Center'
      default:
        return ''
    }
  }

  _keyExtractor(player){
    return player.player_id
  }

  _renderPlayer(player) {
    player = player.item
    const playerImageURL = this.nba.getPlayerImage(player.player_id)

    return(
      <View style={styles.playerCell}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.playerImage}
            source={{ uri: playerImageURL }}
          />
        </View>
        <View>
          <Text style={styles.textPrimary}> #{player.num} {player.player} </Text>
          <Text style={styles.textSecondary}> {this._formatPosition(player.position)} </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <FlatList
        numColumns={2}
        data={this.props.team}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderPlayer}
      />
    )
  }
}

const styles = StyleSheet.create({
  textPrimary: {
    textAlign: 'center',
    color: '#D3D3D3',
    fontSize: 18
  },
  textSecondary: {
    textAlign: 'center',
    color: '#D3D3D3',
    fontSize: 16
  },
  playerCell: {
    flex: 1,
    marginTop: 5
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  playerImage: {
    height: 100,
    width: 100,
    borderRadius: 50
  }
})

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    // todo selectPlayer
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Roster)
