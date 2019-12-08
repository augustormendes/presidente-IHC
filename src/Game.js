import {newDeck,shuffle,getRank,orderFunc,rankOrder} from "./Deck"
import {TurnOrder} from "boardgame.io/core";
import { isValidES3Identifier, thisTypeAnnotation } from "@babel/types";
import { reset } from "boardgame.io/dist/cjs/reducer-346fc670";



export const legalCardsInHand = (G,ctx,hand) => {
    let legal = new Map()
    var dict = new Map()
    let i = 0
    for(let rank in rankOrder){
       // console.log(rankOrder[rank])
        dict.set(rankOrder[rank],parseInt(rank))
    }
   // console.log(dict.get(G.currentRound.cardRank))
   // console.log(hand)
   // console.log(G)
  // console.log(hand.cards.length)
    for(let i=0;i<hand.cards.length;i++){
      //  console.log("\ncheck:")
      //  console.log(hand.cards[i])
        var card = hand.cards[i]
        
      //  console.log("BLA:")
      // console.log(dict.get(card.rank))
       

    //  console.log("rank da carta:")
     //      console.log(card.rank)
    //       console.log("ordem da carta no dict")
     //      console.log(dict.get(card.rank))
     //      console.log("ordem da carta na pilha")
           
     //      console.log(dict.get(G.currentRound.cardRank))
     //      console.log("\n")
        if((dict.get(card.rank) >= dict.get(G.currentRound.cardRank)) || !G.currentRound.cardRank){
           if(legal.has(card.rank)){
            //   console.log("falha:"+legal.get(card.rank).pos)
           // console.log(card.rank)
               var n = legal.get(card.rank).num+1
               var arr = legal.get(card.rank).pos
               arr[n-1] = i
               legal.set(card.rank,{
                   num: n,
                   pos: arr
               }
                   )
           }
           else{
             //  console.log(card.rank)
               var p = [i]
               legal.set(card.rank,{
                   num:1,
                   pos: p
                }
                   )
           }
        }
        else{
           
        }
    }
    let listPos = []
    console.log("LEGAL")
    console.log(legal)
    i = 0
    for(let rank in rankOrder){
        let card = legal.get(rankOrder[rank])
       // console.log(rankOrder[rank])
        if(card){
        if(card.num >= G.currentRound.amount){
      //      console.log(card.pos)
            listPos[i] = card.pos
            i++
        }
    }
    }
 //   console.log(listPos)
    return listPos
}

const discard = (G, ctx, discard, r) => {
    if(G.players[ctx.currentPlayer].length){
    }
    else{
    let discarded = []
   // cards.sort(function(a,b){return b-a})
    for(let i=0;i<discard.length;i++){
        console.log("BLAAA")
        console.log(discard[i])
        console.log(G.players[ctx.currentPlayer].cards[discard[i]-i].suit)
        discarded[i] = G.players[ctx.currentPlayer].cards[discard[i]-i].suit    
       G.players[ctx.currentPlayer].cards.splice(discard[i]-i,1)
       // console.log(discarded)
    }
    G.currentRound = {
        amount: discard.length,
        cardRank: r,
        suits: discarded
    }
    G.firstMoves = []   
    if(G.players[ctx.currentPlayer].cards.length === 0){
        G.rank.push(ctx.currentPlayer)
    }
    
    var jogadas = false
    for(let i = 0;i<ctx.numPlayers;i++){
        if (legalCardsInHand(G,ctx,G.players[i]).length != 0){
            jogadas = true
        }
    }
    if(jogadas){
        ctx.events.endTurn()
    }
    else{
        console.log("Cheguei")
    G.currentRound = {
        amount: 0,
        cardRank: null,
        suits:[]
    }
    G.firstMoves = []
}
}
}

 const updateMoves = (G,ctx,id) =>{
    console.log(G.firstMoves)
    if(G.firstMoves){
    G.firstMoves = G.firstMoves.concat(id)
    }
} 
const undoMoves = (G,ctx,id) =>{
    for(var i = 0;i<G.firstMoves.length;i++){
        if(G.firstMoves[i] === id){
            G.firstMoves.splice(i,1)
           // this.forceUpdate()
        }
    }
}

const end = (G,ctx) =>{
    ctx.events.endTurn()
}

const teste ={
    setup: (ctx) => {
        const  G = {
            players:[],         // mãos dos jogadores
            deck: [],           // baralho
            rank: [],           // rank dos jogadores(presidente, vice, etc)
            currentRound: {     // cartas na mesa
                amount: 0,
                cardRank: null,
                suits:[]
            },
            firstMoves:[]
        }
        G.deck = newDeck()
        
        shuffle(G.deck)

        const cardsPerPlayer = Math.floor(52 / ctx.numPlayers)
    
        for (let j = 0; j < ctx.numPlayers; j++) {
            G.players[j] = {
                cards: G.deck.splice(0, cardsPerPlayer)
            };
         //   orderFunc(G.players[j])
        }
       
        return G
    },
    name: 'Presidente',
    moves:{
        placeCards: discard,
        pass:end,
        update: updateMoves,
        undo:undoMoves
    },
    
    turn: {
        
            
                moves: {update:updateMoves,undo:undoMoves,placeCards:discard,pass:end},
                endIf: (G,ctx)=> legalCardsInHand(G,ctx,G.players[ctx.currentPlayer]).length === 0,
            
        },
        endIf: (G,ctx)=> G.rank.length === ctx.numPlayers,


};

export default teste


        
