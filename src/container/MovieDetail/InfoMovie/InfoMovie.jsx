import React  from 'react';
import classes from './InfoMovie.css'
import Progress from 'react-circle-progress-bar'

const InfoMovie = (props) => {

    console.log('infoMovie',props.pays.length)

    let affichage = props.genre.length === 0 ? <button className={classes.genre} style={{fontStyle:'italic'}}>Informations disponibles</button> :props.genre.map((data,index) => 
        (<button className={classes.genre} key={index}>{data.name}</button>))
    let synopsys = props.synopsys.length === 0 ? <p style={{fontSize:'xx-large',textAlign:'center'}}> Informations indisponibles </p> : <p className={classes.Psynopsys}> {props.synopsys} </p>
    let pays =  props.pays.length === 0 ? <button className={classes.genre} style={{fontStyle:'italic'}}>Informations disponibles</button> : <button className={classes.genre}> {props.pays[0].iso_3166_1} </button> 
        return (
        <div className={classes.InfoMovie} >
            <div className={classes.listInfo}>
                <div className={classes.infoList}>   
                <p style={{color:'white'}}>Genre:</p>
                    {affichage}
                </div> 
                <div className={classes.infoList2} >
                    <p style={{color:'white'}}>Duree :</p>
                            <button className={classes.genre}> {props.duree}  min  </button>
                </div>
               
                <div className={classes.infoList2} >
                    <p style={{color:'white'}}> Pays production :</p>
                        {pays} 
                </div>
                <div className={classes.infoList2} >
                        <Progress progress={props.vote} reduction={0} strokeWidth={6} ballStrokeWidth={0} transitionDuration={0.8} background={'white'} subtitle='Note' style={{width:'190px',fontStyle:'italic', fontSize:'20px',display:'flex',justifyContent:'center',fontWeight:'bold'}}/>
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