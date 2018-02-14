import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, FlatList, ScrollView } from 'react-native'

export default class PlayerBoxCell extends Component<Props> {
  render() {
    // console.log(this.props.player.item)
    if (this.props.player.item.personId === undefined) {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {
            this.props.player.item.map((headerCategory) => {
              const viewWidth = (headerCategory === 'Player' ? 120 : 60) // extra space for player name
              return (
                <View style={{ width: viewWidth, padding: 10, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#D1D1D1', borderBottomWidth: 1 }}>
                  <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
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
          <View style={{ width: 120, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.personId }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.pos ? this.props.player.item.pos : '  ' }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.min }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.points }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.assists }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.totReb }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.steals }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.blocks }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.plusMinus }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.fgm }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.fga }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.fgp }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.tpm }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.tpa }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.tpp }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.ftm }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.fta }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.ftp }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.turnovers }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.defReb }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.plusMinus }
            </Text>
          </View>
          <View style={{ width: 60, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#D3D3D3' }}>
              { this.props.player.item.pFouls }
            </Text>
          </View>
        </View>
      )
    }
  }
}
