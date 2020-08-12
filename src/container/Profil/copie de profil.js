import React, { Component } from 'react'
import classes from './Profil.css'
import { FiSend } from "react-icons/fi";
//import axios from 'axios';



class Profil extends Component {

    state = {
        count: 0,
        updated: false
    }

    Score = (e) => {
        if(e.target.name === 'add' && !this.state.updated && (this.state.count>=0 || this.state.count<=100)) {
            this.setState((prevState) => {
              return {
                count: prevState.count + 1,
                updated: true
              };
            },()=> console.log('if',this.state.count));
          } else if (e.target.name === 'remove' && this.state.updated && (this.state.count>0 || this.state.count<=100)){
            this.setState((prevState) => {
              return {
                count: prevState.count - 1,
                updated: false
              };
            },()=> console.log('else',this.state.count));
          }
   
    }

    removeScore

    render () {
        return (

            <div className={classes.Profil}>
            <div className={classes.gauche}>
                <div className={classes.description_gauche}> 
                                 <div className={classes.block_photo}>
                                        <div className={classes.photo}> 
                                           Emplacement photo
                                        </div>
                                </div> 
                                <div className={classes.block_button}>
                                    <button name = "add" onClick={this.Score}> &#9825; Like me </button>    
                                    <button name= "remove" onClick={this.Score}> &#9825; unlike  me </button>  
                                    <button > <FiSend>  </FiSend> Chattez  </button>  
                                </div>   
                                <div className={classes.block_progress_bar}>
                                    <div >
                                        <Progress progress={80}
                                        
                                           hideValue= {true}
                                            subtitle={'Sccore de 78'}
                                            strokeWidth={'15'}
                                            reduction={'0.25'}
                                            transitionDuration={'3.9'}
                                            transitionTimingFunction={'ease'}
                                            background={'#d5d5e8'}
                                           
                                            />
                                    </div> 
                               </div>
    
                </div>
            </div>
            <div className= {classes.droite}>
                <div className={classes.block_identite}>
                    <div  className={classes.identite}>
                        <h1> Mehdi93400</h1> <br></br>
                        <h6> 50 ans, Paris 7e arrondissement </h6> <br></br>
                        <h7> Connectée il y a moins de 24 heures</h7><br></br>
                        <p>La vie est belle profiton en !!!!!!</p><br></br>
                        <p>  Parisienne - Sports - Théâtre - Cinéma - Expos</p> <br></br>
                    </div>
                </div>   
               
                <div className= {classes.gallery}>
                    <h5> Mes Photos </h5> 
                    <div className={classes.gallery_photo}>
                        <div>ffff</div>
                        <div>fff</div>
                        <div>fff</div>
                        <div>fff</div>
                        <div>ffff</div>
                    </div>
                </div>
                <div className= {classes.block_tags}>
                    <h5> Mes Tags </h5> 
                    <div className={classes.tags}>
                        <div>ffff</div>
                        <div>fff</div>
                        <div>fff</div>
                        <div>fff</div>
                        <div>ffff</div>
                    </div>
                </div>
    
    
            </div>
        </div>


        )

    }

}

export default Profil;