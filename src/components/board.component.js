import React from 'react';
import Cell from './cell/cell';
import './board.component.css';

class board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            squares: new Array(9).fill(null).map(() => new Array(9).fill(1))
        }
        this.renderSquare = this.renderSquare.bind(this);
        this.renderArray = this.renderArray.bind(this);
    }

    renderSquare(i,row,col){
        // console.log("Hello World", i);
        let value = {i:i,row:row,col:col};
        return(
            <Cell value={value} onClick={() => this.props.onClick(i,row,col)}/>
        );
    }

    renderArray(){
        let squares = this.props.squares;
        var row,col,rowHtml;
        rowHtml = '';
        let arrayHtml = [];
        for(row = 0 ; row < 9; row++){
            rowHtml = [];
            for(col = 0 ; col < 9 ; col++){
                rowHtml.push(
                    <td className = {col} key={9*row+col}>
                        {this.renderSquare(squares[row][col],row,col)}
                    </td>
                );                
            }
            arrayHtml.push(<tr className = {row}>{rowHtml}</tr>);
        }
        return (
            <table id = 'board'>{arrayHtml}</table>
        );
    }


    render(){
        return(
            <div className='cover-board'>
                {this.renderArray()}
            </div>
        );
    }
}

export default board;