import { all } from 'redux-saga/effects'
import { leagueSagas } from './league.sagas'
import { gamesSagas } from './games.sagas'
import { teamSagas } from './team.sagas'
import { palyerSagas, playerSagas } from './player.sagas'

export default function* NBAsagas() {
  yield all([
    ...leagueSagas,
    ...gamesSagas,
    ...teamSagas,
    ...playerSagas
  ])
}
