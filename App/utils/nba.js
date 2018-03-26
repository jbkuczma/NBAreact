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
      return this.nbaFetch(url, true)
    }
  }

  getRoster = (obj) => {
    // param {
    //   teamID:
    //   season:
    // }
    const endpoint = `stats/commonteamroster?`
    const defaults = {
      LeagueID: '00'
    }
    obj = {...obj, ...defaults}
    const queryString = this.objectToQueryString(obj)
    const url = this.STATS_URL + endpoint + queryString
    return this.nbaFetch(url, true)
  }

  getPlayer = (obj) => {
    const queryString = this.objectToQueryString(obj)
    const url = this.STATS_URL + 'stats/commonplayerinfo?' + queryString
    return this.nbaFetch(url, true)
  }

  getPlayers = (season) => {
    const url = `https://data.nba.net/prod/v1/${season}/players.json`
    return this.nbaFetch(url)
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

  getPlayerImage = (playerID) => {
    return `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerID}.png`
  }

  // http://data.nba.net/data/10s/prod/v1/2017/players/203507_profile.json
  getPlayerCareerStats = (playerID, perMode='PerGame') => {
    // permode - Totals, PerGame
    const query = {
      PlayerID: playerID,
      PerMode: perMode
    }
    const endpoint = `stats/playerprofilev2?`
    const url = this.STATS_URL + endpoint + this.objectToQueryString(defaults)
    return this.nbaFetch(url, true)
  }

  // could combine the following two together in the future
  getCompletePlayerGameLog = (playerID) => {
    const endpoint = `stats/playergamelog?`
    const regularSeasonQuery = {
      playerID: playerID,
      season: 'ALL',
      seasonType: 'Regular Season'
    }
    const playoffQuery = {
      playerID: playerID,
      season: 'ALL',
      seasonType: 'Playoffs'
    }
    const regularSeasonURL = this.STATS_URL + endpoint + this.objectToQueryString(regularSeasonQuery)
    const playoffURL = this.STATS_URL + endpoint + this.objectToQueryString(playoffQuery)

    return Promise.all([
      this.nbaFetch(regularSeasonURL, true),
      this.nbaFetch(playoffURL, true),
    ]).then((result) => {
      return {
        regularSeason: result[0].PlayerGameLog,
        playoffs: result[1].PlayerGameLog
      }
      // const playerGameStats = [].concat.apply([], result.map(quarter => quarter.plays))
      // return leadTrackerArray
    })
    .catch((error) => {
      console.log(error)
    })
  }

  getSeasonPlayerGameLog = (playerID, season) => {
    season = season +  '-' + (parseInt(season.toString().substr(-2)) + 1)
    const endpoint = `stats/playergamelog?`
    const regularSeasonQuery = {
      playerID: playerID,
      season: season,
      seasonType: 'Regular Season'
    }
    const playoffQuery = {
      playerID: playerID,
      season: season,
      seasonType: 'Playoffs'
    }
    const regularSeasonURL = this.STATS_URL + endpoint + this.objectToQueryString(regularSeasonQuery)
    const playoffURL = this.STATS_URL + endpoint + this.objectToQueryString(playoffQuery)

    return Promise.all([
      this.nbaFetch(regularSeasonURL, true),
      this.nbaFetch(playoffURL, true),
    ]).then((result) => {
      return {
        regularSeason: result[0].PlayerGameLog,
        playoffs: result[1].PlayerGameLog
      }
    })
    .catch((error) => {
      console.log(error)
    })
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

  getTeamGamelog = (teamID, season) => {
    season = season +  '-' + season.toString().substr(-2)
    const endpoint = `stats/teamgamelog?`
    const regularSeasonQuery = {
      teamID: teamID,
      season: season,
      seasonType: 'Regular Season'
    }
    const playoffQuery = {
      teamID: teamID,
      season: season,
      seasonType: 'Playoffs'
    }
    const regularSeasonURL = this.STATS_URL + endpoint + this.objectToQueryString(regularSeasonQuery)
    const playoffURL = this.STATS_URL + endpoint + this.objectToQueryString(playoffQuery)

    return Promise.all([
      this.nbaFetch(regularSeasonURL, true),
      this.nbaFetch(playoffURL, true),
    ]).then((result) => {
      return {
        Games: {
          regularSeason: result[0].TeamGameLog,
          playoffs: result[1].TeamGameLog
        }
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  getPlayerDashboardByYear = (playerID, season) => {
    season = season +  '-' + (parseInt(season.toString().substr(-2)) + 1)
    const endpoint = 'stats/playerdashboardbyyearoveryear?'
    const query = {
      DateFrom: '',
      DateTo: '',
      GameSegment: '',
      LastNGames: '0',
      LeagueID: '00',
      Location: '',
      MeasureType: 'Base',
      Month: '0',
      OpponentTeamID: '0',
      Outcome: '',
      PORound: '0',
      PaceAdjust: 'N',
      PerMode: 'PerGame',
      Period: '0',
      PlayerID: playerID,
      PlusMinus: 'N',
      Rank: 'N',
      Season: season,
      SeasonSegment: '',
      SeasonType: 'Regular Season',
      ShotClockRange: '',
      Split: 'yoy',
      VsConference: '',
      VsDivision: ''
    }
    const url = this.STATS_URL + endpoint + this.objectToQueryString(query)
    return this.nbaFetch(url, true)
  }

  getLeagueLeaders = (season, category) => {
    season = season +  '-' + (parseInt(season.toString().substr(-2)) + 1)
    const endpoint = 'stats/leagueleaders?'
    const query = {
      LeagueID: '00',
      PerMode: 'PerGame', //
      Scope: 'S', // S or Rookie
      Season: season,
      SeasonType: 'Regular Season',
      StatCategory: category
    }
    const url = this.STATS_URL + endpoint + this.objectToQueryString(query)
    return this.nbaFetch(url, true)
  }

  // totals
  // http://stats.nba.com/stats/playercareerstats?playerid=203507&permode=Totals
  // videos
  // https://api.nba.net/0/league/video?games=0021700992&count=&accessToken=

  // http://stats.nba.com/events/?flag=1&GameID=0021700992&GameEventID=9&Season=2017-18&title=Kornet%201%27%20Putback%20Dunk%20(2%20PTS)&sct=plot
}
