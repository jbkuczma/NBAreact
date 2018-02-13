import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { selectGame } from '../../actions/actions'
import TeamMap from '../../utils/TeamMap'

class GameCell extends Component<Props> {

  _selectGame() {
    const gameID = this.props.teams.item.gameInfo.game_id
    console.log(gameID)
    this.props.selectGame(gameID)
    this.props.navigator.navigate('Game')
  }

  render() {
    const {
      home,
      away,
      gameInfo
    } = this.props.teams.item

    return (
      <TouchableOpacity style={{flexDirection: 'column'}} onPress={() => { this._selectGame() }}>
        <View style={styles.colorbar}>
          <View style={{ flex: 1, backgroundColor: TeamMap[away.team_abbreviation.toLowerCase()].color, borderTopLeftRadius: 12 }} />
          <View style={{ flex: 1, backgroundColor: TeamMap[home.team_abbreviation.toLowerCase()].color, borderTopRightRadius: 12 }} />
        </View>
        <View style={styles.gamecell}>
        <View style={styles.awayTeam}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>
              <Image
                style={styles.logo}
                source={TeamMap[away.team_abbreviation.toLowerCase()].logo}
              />
              {/* <Text> {away.team_abbreviation} </Text> */}
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 22, color: '#D3D3D3' }}> {away.pts} </Text>
          </View>
        </View>
        {
          home.pts && away.pts ?
            <View style={styles.gameInfo}>
              <Text style={{ fontSize: 20, textAlign: 'center', color: '#D3D3D3' }}> {gameInfo.live_pc_time} </Text>
              <Text style={{ fontSize: 16, textAlign: 'center', color: '#D3D3D3' }}> {gameInfo.game_status_text} </Text>
            </View>
          :
            <View style={styles.gameInfo}>
              <Text style={{ fontSize: 20, textAlign: 'center', color: '#D3D3D3' }}> Tip off </Text>
              <Text style={{ fontSize: 16, textAlign: 'center', color: '#D3D3D3' }}> {gameInfo.game_status_text} </Text>
            </View>
        }
        <View style={styles.homeTeam}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 22, color: '#D3D3D3' }}> {home.pts} </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>
              <Image
                style={styles.logo}
                source={TeamMap[home.team_abbreviation.toLowerCase()].logo}
              />
              {/* <Text> {home.team_abbreviation} </Text> */}
            </View>
          </View>
        </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  colorbar: {
    marginTop: 12,
    marginLeft: 10,
    marginRight: 10,
    height: 4,
    flexDirection: 'row',
  },
  gamecell: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    backgroundColor: '#212121',
    flexDirection: 'row',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  awayTeam: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 10
  },
  gameInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  homeTeam: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10
  },
  logo: {
    height: 60,
    width: 60,
  }
})

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectGame: (selectedGame) => dispatch(selectGame(selectedGame))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameCell)
