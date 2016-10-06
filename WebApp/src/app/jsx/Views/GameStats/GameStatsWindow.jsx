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
        console.log(this.props.game);
        return(
            <Modal
              isOpen={this.state.isVisible}
              onRequestClose={this.closeModal}
            >
                <h1>Modal Content</h1>
                <button onClick={this.closeModal}> close </button>
                <p>Etc.</p>
            </Modal>
        )

    }
}
