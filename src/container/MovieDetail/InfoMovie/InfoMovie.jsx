import React  from 'react';
import classes from './InfoMovie.css'

const InfoMovie = (props) => {
    let affichage = props.genre.length === 0 ? <button className={classes.genre} style={{fontStyle:'italic'}}>Informations disponibles</button> :props.genre.map((data,index) => 
        (<button className={classes.genre} key={index}>{data.name}</button>))
    
        return (
        <div className={classes.InfoMovie} >
           <div className={classes.infoList}>   
            <p style={{color:'white'}}>Genre:</p>
                {affichage}
            </div> 
            <div className={classes.infoList2} >
                <p style={{color:'white'}}>Duree:</p>
                        <button className={classes.genre}> {props.duree}  min  </button>
            </div>
            <div className={classes.infoList2} >
                <p style={{color:'white'}}>Note:</p>
                        <button className={classes.genre}> {props.vote} / 10</button>
            </div>
            <div className={classes.infoList2} >
                <p style={{color:'white'}}>Popularite:</p>
                        <button className={classes.genre}> {props.popularite} </button>
            </div>
        </div>
    )
}

export default InfoMovie;