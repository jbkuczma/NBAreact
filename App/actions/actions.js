export function changeDate(date) {
  return {
    type: 'CHANGE_DATE',
    date
  }
}

export function selectGame(game) {
  return {
    type: 'SELECT_GAME',
    game
  }
}
