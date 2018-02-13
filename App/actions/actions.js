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
