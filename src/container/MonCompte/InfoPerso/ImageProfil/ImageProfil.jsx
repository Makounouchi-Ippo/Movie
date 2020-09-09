import React from 'react'
import { useState } from 'react'
import classes from './ImageProfil.css'
// import {FaPlusCircle} from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import {storage} from '../../../../fire'

const ImageProfil = () => {

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
  

    let imageProfil = localStorage.getItem('photo');
    let imageee = imageProfil === null ?  <CgProfile style={{height:'140px', width:'140px'}}/> : <img src={url} alt='' style={{height:'140px', width:'140px',borderRadius:'10px'}}/>
    
    const handleChange = e => {
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };
    
      const handleUpload = () => {
        let id = localStorage.getItem('id')
        const uploadTask = storage.ref('images/').put(image);
        console.log('========',uploadTask)
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                setUrl(url);
              });
          }
        );
      };
    console.log("image :", image)

    return (
        <React.Fragment>
            <h1 style={{fontWeight:'normal',marginTop:'25px'}}> Info persos </h1>
            <p className={classes.titleMonCompte}> Renseignez vos coordonnées pour pouvoir passez commandes </p>
            <div className={classes.blockImage1}>
                <div className={classes.TitreContainer}>
                    <h2 className={classes.titreInContainer}> Image Profil </h2>
                        <div className={classes.blockimage2}>
                            {imageee}
                            {!imageProfil && <div className={classes.blockButtonPhoto}>
                                <input type ='file' onChange={handleChange} />
                                 <button onClick={handleUpload}>Upload</button>
                                {/* <FaPlusCircle className={classes.ButtonPhoto} onClick={addPhoto}/> */}
                        </div>  }    
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ImageProfil;