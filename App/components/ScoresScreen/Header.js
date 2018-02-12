import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity
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
        <View style={styles.statusBar}>

        </View>
        <View style={styles.dateCointainer}>
          <TouchableOpacity onPress={() => { this.handleDateChange('previous') }}>
            <View>
              <Text> Left </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateCointainerMiddle} onPress={() => { this.handleDateChange('other') }}>
            <View style={{flex: 1}} >
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 18}}> {this.formatDate()} </Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 16}}> There are X games today </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.handleDateChange('next') }}>
            <View>
              <Text> Right </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  statusBar: {
    height: (Platform.OS === 'ios') ? 45 : 0,
    backgroundColor: '#F7971E'
  },
  dateCointainer: {
    height: 75,
    backgroundColor: '#F7971E',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  dateCointainerLeft: {

  },
  dateCointainerMiddle: {
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center'
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
