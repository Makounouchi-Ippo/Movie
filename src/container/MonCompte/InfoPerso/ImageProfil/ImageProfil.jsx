import React from 'react'
import { useState,useEffect } from 'react'
import classes from './ImageProfil.css'
// import {FaPlusCircle} from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import firebase from '../../../../fire'


const ImageProfil = () => {

    const [image, setImage] = useState(null);
    const [ good, setGood ] = useState(false);
    const [photoSocial,setPhotosocial] = useState(false)
    const [noPhoto,setNoPhoto] = useState(false)

    useEffect(() => {
        let id = localStorage.getItem('id');
        let fileName = 'image';
        let newDirectory = id;
        let fetchApi = localStorage.getItem('didmount')
        if (fetchApi !== null && localStorage.getItem('photo') === null){
            firebase.storage().ref(`images/${newDirectory}/${fileName}`).getDownloadURL()
                    .then(function(url) {
                        if(url) {
                            setImage(url);
                        }
                    })
                    .catch(err => {
                        console.log('333')
                    })
            console.log(1111111);
        }
        if (localStorage.getItem('photo'))
        {
           setImage(localStorage.getItem('photo'))
        } 
    },[])
    
    const handleChange = e => {
        if (e.target.files[0]) {
            if (e.target.files[0] !== image ) {
                setImage(e.target.files[0]);
                setGood(true);
            }            
        } 
      };
    
      const handleUpload = async (e) => {
        e.preventDefault(); 
        if (image !== null && good){
            let newDirectory = localStorage.getItem('id')
            let fileName = 'image'
            let file = image
            let db =  firebase.storage().ref(`images/${newDirectory}/${fileName}`)
                await db.put(file)
                  .then( d =>  d.state === 'success'?localStorage.setItem('didmount',true) : null)
                  .catch( d => console.log("do something"))
            firebase.storage().ref(`images/${newDirectory}/${fileName}`).getDownloadURL().then(function(url) {
              setImage(url)})
              setGood(false);  
             
        }
        else 
            return
       
    }

    return (
        <React.Fragment>
            <h1 style={{fontWeight:'normal',marginTop:'25px'}}> Info persos </h1>
            <p className={classes.titleMonCompte}> Renseignez vos coordonnées pour pouvoir passez commandes </p>
            <div className={classes.blockImage1}>
                <div className={classes.TitreContainer}>
                    <h2 className={classes.titreInContainer}> Image Profil </h2>
                      <form> 
                        <div className={classes.blockimage2}>
                            <img src={image} alt=''/>
                            {!localStorage.getItem('photo') && <div className={classes.blockButtonPhoto}>
                                <input type ='file' required  accept="image/*" onChange={handleChange} />
                                 <button onClick={handleUpload}>Upload</button>
                                {/* <FaPlusCircle className={classes.ButtonPhoto} onClick={addPhoto}/> */}
                            </div>  }    
                         </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ImageProfil;