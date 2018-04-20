import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Loader from '../common/Loader'
import DonutChart from '../common/DonutChart'
import { connect } from 'react-redux'
import NBA, { getTeamFromTeamMap } from '../../utils/nba'
import { adjustLuminance } from '../../utils/colors'

class PlayerGameDetailScreen extends Component<Props> {

  constructor() {
    super()
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    console.log(this.props)
  }

  _createShootingGraphs() {
    const teamColor = getTeamFromTeamMap(this.props.teamID).color
    const teamColorDarken = adjustLuminance(teamColor, -0.5)
    const gameStats = this.props.navigation.state.params.stats
    const fg_percent = (gameStats.fg_pct  * 100).toFixed(1)
    const fg3_percent = (gameStats.fg3_pct * 100).toFixed(1)
    const ft_percent = (gameStats.ft_pct * 100).toFixed(1)

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

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#111111' }}>
        {
          this.state.loading &&
          <Loader />
        }
        <View style={styles.defaultCenteredView}>
          { this._createShootingGraphs() }
          <Text style={{ color: 'white' }}> test </Text>
        </View>
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
  text: {
    textAlign: 'center',
    color: '#D3D3D3'
  }
})

function mapStateToProps(state) {
  return {
    gameID: state.scores.selectedGame,
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
