import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, Platform, StatusBar, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Loader from '../common/Loader'
import NBA from '../../utils/nba'


class LeagueLeaders extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
      loading: true,
      category: ''
    }
  }

  componentDidMount() {
  }

  getLeagueLeaders = () => {

  }

  _selectCategory(category) {

  }

  render() {
    return (
      <View style={styles.body}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.statusBar} />
        {
          this.state.loading &&
          <Loader />
        }
        <View><Text> test </Text></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111'
  },
  statusBar: {
    height: (Platform.OS === 'ios') ? 45 : 0,
    backgroundColor: '#F7971E'
  },
})

function mapStateToProps(state) {
  return {
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
)(LeagueLeaders)
