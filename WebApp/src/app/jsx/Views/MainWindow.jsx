import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Date from '../Components/Date.jsx';

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
                    <h2> the games that are being played will be here</h2>
                </TabPanel>
                <TabPanel>
                    <h2> league standings will be here </h2>
                </TabPanel>
            </Tabs>
        </div>
    )
  }
}
