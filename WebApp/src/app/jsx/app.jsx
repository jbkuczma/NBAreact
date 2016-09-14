import React from 'react';
import {render} from 'react-dom';
import MainWindow from './Views/MainWindow.jsx';

class App extends React.Component {
  render () {
    return(
        <div>
            <MainWindow />
        </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
