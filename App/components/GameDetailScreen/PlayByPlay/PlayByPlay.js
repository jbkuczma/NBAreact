import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import NBA from '../../../utils/nba'
import TeamMap from '../../../utils/TeamMap'

class PlayByPlay extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
      plays: []
    }
  }

  componentDidMount() {
    this.fetchPlays()
  }

  fetchPlays() {
    this.nba.getPlayByPlay(this.props.gameID, this.props.season)
    .then((data) => {
      let plays = this._cleanPlays(data.g.pd) // returns an array of arrays for each quarter
      plays = [].concat.apply([], plays).reverse() // flatten array of arrays into a single array, show most recent play (end of array) first
      this.setState({
        plays: plays
      })
    })
  }

  _cleanPlays(obj) {
    // obj is an array of quarter objects - each object representing one quarter in the game with an arary of the plays for that quarter
    // instead of returning an array of quarter objects, we are going to return an array of play objects
    return Object.keys(obj).map(function(idx) {
      const quarter = obj[idx].p
      const plays = obj[idx].pla
      return plays.map((play) => {
        return {...play, quarter: quarter }
      })
    })
  }

  _renderPlay(play) {
    const homeTeam = this.props.homeTeam.abbreviation
    const homeLogo = TeamMap[homeTeam.toLowerCase()].logo
    const homeScore = play.item.hs
    const awayTeam = this.props.awayTeam.abbreviation
    const awayLogo = TeamMap[awayTeam.toLowerCase()].logo
    const awayScore = play.item.vs
    const quarter = 'Q' + play.item.quarter
    const time = play.item.cl
    const playerID = play.item.pid
    let description = play.item.de
    let timeString = ''
    const logoToUse = description.includes(homeTeam)
      ? homeLogo : description.includes(awayTeam)
      ? awayLogo : ''
    const gameScore = awayScore + '-' + homeScore

    if (description !== 'Start Period' || description !== 'End Period') {
      timeString = quarter + ' ' + time
    }

    // some of the descriptions will have [TOR 122-110] or [NYK], this regex removes the brackets and the text within them
    description = description.replace(/ *\[[^]*\] */g, '')

    return (
      <View style={styles.playcell}>
        <View style={{ flex: 1 }}>
          <View style={{borderBottomColor: '#FD8505', borderBottomWidth: 1, marginBottom: 5 }}>
            <Text style={styles.playByPlayText}>
              { quarter }
            </Text>
            <Text style={styles.playByPlayText}>
              { time }
            </Text>
          </View>
          <View>
            <Text style={styles.playByPlayText}>
              { gameScore }
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={logoToUse}
            style={{
              height: 40,
              width: 40
            }}
          />
        </View>
        <View style={{ flex: 3, marginRight: 10 }}>
          <Text style={styles.playByPlayText}>
            { description }
          </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.playByPlayContainer}>
        {
          this.state.plays.length > 0 ?
            <FlatList
              data={this.state.plays}
              renderItem={(play) => this._renderPlay(play)}
            />
          :
            <Text style={styles.playByPlayText}>
              Play by play available after tip off
            </Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  playByPlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#111111'
  },
  playcell: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#141414',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  playByPlayText: {
    textAlign: 'center',
    color: '#D3D3D3'
  }
})

function mapStateToProps(state) {
  return {
    gameID: state.scores.selectedGame.gameID,
    date: state.date.date,
    season: state.date.season,
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
)(PlayByPlay)
