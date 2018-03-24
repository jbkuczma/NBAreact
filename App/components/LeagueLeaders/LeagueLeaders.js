import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, Platform, StatusBar, FlatList } from 'react-native'
import { connect } from 'react-redux'
import CategoryPicker from './CategoryPicker'
import Loader from '../common/Loader'
import NBA from '../../utils/nba'

const categories = ['Points', 'Rebounds', 'Offensive Rebounds', 'Defensive Rebounds', 'Assists', 'Steals', 'Blocks', 'Turnovers', 'Efficiency', 'Minutes']

class LeagueLeaders extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
      loading: false,
      category: null,
      leaders: []
    }
  }

  componentDidMount() {
    this.setState({
      category: this.props.category
    }, () => {
      this.getLeagueLeaders()
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category != this.props.category) {
      this.setState({
        category: nextProps.category
      }, () => {
        this.getLeagueLeaders()
      })
    }
  }

  getLeagueLeaders = () => {
    this.nba.getLeagueLeaders(this.props.season, this.props.categoryValue)
    .then((data) => {
      this.setState({
        leaders: data.leagueLeaders
      })
    })
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
    // color: '#D3D3D3',
    fontFamily: 'Rubik-Light'
  },
  statusBar: {
    height: (Platform.OS === 'ios') ? 45 : 0,
    backgroundColor: '#F7971E'
  },
  picker: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginLeft: 20
  }
})

function mapStateToProps(state) {
  return {
    season: state.date.season,
    category: state.league.category.label,
    categoryValue: state.league.category.value
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueLeaders)
