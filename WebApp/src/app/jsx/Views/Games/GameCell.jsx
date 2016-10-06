import React from 'react';
import GameStatsWindow from '../GameStats/GameStatsWindow.jsx';
import TeamMap from './../../../utilities/TeamMap.js';

export default class GameCell extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          openStats: false
      };
      this.openGameStats = this.openGameStats.bind(this);
  }

  openGameStats(){
    this.setState({
        openStats: true
    });
  }

  controlModal(){
      this.setState({
          openStats: false
      });
  }

  render () {
    // console.log(this.props.game);
    const baseImageURL = "src/app/images/";
    const awayLogo = baseImageURL+this.props.game.visitor.abbreviation.toLowerCase()+'.png';
    const homeLogo = baseImageURL+this.props.game.home.abbreviation.toLowerCase()+'.png';
    let styles = {
        logo: {
            'maxWidth': '100%',
            'height': 'auto',
            'maxHeight': '180px',
            'marginTop': '30px'
        },
        gameContainer: {
            'textAlign': 'center',
            'width': '100%',
            'height': '300px',
            'backgroundColor': TeamMap[this.props.game.home.abbreviation.toLowerCase()].color,
            'marginTop': '25px',
            'color': '#FFFFFF',
        },
        team: {
            'verticalAlign': 'middle'
        },
        gameTimeBlock: {
            'marginTop': '20px',
            'height': '125px',
            'fontSize': '1.5em',
            'textAlign': 'center'
        },
        scoreBlock: {
            'height': '125px',
            'fontSize': '24px'
        },
        awayScoreArea: {
            'borderRight': 'solid #FFFFFF'
        },
        fontLight: {
            'fontWeight': '200'
        },
        box: {
            'margin': 'auto',
            'width': '95%'
        }
    }
    const stats = (this.state.openStats ? <GameStatsWindow game={this.props.game} visible = {this.state.openStats} controlModal={this.controlModal.bind(this)}/> : null);
    return(
        <div className="row" style={styles.box} onClick={this.openGameStats}>
            {stats}
            <div id='gameCell' style={styles.gameContainer}>
                <div className="col-xs-4" style={styles.team}>
                    <img src={awayLogo}  style={styles.logo}/>
                    <h4 style={styles.fontLight}> {this.props.game.visitor.city} </h4>
                    <h3> {this.props.game.visitor.nickname} </h3>
                </div>
                <div className="col-xs-4">
                    <div className="row" style={styles.gameTimeBlock}>
                        <p> {this.props.game.period_time.period_status} </p>
                        <p> {(this.props.game.period_time.game_clock === '' || this.props.game.period_time.period_status === 'Halftime') ? '' : this.props.game.period_time.game_clock} </p>
                    </div>
                    <div className="row" style={styles.scoreBlock}>
                        <section className="col-xs-6" style={styles.awayScoreArea}>
                            {!this.props.game.visitor.score ? '0' : this.props.game.visitor.score}
                        </section>
                        <section className="col-xs-6">
                            {!this.props.game.home.score ? '0' : this.props.game.home.score}
                        </section>
                    </div>
                </div>
                <div className="col-xs-4" style={styles.team}>
                    <img src={homeLogo}  style={styles.logo}/>
                    <h4 style={styles.fontLight}> {this.props.game.home.city} </h4>
                    <h3> {this.props.game.home.nickname} </h3>
                </div>
            </div>
        </div>
    )
  }
}
