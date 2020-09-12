import React, {Component} from 'react'
import classes from './Toolbar.css'
import Logo from './Logo/Logo'
import ToggleButton from './ToggleButton/ToggleButton';
import SearchButton from './SearchButton/SearchButton'
import {Link} from 'react-router-dom';
import { connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Nav, NavDropdown, Navbar} from 'react-bootstrap';

class toolbar extends Component {
    state= {
        toolbar: true,
    }

    render () {
        let location = this.props.location.pathname
        const atHome = location === "/home";
        let photo;

        if (localStorage.getItem('photo'))
            photo= localStorage.getItem('photo')
        else 
            photo='https://lebackyard.fr/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
       
         let items;
         if (this.props.isAuth){
                items = (
                    <Navbar style={{backgroundColor:'black',height:'90px'}}  variant='dark' expand="lg" >
                        <NavDropdown  title={
                            <div>
                                <img className="thumbnail-image" 
                                    src={photo} 
                                    alt="user pic"
                                    style={{borderRadius:'30px',marginTop:'5px',marginRight:'5px', height:'50px'}}
                                />
                            </div>}>
                            <div >
                                <NavDropdown.Item  href="/compte/infoPerso">Mon compte</NavDropdown.Item>
                                <NavDropdown.Item  href="#action/3.2">Mon panier</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item style = {{backgroundColor:'black', color:'white'}} href="/logout">Deconnexion</NavDropdown.Item>
                            </div>                        
                        </NavDropdown>
                        <Navbar.Toggle style={{color:'dark'}}aria-controls="responsive-navbar-nav" />
    
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto" />
                           {atHome && <SearchButton/>} 
                            <Navbar.Brand href="/home"> 
                                <img className="thumbnail-image" alt='ddd'
                                    src= '  https://www.numerama.com/content/uploads/2018/10/netflix-logo.jpg'
                                    style={{right:'0px',height:'60px'}}/> 
                            </Navbar.Brand>
                        </Navbar.Collapse>
                    </Navbar>
                )
         }   
        if (!this.props.isAuth) {
             items = (
                <header className={classes.Toolbar}>
                    <ToggleButton click={this.props.open}/>
                    <div className={classes.Logo}>
                        <Link to="/register">
                            <Logo/>
                        </Link> 
                    </div>
                    <div className={classes.button}>
                        <a href="/login"> 
                            <button className={classes.button}>Login</button>
                        </a> 
                    </div>
                </header>
            )
    
        }

        return (
            <div>
                {items}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuth: state.auth.token !== null,
    loading: state.auth.loading
});

export default withRouter(connect(mapStateToProps)(toolbar));