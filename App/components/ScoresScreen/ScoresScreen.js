import React, { Component } from 'react'
import {
  View,
  FlatList,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'
import GameCell from './GameCell'
import Loader from '../common/Loader'

class ScoresScreen extends Component<Props> {

  constructor(props) {
    super(props)

    this.state = {
      date: null,
      loading: true,
      refresh: false,
    }
  }

  componentDidMount = () => {
    this.fetchGames()
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.games !== prevProps.games && prevProps.games.length === 0) {
      this.fetchGames()
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.props.games !== nextProps.games;
  }

  fetchGames = () => {
    const { date } = this.props;
    this.props.getGames(date);

    // handle
    this.setState({
      loading: false,
      refresh: false,
      date: date,
    })
  }

  handleRefresh = () => {
    // only allow refreshing on the current date - past and future games dont need to have refresh abilities
    if (this.props.date === this.props.currentDate) {
      this.setState({
        refresh: true
      }, () => {
        this.fetchGames()
      })
    }
  }

  _keyExtractor = (item) => {
    return item.gameId
  }

  render() {
    const { games } = this.props;

    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle='light-content' />
        <Header
          numberOfGames={games.length}
        />
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
          {
            this.state.loading &&
            <Loader />
          }
          {
            (games && !this.state.loading) &&
            <FlatList
              data={games}
              refreshing={this.state.refresh}
              onRefresh={() => { this.handleRefresh() }}
              keyExtractor={this._keyExtractor}
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
    currentDate: state.date.currentDate,
    season: state.date.season,
    games: state.scores.games
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getGames: (date) => dispatch({ type: 'GET_GAMES_REQUEST', date })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoresScreen)
