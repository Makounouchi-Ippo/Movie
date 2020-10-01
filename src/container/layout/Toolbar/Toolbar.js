import React, {Component} from 'react'
import './Toolbar.css'
import Logo from './Logo/Logo';
import N from '../../../assets/images/netflix-logo.png';
import SearchButton from './SearchButton/SearchButton'
import { connect} from 'react-redux';
import { withRouter,NavLink } from 'react-router-dom';
import { BsBag } from "react-icons/bs";
import {Nav, NavDropdown, Navbar} from 'react-bootstrap';
import AOS from 'aos'

class toolbar extends Component {
    state= {
        toolbar: true,
        imageMail: null,
        defaultImage: false
    }

    componentDidMount  ()  {
        AOS.init()
    }

    render () {
        let location = this.props.location.pathname
        const atHome = location === "/home";
        const atLogin = location === "/register"
        let photo;

        if  (localStorage.getItem('photo'))
            photo= localStorage.getItem('photo')
        else if (localStorage.getItem('photoPhone')){
            photo= localStorage.getItem('photoPhone')
            }
        else if (this.props.url !== null)
             photo = this.props.url
        else 
            photo='https://lebackyard.fr/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
      
       
         let items;
         if (localStorage.getItem('token')){
                items = (
                    <Navbar style={{padding: '0'}} bg="black" variant="dark" expand="sm" >
                        <Navbar.Brand href="/home" style={{display:'flex', alignItems:'center'}}> 
                                <img className="thumbnail-image" alt='ddd' 
                                    src= {N}
                                    style={{height:'75px', margin:'auto'}}/> 
                            </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto" />
                           {atHome && <SearchButton/>} 
                           <NavLink to="/panier" className='NavIcon'>
                               <BsBag className="Icon"/>
                             <p className="NumberCart">{this.props.number > 0 && this.props.number}</p>
                            </NavLink>
                            <NavDropdown alignRight  style={{textAlign:'center'}} title={
                            
                                <img className="thumbnail-image" 
                                    src={photo} 
                                    alt="user pic"
                                    style={{borderRadius:'50%',marginTop:'5px',marginRight:'5px', height:'50px', width:'50px'}}
                                />
                            }>
                            <div className='MenuDeroulantToolbar'>
                                 <NavDropdown.Item href="/compte/InfoPerso" style={{textDecoration:'none', color:'black'}}>Mon Compte </NavDropdown.Item> 
                                 <NavDropdown.Item href="/panier" style={{textDecoration:'none', color:'black',marginTop:'8px'}}>Mon Panier</NavDropdown.Item>
                                <NavDropdown.Divider />
                                    <NavDropdown.Item href="/logout"  style={{textDecoration:'none',color:'white',textAlign:'center',width:'100%',backgroundColor:'black'}}>Deconnexion</NavDropdown.Item>
                             
                            </div>                        
                        </NavDropdown>
                        </Navbar.Collapse>
                    </Navbar>
                )
         }   
        if (localStorage.getItem('token') === null) {
             items = (
                <header className='Toolbar'>
                    <div  data-aos="zoom-in" data-aos-duration='2000' className='Logo'>
                        <a href="/register">
                            <Logo/>
                        </a> 
                    </div>
                    {atLogin && <div  data-aos="zoom-in" data-aos-duration='2000'className='buttonToolbar'>
                     <a href='/login'>
                        <button className='buttonToolbar'>Login</button>
                     </a>
                    </div>} 
                </header>
            )
        }

        return (
            <>
                {items}
            </>
        )
    }
}


const mapStateToProps = state => ({
    number: state.cart.qte,
    url: state.auth.photo
});

export default withRouter(connect(mapStateToProps)(toolbar));