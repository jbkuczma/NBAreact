import React, { Component } from 'react'
import {
  Text,
  View,
  FlatList
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
      this.setState({
        loading: false,
        date: this.props.date,
        games: games,
        linescore: this._combineGames(linescores)
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // games are returned as a array of objects for each team playing that day
  // even index => home team
  // odd index => away team
  _combineGames(games) {
    let combined = []
    games.forEach((team, index) => {
      if (index % 2 == 0) {
        let obj = {
          home: team,
          away: games[index+1]
        }
        combined.push(obj)
      }
    })
    return combined
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {
            this.state.loading &&
            <Text> Loading </Text>
          }
          {
            (this.state.games && !this.state.loading) &&
            <FlatList
              data={this.state.linescore}
              keyExtractor={game => game.home.game_id}
              renderItem={(game) => (
                <GameCell
                  game={game}
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
