import { put, takeLatest, select } from 'redux-saga/effects'
import NBA from '../utils/nba'

this.nba = new NBA()

const getSeason = (state) => state.date.season;

function* getPlayersInLeague(payload) {
  try {
    const season = yield select(getSeason)
    const data = yield this.nba.getPlayers(season)
    yield put({ type: 'PLAYERS_SUCCESS', payload: data.league.standard });
  } catch(error) {
    console.log(error)
    yield put({ type: 'GET_LEAGUE_PLAYERS_ERROR' })
  }
}

export const leagueSagas = [
  takeLatest('GET_PLAYERS_IN_LEAUGE', getPlayersInLeague)
]
