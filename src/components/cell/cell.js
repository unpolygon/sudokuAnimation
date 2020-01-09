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
            {/* <div className='square-grid'>
                <div className='square-grid-1'>1</div>
                <div className='square-grid-2'>2</div>
                <div className='square-grid-3'>3</div>
                <div className='square-grid-4'>4</div>
                <div className='square-grid-5'>5</div>
                <div className='square-grid-6'>6</div>
                <div className='square-grid-7'>7</div>
                <div className='square-grid-8'>8</div>
                <div className='square-grid-9'>9</div>
            </div> */}
            {i == 0 ? ' ': i}
        </button>
    );
}

export default cell;