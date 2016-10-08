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
          games: [],
          loaded: false
      }
  }

  getGames(){
    var date = moment().format('YYYYMMDD');
    date = date.split('/');
    var month = date[0];
    var day = date[1];
    var year = date[2];
    date = month;
    date = '20161007'
    // https://crossorigin.me is the proxy.
    var url = 'http://data.nba.com/data/5s/json/cms/noseason/scoreboard/' + date + '/games.json';
    let _this = this;
    var url2 = 'https://json2jsonp.com/?url='+ url + '&callback=callback';
    $.ajax({
        url: url2,
        dataType: 'jsonp',
        jsonpCallback: 'callback',
        type: 'GET',
        success: function (data) {
            if (data['sports_content']['games']['game']){
                var games = data['sports_content']['games']['game'];
                _this.setState({
                  games: games,
                  numberOfGames: games.length,
                  loaded: true
                });
            }
        },
        failure: function() {
            _this.setState({
              games: [],
              numberOfGames: 0,
              loaded: true
            });
        },
        error: function(error) {
            if(error instanceof SyntaxError){
                _this.setState({
                  games: [],
                  numberOfGames: 0,
                  loaded: true
                });
            }
        }
    });
  }

  componentWillMount(){
      this.getGames();
  }

  render () {
    return(
        <div id="mainWindow">
            <div>
                <Date numberOfGames={this.state.numberOfGames} date={this.state.date}/>
            </div>
            <Tabs>
                <TabList>
                    <Tab> Games </Tab>
                    <Tab> Standings </Tab>
                </TabList>
                <TabPanel>
                    {!this.state.loaded ? <p> Fetching games </p> : <GamesWindow games={this.state.games} /> }
                </TabPanel>
                <TabPanel>
                    <LeaugeStandingsWindow />
                </TabPanel>
            </Tabs>
        </div>
    )
  }
}
