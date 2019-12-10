import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import React from 'react'
import { styled,makeStyles } from '@material-ui/core/styles';

const MyPaper = styled(Paper)({
    background:"#888383",
    padding: '0 30px',
    width: "40%",
    margin:"auto"
    
  })


  const MyButton = styled(Button)({
    background:"linear-gradient(45deg,#0099ff,#00ccff)",
    width: "30%",
    position:"relative",
    left:"15.5%"  })


  class Regras extends React.Component{
    state = {
        redirect: false,
    }
    

    render(){
        if(this.state.redirect){
            return (<Redirect to='/'/>)
        }
        return(
        <MyPaper>
            <ul>
            <li className="listItem">O objetivo do jogo é acabar com as cartas da mão</li>
            <li className="listItem">Cada jogador tem um título, sendo o primeiro o presidente</li>
            <li className="listItem">No começo de cada rodada o presidente descarta uma carta ou conjunto de cartas de valor igual</li>
            <li className="listItem">A partir daí, cada jogador deve descartar o mesmo número de cartas iguais de valor maior ou igual</li>
            <li className="listItem">Ordem das cartas (O naipe não importa!)</li>
            </ul>
            <img src={require("./resources/regrasordem.png")} height="60%" width="60%"></img>
            <MyButton onClick={()=>{this.setState({redirect:true})}}>Entendi</MyButton>
           
        </MyPaper>
        )
    }
  }

  export default Regras