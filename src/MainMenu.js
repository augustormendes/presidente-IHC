import React from 'react'
import { styled,makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';


  const MyPaper = styled(Paper)({
    background:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    padding: '0 30px',
    width: "30%",
    position:"absolute",
    top: "25%",
    textAlign:"center",
    left:"30%",
    
  })
  const MyButton = styled(Button)({
    background:"linear-gradient(45deg,#0099ff,#00ccff)",
    width: "15%",
    marginTop:"10%",
    marginLeft: "42.5%"
  })

  
class MainMenu extends React.Component{

state = {
  redirect: false,
  redirectRegras: false,
}

 
    render(){
      if(this.state.redirect){
          return (<Redirect to='/game'/>)
      }
      if(this.state.redirectRegras){
        return(<Redirect to='/rules'/>)
      }
return(<div>
  <h1 className="title">Presidente</h1>
  
   
      <div>
        <MyButton onClick={()=>{this.setState({redirect:true})}}>Novo Jogo</MyButton>
        </div>
      
      <div>
      <MyButton onClick={()=>{this.setState({redirectRegras:true})}}>Regras</MyButton>
      </div>
      
   
  
  
  </div>
  
  )
    }
}
export default MainMenu