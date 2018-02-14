import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import NBA from '../../../utils/nba'

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
      plays = [].concat.apply([], plays).reverse() // flatten array of arrays into a single array
      this.setState({
        plays: plays
      })
    })
  }

  _cleanPlays(obj) {
    return Object.keys(obj).map(function(idx) {
      const quarter = obj[idx].p
      const plays = obj[idx].pla
      return plays.map((play) => {
        return {...play, quarter: quarter }
      })
    })
  }

  // _renderPlayOld(play) {
  //   const quarter = play.item.period
  //   const time = play.item.pctimestring
  //   const h = play.item.homedescription
  //   const v = play.item.visitordescription
  //   const timeString = 'Q' + quarter + ' ' + time
  //   const playString = h && v ? h + '\n' + v :
  //                       h && !v ? h :
  //                         !h && v ? v :
  //                           !h && !v ? '' : ''
  //   return (
  //     <View style={styles.playcell}>
  //       <View style={{ flex: 1 }}>
  //         <Text style={{textAlign: 'center'}}>
  //           {timeString}
  //         </Text>
  //       </View>
  //       <View style={{ flex: 4 }}>
  //         <Text style={{textAlign: 'center'}}>
  //           {playString}
  //         </Text>
  //       </View>
  //     </View>
  //   )
  // }

  _renderPlay(play) {
    const homeTeam = this.props.navigation.state.params.home
    const awayTeam = this.props.navigation.state.params.away
    const quarter = 'Q' + play.item.quarter
    const time = play.item.cl
    const playerID = play.item.pid
    let description = play.item.de
    let timeString = ''

    if (description !== 'Start Period' || description !== 'End Period') {
      timeString = quarter + ' ' + time
    }

    return (
      <View style={styles.playcell}>
        <View style={{ flex: 3, marginLeft: 10 }}>
          <Text style={styles.playByPlayText}>
            { description.includes(awayTeam) ? description : '' }
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.playByPlayText}>
            {timeString}
          </Text>
        </View>
        <View style={{ flex: 3, marginRight: 10 }}>
          <Text style={styles.playByPlayText}>
            { description.includes(homeTeam) ? description : '' }
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
    backgroundColor: '#1F1F1F',
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
)(PlayByPlay)
