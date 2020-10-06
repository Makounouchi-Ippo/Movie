import React, { Component } from 'react'
import './ImageProfil.css'
// import {FaPlusCircle} from 'react-icons/fa'
//import { CgProfile } from 'react-icons/cg'
import { connect } from 'react-redux';
import firebase from '../../../../fire';
import  * as actions from '../../../../store/actions/index';
import axios from 'axios';
import { MdAddCircle } from 'react-icons/md';

let fileName = 'image';
let newDirectory = localStorage.getItem('id');
let id = localStorage.getItem('id');
let storage = firebase.storage().ref(`images/${newDirectory}/${fileName}`);

class ImageProfil extends Component {
    state = {
        image: null,
        imageTmp: null,
        good: false
    }

    componentDidMount() {
        if (localStorage.getItem('photo')) {
            this.setState({image : localStorage.getItem('photo')})
            this.props.photoProfil(localStorage.getItem('photo'));
        }
        else if (localStorage.getItem('photoPhone')){
            this.setState({image : localStorage.getItem('photoPhone')})
            this.props.photoProfil(localStorage.getItem('photoPhone'));
        }
        else {
            let ref = this;
            storage.getDownloadURL()
            .then(function(url) {
                if (url) {
                    ref.setState({image: url});
                    ref.props.photoProfil(url);
                }
            })
            .catch(err => {
                this.setState({image : 'https://lebackyard.fr/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'})
            })
        }
    }

    handleChange = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0] !== this.state.image ) {
                this.setState({imageTmp: e.target.files[0], good: true}, () => {
                    if(this.state.good) {
                        if (this.state.image !== undefined) {
                            storage.put(this.state.imageTmp)
                                .then(res => { 
                                    let ref = this
                                    storage.getDownloadURL()
                                        .then(function(url) {
                                            ref.props.photoProfil(url);
                                            ref.setState({image:url, good: false})
                                            const photo = { photo : true };
                                            axios.put(`https://movies-27cd5.firebaseio.com/${id}/photo.json/`, photo)
                                                .then(res => {
                                                    // console.log(res)
                                                })
                                                .catch(err => { 
                                                    // console.log(err)
                                                })
                                        })
                                        .catch(err => {
                                            // console.log(err)
                                        })
                                //    console.log(res)
                                })
                                .catch(err => {
                                    // console.log(err)
                                })
                        } 
                    }        
                })
            }            
        }         
    };

    render() {
        return (
            <React.Fragment>
                <h1 style={{fontWeight:'normal',marginTop:'25px'}}> Info persos </h1>
                <p>Renseignez vos coordonnées pour pouvoir passez commandes</p>
                <div className='blockImage1'>
                    <div className='TitreContainer'>
                        <h2 className='titreInContainer'> Image Profil </h2>
                            <div className='blockimage2Photo'> 
                                <img src={this.state.image} alt='' style={{height:'140px', width:'140px',borderRadius:'50%'}}/>
                                {(!localStorage.getItem('photoPhone') && !localStorage.getItem('photo')) && 
                                    <div className='blockButtonPhoto'>
                                        <input style={{display: 'none'}} type='file' accept="image/*" onChange={this.handleChange} ref={fileInput => this.fileInput = fileInput}/>
                                        <MdAddCircle className='ButtonPhoto' style={{cursor:'pointer'}}onClick={() => this.fileInput.click()}/>
                                </div> }  
                            </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
   
}

const mapDispatchToProps = dispatch => {
    return {
        photoProfil: (image) => dispatch(actions.photoUrl(image)),
    };
};

export default connect(null, mapDispatchToProps) (ImageProfil);