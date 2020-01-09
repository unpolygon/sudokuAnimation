import React from 'react';
import './numpad.component.css';

export default class NumPad extends React.Component{
    render(){
        return(
            <div className ='NumPad'>
                <button class='numpad-1'>1</button>
                <button class='numpad-2'>2</button>
                <button class='numpad-3'>3</button>
                <button class='numpad-4'>4</button>
                <button class='numpad-5'>5</button>
                <button class='numpad-6'>6</button>
                <button class='numpad-7'>7</button>
                <button class='numpad-8'>8</button>
                <button class='numpad-9'>9</button>
            </div>
        );
    }
}