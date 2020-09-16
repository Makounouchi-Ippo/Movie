import React  from 'react';
import './Acteurs.css'
import {Card} from 'react-bootstrap'
import logo from '../../../assets/images/acteur_non_disponible.png'

const Acteurs = (props) => {   
  let content;

  if (props.data.length === 0)
   content = <p style={{fontSize:'xx-large', color: "rgb(85, 85, 85)"}}> Informations indiponibles</p>
    
  else {
    content = props.data.slice(0,5).map((acteur,index) => (
      <div className='blockActeurIndividiel'key={index}>
        {acteur.profile_path !== null ? 
          <Card className='CardActeur'> 
            <a href={`https://www.themoviedb.org/person/${acteur.id}`} target="_blank" rel="noopener noreferrer"> <Card.Img className='images' src={`https://image.tmdb.org/t/p/original/${acteur.profile_path}`} /></a>
            <Card.Body className='body'>
              <Card.Title className='title'> {acteur.name} </Card.Title>
              <Card.Text  style={{ color: "rgb(85, 85, 85)" , fontStyle:'italic', fontSize: "13px", marginTop:'0',textAlign:'center'}}>
                {acteur.character && acteur.character}   
                {acteur.job && acteur.job}
              </Card.Text> 
            </Card.Body>
          </Card>
          :  <Card className='CardActeur'>
         <a href={`https://www.themoviedb.org/person/${acteur.id}`} target="_blank" rel="noopener noreferrer">  <Card.Img  className='images' src={logo} alt='' /></a>
          <Card.Body className='body'>
            <Card.Title className='title'> {acteur.name} </Card.Title>
            <Card.Text  style={{ color: "rgb(85, 85, 85)" , fontStyle:'italic', fontSize: "13px", marginTop:'0',textAlign:'center'}}>
            {acteur.job &&  acteur.job}
            </Card.Text>
          </Card.Body>
          </Card>}
      </div> 
      )
    )
  }

  return (
    <>
      <p className='titreActeur'>{props.title} : </p>
      <div className='blockActeur'>
        {content}
      </div>
    </>  
  )
}

export default Acteurs;
