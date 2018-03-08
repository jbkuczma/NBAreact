import React, { Component } from 'react'
import { View } from 'react-native'
import { BarChart, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

export default class LeadTracker extends Component<Props> {

  // values with home team id must be converted to a negative value
  _adjustData(leadtracker) {
    return leadtracker.map((item) => {
      return item.leadTeamId === this.props.homeTeamID ? -Math.abs(item.points) : Math.abs(item.points)
    })
  }

  // if label has '-' remove it
  _formatLabel(label) {
    label = label.toString()
    return label.charAt(0) === '-' ? label.substr(1) : label
  }

  render() {
    const {
      homeTeamColor,
      awayTeamColor,
      leadtracker
    } = this.props
    const data = this._adjustData(leadtracker)
    const barData = [
      {
        values: data,
        positive: {
          fill: awayTeamColor
        },
        negative: {
          fill: homeTeamColor
        }
      }
    ]

    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <YAxis
          data={data}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fill: '#D3D3D3', fontSize: 12 }}
          formatLabel={ value => this._formatLabel(value) }
        />
        <BarChart
          spacing={0}
          style={{ flex: 1, marginLeft: 15, marginRight: 15 }}
          data={ barData }
          contentInset={{ top: 30, bottom: 30 }}
        />
      </View>
    )
  }
}
