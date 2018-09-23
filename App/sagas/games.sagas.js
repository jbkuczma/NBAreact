import { put, takeLatest, select } from 'redux-saga/effects'
import NBA from '../utils/nba'

this.nba = new NBA()

function* getGames(payload) {
  try {
    const date = payload.date;
    const data = yield this.nba.getGames(date);
    const games = data.games

    yield put({ type: 'SCORES_FOR_DATE', games: games })
  } catch (error) {
    yield put({ type: 'GET_GAMES_FAILURE', error: 'Error fetching games' })
  }
}

export const gamesSagas = [
  takeLatest('GET_GAMES_REQUEST', getGames)
]
