import React from 'react';
import './ImagePlay.css'
import {useState}from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlayCircle,faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import affiche from '../../../assets/images/affiche_non_disponible.png'
import {Modal} from 'react-bootstrap'
import {FaPlay} from 'react-icons/fa'
import BandeAnnonceNonDisponible from '../../../assets/images/bande-annonce_non_disponibe.jpg'

const ImagePlay = (props) => {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    let image = null;

    if (props.afficheFilm ===null && props.afficheFilm2 === null)
    {
        image = (
            <div >
              <div className='imagesFilm' > 
              <img className='image3' src={affiche} alt={props.id}/>
               <FontAwesomeIcon style ={{position:'absolute',color:'gold',height:'100px',width:'100px',top:'38%', cursor:'pointer'}} icon={faPlayCircle} onClick={handleShow} />
               <p style={{position:"absolute",color:'white',width:'200px',textAlign:'center',fontWeight:'bold',fontSize:'1,9em',bottom:'25px'}}> {props.titre} </p>
          </div> 
          <Modal
                    style={{backgroundColor:'black'}}
                    size="xl"
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={true}
                >
                    <Modal.Header  style={{backgroundColor:'black',border:'none'}} closeButton>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'black'}}>
                    <img style={{width:'100%'}}src={BandeAnnonceNonDisponible} alt={props.id}/>
                    </Modal.Body>
                </Modal>
        </div>
        )
    }

    if(props.afficheFilm === null && props.afficheFilm2 !== null){
        image = (
            <div >
                 <p style={{color:'white',textAlign:'center',fontWeight:'bold',fontSize:'1,9em'}}> {props.titre} </p>
              <div className='imagesFilm' >
              <img className='image2' src={`https://image.tmdb.org/t/p/original/${props.afficheFilm2}`} alt={props.id}/>
               <FontAwesomeIcon style ={{position:'absolute',color:'gold',height:'100px',width:'100px',top:'38%', cursor:'pointer'}} icon={faPlayCircle} onClick={handleShow} />
          </div> 
          <Modal
                    style={{backgroundColor:'black'}}
                    size="xl"
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={true}
                >
                    <Modal.Header  style={{backgroundColor:'black',border:'none'}} closeButton>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'black'}}>
                    <img style={{width:'100%'}}src={BandeAnnonceNonDisponible} alt={props.id}/>
                    </Modal.Body>
                </Modal>
        </div>
        )}

    if (props.afficheFilm !== null && props.bandeAnnonce !== undefined ){
        image = (
            <div>
                 <p style={{color:'white',textAlign:'center',fontWeight:'bold',fontSize:'1,9em'}}> {props.titre} - {props.date} </p>
              <div className='imagesFilm' >
                 <img className='imageFilm' src={`https://image.tmdb.org/t/p/original/${props.afficheFilm}`} alt={props.id}/>
                 <FaPlay style={{position:'absolute',color:'gold',height:'100px',width:'100px',top:'38%', cursor:'pointer'}} onClick={handleShow}/>
                 <p style ={{position:'absolute',color:'gold',textAlign: 'center',width: '400px',top: '55%',fontWeight: 'bold',fontSize:'x-large'}}> BANDE-ANNONCE</p>
                 <button style={{position:"absolute", right: '17%',color:'white',height:'40px',backgroundColor:'red',width:'200px',fontWeight:'bold',fontSize:'1,9em',bottom:'30px',borderRadius:'10px'}}> <FontAwesomeIcon  icon={faShoppingCart}/> Ajouter au panier   </button>
              </div> 
          <Modal
                    style={{backgroundColor:'black'}}
                    size="xl"
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={true}
                >
                    <Modal.Header  style={{backgroundColor:'black',border:'none',bordeTopLeftRadius:'black', borderTopRightRadius: 'black'}}  closeButton>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'black'}}>
                    <iframe width="100%" height="700px" src={`https://www.youtube.com/embed/${props.bandeAnnonce}?autoplay=1`} frameBorder="0" allowFullScreen  allow='autoplay' title='youtube'/>   
                    </Modal.Body>
         </Modal>
        </div>
        )
    }
    if (props.afficheFilm !== null && props.bandeAnnonce === undefined ) {
        image = (
            <div>
                 <p style={{color:'white',textAlign:'center',fontWeight:'bold',fontSize:'1,9em'}}> {props.titre} - {props.date} </p>
              <div className='imagesFilm' >
                 <img className='imageFilm' src={`https://image.tmdb.org/t/p/original/${props.afficheFilm}`} alt={props.id}/>
                 <FaPlay style={{position:'absolute',color:'gold',height:'100px',width:'100px',top:'38%', cursor:'pointer'}} onClick={handleShow}/>
                 <p style ={{position:'absolute',color:'gold',textAlign: 'center',width: '400px',top: '55%',fontWeight: 'bold',fontSize:'x-large'}}> BANDE-ANNONCE</p>
                 <button style={{position:"absolute", right: '17%',color:'white',height:'40px',backgroundColor:'red',width:'200px',fontWeight:'bold',fontSize:'1,9em',bottom:'30px',borderRadius:'10px'}}> <FontAwesomeIcon  icon={faShoppingCart}/> Ajouter au panier   </button>
              </div> 
          <Modal
                    style={{backgroundColor:'black'}}
                    size="xl"
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={true}
                >
                    <Modal.Header  style={{backgroundColor:'black',border:'none',bordeTopLeftRadius:'black', borderTopRightRadius: 'black'}}  closeButton>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'black'}}>
                    <img style={{width:'100%'}}src={BandeAnnonceNonDisponible} alt={props.id}/>
                    </Modal.Body>
         </Modal>
        </div>
        )

    }


    return (
        <div >
             {image}    
        </div>
        
    )



}

export default ImagePlay;