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
      refresh: false,
      games: []
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
    this.nba.getGames(this.props.date)
    .then((games) => {
      this.setState({
        loading: false,
        refresh: false,
        date: this.props.date,
        games: games.games,
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  handleRefresh() {
    this.setState({
      refresh: true,
      loading: true
    }, () => {
      this.fetchGames()
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="light-content"
        />
        <Header
          numberOfGames={this.state.games.length}
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
              data={this.state.games}
              refreshing={this.state.refresh}
              onRefresh={() => { this.handleRefresh() }}
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
