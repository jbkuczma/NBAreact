import { getFormattedDate } from '../utils/date'

const initialState = {
  season: 2017,
  currentDate: getFormattedDate(),
  date: getFormattedDate()
}

const date = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_DATE':
      return [
        ...state, {
          date: action.date
        }
      ]
    default:
      return state
  }
}

export default date
