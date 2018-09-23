import { all } from 'redux-saga/effects'
import { leagueSagas } from './league.sagas'

export default function* NBAsagas() {
  yield all([
    ...leagueSagas,
  ])
}
