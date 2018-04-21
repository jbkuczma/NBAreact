import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { BarChart, YAxis, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import PropTypes from 'prop-types'

export default class VerticalBarChart extends Component<Props> {
  render() {
    const { data, xAxisLabels } = this.props
    const barData = [
      {
        values: data,
        positive: {
          fill: '#74BBFB'
        }
      }
    ]

    return (
      <View style={{ flex: 1, height: 200 }}>
        <View style={styles.view}>
          <YAxis
            data={data}
            svg={{
              fill: '#D3D3D3',
              fontSize: 12,
              fontFamily: 'Rubik-Light'
            }}
            formatLabel={value => value}
            contentInset={{ top: 10, bottom: 10 }}
            numberOfTicks={6}
          />
          <BarChart
            style={{ flex: 1 }}
            data={barData}
            contentInset={{ top: 10, bottom: 10, left: 10, right: 10 }}
          />
        </View>
        <XAxis
          data={xAxisLabels}
          scale={scale.scaleBand}
          formatLabel={(value, index) => xAxisLabels[index]}
          contentInset={{ left: 20, right: 20 }}
          svg={{
            fill: '#D3D3D3',
            fontSize: 12,
            fontFamily: 'Rubik-Light'
          }}
        />
      </View>
    )
  }
}

const styles= StyleSheet.create({
  view: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    padding: 5
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#D3D3D3',
    fontFamily: 'Rubik-Light'
  }
})

VerticalBarChart.propTypes = {

}

VerticalBarChart.defaultProps = {

}
