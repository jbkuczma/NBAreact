import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import Loader from '../common/Loader'
import DonutChart from '../common/DonutChart'
import VerticalBarChart from '../common/BarChart'
import Circle from '../common/Circle'
import { connect } from 'react-redux'
import NBA, { getTeamFromTeamMap } from '../../utils/nba'
import { adjustLuminance } from '../../utils/colors'

class PlayerGameDetailScreen extends Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.state.params.stats.game_date}`
  })

  constructor() {
    super()
    this.nba = new NBA()
    this.state = {
      boxscoreAdvanced: null,
      boxscoreMisc: null,
      moxscoreUsage: null,
      boxscoreHustle: null,
      boxscorePlayerTrack: null,
      loading: true,
    }
  }

  componentDidMount() {
    const playerID = this.props.navigation.state.params.stats.player_id
    const gameID = this.props.navigation.state.params.stats.game_id
    console.log(this.props.navigation.state.params.stats)

    this.nba.getAdditionalBoxscoreStatsForPlayer(gameID, playerID).then((data) => {
      console.log(data)
      this.setState({
        boxscoreAdvanced: data.BoxscoreAdvanced,
        boxscoreMisc: data.BoxscoreMisc,
        boxscoreUsage: data.BoxscoreUsage,
        boxscoreHustle: data.BoxscoreHustle,
        boxscorePlayerTrack: data.BoxscorePlayerTrack,
        loading: false
      })
    })
  }

  _createTimePlayedLabel() {
    const stats = this.props.navigation.state.params.stats
    const minutesPlayed = this.state.boxscoreAdvanced.min

    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.defaultCenteredView}>
          <Text style={styles.timePlayedLabelMain}>
            Time played:  {minutesPlayed}
          </Text>
        </View>
      </View>
    )
  }

  _createScoringGraphs() {
    const teamColor = getTeamFromTeamMap(this.props.teamID).color
    const stats = this.props.navigation.state.params.stats
    const points = stats.pts
    const ft_points = stats.ftm
    const fg3_points = stats.fg3m * 3
    const fg_points = points - ft_points - fg3_points

    // get shots that aren't 3 pointers
    const shots_made = stats.fgm - stats.fg3m
    const shots_attempt = stats.fga - stats.fg3a

    const data = [
      {color: '#FF6724', key: '1', value: fg_points },
      {color: '#429FFD', key: '2', value: fg3_points},
      {color: '#19F36F', key: '3', value: ft_points }
    ]

    const labels = [
      {text: `FT`,     associatedColor: '#19F36F', value: `${stats.ftm}-${stats.fta} (${ft_points})`},
      {text: `FG`,     associatedColor: '#FF6724', value: `${shots_made}-${shots_attempt} (${fg_points})`},
      {text: `3FG`,    associatedColor: '#429FFD', value: `${stats.fg3m}-${stats.fg3a} (${fg3_points})`},
    ]

    return (
      <View style={[styles.defaultCenteredView, { flexDirection: 'row', marginTop: 15 }]}>
        <DonutChart
          data={data}
          padAngle={0.05}
        />
        <View style={[styles.defaultCenteredView, { flexDirection: 'column' }]}>
          <View style={styles.labelTitle}>
            <Text style={styles.text}> Point Distribution </Text>
          </View>
          {labels.map((label, index) => {
            return (
              <View style={[styles.defaultCenteredView, { flexDirection: 'row', marginLeft: 10 }]}>
                <Circle
                  height={10}
                  width={10}
                  borderRadius={20}
                  color={label.associatedColor}
                />
                <View style={[{justifyContent: 'flex-start', flexDirection: 'row' }]}>
                  <Text style={styles.text}> {label.text} </Text>
                </View>
                <View style={[styles.defaultCenteredView, {justifyContent: 'flex-end', flexDirection: 'row', marginRight: 24 }]}>
                  <Text style={styles.text}> {label.value} </Text>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  _createShootingGraphs() {
    const teamColor = getTeamFromTeamMap(this.props.teamID).color
    const teamColorDarken = adjustLuminance(teamColor, -0.5)
    const gameStats = this.props.navigation.state.params.stats
    const fg_percent = (gameStats.fg_pct  * 100).toFixed(1)
    const fg3_percent = (gameStats.fg3_pct * 100).toFixed(1)
    const ft_percent = (gameStats.ft_pct * 100).toFixed(1)
    // #7C7C7C

    const fg_data = [
      {color: teamColor, key: '1', value: fg_percent },
      {color: teamColorDarken, key: '2', value: 100 - fg_percent },
    ]
    const fg3_data = [
      {color: teamColor, key: '1', value: fg3_percent },
      {color: teamColorDarken, key: '2', value: 100 - fg3_percent },
    ]
    const ft_data = [
      {color: teamColor, key: '1', value: ft_percent },
      {color: teamColorDarken, key: '2', value: 100 - ft_percent },
    ]
    const datas = [
      fg_data,
      fg3_data,
      ft_data
    ]
    const labels = [
      `FG% \n ${fg_percent}%`,
      `3PT% \n ${fg3_percent}%`,
      `FT% \n ${ft_percent}%`
    ]

    return (
      <View style={[styles.defaultCenteredView, { flexDirection: 'row' }]}>
        {datas.map((data, index) => {
          return (
            <DonutChart
              key={index}
              data={data}
              label={labels[index]}
            />
          )
        })}
      </View>
    )
  }

  _createStatBarChart() {
    const stats = this.props.navigation.state.params.stats
    const points = stats.pts
    const assists = stats.ast
    const rebounds = stats.reb
    const blocks = stats.blk
    const steals = stats.stl
    const turnovers = stats.tov
    const data = [rebounds, assists, turnovers, blocks, steals]
    const labels = ['REB', 'AST', 'TOV', 'BLK', 'STL']

    return (
      <View style={[styles.defaultCenteredView, { flexDirection: 'row' }]}>
        <VerticalBarChart
          data={data}
          xAxisLabels={labels}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#111111' }}>
        {
          this.state.loading &&
          <Loader />
        }
        <ScrollView contentContainerStyle={styles.scrollview}>
          {
            !this.state.loading && this.state.boxscoreAdvanced &&
            <View style={styles.defaultCenteredView}>
              { this._createScoringGraphs() }
              { this._createShootingGraphs() }
              { this._createStatBarChart() }
            </View>
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  defaultCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollview: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#D3D3D3',
    fontFamily: 'Rubik-Light'
  },
  timePlayedLabelMain: {
    color: '#D3D3D3',
    fontSize: 28
  },
  timePLayedLabelSecondary: {
    color: '#D3D3D3',
    fontSize: 24
  },
  labelTitle: {
    borderBottomWidth: 1,
    borderBottomColor: '#777777'
  }
})

function mapStateToProps(state) {
  return {
    teamID: state.scores.selectedTeam.teamID
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerGameDetailScreen)
