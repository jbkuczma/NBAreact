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
          outterRadius={this.props.outterRadius}
          innerRadius={this.props.innerRadius}
          padAngle={this.props.padAngle}
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
  outterRadius: PropTypes.string,
  innerRadius: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  padAngle: PropTypes.number
}

DonutChart.defaultProps = {
  outterRadius: '100%',
  innerRadius: '80%',
  label: '',
  padAngle: 0
}
