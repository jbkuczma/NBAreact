import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getPlayersInLeague } from '../../actions/actions'
import CategoryPicker from './CategoryPicker'
import Loader from '../common/Loader'
import FadeInView from '../common/FadeInView'
import SearchBar from '../common/SearchBar'
import NBA from '../../utils/nba'
import { selectPlayer, selectTeam } from '../../actions/actions'

const categories = ['Points', 'Rebounds', 'Offensive Rebounds', 'Defensive Rebounds', 'Assists', 'Steals', 'Blocks', 'Turnovers', 'Efficiency', 'Minutes']

class LeagueLeaders extends Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    header: <SearchBar navigation={navigation} />
  })

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
      loading: true,
      category: null,
      leaders: null,
      hasNewData: false
    }

    this._keyExtractor = this._keyExtractor.bind(this)
    this._renderItem = this._renderItem.bind(this)
  }

  componentDidMount() {
    this.props.getPlayers()
    this.setCategoryAndUpdate(this.props.category)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category != this.props.category) {
      this.setCategoryAndUpdate(nextProps.category)
    }
  }

  setCategoryAndUpdate(category) {
    this.setState({
      category: category,
      hasNewData: true
    }, () => {
      this.getLeagueLeaders()
    })
  }

  getLeagueLeaders = () => {
    this.nba.getLeagueLeaders(this.props.season, this.props.categoryValue)
    .then((data) => {
      this.setState({
        loading: false,
        hasNewData: false,
        leaders: data.LeagueLeaders
      })
    })
  }

  _selectPlayer(player) {
    const thePlayer = this.props.playersInLeague.filter((_player) => {
      return parseInt(_player.personId) === parseInt(player.player_id)
    })[0]

    const selectedPlayer = {
      player: thePlayer
    }
    const teamID = {
      teamID: thePlayer.teamId
    }

    this.props.setTeam(teamID)
    this.props.selectPlayer(selectedPlayer)
    this.props.navigation.navigate('Player')
  }

  _keyExtractor(item) {
    return item.player_id.toString()
  }

  _renderHeader() {
    const header = ['Rank', 'Player', 'GP', 'MPG', this.props.categoryValue]
    return (
      <View style={styles.header}>
        {
          header.map((header, idx) => {
            const flexValue = header === 'Player' ? 2 : 1
            return(
              <View style={{ flex: flexValue }} key={idx}>
                <Text style={styles.text}> {header} </Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  _renderItem({ item, index }) {
    const propertiesToRender = ['rank', 'player', 'gp', 'min', this.props.categoryValue.toLowerCase()]
    return (
      <TouchableOpacity style={[styles.cell, styles.defaultCenteredView]} onPress={() => this._selectPlayer(item)}>
        {
          propertiesToRender.map((property) => {
            const flexValue = property === 'player' ? 2 : 1
            return (
              <View style={[styles.defaultCenteredView, { flex: flexValue }]}>
                <Text style={styles.text}> {item[property]} </Text>
              </View>
            )
          })
        }
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={[styles.body, styles.defaultCenteredView]}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.statusBar} />
        {
          this.state.loading &&
          <Loader />
        }

        <View style={styles.picker}>
          <View style={{flex: 1}}>
            <CategoryPicker
              options={categories}
            />
          </View>
        </View>
        <View style={[styles.defaultCenteredView, { flexDirection: 'row' }]}>
          {
            !this.state.loading && this.state.leaders &&
            <FadeInView
              duration={500}
              delay={500}
              fadeAgain={this.state.hasNewData}
              style={styles.leadersList}
            >
              { this._renderHeader() }
              <FlatList
                data={this.state.leaders.slice(0, 50)}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </FadeInView>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#111111'
  },
  defaultCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#D3D3D3',
    fontFamily: 'Rubik-Light'
  },
  statusBar: {
    height: (Platform.OS === 'ios') ? 45 : 0,
    backgroundColor: '#F7971E'
  },
  picker: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginLeft: 20
  },
  leadersList: {
    flex: 1,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  cell: {
    flex: 1,
    height: 60,
    flexDirection: 'row'
  },
  header: {
    flexDirection: 'row'
  }
})

function mapStateToProps(state) {
  return {
    season: state.date.season,
    category: state.league.category.label,
    categoryValue: state.league.category.value,
    playersInLeague: state.league.playersInLeague
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPlayers: () => dispatch(getPlayersInLeague()),
    setTeam: (teamID) => dispatch(selectTeam(teamID)),
    selectPlayer: (selectedPlayer) => dispatch(selectPlayer(selectedPlayer))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueLeaders)
