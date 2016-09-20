import React from 'react';

export default class GameCell extends React.Component {
  render () {
      console.log(this.props.game);
    return(
        <div className="row">
            <div id='gameCell'>
                <div className="col-xs-4">
                    <p> team logo </p>
                    {this.props.game.visitor.city}
                    {this.props.game.visitor.nickname}
                </div>
                <div className="col-xs-4">
                    <p> Quarter and game time here </p>

                    {this.props.game.visitor.score}
                    <p> divider here </p>
                    {this.props.game.home.score}
                </div>
                <div className="col-xs-4">
                    <p> team logo </p>
                    {this.props.game.home.city}
                    {this.props.game.home.nickname}
                </div>
            </div>
        </div>
    )
  }
}
