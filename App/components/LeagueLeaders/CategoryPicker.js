import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import { connect } from 'react-redux'

class CategoryPicker extends Component<Props> {

  renderButtonText(value) {
    return value + ' ▼'
  }

  render() {
    return (
      <ModalDropdown
        textStyle={styles.text}
        dropdownStyle={styles.dropdown}
        dropdownTextStyle={styles.dropdownText}
        defaultValue='Category ▼'
        options={this.props.options}
        renderButtonText={this.renderButtonText}
      />
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#D3D3D3',
    fontSize: 20,
    fontFamily: 'Rubik-Light'
  },
  dropdownText: {
    fontSize: 16
  },
  dropdown: {
    marginTop: 5
  },
})

function mapStateToProps(state) {
  return {
    season: state.date.season
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryPicker)
