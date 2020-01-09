import React from 'react';
import NavBar from './nav-bar.component';
import Game from './game.component';
import './homepage.component.css';

export default class homepage extends React.Component{
    render(){
        return(
            <div className='Homepage'>
                <NavBar />
                <Game style={{flex:'1'}} />
            </div>
        );
    }
}