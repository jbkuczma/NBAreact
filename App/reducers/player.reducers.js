const initialState = {
  fetchingPlayer: false,
  error: ''
}

const player = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_PLAYER_SUCCESS':
      return {
        ...state,
        fetchingPlayer: false,
        gameStats: action.data.gameStats,
        careerStats: action.data.careerStats
      }
    case 'FETCHING_PLAYER': {
      return {
        ...state,
        fetchingPlayer: true
      }
    }
    case 'GET_PLAYER_ERROR': {
      return {
        ...state,
        fetchingPlayer: false,
        error: action.error
      }
    }
    default:
      return state
  }
}

export default player
