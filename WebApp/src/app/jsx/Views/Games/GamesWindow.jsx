import React from 'react';
import GameCell from './GameCell.jsx';

export default class GamesWindow extends React.Component {
  render () {
    return(
        <div>
            <GameCell team="Knicks" />
            <GameCell team="Bulls" />
        </div>
    )
  }
}
