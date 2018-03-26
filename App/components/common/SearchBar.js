import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Platform,
  Text,
  FlatList,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { isIphoneX } from '../../utils/device'

class SearchBar extends Component {

    constructor(props) {
    super(props)

    this.state = {
      textInputFocused: false,
      playerSearchInput: '',
      suggestionListVisible: false,
      suggestionData: null
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

  /////
  _keyExtractor(item) {
    return item.personId
  }

  _renderItem({ item, index }) {
    const firstName = item.firstName
    const lastName = item.lastName
    const teamsPlayedOn = item.teams
    const currentTeamID = teamsPlayedOn.length > 0 ? teamsPlayedOn[teamsPlayedOn.length-1].teamId : null// get last item in teams array

    return(
      <View style={[styles.defaultCenteredView, styles.suggestionCell]}>
        <Text style={styles.text}> {firstName} {lastName} </Text>
      </View>
    )
  }

  _handleTextChange(input) {
    const suggestionListVisible = input === '' ? false : true

    if (input === '') {
      this.setState({
        suggestionData: null,
        suggestionListVisible: suggestionListVisible
      })
    } else {
      let suggested = this.props.playersInLeague.slice() // copy original data
      suggested = suggested.filter(player => {
        const playerName = player.firstName + ' ' + player.lastName
        return playerName.toLowerCase().includes(input) || playerName.includes(input)
      }).slice(0, 15), // show top 15 players from search input

      this.setState({
        suggestionData: suggested,
        suggestionListVisible: suggestionListVisible
      })
    }
  }
  ////

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
        {
          this.state.suggestionListVisible && this.props.playersInLeague &&
          <View style={styles.suggestionList}>
            <FlatList
              data={this.state.suggestionData}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </View>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#D3D3D3',
    fontSize: 14
  },
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
  },

  suggestionList: {
    position: 'absolute',
    height: 400,
    top: isIphoneX() ? 80 : 55,
    left: 10,
    right: 10,
    borderRadius: 2,
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  suggestionCell: {
    height: 60,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
    opacity: 0.8
  }
})

function mapStateToProps(state) {
  return {
    playersInLeague: state.league.playersInLeague
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)
