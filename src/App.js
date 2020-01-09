import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import Game from './components/game.component';
import Home from './components/homepage.component';

function App() {
  return (
    <Router>
      {/* <div className="container"> */}
        {/* <Navbar /> */}
        {/* <br/> */}
        <Route path="/" exact component={Game} />
        <Route path = "/list" component = {ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
