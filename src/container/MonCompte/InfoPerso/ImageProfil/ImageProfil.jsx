import React from 'react'
import { useState,useEffect } from 'react'
import classes from './ImageProfil.css'
// import {FaPlusCircle} from 'react-icons/fa'
//import { CgProfile } from 'react-icons/cg'
import firebase from '../../../../fire'

const ImageProfil = () => {

    const [image, setImage] = useState(null);
   // const [url, setUrl] = useState("");
    const [good, setGood] = useState(false);
  

    useEffect(() => {
        let id = localStorage.getItem('id');
        let fileName = 'image';
        let newDirectory = id;
        if (localStorage.getItem('photo') === null){
            firebase.storage().ref(`images/${newDirectory}/${fileName}`).getDownloadURL()
                    .then(function(url) {
                            setImage(url);
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


    //let imageProfil = localStorage.getItem('photo');
   // let imageee = imageProfil === null ?  <CgProfile style={{height:'140px', width:'140px'}}/> : <img src={url} alt='' style={{height:'140px', width:'140px',borderRadius:'10px'}}/>
    
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
                  .then( d => console.log("Diiid iitt"))
                  .catch( d => console.log("do something"))
            firebase.storage().ref(`images/${newDirectory}/${fileName}`).getDownloadURL().then(function(url) {
              setImage(url)})
              setGood(false);  
             
        }
        else 
            return
      };
    console.log("image :", image)

    return (
        <React.Fragment>
            <h1 style={{fontWeight:'normal',marginTop:'25px'}}> Info persos </h1>
            <p className={classes.titleMonCompte}> Renseignez vos coordonnées pour pouvoir passez commandes </p>
            <div className={classes.blockImage1}>
                <div className={classes.TitreContainer}>
                    <h2 className={classes.titreInContainer}> Image Profil </h2>
                    <form> 
                        <div className={classes.blockimage2}>
                            <img src={image} alt='' style={{height:'140px', width:'140px',borderRadius:'50%'}}/>
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