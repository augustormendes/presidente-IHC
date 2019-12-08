import React from 'react';
import './App.css';
import {Client} from 'boardgame.io/react'
import teste from './Game'
import Board from './Board'

//board = Board
let num = 4
console.log(teste)

const Jogo = Client({
  game: teste,
  numPlayers: 4,
  board: Board,
  debug:false
})
export default Jogo;