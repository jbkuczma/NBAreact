const initialState = {
  category: 'Points',
}

const league = (state = initialState, action) => {
  switch(action.type) {
    case 'SELECT_CATEGORY':
      return {
        ...state, category: action.selectedCategory
      }
    default:
      return state
  }
}

export default league
