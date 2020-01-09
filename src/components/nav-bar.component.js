import React from 'react';
import './nav-bar.component.css'

export default class navBar extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.navSlide()
    }
    navSlide(){
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click',() => {
            nav.classList.toggle('nav-active');

            navLinks.forEach((link, index) => {
                if(link.style.animation){
                    link.style.animation = ''
                }
                else link.style.animation = `navLinkFade 0.5s ease forwards ${index/7+1}s`;
            })

            burger.classList.toggle('toggle');
        })

        

    }
    
    render(){
        return(
            <nav>
                <div className='logo'>
                    <h4>SUDOKU</h4>
                </div>
                <ul className='nav-links'>
                    <li><a href='#'>Level</a></li>
                    <li><a href='#' onClick={this.props.random}>Random</a></li>
                    <li><a href='#' onClick={this.props.solve}>Solve</a></li>
                    <li><a href='#' onClick={this.props.clearTable}>Clear Table</a></li>
                    <li><a href='#' onClick={this.props.restart}>Restart</a></li>
                </ul>
                <div className='burger'>
                    <div className='line1'></div>
                    <div className='line2'></div>
                    <div className='line3'></div>
                </div>
            </nav>
        );
    }
}