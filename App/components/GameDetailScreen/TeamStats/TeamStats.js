import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import NBA from '../../../utils/nba'
import TeamMap from '../../../utils/TeamMap'
import Loader from '../../common/Loader'
import LeadTracker from './LeadTracker'
import TeamStatsTable from './TeamStatsTable'
import QuarterScores from './QuarterScores'

const RefreshButton = ({ handleRefresh }) => (
  <TouchableOpacity style={{ marginRight: 20 }} onPress={handleRefresh}>
    <Image
      source={require('../../../Assets/icons/refresh.png')}
      style={{ height: 24, width: 24, tintColor: '#D3D3D3' }}
    />
  </TouchableOpacity>
)

class TeamStats extends Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.state.params.title}`,
    headerRight: (
      <RefreshButton
        handleRefresh={navigation.state.params.handleRefresh}
      />
    )
  })

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
      teamStats: null,
      leadTracker: [],
      miniBoxscore: null,
      loading: true
    }
  }

  componentDidMount() {
    // we can now call fetchGameStats via navigation.state.params.handleRefresh
    this.props.navigation.setParams({ handleRefresh: this.fetchGameStats })
    this.fetchGameStats()
  }

  fetchGameStats = () => {
    Promise.all([
      this.nba.getBoxscore(this.props.gameID, this.props.date),
      this.nba.getLeadTrackerForGame(this.props.gameID, this.props.date),
      this.nba.getMiniBoxscore(this.props.gameID, this.props.date)
    ])
    .then((gameStats) => {
      this.setState({
        teamStats: gameStats[0].stats ? gameStats[0].stats : null,
        leadTracker: gameStats[1],
        miniBoxscore: gameStats[2],
        loading: false
      })
    })
  }

  render() {
    const awayTeamColor = TeamMap[this.props.awayTeam.abbreviation.toLowerCase()] ? TeamMap[this.props.awayTeam.abbreviation.toLowerCase()].color : '#1C3F80'
    const homeTeamColor = TeamMap[this.props.homeTeam.abbreviation.toLowerCase()] ? TeamMap[this.props.homeTeam.abbreviation.toLowerCase()].color : '#BE0E2C'

    return (
      <View style={{ flex: 1, backgroundColor: '#111111' }}>
        {
          this.state.loading &&
          <Loader />
        }
        {
          (this.state.teamStats && this.state.teamStats && this.state.leadTracker && this.state.miniBoxscore) &&

          <ScrollView contentContainerStyle={styles.teamStatsContainer}>
            <QuarterScores
              miniBoxscore={this.state.miniBoxscore}
            />
            <View style={styles.leadTracker}>
              <View style={styles.leadTrackerHeader}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.text18pt}> Lead Tracker </Text>
                </View>
                <LeadTracker
                  homeTeamID={this.props.homeTeam.teamID}
                  awayTeamID={this.props.awayTeam.teamID}
                  homeTeamColor={homeTeamColor}
                  awayTeamColor={awayTeamColor}
                  leadtracker={this.state.leadTracker}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.text18pt}> Times Tied: {this.state.teamStats.timesTied} </Text>
                  <Text style={styles.text18pt}> Lead Changes: {this.state.teamStats.leadChanges} </Text>
                </View>
              </View>
            </View>
            <View style={styles.teamComparison}>
              <TeamStatsTable
                awayTeamColor={awayTeamColor}
                homeTeamColor={homeTeamColor}
                stats={this.state.teamStats}
              />
            </View>
          </ScrollView>
        }
        {
          (!this.state.loading && (!this.state.teamStats || !this.state.teamStats || !this.state.leadTracker || !this.state.miniBoxscore)) &&
          <View style={styles.defaultCenteredView}>
            <Text style={styles.text}> Teams stats avaliable after tip off </Text>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#D3D3D3'
  },
  text18pt: {
    textAlign: 'center',
    color: '#D3D3D3',
    fontSize: 18
  },
  defaultCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  teamStatsContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#111111'
  },
  /* quarter scores */
  teamQuarterScores: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10
  },
  teamQuarterHeader: {
    flex: 1,
    justifyContent: 'center'
  },
  teamQuarterChart: {
    flex: 2,
    justifyContent: 'center'
  },
  /******************/
  /* lead tracker chart */
  leadTracker: {
    // flex: 3
    height: 260,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  leadTrackerHeader: {
    flex: 1,
    justifyContent: 'center'
  },
  /******************/
  /* team comparison */
  teamComparison: {
    flex: 1,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderTopWidth: 1,
    borderTopColor: '#D3D3D3',
    flexDirection: 'row'
  },
  /******************/
})

function mapStateToProps(state) {
  return {
    gameID: state.scores.selectedGame.gameID,
    awayTeam: state.scores.selectedGame.awayTeam,
    homeTeam: state.scores.selectedGame.homeTeam,
    date: state.date.date
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamStats)
