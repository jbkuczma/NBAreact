import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, FlatList, ScrollView } from 'react-native'

export default class PlayerBoxCell extends Component<Props> {
  render() {
    if (this.props.player.item.personId === undefined) {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {
            this.props.player.item.map((headerCategory, idx) => {
              const viewWidth = (headerCategory === 'Player' ? 140 : 60) // extra space for player name
              return (
                <View style={[styles.boxscoreHeaderView, { width: viewWidth }]} key={idx}>
                  <Text style={styles.boxscoreText}>
                    { headerCategory }
                  </Text>
                </View>
              )
            })
          }
        </View>
      )
    } else {
      return (
        <View style= {{ flex: 1, flexDirection: 'row' }}>
          <View style={styles.boxscoreStatNameView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.display_fi_last }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.pos }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.min }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.points }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.assists }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.totReb }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.steals }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.blocks }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.plusMinus }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.fgm }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.fga }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.fgp }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.tpm }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.tpa }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.tpp }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.ftm }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.fta }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.ftp }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.turnovers }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.defReb }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.plusMinus }
            </Text>
          </View>
          <View style={styles.boxscoreStatView}>
            <Text style={styles.boxscoreText}>
              { this.props.player.item.pFouls }
            </Text>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  boxscoreHeaderView: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#D1D1D1',
    borderBottomWidth: 1
  },
  boxscoreText: {
    textAlign: 'center',
    color: '#D3D3D3'
  },
  boxscoreStatNameView: {
    width: 140,
    padding: 10,
    justifyContent: 'center',
     alignItems: 'center'
  },
  boxscoreStatView: {
    width: 60,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
