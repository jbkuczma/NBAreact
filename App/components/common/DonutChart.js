import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import PropTypes from 'prop-types'

export default class DonutChart extends Component<Props> {
  render() {
    const { label, data } = this.props

    return (
      <View style={styles.view}>
        <View style={styles.label}>
          <Text style={styles.text}> {label} </Text>
        </View>
        <PieChart
          outterRadius="100%"
          innerRadius="80%"
          padAngle={0}
          style={{ height: 200 }}
          data={ data }
        />
      </View>
    )
  }
}

const styles= StyleSheet.create({
  view: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#D3D3D3'
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

DonutChart.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
}

DonutChart.defaultProps = {
  size: 'large',
  color: '#F7971E'
}
