import React from 'react';
import GameCell from './GameCell.jsx';

export default class GamesWindow extends React.Component {

  render () {
    return(
        <div>
            {this.props.games.map(function(game){
                return <GameCell game={game} key={game.id} />
            })}
        </div>
    )
  }
}
