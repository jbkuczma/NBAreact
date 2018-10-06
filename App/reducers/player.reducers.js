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
    case 'GET_ADVANCED_GAME_STATS_FAILURE':
    case 'GET_PLAYER_ERROR': {
      return {
        ...state,
        fetchingPlayer: false,
        error: action.error
      }
    }
    case 'GET_ADVANCED_GAME_STATS_SUCCESS': {
      return {
        ...state,
        fetchingPlayer: false,
        boxscoreAdvanced: action.data.boxscoreAdvanced,
        boxscoreMisc: action.data.boxscoreMisc,
        boxscoreUsage: action.data.boxscoreUsage,
        boxscoreHustle: action.data.boxscoreHustle,
        boxscorePlayerTrack: action.data.boxscorePlayerTrack
      }
    }
    default:
      return state
  }
}

export default player
