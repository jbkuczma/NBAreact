import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Platform,
  Text,
} from 'react-native'

export default class SearchBar extends Component {
  
    constructor(props) {
    super(props)

    this.state = {
      textInputFocused: false,
      playerSearchInput: ''
    }

    this._handleTextInputFocus = this._handleTextInputFocus.bind(this)
    this._handleTextInputBlur = this._handleTextInputBlur.bind(this)
    this._handleTextChange = this._handleTextChange.bind(this)
  }

  _handleTextInputFocus() {
    this.setState({
      textInputFocused: true
    })
  }

  _handleTextInputBlur() {
    this.setState({
      textInputFocused: false
    })
  }

  _handleTextChange(player) {
    this.setState({
      playerSearchInput: player
    })
  }

  render() {

    return (
      <SafeAreaView
        style={styles.container}
      >
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder='Search for Player'
          placeholderTextColor='#828282'
          onFocus={this._handleTextInputFocus}
          onBlur={this._handleTextInputBlur}
          onChangeText={this._handleTextChange}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderTopColor: '#000',
    backgroundColor: '#111111'
  },
  input: {
    paddingLeft: 30,
    paddingRight: 20,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#323232',
    fontSize: 18,
    color: '#D3D3D3',
    height: 40,
    ...Platform.select({
      ios: {
        height: 30,
      },
      android: {
        borderWidth: 0,
      },
    }),
  },
  searchIcon: {
    left: 16,
  }
})
