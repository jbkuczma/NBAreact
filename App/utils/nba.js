// implementation of nba.js by @kshvmdn
// original implementation used an external library for network requests, this uses fetch()

export default class NBA {
  constructor() {
    this.STATS_URL = `https://stats.nba.com/`
    this.DATA_URL = `https://data.nba.net/`
  }

  nbaFetch = (url, flatten=false) => {
    const options = {
      headers: {
        "accept-encoding": "Accepflate, sdch",
        "accept-language": "he-IL,he;q=0.8,en-US;q=0.6,en;q=0.4",
        "cache-control": "max-age=0",
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        connection: "keep-alive",
        // host: "stats.nba.com",
        // referer: "http://stats.nba.com/",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36"
      },
      json: false
    }

    return new Promise((resolve, reject) => {
      fetch(url, options)
      .then(response => response.json())
      .then(json => flatten ? this.flattenResult(json.resultSets || [json.resultSet]) : resolve(json)) // flatten resultSet for return from stat endpoints
      .then(flattened => resolve(flattened))
      .catch(error => reject(error))
    })
  }

  objectToQueryString = (obj) => {
    return Object.keys(obj).map(function(key){
      const value = encodeURIComponent(obj[key])
      return key + '=' + value
    }).join('&')
  }

  flattenResult = (resultSets) => {
    return new Promise((resolve, reject) => {
      let flattened = {}
      resultSets.forEach((result, i) => {

        flattened[result.name] = result.rowSet.map((row, j) => {
          let mappedRow = {}

          row.forEach((value, k) => {
            let key = result.headers[k].toLowerCase()
            mappedRow[key] = value
          })

          return mappedRow
        })
      })

      return resolve(flattened)
    })
  }

  getGames = (obj) => {
    // also https://data.nba.net/prod/v2/20180211/scoreboard.json
    if (typeof(obj) === `object`) {
      const endpoint = `stats/scoreboardV2/?`
      const defaults = {
        DayOffset: '0',
        LeagueID: '00',
      }
      obj = {...obj, ...defaults} // combine provided object with default object
      const queryString = this.objectToQueryString(obj)
      const url = this.STATS_URL + endpoint + queryString
      return this.nbaFetch(url, true)
    }
  }

  getGames = (date) => {
    const dateArray = date.split('/')
    let year = dateArray[2]
    let day = dateArray[1]
    let month = dateArray[0]

    day = day.length === 1 ? '0' + day : day
    month = month.length === 1 ? '0' + month : month

    const formattedDate = year + month + day

    const url = `https://data.nba.net/prod/v2/${formattedDate}/scoreboard.json`
    return this.nbaFetch(url)
    // https://data.nba.net/prod/v2/20180213/scoreboard.json // more update to date (?)
  }

  getTeam = (obj) => {
    // param {
    //   teamID:
    //   season:
    // }
    if (typeof(obj) === `object`) {
      const endpoint = `stats/teaminfocommon?`
      const defaults = {
        LeagueID: '00',
        SeasonType: 'Regaular+Season'
      }
      obj = {...obj, ...defaults}
      const queryString = this.objectToQueryString(obj)
      const url = this.STATS_URL + endpoint + queryString
      return this.nbaFetch()
    }
  }

  getPlayer = (obj) => {
    // http://stats.nba.com/stats/commonplayerinfo?playerID=201942
    const queryString = this.objectToQueryString(obj)
    const url = this.STATS_URL + 'stats/commonplayerinfo?' + queryString
    return this.nbaFetch(url, true)
  }

  getTeams = (year) => {
    // use 2017 for now
    const endpoint = `prod/v1/${year}/teams.json`
    const url = this.DATA_URL + endpoint
    return this.nbaFetch(url)
  }

  getLeagueStandings = () => {
    const endpoint = `prod/v1/current/standings_conference.json`
    const url = this.DATA_URL + endpoint
    return this.nbaFetch(url)
  }

  getPlayByPlay = (gameID) => {
    const endpoint = 'stats/playbyplay?'
    const defaults = {
      GameID: gameID,
      StartPeriod: 1,
      EndPeriod: 14
    }
    const url = this.STATS_URL + endpoint + this.objectToQueryString(defaults)
    // plays don't have nice description as function below
    return this.nbaFetch(url, true)
  }

  getPlayByPlayExperimental = async (gameID, date) => {
    const dateArray = date.split('/')
    let year = dateArray[2]
    let day = dateArray[1]
    let month = dateArray[0]

    day = day.length === 1 ? '0' + day : day
    month = month.length === 1 ? '0' + month : month

    const formattedDate = year + month + day

    const q1URL = `https://data.nba.net/prod/v1/${formattedDate}/${gameID}_boxscore_1.json`
    const q2URL = `https://data.nba.net/prod/v1/${formattedDate}/${gameID}_boxscore_2.json`
    const q3URL = `https://data.nba.net/prod/v1/${formattedDate}/${gameID}_boxscore_3.json`
    const q4URL = `https://data.nba.net/prod/v1/${formattedDate}/${gameID}_boxscore_4.json`


  }

  getBoxscore = (gameID, date) => {
    const dateArray = date.split('/')
    let year = dateArray[2]
    let day = dateArray[1]
    let month = dateArray[0]

    day = day.length === 1 ? '0' + day : day
    month = month.length === 1 ? '0' + month : month

    const formattedDate = year + month + day
    const endpoint = `https://data.nba.net/prod/v1/${formattedDate}/${gameID}_boxscore.json`

    return this.nbaFetch(endpoint)
  }

  getPlayByPlay = (gameID, season) => {
    const endpoint = `https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/${season}/scores/pbp/${gameID}_full_pbp.json`
    return this.nbaFetch(endpoint)
  }

  getPlayImage = (playerID) => {
    return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerID}.png`
  }

  getLeadTrackerForQuarter = (gameID, date, quarter) => {
    const dateArray = date.split('/')
    let year = dateArray[2]
    let day = dateArray[1]
    let month = dateArray[0]

    day = day.length === 1 ? '0' + day : day
    month = month.length === 1 ? '0' + month : month

    const formattedDate = year + month + day
    const endpoint = `https://data.nba.net/prod/v1/${formattedDate}/${gameID}_lead_tracker_${quarter}.json`
    return this.nbaFetch(endpoint)
  }

  getLeadTrackerForGame = (gameID, date) => {
    return Promise.all([
      this.getLeadTrackerForQuarter(gameID, date, 1),
      this.getLeadTrackerForQuarter(gameID, date, 2),
      this.getLeadTrackerForQuarter(gameID, date, 3),
      this.getLeadTrackerForQuarter(gameID, date, 4),
    ]).then((result) => {
      /**
       * result is an array of objects representing the lead tracker for each quarter
       * each object has a 'plays' property which is the form of an array
       * result.map(...) extracts that array containing the plays and adds it into another array
       * concat.apply() flattens the array of arrays into a single array
       */
      const leadTrackerArray = [].concat.apply([], result.map(quarter => quarter.plays))
      return leadTrackerArray
    })
    .catch((error) => {
      console.log(error)
    })
  }

  getMiniBoxscore = (gameID, date) => {
    const dateArray = date.split('/')
    let year = dateArray[2]
    let day = dateArray[1]
    let month = dateArray[0]

    day = day.length === 1 ? '0' + day : day
    month = month.length === 1 ? '0' + month : month

    const formattedDate = year + month + day
    const endpoint = `https://data.nba.net/prod/v1/${formattedDate}/${gameID}_mini_boxscore.json`
    return this.nbaFetch(endpoint)
  }
}

// http://stats.nba.com/stats/boxscoresummaryv2?GameID=0021700865
// http://stats.nba.com/stats/boxscoretraditionalv2?EndPeriod=10&EndRange=10000&GameID=0021700865&RangeType=0&Season=2017-18&SeasonType=Regular+Season&StartPeriod=1&StartRange=0
// https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2017/scores/gamedetail/0021700865_gamedetail.json

// lead tracker
// date/game_id/_quarter
// https://data.nba.net/prod/v1/20180212/0021700844_lead_tracker_1.json
