import { put, takeLatest, select } from 'redux-saga/effects'
import NBA from '../utils/nba'

this.nba = new NBA()

const getSeason = (state) => state.date.season;

function* getPlayer(payload) {
  try {
    yield put({ type: 'FETCHING_PLAYER' })
    const season = yield select(getSeason)
    const player = payload.selectedPlayer.player
    const playerID = player.player_id || player.personId

    const playerGamelog = yield this.nba.getSeasonPlayerGameLog(playerID, season)
    const playerDashboard = yield this.nba.getPlayerDashboardByYear(playerID, season)

    const data = {
      gameStats: playerGamelog,
      careerStats: playerDashboard
    }

    yield put({ type: 'GET_PLAYER_SUCCESS', data });
  } catch(error) {
    yield put({ type: 'GET_PLAYER_ERROR', error: error.message })
  }
}

function* getAdvancedGameStats(payload) {
  try {
    yield put({ type: 'FETCHING_PLAYER' })
    const playerID = payload.playerID
    const gameID = payload.gameID
    const additionalBoxscore = yield this.nba.getAdditionalBoxscoreStatsForPlayer(gameID, playerID)
    const data = {
      boxscoreAdvanced: additionalBoxscore.BoxscoreAdvanced,
      boxscoreMisc: additionalBoxscore.BoxscoreMisc,
      boxscoreUsage: additionalBoxscore.BoxscoreUsage,
      boxscoreHustle: additionalBoxscore.BoxscoreHustle,
      boxscorePlayerTrack: additionalBoxscore.BoxscorePlayerTrack,
    }
    yield put({ type: 'GET_ADVANCED_GAME_STATS_SUCCESS', data })
  } catch (error) {
    yield put({ type: 'GET_ADVANCED_GAME_STATS_ERROR', error: error.message })
  }
}

export const playerSagas = [
  takeLatest('SELECT_PLAYER', getPlayer),
  takeLatest('GET_ADVANCED_GAME_STATS', getAdvancedGameStats)
]
