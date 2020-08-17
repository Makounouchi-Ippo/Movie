import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import classes from './EditProfil.css'
import * as regex from '../../component/Utility/Regex'

import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

class EditProfil extends Component {
  state = {
      name:'',
      lastname:'',
      mail:'',
      login:'',
      address:'',
      password:'',
      bio:'',
      file : [],
      value: {},
      error: {},
      avatar: null,
      disable: true,
      disabled:false,
      tag: [],
      currentData: 0,
      limit: 5
  }

componentDidMount () {
   // this.setState({name:this.props.user.firstName,lastname:this.props.user.lastName,mail:this.props.user.mail,login:this.props.user.username}, ()=>  console.log('valueeeeeur',this.state.name))
    

}


  handleChange = (e) => {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = e => {this.setState({file : [...this.state.file, e.target.result]})
      
      // let photos= {
      //   profil1: '',
      //   img1: this.state.file,
      //   img2: '',
      //   img3: '',
      //   img4: '',
      //   img5: ''

      // }
      // console.log(this.state.value.photo)

    //  axios.put('http://localhost:3000/api/edit/photos',photos,{ headers: { Authorization: this.props.token}}).then(response => { 
    //     console.log(response.data.message);
    //      }).catch(error => {
    //       console.log(error.response)
    //  });
    }
  }



  displayInAvatar = (img, i) => {
    //console.log('eeeeeee',i)
    this.setState({avatar:img})
  }

  deleteImages = (index) => {
    const file = [...this.state.file]
    file.splice(index,1);
    this.setState({file:file})


  }

  handleCheck = (event) => {
    
    let selected = event.target.checked;
    if (selected) {
      if (this.state.currentData < this.state.limit) 
      {
        this.setState({ currentData: this.state.currentData + 1, tag:[...this.state.tag,event.target.id]} ,()=> {console.log(this.state.tag)});
      } 
      else 
      {
        event.target.checked = false;
      }
    } 
    else {
      const remove = [...this.state.tag]
      let index = remove.indexOf(event.target.id);
      if (index !== -1) remove.splice(index, 1);
      this.setState({ currentData: this.state.currentData - 1, tag:remove}, () => { console.log(this.state.tag)})
        ;
    }
  }

  handleFormValid = () => {
    let store = ''; 
    const error = {...this.state.error};
    const values = Object.values(error)
    for (const key of values)
        store += key;
    Object.keys(error).length===6 && store.length===0? this.setState({disable:false}):this.setState({disable:true});
}


  handleInputValid = (name_input,value_input) => {
    let error = {...this.state.error};
    switch(name_input){
        case 'name': value_input.match(regex.name) ? error[name_input]='' : error[name_input] = "*votre nom nest pas valid";
        break;
        case 'lastname': value_input.match(regex.lastname) ? error[name_input]='' : error[name_input] = "*votre prenom nest pas valid";
        break;
        case 'mail': value_input.match(regex.mail)  || value_input === '' ? error[name_input]='' : error[name_input] = "*votre mail nest pas valid";
            break;
        case 'login': value_input.match(regex.login) || value_input === '' ? error[name_input]='' : error[name_input] = "*votre login nest pas valid";
            break;
        case 'password': value_input.match(regex.password) || value_input==='' ? error[name_input]='' : error[name_input] = "*Au moins: 1Min, 1Maj et 1chiffre ";
            break;
        case 'address': value_input.match(regex.address) || value_input==='' ? error[name_input]='' : error[name_input] = "Adresse invalid ";
            break;
        case 'bio': value_input.match(regex.address) || value_input==='' ? error[name_input]='' : error[name_input] = "Adresse invalid ";
            break;
        default:
            console.log("NUMBER NOT FOUND");
    }
    this.setState({error:error}, () => {this.handleFormValid()});
}


  handleInput = (event) => {
    const nameInput = event.target.name; 
    
    const valueInput = event.target.value;
    console.log('name',nameInput)
    console.log('value',valueInput)
    this.setState({[event.target.name]:event.target.value}, () => {this.handleInputValid(nameInput,valueInput)});
  }


  render () {
      let image = null;
      let disable = this.state.disabled;


      if (this.state.file.length >= 0){
        image = (
          <div className={classes.photos_list}>
              {this.state.file.map((img, i) => {
                  return ( <div style={{display:'flex', flexDirection:'row'}}> 
                     <img  className={classes.resize} key={i}src={img} alt={i} onClick={() =>this.displayInAvatar(img, i)} accept=".png, .jpg, .jpeg"/>
                     <button className={classes.remove_image}  onClick={()=>this.deleteImages(i)}>&#215;</button> 
                    </div>
                    )
              })}
          </div>
      );}

      if (this.state.file.length>=5){
          disable = true
      }
            
      let avatar = <div className={classes.avatar_photo}>  </div>;

      if (this.state.avatar != null){
        avatar = <img   className={classes.avatar_photo} src={this.state.avatar} alt='avatar'/>;
      }

      return (
          <div  className={classes.backdrop_profil}>           
            <div className={classes.photo}> 

                    {avatar}                 
                    
                    <div  className={classes.buttons_group}>
                      <input style={{display:'none'}}type='file' onChange={this.handleChange}
                        ref={fileInput => this.fileInput = fileInput} /> 
                        <Button   onClick={() => this.fileInput.click()} disabled={disable}> Choose file</Button> 
                        <Button   variant="warning">Upload</Button>
                    </div>
                      {image}
                      <div className={classes.voir_profil}>
                            <a href="/profil">   <button className={classes.button}>Voir profil</button></a>
                      </div>
            </div>
            <div className={classes.moitier}>

                <div className={classes.bas_gauche}>  
                    <div className={classes.block_tags}>
                         <h4> Ce que j'aime... </h4>
                         <p style={{marginTop:'5px'}}>Choisissez dans la liste <strong> 5 </strong> preferences: </p>
                         <div className={classes.tags}>
                          <div class="form-col">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"   onChange={(e)=>this.handleCheck(e)}/>
                            <label class="form-check-label" for="defaultCheck1" />
                              Sport
                          </div>
                          <div class="form-col">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" onChange={(e)=>this.handleCheck(e)}/>
                            <label class="form-check-label" for="defaultCheck2"/>
                              Humour
                          </div>
                          <div class="form-col">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" onChange={(e)=>this.handleCheck(e)} />
                            <label class="form-check-label" for="defaultCheck3"/>
                              Timide
                          </div>
                          <div class="form-col">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck4" onChange={(e)=>this.handleCheck(e)} />
                            <label class="form-check-label" for="defaultCheck4"/>
                             Musculation
                          </div>
                          <div class="form-col">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck5" onChange={(e)=>this.handleCheck(e)} />
                            <label class="form-check-label" for="defaultCheck5"/>
                             Culture
                          </div>
                          <div class="form-col">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck6"  onChange={(e)=>this.handleCheck(e)} />
                            <label class="form-check-label" for="defaultCheck6"/>
                              Danse
                          </div>
                          <div class="form-col">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck7" onChange={(e)=>this.handleCheck(e)} />
                            <label class="form-check-label" for="defaultCheck1"/>
                              Natation
                          </div>
                          <div class="form-col">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck8"  onChange={(e)=>this.handleCheck(e)}/>
                            <label class="form-check-label" for="defaultCheck1"/>
                              Soiree entre amis
                          </div>
                          <div class="form-col">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck9" onChange={(e)=>this.handleCheck(e)}/>
                            <label class="form-check-label" for="defaultCheck1"/>
                              Musique
                          </div>
                          <div class="form-col">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck10"onChange={(e)=>this.handleCheck(e)}/>
                            <label class="form-check-label" for="defaultCheck1"/>
                              Voyage
                          </div>
                          <div class="form-col">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck11"onChange={(e)=>this.handleCheck(e)}/>
                            <label class="form-check-label" for="defaultCheck1"/>
                              Mode
                          </div>
                         </div>
                    </div>
                </div>

                <div className={classes.bas_millieu}>
                  <div className={classes.form}>
                     <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                              <label for="inputEmail4">Nom</label>
                              <input   minLength="2" maxLength="20" required type="name"  value={this.state.name} class="form-control" name="name" placeholder="Nom" onChange={(e) =>this.handleInput(e)}/>
                              <p className={classes.error}> {this.state.error.name}</p>
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputPassword4">Prenom</label>
                              <input minLength="2" maxLength="15" required type="lastname" value={this.state.lastname} class="form-control" name="lastname" placeholder="Prenom" onChange={(e) =>this.handleInput(e)}/>
                              <p className={classes.error}> {this.state.error.lastname}</p>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                              <label for="inputEmail4">mail</label>
                              <input minLength="2" maxLength="15" required type="email"  value={this.state.mail} class="form-control" name="mail" placeholder="Mail" onChange={(e) =>this.handleInput(e)}/>
                              <p className={classes.error}> {this.state.error.mail}</p>
                            </div>
                            <div class="form-group col-md-6">
                              <label for="inputPassword4">Password</label>
                              <input minLength="2" maxLength="15" required type="password" class="form-control" name="password" placeholder="Password" onChange={(e) =>this.handleInput(e)}/>
                              <p className={classes.error}> {this.state.error.password}</p>
                            </div>
                        </div>
                        <div class="form-group">
                          <label for="login">Login</label>
                          <input minLength="2" maxLength="15" required type="text"   value={this.state.login} class="form-control" name="login" placeholder="Login" onChange={(e) =>this.handleInput(e)}/>
                          <p className={classes.error}> {this.state.error.login}</p>
                        </div>
                        <div class="form-group">
                          <label for="inputAddress">Address</label>
                          <input  required type="text" class="form-control" name="address" placeholder="Apartment, studio, or floor" onChange={(e) =>this.handleInput(e)}/>
                          <p className={classes.error}> {this.state.error.address}</p>
                        </div>
                        <div class="form-group">
                          <label for="inputDate">Date of birth</label>
                          <input  required type="date" class="form-control" name="date" placeholder="mm/dd/yyyy" onChange={(e) =>this.handleInput(e)}/>
                          <p> </p>
                        </div>
                        <div class="form-row">
                          <div class="form-group col-md-6">
                            <label for="inputState">Orientation sexuel</label>
                            <select id="inputState" class="form-control">
                              <option selected>Choose...</option>
                              <option>Hetero</option>
                              <option selected >BI</option>
                              <option>Gay</option>
                            </select>
                          </div>
                          <div class="form-group col-md-6">
                           <label  for="inputState">Genre</label>
                            <select id="inputState" class="form-control">
                              <option selected>Choose...</option>
                              <option>Homme</option>
                              <option>Femme</option>
                              <option selected>Trans</option>
                            </select>
                          </div>
                        </div>
                        <br></br>
                        <button type="submit" class="btn btn-primary" disabled={this.state.disable}>Sign in</button>
                     </form>
                  </div>

                </div>

                <div className={classes.bas_droite}>

                    <div className={classes.block_commentaire}> 
                      <h4> Votre description... </h4>
                      <br></br>
                      <textarea   rows='12'  col='12' name="bio" minlength="4" maxlength="10000" className={classes.commentaire} onChange={(e) =>this.handleInput(e)} />    
                      <br></br> 
                      <br></br>     
                      <p> Les descriptions comportant des coordonnées personnelles, termes ou thèmes incorrects, ne correspondant pas à nos CGU ou à l'esprit du service... seront modifiées ou supprimées. </p>
                   </div>
                </div>
                  

                
            </div>
          </div>
      )
  }
}



const mapStateToProps = state => {
  return {
    user:state.auth.user,
    token: state.auth.token
  };
};


export default withRouter(connect(mapStateToProps) (EditProfil)); 







