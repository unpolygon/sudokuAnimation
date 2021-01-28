import React from 'react';
import './cell.css';
import $ from 'jquery';

function cell(props){
    let i = props.value.i;
    let row = props.value.row;
    let col = props.value.col;

    let pencil = props.value.pencil;

    $(document).ready(function(){
        $('div[class|=square-grid]').css('display','none');
        if (pencil){
            $('div[class=square-grid+'+pencil+']').css('display','grid');
        }
    })

    return(
        <button 
        className = 'square' 
        onClick={props.onClick} 
        id={`${row}-${col}`} 
        value={i}
        row = {`${row}`}
        col = {`${col}`}
        >
            {i == 0 ? ' ': i}
        </button>
    );
}

export default cell;