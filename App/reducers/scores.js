const initialState = {
  selectedGame: null,
  selectedTeam: null
}

const scores = (state = initialState, action) => {
  switch(action.type) {
    case 'SCORES_FOR_DATE':
      return {
        ...state, games: action.games
      }
    case 'SELECT_GAME':
      return {
        ...state, selectedGame: action.selectedGame
      }
    case 'SELECT_TEAM':
      return {
        ...state, selectedTeam: action.selectedTeam
      }
    default:
      return state
  }
}

export default scores
