import React from 'react'
import Logo from '../../../../assets/images/netflix-logo.jpg'
import classes from './Logo.css'

const logo = () => (
    <div className={classes.Logo}>
        <img src={Logo} alt="Logo"/>
    </div>

)

export default logo;