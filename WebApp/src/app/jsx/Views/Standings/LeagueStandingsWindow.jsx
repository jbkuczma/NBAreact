import React from 'react';
import TeamCell from './TeamCell.jsx';

export default class LeagueStandingsWindow extends React.Component {
  render () {
    return(
        <div>
            {this.props.standings.map(function(team){
                return <TeamCell team={team} key={team.id} />
            })}
        </div>
    )
  }
}
