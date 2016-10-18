import React from 'react';

export default class TeamCell extends React.Component {

    render(){
        let styles = {
            p: {
                'display': 'inline'
            }
        }
        return(
            <div className='row'>
                <p style={styles.p}> {this.props.team.nickname} </p>
                <p style={styles.p}> {this.props.team.team_stats.wins} </p>
                <p style={styles.p}> {this.props.team.team_stats.losses} </p>
                <p style={styles.p}> {this.props.team.team_stats.l10} </p>
                <p style={styles.p}> {this.props.team.team_stats.streak} </p>
            </div>
        )
    }
}
