import NBA from '../utils/nba'

this.nba = new NBA()

export function changeDate(date) {
  return {
    type: 'CHANGE_DATE',
    date
  }
}

export function selectGame(selectedGame) {
  return {
    type: 'SELECT_GAME',
    selectedGame
  }
}

export function selectTeam(selectedTeam) {
  return {
    type: 'SELECT_TEAM',
    selectedTeam
  }
}

export function selectPlayer(selectedPlayer) {
  return {
    type: 'SELECT_PLAYER',
    selectedPlayer
  }
}

export function selectCategory(selectedCategory) {
  return {
    type: 'SELECT_CATEGORY',
    selectedCategory
  }
}

export const getPlayersInLeague = () => {
  return (dispatch, getState) => {
    const season = getState().date.season
    return (
      this.nba.getPlayers(season)
      .then((data) => {
        dispatch({
          type: 'PLAYERS_SUCCESS',
          payload: data.league.standard
        })
      })
    )
  }
}
