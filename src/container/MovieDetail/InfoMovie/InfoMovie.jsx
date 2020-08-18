import React  from 'react';
import classes from './InfoMovie.css'

const InfoMovie = (props) => {

    console.log('infoMovie',props.pays.length)

    let affichage = props.genre.length === 0 ? <button className={classes.genre} style={{fontStyle:'italic'}}>Informations disponibles</button> :props.genre.map((data,index) => 
        (<button className={classes.genre} key={index}>{data.name}</button>))
    let synopsys = props.synopsys.length === 0 ? <p style={{fontSize:'xx-large'}}> Informations indisponibles </p> : <p className={classes.Psynopsys}> {props.synopsys} </p>
    let pays =  props.pays.length === 0 ? <button className={classes.genre} style={{fontStyle:'italic'}}>Informations disponibles</button> : <button className={classes.genre}> {props.pays[0].iso_3166_1} </button> 
        return (
        <div className={classes.InfoMovie} >
            <div className={classes.listInfo}>
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
                    <p style={{color:'white'}}> Pays production:</p>
                        {pays} 
                </div>
            </div>
            <div className={classes.synopsys}>
                    <p style={{color:'white'}}>Synopsys :</p>
                     {synopsys}
            </div>
        </div>
       
    )
}

export default InfoMovie;