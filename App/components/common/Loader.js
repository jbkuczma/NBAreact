import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'

export default class Loader extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          size={this.props.size}
          color={this.props.color}
        />
      </View>
    )
  }
}

Loader.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string
}

Loader.defaultProps = {
  size: 'large',
  color: '#F7971E'
}
