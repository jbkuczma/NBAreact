const scores = (state = [], action) => {
  switch(action.type) {
    case 'SCORES_FOR_DATE':
      return [
        ...state, {
          games: action.games
        }
      ]
    case 'SELECT_GAME':
      return [
        ...state, {
          selectedGame: action.selectedGame
        }
      ]
    default:
      return state
  }
}

export default scores
