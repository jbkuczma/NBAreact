import React from 'react';

export default class GameCell extends React.Component {
  render () {
    return(
        <div id='gameCell'>
            <p> game cell for {this.props.team} </p>
        </div>
    )
  }
}
