import React from 'react';
import './timer.component.css';
import $ from 'jquery';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            second: 0,
            minute: 0,
            hour: 0
        }
        this.pad = this.pad.bind(this);
        this.countup = this.countup.bind(this);
    }

    pad(val){
        if(val <= 9){
            return '0'+val;
        }else{
            return val;
        }
    }

    countup(){
        setInterval(() => {
            let seconds = this.state.second;
            ++seconds;
            let minutes = seconds/60;
            let hour = minutes/60;    
            this.setState({
                second: seconds,
                minute: this.pad(parseInt(minutes%60)),
                hour: this.pad(parseInt(hour%24))
            });
            $('#hour').html(this.state.hour);
            $('#minute').html(this.state.minute);
            $('#second').html(this.pad(this.state.second%60));
        },1000);
    }
 
    render(){
        return(
            <div className='Timer' >
                <div className = 'time'>
                    <span id = 'hour'>00</span> : <span id ='minute'>00</span> : <span id='second'>00</span>
                </div>
                <div className='icon'>
                    <PlayArrowIcon className='PlayArrowIcon'/>
                </div>
            </div>
        );
    }
}