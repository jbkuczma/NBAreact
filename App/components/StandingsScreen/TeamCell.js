import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import TeamMap from '../../utils/TeamMap'

class TeamCell extends Component<Props> {

  _getTeamFromTeamMap(teamID) {
    const team = Object.keys(TeamMap).find((x) => {
      return TeamMap[x].id == teamID
    })
    return TeamMap[team]
  }


  render() {
    const team = this.props.team.item
    console.log(team)
    return (
      <View style={styles.teamcell}>
        <View>
          <Text style={[styles.statcellText, {fontSize: 18}]}> {team.confRank} </Text>
        </View>
        <View style={styles.statcell}>
          <Image
            style={styles.logo}
            source={this._getTeamFromTeamMap(team.teamId).logo}
          />
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
      </View>
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
    backgroundColor: '#1F1F1F',
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
    fontSize: 20,
    color: '#D3D3D3'
  }
})

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamCell)
