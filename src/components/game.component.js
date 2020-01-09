import React from 'react';
import Board from './board.component';
import './game.component.css';
import $ from 'jquery';
import {randomSudoku} from '../algorithm/random.sudoku.js'
import {solveSudoku} from '../algorithm/sudoku.js'
import {removeSudoku} from '../algorithm/removeSudoku.component.js'
import NavBar from './nav-bar.component';
import Tools from './tools.component';
import Time from './timer.component';
import NumPad from './numpad.component';

class game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            history: [
                {squares: new Array(9).fill().map(() => new Array(9).fill(0))}
            ],
            solved: false,
            solving: false,
            step: 0,
            random: false,
            animation: false,
            zeroCells: false,
            ans: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.whenKey = this.whenKey.bind(this);
        this.handleRandom = this.handleRandom.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
        this.handleSolve = this.handleSolve.bind(this);
        this.zeroAnimation = this.zeroAnimation.bind(this);
        this.solveAnimation = this.solveAnimation.bind(this);
    }
    //animation for solving
    solveAnimation(animation){
        for(let i = 0 ; i < animation.length; i++){
            let row = animation[i][0];
            let col = animation[i][1];
            let val = animation[i][2];
            setTimeout(() => {
                $('button').removeClass('square-solve');
                $('button[row='+row+'][col='+col+']').removeClass('zero-square').text(val);
                $('button[row='+row+'][col='+col+']').addClass('square-solve solved').text(val);
            },0*i);
        }
    }
    //animation for empty cells
    zeroAnimation(zeroCells){
        for(let i = 0; i < zeroCells.length; i++){
            let row = zeroCells[i][0];
            let col = zeroCells[i][1];
            setTimeout(() => {
                $('button[row='+row+'][col='+col+']').addClass('zero-square');
                console.log('zero: ',zeroCells);
            },20*i);
        }
    }
    //when click solve
    handleSolve(){
        if(this.state.solved|| this.state.solving) return;
        let history = this.state.history;
        let step = this.state.step;
        let current = history[step];
        let squares = current.squares.slice();
        let [ans,animation,zeroCells] = solveSudoku(squares);
        if(ans){
            $('button').removeClass('zero-square square-solve solved square-wrong square-correct');
            this.setState({solving:true});
            this.zeroAnimation(zeroCells);
            
            setTimeout(() => {
                this.solveAnimation(animation);
            },zeroCells.length*20);

            setTimeout(() => {
                this.setState({
                    history: history.concat([
                        {squares: ans}
                    ]),
                    step: history.length,
                    solving: false,
                    solved: ans
                });
            },animation.length*50+zeroCells.length*20);
        }else{
            alert("Can't solve!");
        }
    }

    handleRandom(){
        if(this.state.solving) return;
        let history = this.state.history;
        let mat,animation,zeroCells,mated;
        $('button').removeClass('zero-square square-solve solved square-prototype square-wrong square-correct');
        while(true){
            mat = randomSudoku();
            mat = solveSudoku(mat)[0];
            if(mat) break
        }
        [mated,zeroCells] = removeSudoku(mat,4);
        //disabled button
        for(let i = 0 ; i < zeroCells.length; i++){
            let row = zeroCells[i][0];
            let col = zeroCells[i][1];
            $('button[row='+row+'][col='+col+']').addClass('square-prototype');
        }
        //setState
        this.setState({
            history: [
                {
                    squares: mated
                }
            ],
            solved: false,
            random: true,
            step: 0,
            ans: mat,
            zeroCells: zeroCells,
        });
    }

    whenKey(e,row,col,numpad){
        if (this.state.solved) return;
        if ($('button[row='+row+'][col='+col+']').attr('class') === 'square' && this.state.random) return;
        $('button[row='+row+'][col='+col+']').removeClass('square-wrong square-correct');
        let history = this.state.history.slice(0,this.state.step + 1);
        let current = history[history.length-1];
        let squares = current.squares.map(row => {return row.slice();});
        let press;
        //check key before insert
        if(e.key == 'Delete' || e.key == 'Backspace' || e === 0) press = 0
        else if(numpad){
            press = $(e.target).attr('class');
            press = press[press.length-1];
        }else{
            let number = ['1','2','3','4','5','6','7','8','9'];
            let isNumber = number.indexOf(e.key)
            if(isNumber < 0){
                return;
            }
            press = e.key
        }
        // convert char to int then put into selected square
        let val = parseInt(press);
        squares[row][col] = val;
        //add move
        //add new history and step
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            step: history.length,
        })
    }

    handleClick(i,row,col){
        var _ = this
        $(document).ready(function(){
            $('button[row='+row+']').addClass('square-neighbor');
            $('button[col='+col+']').addClass('square-neighbor');
            if( i > 0 ){
                $('button[value='+i+']').addClass('square-focus');
            }
            //when using keyboard
            $('button:focus').keydown(e => {
                _.whenKey(e,row,col,false);
            })
            //when using the numpad
            $('button[class|=numpad]').off('click').on('click',(e => {
                _.whenKey(e,row,col,true);
            }));

            $('a[id=backspace]').off('click').on('click',(e => {
                _.whenKey(0,row,col,true);
            }));

            $('button').blur(function(){
                $('button[row='+row+']').removeClass('square-neighbor');
                $('button[col='+col+']').removeClass('square-neighbor');    
                $('button[value='+i+']').removeClass('square-focus');
            });
        })
    }
    
    handleRestart(){
        $('button').removeClass('zero-square square-solve solved square-wrong square-correct');
        let history = this.state.history[0];
        let squares = history.squares;
        this.setState({
            history: [{
                squares: squares
            }],
            solved: false,
            step: 0,
            random: true,
        });
    }

    handleClearTable(){
        $('button').removeClass('zero-square square-solve solved square-prototype square-wrong square-correct');
        $('button[class|=square').text('');
        this.setState({
            history: [
                {squares: new Array(9).fill().map(() => new Array(9).fill(0))}
            ],
            solved: false,
            solving: false,
            step: 0,
            random: false,
            ans: false
        });
    }

    handleUndo(){
        let step = this.state.step;
        console.log('undo')
        if(step > 0){
            this.setState({
                step: --step,
            });
        }
    }

    handleRedo(){
        let history = this.state.history;
        let step = this.state.step;
        console.log(step,history.length);
        if(step < history.length-1){
            this.setState({step: ++step});
        }
    }

    handleCheck(){
        let ans = this.state.ans;
        if(!ans) return;
        let step = this.state.step;
        let history = this.state.history[step];
        let squares = history.squares;
        let zeroCells = this.state.zeroCells;

        $('button').removeClass('square-focus square-correct square-wrong');
        for(let i = 0 ; i < zeroCells.length; i++){
            let check = false;
            let row = zeroCells[i][0];
            let col = zeroCells[i][1];
            if(squares[row][col] == 0) continue;
            if(ans[row][col] == squares[row][col]){
                check = true;
            }
            let addedClass = check ? 'square-correct' : 'square-wrong';
            $('button[row='+row+'][col='+col+']').addClass(addedClass);
        }
    }

    render(){
        let history = this.state.history;
        let step = this.state.step;
        let current = history[step];
        if(step < history.length-1){
            $('a[title=RedoIcon]').prop("disabled",true);
        }else{
            $('a[title=RedoIcon]').prop("disabled",false);

        }

        return(
            <div className='cover'>
                <NavBar 
                    random={() => this.handleRandom()}
                    solve={() => this.handleSolve()}
                    clearTable={() => this.handleClearTable()}
                    restart={() => this.handleRestart()}
                />
                <div className='board-area'>
                    <div className = 'left'>
                        <Board
                            squares = {current.squares}
                            onClick = {(i,row,col) => this.handleClick(i,row,col)}
                        />
                    </div>
                    <div className='right'>
                        <Tools className = 'Tools'
                            undo = {()=> this.handleUndo()}
                            redo = {()=>this.handleRedo()}
                            check = {() => this.handleCheck()}
                        />   
                        <Time className = 'Time'/>
                    </div>
                </div>
                <NumPad className = 'Numpad'></NumPad>
            </div>
        );
    }
}

export default game;