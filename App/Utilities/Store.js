/* eslint-disable semi */
import moment from 'moment';
/*
  season will always be YYYY-YY
  ex1: if the season is in the month March 2016,
    year will be 2015
    season will be 2015-16
  ex2: if the season is in the month October 2016,
    year will be 2016
    season will be 2016-17
*/
module.exports = {
  date: moment().format('L'),
  season: '2015-16',
  year: 2015
};
/* eslint-enable semi */
