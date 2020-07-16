import React from 'react'
import classes from './SideDrawer.css'
import { IoMdClose } from 'react-icons/io';
 
const sideDrawer = (props) => (
   <div className={classes.SideDrawer}>
      <div className={classes.button}> <IoMdClose onClick={props.closeSide}/></div>
      <div className={classes.SideDrawer_link}> Notre Histoire</div>
      <div className={classes.SideDrawer_link}> Nous Contacter</div>
      <div className={classes.SideDrawer_link}> Confidentialité</div>
      <div className={classes.SideDrawer_link}> CGV</div>
    </div>

)

export default sideDrawer;