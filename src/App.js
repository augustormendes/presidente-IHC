import React from 'react';
import './App.css';
import Jogo from './Jogo'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainMenu from './MainMenu'
//board = Board
let num = 4

function App() {
  
  return (<Router>
    <Route exact path="/" component={Jogo} />
    <Route  path="/main" component={MainMenu}/>
    </Router>)
}
export default App;