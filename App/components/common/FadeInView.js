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

  performFade(toValue, duration, delay, onComplete) {
    const { viewOpacity } = this.state

    Animated.timing(
      viewOpacity,
      {
        toValue: toValue,
        duration: duration,
        delay,
        useNativeDriver: true
      }
    ).start()
  }

  componentWillReceiveProps(nextProps) {
    const { viewOpacity } = this.state
    const { duration, delay } = this.props

    if (nextProps.fadeAgain) {
      Animated.timing(
        viewOpacity,
        {
          toValue: 0,
          duration: 50,
          useNativeDriver: true
        }
      ).start(() => {
        this.performFade(1, duration, delay)
      })
    }
  }

  componentDidMount() {
    const { duration, delay } = this.props
    this.performFade(1, duration, delay)
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
  duration: PropTypes.number,
  delay: PropTypes.number,
  fadeAgain: PropTypes.bool,
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
  duration: 500,
  delay: 0,
  fadeAgain: false
}
