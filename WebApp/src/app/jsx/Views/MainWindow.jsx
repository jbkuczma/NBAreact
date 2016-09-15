import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Date from '../Components/Date.jsx';
import GamesWindow from './Games/GamesWindow.jsx';
import LeaugeStandingsWindow from './Standings/LeagueStandingsWindow.jsx';

export default class MainWindow extends React.Component {
  render () {
    return(
        <div id="mainWindow">
            <Date numberOfGames='0' />
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
