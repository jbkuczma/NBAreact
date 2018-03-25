import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

export default class Circle extends Component<Props> {
  render() {
    const {
      height,
      width,
      borderRadius,
      color
    } = this.props
    return (
      <View style={{ backgroundColor: color, borderRadius: borderRadius, height: height, width: width }}>
        {this.props.children}
      </View>
    )
  }
}

Circle.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  borderRadius: PropTypes.number,
  color: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ])
}

Circle.defaultProps = {
  height: 8,
  width: 8,
  borderRadius: 16,
  color: '#F7971E'
}
