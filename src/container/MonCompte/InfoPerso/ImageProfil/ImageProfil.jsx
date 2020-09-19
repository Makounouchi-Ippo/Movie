import React from 'react'
import { useState,useEffect } from 'react'
import './ImageProfil.css'
// import {FaPlusCircle} from 'react-icons/fa'
//import { CgProfile } from 'react-icons/cg'
import firebase from '../../../../fire';
import {useDispatch} from 'react-redux';
import  * as actions from '../../../../store/actions/index';
import { CgProfile } from 'react-icons/cg';

const ImageProfil = () => {

    let id = localStorage.getItem('id');
    let fileName = 'image';
    let newDirectory = id;
    let storage = firebase.storage().ref(`images/${newDirectory}/${fileName}`);
    
    const [ image, setImage ] = useState(null);
    const [ imageTmp, setImageTmp ] = useState(null);
    const [ good, setGood ] = useState(false);

    const dispatch = useDispatch();
    const photoProfil = (image) => dispatch(actions.photoUrl(image))

    let imageProfil = localStorage.getItem('photo');

    useEffect (() => {
        if (localStorage.getItem('photo')) {
            setImage(localStorage.getItem('photo')) 
            photoProfil(localStorage.getItem('photo'));
        }
        else if (localStorage.getItem('photoPhone')){
            setImage(localStorage.getItem('photoPhone')) 
            photoProfil(localStorage.getItem('photoPhone'));
        }
        else{
                storage.getDownloadURL()
                .then(function(url) {
                    if (url) {
                        photoProfil(url);
                        setImage(url);
                    }
                })
                .catch(err => {
                    setImage('https://lebackyard.fr/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png')
                    console.log(err)
                })
        }
    }, [])

    const handleChange = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0] !== image ) {
                setImageTmp(e.target.files[0]);
                setGood(true);
            }            
        }         
    };
    
    const handleUpload = async (e) => {
  
        if(good) {
            if (image !== undefined) {
                await storage.put(imageTmp)
                    .then(res => console.log(res))
                    .catch(err => console.log(err))
            }
            await storage.getDownloadURL()
                .then(function(url) {
                    photoProfil(url);
                    setImage(url);
                    setGood(false);                
                })
                .catch(err => {
                    console.log(err)
                })
        }        
    }

    return (
        <React.Fragment>
            <h1 style={{fontWeight:'normal',marginTop:'25px'}}> Info persos </h1>
            <p>Renseignez vos coordonnées pour pouvoir passez commandes</p>
            <div className='blockImage1'>
                <div className='TitreContainer'>
                    <h2 className='titreInContainer'> Image Profil </h2>
                        <div className='blockimage2Photo'>
                            { image !== null ? 
                        <img src={image} alt='' style={{height:'140px', width:'140px',borderRadius:'50%'}}/>
                        : <CgProfile style={{height:'140px', width:'140px'}}/>}
                        { !imageProfil && <div className='blockButtonPhoto'>
                            <input type='file' accept="image/*" onChange={handleChange}  />
                            <button onClick={handleUpload}>Upload</button>
                        </div> }  
                         </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ImageProfil;