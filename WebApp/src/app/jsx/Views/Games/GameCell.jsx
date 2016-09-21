import React from 'react';
import TeamMap from './../../../utilities/TeamMap.js';

export default class GameCell extends React.Component {
  render () {
    console.log(this.props.game);
    const baseImageURL = "src/app/images/";
    const awayLogo = baseImageURL+this.props.game.visitor.abbreviation.toLowerCase()+'.png';
    const homeLogo = baseImageURL+this.props.game.home.abbreviation.toLowerCase()+'.png';
    let styles = {
        logo: {
            'maxHeight': '230px',
            'maxWidth': '230px'
        },
        gameContainer: {
            'height': '300px',
            'backgroundColor': TeamMap[this.props.game.home.abbreviation.toLowerCase()].color,
            'marginTop': '25px'
        },
        team: {
            'verticalAlign': 'middle'
        }
    }
    return(
        <div className="row">
            <div id='gameCell' style={styles.gameContainer}>
                <div className="col-xs-4" style={styles.team}>
                    <img src={awayLogo} className="img-responsive center-block" style={styles.logo}/>
                    <p> {this.props.game.visitor.city} </p>
                    <p> {this.props.game.visitor.nickname} </p>
                </div>
                <div className="col-xs-4">
                    <p> Quarter and game time here </p>

                    {this.props.game.visitor.score}
                    <p> divider here </p>
                    {this.props.game.home.score}
                </div>
                <div className="col-xs-4" style={styles.team}>
                    <img src={homeLogo} className="img-responsive center-block" style={styles.logo}/>
                    <p> {this.props.game.home.city} </p>
                    <p> {this.props.game.home.nickname} </p>
                </div>
            </div>
        </div>
    )
  }
}
