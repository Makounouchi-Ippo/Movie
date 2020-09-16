import React, {Component} from 'react'
import './Toolbar.css'
import Logo from './Logo/Logo'
import SearchButton from './SearchButton/SearchButton'
import {Link} from 'react-router-dom';
//import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Nav, NavDropdown, Navbar} from 'react-bootstrap';

class toolbar extends Component {
    state= {
        toolbar: true,
        imageMail: null,
        defaultImage: false
    }

    render () {
        let location = this.props.location.pathname
        const atHome = location === "/home";
        const atLogin = location === "/register"
        let photo;

        if  (localStorage.getItem('photo'))
            photo= localStorage.getItem('photo')
        else 
            photo='https://lebackyard.fr/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
      
       
         let items;
         if (localStorage.getItem('token')){
                items = (
                    <Navbar  bg="black" variant="dark" expand="lg" >
                        <NavDropdown title={
                            <>
                                <img className="thumbnail-image" 
                                    src={photo} 
                                    alt="user pic"
                                    style={{borderRadius:'30px',marginTop:'5px',marginRight:'5px', height:'50px'}}
                                />
                            </>}>
                            <div className='MenuDeroulantToolbar'>
                                 <NavDropdown.Item href="/compte/InfoPerso" style={{textDecoration:'none', color:'black'}}>Mon Compte </NavDropdown.Item> 
                                 <NavDropdown.Item href="/mika" style={{textDecoration:'none', color:'black',marginTop:'8px'}}>Mon Panier</NavDropdown.Item>
                                 <Link to="/mika">Mikaaa</Link>
                                <NavDropdown.Divider />
                                    <NavDropdown.Item href="/logout"  style={{textDecoration:'none',color:'white',textAlign:'center',width:'100%',backgroundColor:'black'}}>Deconnexion</NavDropdown.Item>
                             
                            </div>                        
                        </NavDropdown>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto" />
                           {atHome && <SearchButton/>} 
                            <Navbar.Brand href="/home" style={{display:'flex', alignItems:'center'}}> 
                                <img className="thumbnail-image" alt='ddd' 
                                    src= 'https://www.numerama.com/content/uploads/2018/10/netflix-logo.jpg'
                                    style={{right:'0px',height:'60px', margin:'auto'}}/> 
                            </Navbar.Brand>
                        </Navbar.Collapse>
                    </Navbar>
                )
         }   
        if (localStorage.getItem('token') === null) {
             items = (
                <header className='Toolbar'>
                    {/* <ToggleButton click={this.props.open}/> */}
                    <div className='Logo'>
                        <Link to="/register">
                            <Logo/>
                        </Link> 
                    </div>
                   {atLogin && <div className='buttonToolbar'>
                     <Link to='/login'>
                        <button className='buttonToolbar'>Login</button>
                     </Link>
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



export default withRouter((toolbar));