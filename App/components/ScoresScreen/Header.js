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

  formatDate() {
    // ex, Tuesday, Oct 10
    const date = new Date(this.props.date)
    const dateArray = date.toDateString().split(' ')
    // 0 - week day, 1 - month, 2 - date
    return dateArray[0] + ', ' + dateArray[1] + ' ' + dateArray[2]
  }

  handleDateChange(type) {
    if (type === 'next') {
      const date = new Date(this.props.date)
      const nextDate = new Date(date.getTime() + (24 * 60 * 60 * 1000)).toLocaleDateString()
      this.props.changeDateToNextDate(nextDate)
    }
    else if (type === 'previous') {
      const date = new Date(this.props.date)
      const previousDate = new Date(date.getTime() - (24 * 60 * 60 * 1000)).toLocaleDateString()
      this.props.changeDateToPreviousDate(previousDate)
    }
    else if (type === 'other') {
      const newDate = this.props.date
      this.props.changeDateToDate(newDate)
    }
  }

  render() {
    return (
      <View>
        <View style={styles.statusBar} />
        <View style={styles.dateCointainer}>
          <TouchableOpacity onPress={() => { this.handleDateChange('previous') }}>
            <View>
              <Text style={{fontSize: 36}}> {'<'} </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateCointainerMiddle} onPress={() => { this.handleDateChange('other') }}>
            <View style={{flex: 1}} >
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: '#FFFFFF'}}> {this.formatDate()} </Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 16, color: '#FFFFFF'}}> There are {this.props.numberOfGames} games today </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.handleDateChange('next') }}>
            <View>
              <Text style={{fontSize: 36}}> {'>'} </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: (Platform.OS === 'ios') ? 45 : 0,
    backgroundColor: '#F7971E'
    // backgroundColor: '#000000'
  },
  dateCointainer: {
    height: 75,
    backgroundColor: '#F7971E',
    // backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  dateCointainerLeft: {

  },
  dateCointainerMiddle: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  dateCointainerRight: {

  }
})

function mapStateToProps(state) {
  return {
    date: state.date.date
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeDateToPreviousDate: (date) => dispatch(changeDate(date)),
    changeDateToNextDate: (date) => dispatch(changeDate(date)),
    changeDateToDate: (date) => dispatch(changeDate(date))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
