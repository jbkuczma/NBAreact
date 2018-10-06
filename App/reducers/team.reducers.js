const initialState = {
  team: null,
  info: null,
  seasonRanks: null,
  roster: null,
  gamelog: null,
  fetchingTeam: false,
  error: ''
}

const team = (state = initialState, action) => {
  switch(action.type) {
    case 'SELECT_TEAM':
      return {
        ...state, games: action.games
      }
    case 'GET_TEAM_SUCCESS':
      return {
        ...state,
        fetchingTeam: false,
        info: action.data.info,
        seasonRanks: action.data.seasonRanks,
        roster: action.data.roster,
        gamelog: action.data.gamelog
      }
    case 'FETCHING_TEAM': {
      return {
        ...state,
        fetchingTeam: true
      }
    }
    case 'GET_TEAM_ERROR': {
      return {
        ...state,
        fetchingTeam: false,
        error: action.error
      }
    }
    default:
      return state
  }
}

export default team
