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
        connection: "keep-alive",
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
}
