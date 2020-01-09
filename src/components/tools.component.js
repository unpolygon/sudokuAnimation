import React from 'react';
import './tools.component.css';
import HistoryIcon from '@material-ui/icons/History';
import BackspaceIcon from '@material-ui/icons/Backspace';
import CheckIcon from '@material-ui/icons/Check';
import RedoIcon from '@material-ui/icons/Redo';

export default class Tools extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ul className='Tools'>
                <li>
                    <a href='#' onClick={this.props.undo}>
                        <div class='icon' ><HistoryIcon className='fa'/></div>
                        <div class='name'>Undo</div>
                    </a>
                </li>
                <li>
                    <a href='#' onClick={this.props.redo} title='RedoIcon'>
                        <div class='icon'><RedoIcon className='fa' /></div>
                        <div class='name'>Redo</div>
                    </a>
                </li>
                <li>
                    <a href='#' id='backspace'>
                        <div class='icon'><BackspaceIcon className='fa'/></div>
                        <div class='name'>Erase</div>
                    </a>
                </li>
                <li>
                    <a href='#' onClick={this.props.check}>
                        <div class='icon'><CheckIcon className='fa'/></div>
                        <div class='name'>Check</div>
                    </a>
                </li>
            </ul>
        );
    }
} 