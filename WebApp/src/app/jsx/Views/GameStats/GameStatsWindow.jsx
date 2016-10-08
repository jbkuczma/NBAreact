import React from 'react';
import Modal from 'react-modal';
import TeamMap from './../../../utilities/TeamMap.js';

export default class GameStatsWindow extends React.Component {

    static propTypes: {
      controlModal: React.PropTypes.func
    }

    constructor(props){
        super(props);
        this.state = {
            isVisible: this.props.visible
        }
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(){
        this.props.controlModal();
        this.setState({
            isVisible: false
        });
    }

    render(){
        // console.log(this.props.game);
        console.log(this.props.gameStats);
        let styles = {
            container: {
                'textAlign': 'center'
            },
            scoreboard: {
                'width': '100%',
                'height': '25%'
            },
            scoreboardHeader: {
                'display': 'inline',
                'padding': '50px'
            },
            ul: {
                'listStyle': 'none',
                'textAlign': 'center'
            },
            li: {
                'float': 'left',
                'width': '16%'
            },
            liTeamAway: {
                'float': 'left',
                'width': '16%',
                'borderRight': 'solid #000000 1px',
                'borderBottom': 'solid #000000 1px'
            },
            liTeam: {
                'float': 'left',
                'width': '16%',
                'borderRight': 'solid #000000 1px'
            },
            liTeamFinalAway: {
                'float': 'left',
                'width': '16%',
                'borderBottom': 'solid #000000 1px'
            },
            liSpaceholder: {
                'float': 'left',
                'width': '16%',
                'visibility': 'hidden'
            },
            teamStats: {
                'width': '100%',
                'height': '75%'
            },
            teamQuarterScores: {
                'display': 'inline'
            },
            statHeader: {
                'borderBottom': 'solid #000000 1px'
            },
            noPadding: {
                'padding': '0',
                'margin': '0'
            },
            noPaddingRight: {
                'padding': '0',
                'margin': '0',
                'borderRight': 'solid #000000 1px'
            }
        }
        var h1 = 0;
        var h2 = 0;
        var h3 = 0;
        var h4 = 0;
        var hFinal = 0;
        var a1 = 0;
        var a2 = 0;
        var a3 = 0;
        var a4 = 0;
        var aFinal = 0;
        if (this.props.gameStats.visitor.linescores && this.props.gameStats.home.linescores){
          switch (this.props.gameStats.visitor.linescores.period.length){
            case 1:
              a1 = this.props.gameStats.visitor.linescores.period[0].score;
              break;
            case 2:
              a1 = this.props.gameStats.visitor.linescores.period[0].score;
              a2 = this.props.gameStats.visitor.linescores.period[1].score;
              break;
            case 3:
              a1 = this.props.gameStats.visitor.linescores.period[0].score;
              a2 = this.props.gameStats.visitor.linescores.period[1].score;
              a3 = this.props.gameStats.visitor.linescores.period[2].score;
              break;
            case 4:
              a1 = this.props.gameStats.visitor.linescores.period[0].score;
              a2 = this.props.gameStats.visitor.linescores.period[1].score;
              a3 = this.props.gameStats.visitor.linescores.period[2].score;
              a4 = this.props.gameStats.visitor.linescores.period[3].score;
              break;
            default:
              a1 = 0;
              a2 = 0;
              a3 = 0;
              a4 = 0;
              break;
          }
          switch (this.props.gameStats.home.linescores.period.length){
            case 1:
              h1 = this.props.gameStats.home.linescores.period[0].score;
              break;
            case 2:
              h1 = this.props.gameStats.home.linescores.period[0].score;
              h2 = this.props.gameStats.home.linescores.period[1].score;
              break;
            case 3:
              h1 = this.props.gameStats.home.linescores.period[0].score;
              h2 = this.props.gameStats.home.linescores.period[1].score;
              h3 = this.props.gameStats.home.linescores.period[2].score;
              break;
            case 4:
              h1 = this.props.gameStats.home.linescores.period[0].score;
              h2 = this.props.gameStats.home.linescores.period[1].score;
              h3 = this.props.gameStats.home.linescores.period[2].score;
              h4 = this.props.gameStats.home.linescores.period[3].score;
              break;
            default:
              h1 = 0;
              h2 = 0;
              h3 = 0;
              h4 = 0;
              break;
          }
        }
        aFinal = parseInt(a1) + parseInt(a2) + parseInt(a3) + parseInt(a4);
        hFinal = parseInt(h1) + parseInt(h2) + parseInt(h3) + parseInt(h4);
        return(
            <Modal
              isOpen={this.state.isVisible}
              onRequestClose={this.closeModal}
            >
                <div style={styles.container}>
                    <div className="row" style={styles.scoreboard}>
                        <div className="row" style={styles.scoreboardHeader}>
                            <ul style={styles.ul}>
                                <li style={styles.liSpaceholder}> s</li>
                                <li style={styles.li}> Q1 </li>
                                <li style={styles.li}> Q2 </li>
                                <li style={styles.li}> Q3 </li>
                                <li style={styles.li}> Q4 </li>
                                <li style={styles.li}> Final </li>
                            </ul>
                        </div>
                        <div className="row" style={styles.teamQuarterScores}>
                            <ul style={styles.ul}>
                                <li style={styles.liTeamAway}> {this.props.gameStats.visitor.abbreviation} </li>
                                <li style={styles.liTeamAway}> {a1} </li>
                                <li style={styles.liTeamAway}> {a2} </li>
                                <li style={styles.liTeamAway}> {a3} </li>
                                <li style={styles.liTeamAway}> {a4} </li>
                                <li style={styles.liTeamFinalAway}> {aFinal} </li>
                            </ul>
                        </div>
                        <div className="row" style={styles.teamQuarterScores}>
                            <ul style={styles.ul}>
                                <li style={styles.liTeam}> {this.props.gameStats.home.abbreviation} </li>
                                <li style={styles.liTeam}> {h1} </li>
                                <li style={styles.liTeam}> {h2} </li>
                                <li style={styles.liTeam}> {h3} </li>
                                <li style={styles.liTeam}> {h4} </li>
                                <li style={styles.li}> {hFinal} </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row" style={styles.teamStats}>
                        <div className="col-xs-4" style={styles.noPaddingRight}>
                            <p style={styles.statHeader}> {this.props.gameStats.visitor.nickname} </p>

                            <p> {this.props.gameStats.visitor.stats.points === '' ? '0' : this.props.gameStats.visitor.stats.points} </p>
                            <p> {this.props.gameStats.visitor.stats.field_goals_made === '' ? '-' : this.props.gameStats.visitor.stats.field_goals_made + '/' + this.props.gameStats.visitor.stats.field_goals_attempted + '(' + this.props.gameStats.visitor.stats.field_goals_percentage + '%)'} </p>
                            <p> {this.props.gameStats.visitor.stats.three_pointers_made === '' ? '-' : this.props.gameStats.visitor.stats.three_pointers_made + '/' + this.props.gameStats.visitor.stats.three_pointers_attempted + '(' + this.props.gameStats.visitor.stats.three_pointers_percentage + '%)'} </p>
                            <p> {this.props.gameStats.visitor.stats.free_throws_made === '' ? '-' : this.props.gameStats.visitor.stats.free_throws_made + '/' + this.props.gameStats.visitor.stats.free_throws_attempted + '(' + this.props.gameStats.visitor.stats.free_throws_percentage + '%)'} </p>
                            <p> {this.props.gameStats.visitor.stats.assists === '' ? '0' : this.props.gameStats.visitor.stats.assists} </p>
                            <p> {this.props.gameStats.visitor.stats.rebounds_offensive === '' ? '0' : this.props.gameStats.visitor.stats.rebounds_offensive} </p>
                            <p> {this.props.gameStats.visitor.stats.rebounds_defensive === '' ? '0' : this.props.gameStats.visitor.stats.rebounds_defensive} </p>
                            <p> {this.props.gameStats.visitor.stats.steals === '' ? '0' : this.props.gameStats.visitor.stats.steals} </p>
                            <p> {this.props.gameStats.visitor.stats.blocks === '' ? '0' : this.props.gameStats.visitor.stats.blocks} </p>
                            <p> {this.props.gameStats.visitor.stats.turnovers === '' ? '0' : this.props.gameStats.visitor.stats.turnovers} </p>
                            <p> {this.props.gameStats.visitor.stats.fouls === '' ? '0' : this.props.gameStats.visitor.stats.fouls} </p>
                        </div>
                        <div className="col-xs-4" style={styles.noPaddingRight}>
                            <p style={styles.statHeader}> Team Stats </p>

                            <p> Points </p>
                            <p> Field Goals </p>
                            <p> 3 Pointers </p>
                            <p> Free Throws </p>
                            <p> Assists </p>
                            <p> O. Rebounds </p>
                            <p> D. Rebounds </p>
                            <p> Steals </p>
                            <p> Blocks </p>
                            <p> Turnovers </p>
                            <p> Fouls </p>
                        </div>
                        <div className="col-xs-4" style={styles.noPadding}>
                            <p style={styles.statHeader}> {this.props.gameStats.home.nickname}</p>

                            <p> {this.props.gameStats.home.stats.points === '' ? '0' : this.props.gameStats.home.stats.points} </p>
                            <p> {this.props.gameStats.home.stats.field_goals_made === '' ? '-' : this.props.gameStats.home.stats.field_goals_made + '/' + this.props.gameStats.home.stats.field_goals_attempted + '(' + this.props.gameStats.home.stats.field_goals_percentage + '%)'} </p>
                            <p> {this.props.gameStats.home.stats.three_pointers_made === '' ? '-' : this.props.gameStats.home.stats.three_pointers_made + '/' + this.props.gameStats.home.stats.three_pointers_attempted + '(' + this.props.gameStats.home.stats.three_pointers_percentage + '%)'} </p>
                            <p> {this.props.gameStats.home.stats.free_throws_made === '' ? '-' : this.props.gameStats.home.stats.free_throws_made + '/' + this.props.gameStats.home.stats.free_throws_attempted + '(' + this.props.gameStats.home.stats.free_throws_percentage + '%)'} </p>
                            <p> {this.props.gameStats.home.stats.assists === '' ? '0' : this.props.gameStats.home.stats.assists} </p>
                            <p> {this.props.gameStats.home.stats.rebounds_offensive === '' ? '0' : this.props.gameStats.home.stats.rebounds_offensive} </p>
                            <p> {this.props.gameStats.home.stats.rebounds_defensive === '' ? '0' : this.props.gameStats.home.stats.rebounds_defensive} </p>
                            <p> {this.props.gameStats.home.stats.steals === '' ? '0' : this.props.gameStats.home.stats.steals} </p>
                            <p> {this.props.gameStats.home.stats.blocks === '' ? '0' : this.props.gameStats.home.stats.blocks} </p>
                            <p> {this.props.gameStats.home.stats.turnovers === '' ? '0' : this.props.gameStats.home.stats.turnovers} </p>
                            <p> {this.props.gameStats.home.stats.fouls === '' ? '0' : this.props.gameStats.home.stats.fouls} </p>
                        </div>
                    </div>
                </div>
            </Modal>
        )

    }
}
