const initialState = {
  selectedGame: null,
  selectedTeam: null,
  games: []
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
    case 'SELECT_PLAYER':
      return {
        ...state, selectedPlayer: action.selectedPlayer
      }
    case 'GET_GAME_STATS_SUCCESS': {
      return {
        ...state,
        selectedGame: {
          ...state.selectedGame,
          teamStats: {...action.data.teamStatsData },
          boxscore: { ...action.data.boxscoreData },
          playByPlay: action.data.playByPlayData
        }
      }
    }
    default:
      return state
  }
}

export default scores
