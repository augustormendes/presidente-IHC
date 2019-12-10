import React from 'react'
import {legalCardsInHand} from './Game'
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import bg1 from './resources/bg1.png'
import { styled,makeStyles } from '@material-ui/core/styles';



const MyButton = styled(Button)({
    background:"linear-gradient(45deg,#0099ff,#00ccff)",
    marginLeft: "92vw"
  })
class Board extends React.Component{

    state = {
        redirect: false,
    }
parseCards(lista){
    let imageMap = new Map()
    let curCard
    let imgName
    
    for(let i = 0; i<lista.length;i++){
        imgName = ''
        curCard = lista[i]
        imgName += curCard.rank
        switch(curCard.suit){
           case "SPADES":
               imgName+='S'
               break
           case "CLUBS":
               imgName+='C'
               break
           case "DIAMONDS":
               imgName+='D'
               break
           case "HEARTS":
               imgName+='H'
               break
        }
        imageMap.set(i,{img:imgName,pos:i})
    }
    return imageMap
}

handleCardClick(id){
////console.log("ID")
////console.log(id)
////console.log(this.props.G.players[this.props.ctx.currentPlayer].cards[id].rank)
//console.log(this.props.G.players[this.props.ctx.currentPlayer].cards)
//console.log(id)
let arr = []
let i = 0
let j = 0
while(i<this.props.G.currentRound.amount){
    if(this.props.G.players[this.props.ctx.currentPlayer].cards[j].rank === this.props.G.players[this.props.ctx.currentPlayer].cards[id].rank){
        arr = arr.concat(j)
        i++
    }
    j++
}
this.props.moves.placeCards(arr,this.props.G.players[this.props.ctx.currentPlayer].cards[id].rank)
}
// this.props.G.players[this.props.ctx.currentPlayer].cards[this.props.G.firstMoves[0]].rank === this.props.G.players[this.props.ctx.currentPlayer].cards[id].rank
handleFirstMove(id){
 
    if(!this.props.G.firstMoves.includes(id) && (this.props.G.firstMoves.length === 0 ||
    (this.props.G.players[this.props.ctx.currentPlayer].cards[this.props.G.firstMoves[0]].rank === this.props.G.players[this.props.ctx.currentPlayer].cards[id].rank)
    )){
    var teste = this.props.G.firstMoves
    //this.props.G.firstMoves = [id].concat(this.props.G.firstMoves)
    //console.log("HI")
    this.props.moves.update(id)
    ////console.log(this.props.G.firstMoves)
   // this.forceUpdate()
    }
}
undoMove(id){
    this.props.moves.undo(id)
}

getImages(imageMap){
    let teste = []
    let playable = legalCardsInHand(this.props.G,this.props.ctx,this.props.G.players[this.props.ctx.currentPlayer])
    playable = ([].concat.apply([],playable))
    //console.log("moves:")
    console.log(playable)
    for(let j = 0;j<imageMap.size;j++){
        if(!(this.props.G.currentRound.cardRank)){
            if(this.props.G.firstMoves.includes(j)){
                teste.push(<img className="Elevated" id={j} src={require('./resources/'+imageMap.get(j).img+'.png')} onClick={()=>this.undoMove(j)} height="6%" width="6%" 
                />)
            }
            else{
                
            teste.push(<img id={j} src={require('./resources/'+imageMap.get(j).img+'.png')} height="6%" width="6%" onClick={()=>this.handleFirstMove(j)}/>)
            }
        }
       else if(playable.includes(j)){
        //console.log("testeee"+j)
            teste.push(<img className="Elevated" id={j} src={require('./resources/'+imageMap.get(j).img+'.png')} onClick={()=>this.handleCardClick(j)} height="6%" width="6%" 
                />)
        }
        else{
            teste.push(<img  id={j} src={require('./resources/'+imageMap.get(j).img+'.png')}  height="6%" width="6%" 
                />)
        }
        
    }
    
    return teste
}  
    botaoPasse(){
      //  console.log("passe"+this.props.G.currentRound.cardRank)
        if(this.props.G.currentRound.cardRank){
            return <button onClick={()=>{this.props.moves.pass()}}>Passe</button>
            
        }
    }
    handleFirstPlay(){
       // //console.log(this.props.G.firstMoves.sort())
        this.props.moves.placeCards(this.props.G.firstMoves.sort(),this.props.G.players[this.props.ctx.currentPlayer].cards[this.props.G.firstMoves[0]].rank);
        this.props.G.firstMoves.length = 0
        //console.log("ALI!")
        //console.log(this.props.G.firstMoves)
    }
    botaoJogar(){
        if(this.props.G.firstMoves.length != 0){
            return (<button onClick={()=>{this.handleFirstPlay()}}>Jogar!</button>)
        }
    }
    cartasNaPilha(){
        if(this.props.G.currentRound.cardRank){
            let cartas = []
            let images = []
            
            for(let i = 0;i<this.props.G.currentRound.suits.length;i++){
                
                cartas[i] = {rank:this.props.G.currentRound.cardRank,suit:this.props.G.currentRound.suits[i]}
                //console.log("AQUI")
                //console.log(cartas)
            }
            let imageMap = this.parseCards(cartas)
            //console.log(imageMap)
            
            for(let i=0;i<imageMap.size;i++){
                
                images[i]=(<img src={require('./resources/'+imageMap.get(i).img+'.png')}  height="6%" width="6%"/>)
            }
            
            return(images)
        }
    }

 //   checkIfPlayable(){
 //       for(let i = 0;i<this.props.ctx.numPlayers;i++){
 //          if (legalCardsInHand(this.props.G,this.props.ctx,this.props.G.players[this.props.ctx.currentPlayer]).length != 0){
  //             return
 //          }
  //      }
       // this.props.G.currentRound.amount = null
       // this.props.G.currentRound.suits = []
       // this.props.G.currentRound.cardRank = null
       // this.props.G.currentRound.firstMoves = []
 //   }
 checkIfPlayable(){
    // console.log("gameover:"+ctx.gameover)
     if(legalCardsInHand(this.props.G,this.props.ctx,this.props.G.players[this.props.ctx.currentPlayer]).length === 0 && !this.props.ctx.gameover){
        console.log("passando...")
        this.props.moves.pass()
     }
 }
 vez(i){
     if(this.props.ctx.currentPlayer == i){
        console.log("Bon giorno")
         return(<div>Vez</div>)
     }
 }
render(){
    this.checkIfPlayable()
    let imageMap = this.parseCards(this.props.G.players[this.props.ctx.currentPlayer].cards)
    return(
        <div>
            <div className="Jogador1">
                {this.vez(0)}
                <img src={require('./resources/player-icon.png')} height="6%" width="6%"/>
                Jogador1: {this.props.G.players[0].cards.length}
                </div>
                <div className="Jogador2">
                {this.vez(1)}
                <img src={require('./resources/player-icon.png')} height="6%" width="6%"/>
                Jogador2: {this.props.G.players[1].cards.length}
                </div>
                <div className="Jogador3">
                {this.vez(2)}
                <img src={require('./resources/player-icon.png')} height="6%" width="6%"/>
                Jogador3: {this.props.G.players[2].cards.length}
                </div>
                <div className="Jogador4">
                {this.vez(3)}
                <img src={require('./resources/player-icon.png')} height="6%" width="6%"/>
                Jogador4: {this.props.G.players[3].cards.length}
                </div>
            <div className='Pilha'>
            {this.cartasNaPilha()}
            </div>
<div className='PlayerInput'>
<div className='Pass'>
          {this.botaoPasse()}
          {this.botaoJogar()}
            </div>
        <div className="Cards">
        {this.getImages(imageMap)}
       
        </div>
        <MyButton onClick={()=>{window.location.reload()}}>Recomeçar</MyButton>
    </div>
    </div>
    )
}


}
export default Board