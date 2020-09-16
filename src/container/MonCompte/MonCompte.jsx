import React from 'react'
import './MonCompte.css'
import {Link} from 'react-router-dom'
import {FiShoppingCart} from 'react-icons/fi'
import {FaRegAddressCard} from 'react-icons/fa'
import {GrGroup} from 'react-icons/gr'
import {AiOutlineHome} from 'react-icons/ai'


const MonCompte = (props) =>{
    return (
        <div className='MonCompte'>
            <div className='BlockGauche'>
                        <p className='titleMonCompte'> Mon compte </p>
                  <div className='blockButton'>
                     <div className='Button'>
                        <Link style={{color:'inherit',textDecoration:'none'}} to='/home'>
                            <AiOutlineHome style={{height:'100px',width:'40px'}}/>     
                        <p className='titre'> Netflix </p>
                        </Link>
                    </div>
                    <div className='Button'>
                        <Link style={{color:'inherit',textDecoration:'none'}} to='/compte/InfoPerso'>
                            <FaRegAddressCard style={{height:'100px',width:'40px'}}/>
                        <p className='titre'> Infos persos </p>
                        </Link>
                    </div>
                    <div className='Button'>
                    <Link style={{color:'black',textDecoration:'none'}} to='/compte/achats' >
                  
                        <FiShoppingCart style={{height:'100px',width:'40px'}} />
                        <p className='titre'> Mes achats </p>
                    </Link>
                    </div>
                    <div className='Button'>
                    <Link style={{color:'black',textDecoration:'none'}} to='/compte/social' >
                        <GrGroup style={{height:'100px',width:'40px'}} />
                        <p className='titre'>  Social </p>
                    </Link> 
                    </div>
                  </div> 
            </div>
            <div className='BlockDroite'> 
                 {props.child}
            </div>
        </div>
    )
} 

export default MonCompte;