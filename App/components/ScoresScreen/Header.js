import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import { changeDate } from '../../actions/actions'

class Header extends Component<Props> {

  constructor() {
    super()

    this.handleDateChange = this.handleDateChange.bind(this)
  }

  // desired output: Tuesday, Oct 10
  formatDate() {
    const date = new Date(this.props.date)
    const dateArray = date.toDateString().split(' ')
    // 0 - week day, 1 - month, 2 - date
    return dateArray[0] + ', ' + dateArray[1] + ' ' + dateArray[2]
  }

  handleDateChange(type) {
    let date = new Date(this.props.date)

    if (type === 'next') {
      date = new Date(date.getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString()
    }
    else if (type === 'previous') {
      date = new Date(date.getTime() - (24 * 60 * 60 * 1000)).toLocaleDateString()
    }
    else if (type === 'today') {
      date = this.props.currentDate
    }

    this.props.changeDateToNewDate(date)
  }

  getNumberOfGamesText() {
    return this.props.numberOfGames === 0 ? `There are no games today`
      : this.props.numberOfGames === 1 ? `There is 1 game today`
      : `There are ${this.props.numberOfGames} games today`
  }

  _renderArrow(direction) {
    const handler = direction === '<' ? 'previous' : 'next'
    return (
      <TouchableOpacity onPress={() => { this.handleDateChange(handler) }}>
        <View>
          <Text style={{fontSize: 36}}> { direction } </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View>
        <View style={styles.statusBar} />
        <View style={styles.dateCointainer}>
          { this._renderArrow('<') }
          <TouchableOpacity style={styles.dateCointainerMiddle} onPress={() => { this.handleDateChange('today') }}>
            <View style={{flex: 1}} >
              <View style={styles.defaultCenteredView}>
                <Text style={{fontSize: 18, color: '#FFFFFF'}}> { this.formatDate() } </Text>
              </View>
              <View style={styles.defaultCenteredView}>
                <Text style={{fontSize: 16, color: '#FFFFFF'}}> { this.getNumberOfGamesText() } </Text>
              </View>
            </View>
          </TouchableOpacity>
          { this._renderArrow('>') }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  defaultCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusBar: {
    height: (Platform.OS === 'ios') ? 45 : 0,
    backgroundColor: '#F7971E'
  },
  dateCointainer: {
    height: 75,
    backgroundColor: '#F7971E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  dateCointainerMiddle: {
    justifyContent: 'center',
    flexDirection: 'column',
  }
})

function mapStateToProps(state) {
  return {
    date: state.date.date,
    currentDate: state.date.currentDate
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeDateToNewDate: (date) => dispatch(changeDate(date))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
