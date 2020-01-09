import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Game from './components/game.component';

function App() {
  return (
    <Game />
  );
}

export default App;
