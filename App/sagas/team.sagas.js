import { put, takeLatest, select } from 'redux-saga/effects'
import NBA, { getTeamFromTeamMap } from '../utils/nba'

this.nba = new NBA()

const getSeason = (state) => state.date.season;

function* getTeam(payload) {
  try {
    yield put({ type: 'FETCHING_TEAM' })

    const season = yield select(getSeason)
    const teamID = payload.selectedTeam.teamID
    const teamInfoBody = {
      season,
      teamID
    }
    const rosterInfoBody = {
      season: `${season}-${season.toString().substr(-2)}`, // season has to be in format 2017-18
      teamID
    }
    let teamName = getTeamFromTeamMap(teamID).team.toLowerCase()

    // special cases
    teamName = teamName === '76ers' ? 'sixers' : teamName
    teamName = teamName === 'trail blazers' ? 'blazers' : teamName

    const teamInfo = yield this.nba.getTeam(teamInfoBody)
    const rosterInfo = yield this.nba.getRoster(rosterInfoBody)
    const teamSchedule = yield this.nba.getTeamSchedule(season, teamName)

    const data = {
      info: teamInfo.TeamInfoCommon[0],
      seasonRanks: teamInfo.TeamSeasonRanks[0],
      roster: rosterInfo.CommonTeamRoster,
      gamelog: teamSchedule.league.standard
    }

    yield put({ type: 'GET_TEAM_SUCCESS', data });
  } catch(error) {
    yield put({ type: 'GET_TEAM_ERROR', error: error.message })
  }
}

export const teamSagas = [
  takeLatest('SELECT_TEAM', getTeam)
]
