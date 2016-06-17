/* eslint-disable semi, space-before-function-paren, space-before-blocks*/
import React from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

class Button extends React.Component {

    // go to page that holds table of conference standings
  onPress(){
    console.log('pressed');
  }

  render(){
    return (
      <View>
        <TouchableHighlight
          onPress={this.onPress}
        >
          <Text style={this.props.style}> {this.props.text} </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = Button;
/* eslint-enable semi, space-before-function-paren, space-before-blocks*/
