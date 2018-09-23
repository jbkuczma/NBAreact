import { put, takeLatest, select, call } from 'redux-saga/effects'
import NBA from '../utils/nba'

this.nba = new NBA()

const getDate = (state) => state.date.date;
const getSeason = (state) => state.date.season;

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

function* getGameStats(payload) {
  try {
    const selectedGameData = payload.selectedGame;
    const { gameID, homeTeam, awayTeam } = selectedGameData;
    const date = yield select(getDate)
    const season = yield select(getSeason)

    const teamStatsResponseData = yield call(getTeamStatsForGame, gameID);
    const boxscoreResponseData = yield this.nba.getBoxscore(gameID, date)
    const playByPlayResponseData = yield this.nba.getPlayByPlay(gameID, season)
    const teamStatsData = teamStatsResponseData
    const boxscoreData = boxscoreResponseData.stats || {};
    const playByPlayData = playByPlayResponseData.g.pd // todo: clean data

    yield put({
      type: 'GET_GAME_STATS_SUCCESS',
      data: {
        teamStatsData,
        boxscoreData,
        playByPlayData
      }
    })
  } catch (error) {
    yield put({ type: 'GET_GAME_STATS_FAILURE', error: 'Error fetching game stats' })
  }
}

function* getTeamStatsForGame(gameID) {
  try {
    const date = yield select(getDate)

    let teamBoxscoreData = yield this.nba.getBoxscore(gameID, date)
    const leadTracker = yield this.nba.getLeadTrackerForGame(gameID, date)
    const miniBoxscoreData = yield this.nba.getMiniBoxscore(gameID, date)

    teamBoxscoreData = teamBoxscoreData.stats ? teamBoxscoreData.stats : null
    // also has `basicGameData` and `previousMAtchup`

    return {
      teamBoxscoreData,
      leadTracker,
      miniBoxscoreData
    }

  } catch (error) {
    yield put({ type: 'GET_TEAMS_STATS_FOR_GAME_FAILURE' })
  }
}

export const gamesSagas = [
  takeLatest('GET_GAMES_REQUEST', getGames),
  takeLatest('SELECT_GAME', getGameStats)
]
