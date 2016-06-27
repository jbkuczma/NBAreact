# Endpoints Used in this Project

##Player

Player stats for each game played in during the season

    http://stats.nba.com/stats/playergamelog?LeagueID=00&PerMode=PerGame&PlayerID={PLAYER_ID}&Season={SEASON}&SeasonType=Regular+Season

Shots taken by a player throughout the season

    http://stats.nba.com/stats/shotchartdetail?Period=0&VsConference=&LeagueID=00&LastNGames=0&TeamID=0&Position=&Location=&Outcome=&ContextMeasure=FGA&DateFrom=&StartPeriod=&DateTo=&OpponentTeamID=0&ContextFilter=&RangeType=&Season={SEASON}&AheadBehind=&PlayerID={PLAYER_ID}&EndRange=&VsDivision=&PointDiff=&RookieYear=&GameSegment=&Month=0&ClutchTime=&StartRange=&EndPeriod=&SeasonType=Regular+Season&SeasonSegment=&GameID=

Player Image

    http://stats.nba.com/media/players/230x185/{PLAYER_ID}.png

##Team

Team stats for given game

    http://data.nba.com/data/10s/json/cms/noseason/game/{gameDate}/{gameId}/boxscore.json

Team stats for given season with league rankings for each

    http://stats.nba.com/stats/teaminfocommon?LeagueID=00&SeasonType=Regular+Season&TeamID={TEAM_ID}&season={SEASON}

Average player stats over the course of the season

    http://stats.nba.com/stats/teamplayerdashboard?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season={SEASON}&SeasonSegment=&SeasonType=Regular+Season&TeamID={TEAM_ID}&VsConference=&VsDivision=

Team Roster

    http://stats.nba.com/stats/commonteamroster?LeagueID=00&Season={SEASON}&TeamID={TEAM_ID}

##League

League Standings

    http://data.nba.com/data/json/cms/{YEAR}/league/standings.json

Games on given date

    http://data.nba.com/data/5s/json/cms/noseason/scoreboard/{DATE}/games.json
