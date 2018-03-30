import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import { connect } from 'react-redux'
import { selectCategory } from '../../actions/actions'

class CategoryPicker extends Component<Props> {

  constructor(props) {
    super(props)

    this.onSelect = this.onSelect.bind(this)
    this.renderButtonText = this.renderButtonText.bind(this)
  }

  renderButtonText(value) {
    return value + ' ▼'
  }

  onSelect(index, value) {
    this.props.selectCategory(value)
  }

  render() {
    const { category } = this.props

    return (
      <ModalDropdown
        textStyle={styles.text}
        dropdownStyle={styles.dropdown}
        dropdownTextStyle={styles.dropdownText}
        defaultValue={`${category} ▼`}
        options={this.props.options}
        renderButtonText={this.renderButtonText}
        onSelect={this.onSelect}
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
    category: state.league.category.label,
    categoryValue: state.league.category.value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectCategory: (selectedCategory) => dispatch(selectCategory(selectedCategory))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryPicker)
