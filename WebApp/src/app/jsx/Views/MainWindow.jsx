import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';
import Date from '../Components/Date.jsx';
import GamesWindow from './Games/GamesWindow.jsx';
import LeaugeStandingsWindow from './Standings/LeagueStandingsWindow.jsx';

export default class MainWindow extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          numberOfGames: 0,
          date: moment().format('LLLL'),
          games: []
      }
  }

  getGames(){
    var date = moment().format('YYYYMMDD');
    date = date.split('/');
    var month = date[0];
    var day = date[1];
    var year = date[2];
    var url = 'http://data.nba.com/data/5s/json/cms/noseason/scoreboard/' + date + '/games.json';
    fetch(url)
    .then((response) => response.json())
    .then((jsonResponse) => {
      if (jsonResponse['sports_content']['games']['game']){
          console.log(jsonResponse);
        var games = jsonResponse['sports_content']['games']['game'];
        this.setState({
          games: games,
          date: date,
          numberOfGames: game.length
        });
      }
    })
    .catch((error) => {
      if(error instanceof SyntaxError){
        this.setState({
          games: [],
          date: date,
          numberOfGames: 0
        });
      }
    });
  }
  componentWillMount(){
      this.getGames();
  }

  render () {
    return(
        <div id="mainWindow">
            <Date numberOfGames={this.state.numberOfGames} date={this.state.date}/>
            <Tabs>
                <TabList>
                    <Tab> Games </Tab>
                    <Tab> Standings </Tab>
                </TabList>
                <TabPanel>
                    <GamesWindow />
                </TabPanel>
                <TabPanel>
                    <LeaugeStandingsWindow />
                </TabPanel>
            </Tabs>
        </div>
    )
  }
}
