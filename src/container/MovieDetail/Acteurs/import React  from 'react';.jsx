import React  from 'react';
import classes from './Acteurs.css'
import {Card} from 'react-bootstrap'
import logo from '../../../assets/images/acteur_non_disponible.png'

const Acteurs = (props) => {   
  let content;

  if (props.data.length === 0)
   content = <p style={{fontSize:'xx-large', color: "rgb(85, 85, 85)"}}> Informations indiponibles</p>
    
  else {
    content = props.data.slice(0,5).map((acteur,index) => (
      <div className={classes.blockActeurIndividiel}key={index}>
        {acteur.profile_path !== null ? 
         <Card style={{ width: '11rem',height:'320px' }}>
         <Card.Img  className={classes.images} variant="top" src={`https://image.tmdb.org/t/p/original/${acteur.profile_path}`} />
         <Card.Body>
           <Card.Title style={{ color: "grey" }}> {acteur.name} </Card.Title>
           <Card.Text>
           {acteur.character && <p style={{ color: "rgb(85, 85, 85)" , fontStyle:'italic', fontSize: "13px", marginTop:'0'}}>({acteur.character})</p>}   
           {acteur.job && <p style={{ color: "rgb(85, 85, 85)" , fontStyle:'italic',fontSize: "13px"}}>{acteur.job}</p>}
           </Card.Text>
         </Card.Body>
         </Card>
          :  <Card style={{ width: '18rem' }}>
          <Card.Img  className={classes.images}src={logo} alt='' />
          <Card.Body>
            <Card.Title style={{ color: "grey" }}> {acteur.name} </Card.Title>
            <Card.Text>
            {acteur.job && <p style={{ color: "rgb(85, 85, 85)" , fontStyle:'italic',fontSize: "13px"}}>{acteur.job}</p>}
            </Card.Text>
          </Card.Body>
          </Card>}
      </div> 
      )
    )
  }



  return (
    <div>
      <p className={classes.titreActeur}>{props.title} : </p>
      <div className={classes.blockActeur}>
        {content}
      </div>
    </div>  
  )
}

export default Acteurs;
