import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { CATEGORIES } from './headers'

export default class PlayerBoxCell extends Component<Props> {
  render() {
    const { player } = this.props;

    if (player.item.personId === undefined) {
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
          {
            CATEGORIES.map((category, idx) => {
              const viewStyle = category === 'display_fi_last' ? styles.boxscoreStatNameView : styles.boxscoreStatView
              return (
                <View style={viewStyle} key={idx}>
                  <Text style={styles.boxscoreText}>
                    { player.item[category] }
                  </Text>
                </View>
              )
            })
          }
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
    color: '#D3D3D3',
    fontFamily: 'Rubik-Light'
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
