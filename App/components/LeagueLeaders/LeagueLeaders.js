import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import CategoryPicker from './CategoryPicker'
import Loader from '../common/Loader'
import FadeInView from '../common/FadeInView'
import SearchBar from '../common/SearchBar'
import { selectPlayer, selectTeam } from '../../actions/actions'

const categories = ['Points', 'Rebounds', 'Assists', 'Offensive Rebounds', 'Defensive Rebounds', 'Steals', 'Blocks', 'Turnovers', 'Efficiency', 'Minutes']

class LeagueLeaders extends Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    header: <SearchBar navigation={navigation} />
  })

  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      category: null,
      leaders: null,
      hasNewData: false
    }
  }

  componentDidMount = () => {
    const { category } = this.props
    this.props.getPlayers()
    this.setCategoryAndUpdate(category)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.category != this.props.category) {
      this.setCategoryAndUpdate(nextProps.category)
    }
  }

  setCategoryAndUpdate = (category) => {
    this.setState({
      category: category,
      hasNewData: true
    }, () => {
      this.getLeagueLeaders()
    })
  }

  getLeagueLeaders = () => {
    const { season, categoryValue } = this.props
    this.props.getLeagueLeaders(season, categoryValue)
    this.setState({
      loading: false,
      hasNewData: false
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

  _keyExtractor = (item) => {
    return item.player_id.toString()
  }

  _renderHeader = () => {
    const { categoryValue } = this.props
    const header = ['Rank', 'Player', 'GP', 'MPG', categoryValue]
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

  _renderItem = ({ item, index }) => {
    const { categoryValue } = this.props
    const propertiesToRender = ['rank', 'player', 'gp', 'min', categoryValue.toLowerCase()]
    return (
      <TouchableOpacity style={[styles.cell, styles.defaultCenteredView]} onPress={() => this._selectPlayer(item)}>
        {
          propertiesToRender.map((property, index) => {
            const flexValue = property === 'player' ? 2 : 1
            return (
              <View style={[styles.defaultCenteredView, { flex: flexValue }]} key={index}>
                <Text style={styles.text}> {item[property]} </Text>
              </View>
            )
          })
        }
      </TouchableOpacity>
    )
  }

  render() {
    const { leagueLeaders } = this.props;
    const { loading, hasNewData } = this.state

    return (
      <View style={[styles.body, styles.defaultCenteredView]}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.statusBar} />
        { loading && <Loader /> }
        { !loading &&
          <View style={styles.picker}>
            <View style={{flex: 1}}>
              <CategoryPicker
                options={categories}
              />
            </View>
          </View>
        }
        <View style={[styles.defaultCenteredView, { flexDirection: 'row' }]}>
          { !loading && leagueLeaders &&
            <FadeInView
              duration={700}
              delay={50}
              fadeAgain={hasNewData}
              style={styles.leadersList}
            >
              { this._renderHeader() }
              <FlatList
                data={leagueLeaders.slice(0, 50)}
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
    playersInLeague: state.league.playersInLeague,
    leagueLeaders: state.league.leagueLeaders
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPlayers: () => dispatch({ type: 'GET_PLAYERS_IN_LEAUGE' }),
    setTeam: (teamID) => dispatch(selectTeam(teamID)),
    selectPlayer: (selectedPlayer) => dispatch(selectPlayer(selectedPlayer)),
    getLeagueLeaders: (season, category) => dispatch({ type: 'GET_LEAGUE_LEADERS', season, category })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueLeaders)
