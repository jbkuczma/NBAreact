import React, { Component } from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types'

export default class FadeInView extends Component<Props> {

  constructor(props) {
    super(props)

    this.state = {
      viewOpacity: new Animated.Value(0),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fadeAgain) {
      this.animation(0, (() => { this.animation(1) }))
    }
  }

  componentDidMount() {
    this.animation(1)
  }

  animation(toValue, onComplete) {
    const { duration, delay } = this.props
    const { viewOpacity } = this.state

    Animated.timing(
      viewOpacity,
      {
        toValue: toValue,
        duration: duration,
        delay,
        useNativeDriver: true
      }
    ).start(onComplete || (() => {}))
  }

  render() {
    const { viewOpacity } = this.state
    const { style } = this.props

    return(
      <Animated.View style={[style, { opacity: viewOpacity }]}>
        {this.props.children}
      </Animated.View>
    )
  }
}

FadeInView.propTypes = {
  fadeAgain: PropTypes.bool,
  duration: PropTypes.number,
  delay: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired
}

FadeInView.defaultProps = {
  fadeAgain: false,
  duration: 500,
  delay: 0
}
