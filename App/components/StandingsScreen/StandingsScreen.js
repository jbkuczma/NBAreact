import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, Platform, StatusBar, FlatList } from 'react-native'
import { connect } from 'react-redux'
import TeamCell from './TeamCell'
import Loader from '../common/Loader'

class StandingsScreen extends Component<Props> {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      conference: 'east',
    }
  }

  componentDidMount = () => {
    this.getLeagueStandings()
  }

  getLeagueStandings = async () => {
    await this.props.getLeagueStandings();
    this.setState({ isLoading: false });
  }

  _selectConference(conference) {
    this.setState({ conference: conference })
  }

  _renderHeader() {
    const headers = ['Rank', 'Wins', 'Loss', 'GB', 'Streak']
    return (
      <View style={styles.header}>
      {
        headers.map((header, index) => {
          // only apply margin to first header
          const marginLeft = index === 0 ? 10 : 0
          const flex = index === 0 ? 2 : 1

          return (
            <View style={[styles.headerLabelView, { marginLeft: marginLeft, flex: flex }]} key={ index }>
              <Text style={styles.headerLabelText}> { header } </Text>
            </View>
          )
        })
      }
      </View>
    )
  }

  render() {
    const { conference, isLoading } = this.state;
    const { easternStandings, westernStandings } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111111' }}>
        <StatusBar barStyle='light-content' />
        <View style={styles.statusBar} />
        { isLoading && <Loader /> }
        { !isLoading &&
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <View style={styles.conferenceStandings}>
              <View style={styles.conferenceButtons}>
                <View style={[ styles.eastButton, this.state.conference === 'east' ? styles.active : styles.inactive ]}>
                  <Button
                    title="East"
                    color={Platform.OS === 'ios' ? "#D3D3D3" : "#151516"}
                    onPress={() => { this._selectConference('east') }}
                  />
                </View>
                <View style={[ styles.westButton, this.state.conference === 'west' ? styles.active : styles.inactive ]}>
                  <Button
                    title="West"
                    color={Platform.OS === 'ios' ? "#D3D3D3" : "#151516"}
                    onPress={() => { this._selectConference('west') }}
                  />
                </View>
              </View>
              { this._renderHeader() }
              <FlatList
                data={conference === 'east' ? easternStandings : westernStandings}
                keyExtractor={team => team.teamId}
                renderItem={(team) => (
                  <TeamCell
                    navigator={this.props.navigation}
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
    marginBottom: 15
  },
  eastButton: {
    flex: 1,
    backgroundColor: '#111111'
    // backgroundColor: '#1F1F1F'
  },
  westButton: {
    flex: 1,
    backgroundColor: '#111111'
  },
  active: {
    borderBottomWidth: 1,
    borderBottomColor: '#F7971E'
  },
  inactive: {

  },
  conferenceStandings: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10
  },
  headerLabelView: {
    flex: 1
  },
  headerLabelText: {
    textAlign: 'center',
    color: '#D3D3D3',
    fontFamily: 'Rubik-Light'
  }
})

function mapStateToProps(state) {
  return {
    season: state.date.season,
    easternStandings: state.league.standings.east,
    westernStandings: state.league.standings.west
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getLeagueStandings: () => dispatch({ type: 'GET_LEAGUE_STANDINGS' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StandingsScreen)
