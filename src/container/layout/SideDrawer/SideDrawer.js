import React from 'react'
import './SideDrawer.css'
import { IoMdClose } from 'react-icons/io';
 
const sideDrawer = (props) => (
   <div className='SideDrawer'>
      <div className='button'> <IoMdClose onClick={props.closeSide}/></div>
      <div className='SideDrawer_link'> Notre Histoire</div>
      <div className='SideDrawer_link'> Nous Contacter</div>
      <div className='SideDrawer_link'> Confidentialité</div>
      <div className='SideDrawer_link'> CGV</div>
    </div>

)

export default sideDrawer;