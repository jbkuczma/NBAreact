import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { selectTeam } from '../../actions/actions'
import { getTeamFromTeamMap } from '../../utils/nba'
import TeamMap from '../../utils/TeamMap'

class TeamCell extends Component<Props> {

  _selectTeam() {
    const teamInfo = this.props.team.item
    const team = {
      teamID: teamInfo.teamId
    }
    this.props.selectTeam(team)
    this.props.navigator.navigate('Team')
  }

  render() {
    const team = this.props.team.item
    return (
      <TouchableOpacity style={styles.teamcell} onPress={() => { this._selectTeam() }}>
        <View style={[styles.statcell, { flex: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }]}>
          <View>
            <Text style={[styles.statcellText, {fontSize: 16}]}> {team.confRank} </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            {/* <Image
              style={styles.logo}
              source={getTeamFromTeamMap(team.teamId).logo}
            /> */}
            <Text style={{ textAlign: 'center', color: getTeamFromTeamMap(team.teamId).color, fontSize: 16 }}> {getTeamFromTeamMap(team.teamId).team} </Text>
          </View>
        </View>
        <View style={styles.statcell}>
          <Text style={styles.statcellText}> {team.win} </Text>
        </View>
        <View style={styles.statcell}>
          <Text style={styles.statcellText}> {team.loss} </Text>
        </View>
        <View style={styles.statcell}>
          <Text style={styles.statcellText}> {team.gamesBehind} </Text>
        </View>
        <View style={styles.statcell}>
          <Text style={styles.statcellText}> {team.isWinStreak ? 'W' : 'L'}{team.streak} </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  teamcell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#141414',
    marginTop: 5,
    marginBottom: 5
  },
  logo: {
    marginLeft: 10,
    height: 65,
    width: 65,
  },
  statcell: {
    flex: 1
  },
  statcellText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#D3D3D3',
    fontFamily: 'Rubik-Light'
  }
})

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectTeam: (selectedTeam) => dispatch(selectTeam(selectedTeam))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamCell)
