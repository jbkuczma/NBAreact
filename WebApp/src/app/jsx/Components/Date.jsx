import React from 'react';

export default class Date extends React.Component {

  setDate() {
      var date1 = this.props.date;
      date1 = date1.split(' ');
      var day = date1[0].replace(',','');
      var dayNum = date1[2].replace(',','');
      var month = date1[1];
      var combinedDate = day + ', ' + month + ' ' + dayNum;
      return combinedDate;
  }

  setNumberOfGames() {
      var numberOfGames = parseInt(this.props.numberOfGames, 10);
      switch (numberOfGames === 0){
        case true: return 'There are no games today';
        case false: switch (numberOfGames === 1){
          case true: return 'There is 1 game today';
          case false: return 'There are ' + numberOfGames + ' games today';
        }
      }
  }
  render () {
    return(
        <div>
            <h3> {this.setDate()} </h3>
            <h4> {this.setNumberOfGames()}</h4>
            <h5> * Data available after tipoff * </h5>
        </div>
    )
  }
}
