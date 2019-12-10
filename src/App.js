import React from 'react';
import './App.css';
import Jogo from './Jogo'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainMenu from './MainMenu'
import Regras from './Regras'
//board = Board
let num = 4

function App() {
  
  return (<Router>
    <Route exact path="/" component={MainMenu} />
    <Route  path="/game" component={Jogo}/>
    <Route path="/rules" component={Regras}/>
    </Router>)
}
export default App;