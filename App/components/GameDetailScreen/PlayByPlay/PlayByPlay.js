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
    console.log(play)
    const quarter = 'Q' + play.item.quarter
    const time = play.item.cl
    let description = play.item.de
    let timeString = ''
    if (description !== 'Start Period' || description !== 'End Period') {
      timeString = quarter + ' ' + time
    }
    return (
      <View style={styles.playcell}>
        <View style={{ flex: 1 }}>
          <Text style={{textAlign: 'center'}}>
            {timeString}
          </Text>
        </View>
        <View style={{ flex: 4 }}>
          <Text style={{textAlign: 'center'}}>
            {description}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
         <FlatList
          data={this.state.plays}
          renderItem={(play) => this._renderPlay(play)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  playcell: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 80,
    backgroundColor: 'yellow',
    marginBottom: 5
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
