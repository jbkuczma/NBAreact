import React, { Component } from 'react'
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'
import GameCell from './GameCell'
import NBA from '../../utils/nba'

class ScoresScreen extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
      date: null,
      loading: true,
      games: {},
      linescore: []
    }
  }

  componentWillReceiveProps(props) {
    if (props.date != this.state.date) {
      this.setState({
        loading: true
      })
    }
  }

  componentDidMount () {
    this.fetchGames()
  }

  componentDidUpdate() {
    this.fetchGames()
  }

  shouldComponentUpdate(props, nextProps) {
    return this.state.date != props.date
  }

  fetchGames = () => {
    this.nba.getGames({
      gameDate: this.props.date
    })
    .then((games) => {
      let linescores = games.LineScore
      let gameInfo = games.GameHeader
      this.setState({
        loading: false,
        date: this.props.date,
        games: games,
        linescore: this._combineGames(linescores, gameInfo)
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // games are returned as a array of objects for each team playing that day
  // even index => home team
  // odd index => away team
  _combineGames(games, info) {
    let combined = []
    let infoIndex = 0
    games.forEach((team, index) => {
      if (index % 2 === 0) {
        let obj = {
          home: team,
          away: games[index+1],
          gameInfo: info[infoIndex] // relying on data is in order
        }
        combined.push(obj)
        infoIndex++
      }
    })
    return combined
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="light-content"
        />
        <Header
          numberOfGames={this.state.linescore.length}
        />
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
          {
            this.state.loading &&
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator
                size="large"
                color="#F7971E"
              />
            </View>
          }
          {
            (this.state.games && !this.state.loading) &&
            <FlatList
              data={this.state.linescore}
              keyExtractor={game => game.home.game_id}
              refreshing={this.state.loading}
              onRefresh={() => { this.fetchGames() }}
              renderItem={(teams) => (
                <GameCell
                  navigator={this.props.navigation}
                  teams={teams}
                />
              )}
            />
          }
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
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
)(ScoresScreen)
