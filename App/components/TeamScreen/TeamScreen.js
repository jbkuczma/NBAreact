import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import NBA from '../../utils/nba'
import TeamMap from '../../utils/TeamMap'

class TeamScreen extends Component<Props> {

  constructor() {
    super()

    this.nba = new NBA()
    this.state = {
      loading: true,
      teamInfo: null,
      teamSeasonRanks: null
    }
  }

  componentDidMount() {
    this.fetchTeam()
  }

  _getTeamFromTeamMap(teamID) {
    const team = Object.keys(TeamMap).find((x) => {
      return TeamMap[x].id == teamID
    })
    return TeamMap[team]
  }

  _getRank(number) {
    switch (parseInt(number)){
      case 1:
        return '1st'
      case 2:
        return '2nd'
      case 3:
        return '3rd'
      default:
        return number + 'th'
    }
  }

  fetchTeam() {
    const info = {
      season: this.props.season,
      teamID: this.props.teamID
    }

    // Promise.all([
    //   this.nba.getTeam(info),
    //   this.nba.getRoster(info) // season has to be 2017-18
    // ])
    this.nba.getTeam(info)
    .then((data) => {
      console.log(data)
      this.setState({
        loading: false,
        teamInfo: data.TeamInfoCommon[0],
        teamSeasonRanks: data.TeamSeasonRanks[0]
      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <View style={{ flex: 1, backgroundColor: '#111111' }}>
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
          this.state.teamInfo && this.state.teamSeasonRanks ?
            <View style={styles.header}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  style={styles.logo}
                  source={this._getTeamFromTeamMap(this.props.teamID).logo}
                />
              </View>
              <View style={{ flex: 2, flexDirection: 'column' }}>
                <View  style={{ flex: 1 }}>
                  <Text style={styles.headerTextPrimary}> {this.state.teamInfo.team_city} {this.state.teamInfo.team_name} </Text>
                </View>
                <View  style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.headerTextSecondary}> Wins-{this.state.teamInfo.w} </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.headerTextSecondary}> Losses-{this.state.teamInfo.l} </Text>
                  </View>
                </View>
                <View  style={{ flex: 1 }}>
                  <Text style={styles.headerTextSecondary}> {this._getRank(this.state.teamInfo.conf_rank)} in the {this.state.teamInfo.team_conference} </Text>
                  <Text style={styles.headerTextSecondary}> {this._getRank(this.state.teamInfo.div_rank)} in the {this.state.teamInfo.team_division} </Text>
                </View>
              </View>
            </View>
          :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.text}> Error </Text>
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
  headerTextPrimary: {
    color: '#D3D3D3',
    fontSize: 22
  },
  headerTextSecondary: {
    color: '#D3D3D3',
    fontSize: 16
  },
  header: {
    height: 120,
    backgroundColor: '#171717',
    flexDirection: 'row'
  },
  logo: {
    height: 90,
    width: 90,
  }
})

function mapStateToProps(state) {
  return {
    season: state.date.season,
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
)(TeamScreen)
