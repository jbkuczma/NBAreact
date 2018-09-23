import { all } from 'redux-saga/effects'
import { leagueSagas } from './league.sagas'
import { gamesSagas } from './games.sagas'

export default function* NBAsagas() {
  yield all([
    ...leagueSagas,
    ...gamesSagas
  ])
}
