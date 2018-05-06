import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Animated, Easing } from 'react-native'
import PropTypes from 'prop-types'

export default class RefreshButton extends Component<Props> {
  constructor() {
    super()
    this.spinValue = new Animated.Value(0)
  }

  spin() {
    const { handleRefresh } = this.props

    // perform refresh function
    handleRefresh()

    // spin
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start()
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    return (
      <TouchableOpacity style={{ marginRight: 20, transform: [{rotate: spin}] }} onPress={ () => { this.spin() } }>
        <Image
          source={require('../../Assets/icons/refresh.png')}
          style={{ height: 24, width: 24, tintColor: '#D3D3D3' }}
        />
      </TouchableOpacity>
    )
  }
}

RefreshButton.propTypes = {
  handleRefresh: PropTypes.func // the function that will execute when the refresh button is pressed
}

RefreshButton.defaultProps = {

}
