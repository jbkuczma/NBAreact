import React from 'react';
import TeamMap from './../../../utilities/TeamMap.js';

export default class GameCell extends React.Component {
  render () {
    console.log(this.props.game);
    const baseImageURL = "src/app/images/";
    const awayLogo = baseImageURL+this.props.game.visitor.abbreviation.toLowerCase()+'.png';
    const homeLogo = baseImageURL+this.props.game.home.abbreviation.toLowerCase()+'.png';
    return(
        <div className="row">
            <div id='gameCell'>
                <div className="col-xs-4">
                    <img src={awayLogo} />
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
                    <img src={homeLogo} />
                    {this.props.game.home.city}
                    {this.props.game.home.nickname}
                </div>
            </div>
        </div>
    )
  }
}
