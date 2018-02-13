import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, Button, Platform, StatusBar, FlatList } from 'react-native'
import { connect } from 'react-redux'
import TeamCell from './TeamCell'
import NBA from '../../utils/nba'


class StandingsScreen extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
      loading: true,
      east: [],
      west: []
    }
  }

  componentDidMount() {
    this.getLeagueStandings()
  }

  getLeagueStandings = () => {
    this.nba.getLeagueStandings()
    .then((data) => {
      this.setState({
        east: data.league.standard.conference.east,
        west: data.league.standard.conference.west,
        loading: false
      })
    })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#242424' }}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.statusBar} />
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
          (!this.state.loading && this.state.east && this.state.west) &&

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <View style={styles.conferenceStandings}>
              <View style={styles.conferenceButtons}>
                <Button title="East" style={styles.eastButton} />
                <Button title="West" style={styles.westButton} />
              </View>
              <View style={styles.header}>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ textAlign: 'center', color: '#D3D3D3' }}> Rank </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'center', color: '#D3D3D3' }}> Wins </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'center', color: '#D3D3D3' }}> Loss </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'center', color: '#D3D3D3' }}> GB </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ textAlign: 'center', color: '#D3D3D3' }}> Streak </Text>
                </View>
              </View>
              <FlatList
                data={this.state.east}
                keyExtractor={team => team.teamId}
                renderItem={(team) => (
                  <TeamCell
                    team={team}
                  />
                )}
              />
            </View>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: (Platform.OS === 'ios') ? 45 : 0,
    backgroundColor: '#F7971E'
  },
  conferenceButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  eastButton: {
    flex: 1,
  },
  westButton: {
    flex: 1
  },
  conferenceStandings: {
    flex: 1,
  },
  header: {
    flexDirection: 'row'
  }
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
)(StandingsScreen)
