import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { selectGame } from '../../actions/actions'
import TeamMap from '../../utils/TeamMap'

class GameCell extends Component<Props> {

  _selectGame() {
    const gameID = this.props.teams.item.gameId
    const homeTeam = this.props.teams.item.hTeam.triCode
    const awayTeam = this.props.teams.item.vTeam.triCode
    const gameData = {
      gameID: gameID,
      homeTeam: {
        abbreviation: homeTeam,
        teamID: this.props.teams.item.hTeam.teamId
      },
      awayTeam: {
        abbreviation: awayTeam,
        teamID: this.props.teams.item.vTeam.teamId
      }
    }

    this.props.selectGame(gameData)
    this.props.navigator.navigate('Game')
  }

  render() {

    const {
      hTeam,
      vTeam,
      clock,
      period,
      startTimeEastern
    } = this.props.teams.item

    const awayTeamColor = TeamMap[vTeam.triCode.toLowerCase()] ? TeamMap[vTeam.triCode.toLowerCase()].color : '#1C3F80'
    const awayTeamLogo  = TeamMap[vTeam.triCode.toLowerCase()] ? TeamMap[vTeam.triCode.toLowerCase()].logo : require('../../Assets/Images/nba.png')
    const homeTeamColor = TeamMap[hTeam.triCode.toLowerCase()] ? TeamMap[hTeam.triCode.toLowerCase()].color : '#BE0E2C'
    const homeTeamLogo  = TeamMap[hTeam.triCode.toLowerCase()] ? TeamMap[hTeam.triCode.toLowerCase()].logo : require('../../Assets/Images/nba.png')

    return (
      <TouchableOpacity style={{flexDirection: 'column'}} onPress={() => { this._selectGame() }}>
        <View style={styles.colorbar}>
          <View style={{ flex: 1, backgroundColor: awayTeamColor, borderTopLeftRadius: 12 }} />
          <View style={{ flex: 1, backgroundColor: homeTeamColor, borderTopRightRadius: 12 }} />
        </View>
        <View style={styles.gamecell}>
        <View style={styles.awayTeam}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>
              <Image
                style={styles.logo}
                source={awayTeamLogo}
              />
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 22, color: '#D3D3D3' }}> {vTeam.score} </Text>
          </View>
        </View>
        {
          clock && period.current != 0 ?
            <View style={styles.gameInfo}>
              <Text style={{ fontSize: 20, textAlign: 'center', color: '#D3D3D3' }}> Q{period.current} </Text>
              <Text style={{ fontSize: 16, textAlign: 'center', color: '#D3D3D3' }}> {clock} </Text>
            </View>
          :
            this.props.teams.item.endTimeUTC ?
              <View style={styles.gameInfo}>
                <Text style={{ fontSize: 20, textAlign: 'center', color: '#D3D3D3' }}> Final </Text>
              </View>
            :
              <View style={styles.gameInfo}>
                <Text style={{ fontSize: 20, textAlign: 'center', color: '#D3D3D3' }}> Tip off </Text>
                <Text style={{ fontSize: 16, textAlign: 'center', color: '#D3D3D3' }}> {startTimeEastern} </Text>
              </View>
        }
        <View style={styles.homeTeam}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 22, color: '#D3D3D3' }}> {hTeam.score} </Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>
              <Image
                style={styles.logo}
                source={homeTeamLogo}
              />
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
    backgroundColor: '#141414',
    // backgroundColor: '#212121',
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
