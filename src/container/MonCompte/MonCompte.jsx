import React from 'react'
import classes from './MonCompte.css'
import {Link} from 'react-router-dom'
import {FiShoppingCart} from 'react-icons/fi'
import {FaRegAddressCard} from 'react-icons/fa'
import {GrGroup} from 'react-icons/gr'
import {AiOutlineHome} from 'react-icons/ai'


const MonCompte = (props) =>{
    return (
        <div className={classes.MonCompte}>
            <div className={classes.BlockGauche}>
                        <p className={classes.titleMonCompte}> Mon compte </p>
                  <div className={classes.blockButton}>
                     <div className={classes.Button}>
                        <Link style={{color:'inherit',textDecoration:'none'}} to='/home'>
                            <AiOutlineHome style={{height:'100px',width:'40px'}}/>     
                        <p className={classes.titre}> Acceuil </p>
                        </Link>
                    </div>
                    <div className={classes.Button}>
                        <Link style={{color:'inherit',textDecoration:'none'}} to='/compte/InfoPerso'>
                            <FaRegAddressCard style={{height:'100px',width:'40px'}}/>
                        <p className={classes.titre}> Infos persos </p>
                        </Link>
                    </div>
                    <div className={classes.Button}>
                    <Link style={{color:'black',textDecoration:'none'}} to='/compte/achats' >
                  
                        <FiShoppingCart style={{height:'100px',width:'40px'}} />
                        <p className={classes.titre}> Mes achats </p>
                    </Link>
                    </div>
                    <div className={classes.Button}>
                    <Link style={{color:'black',textDecoration:'none'}} to='/compte/social' >
                        <GrGroup style={{height:'100px',width:'40px'}} />
                        <p className={classes.titre}>  Social </p>
                    </Link> 
                    </div>
                  </div> 
            </div>
            <div className={classes.BlockDroite}>
                 {props.child}
            </div>
        </div>
    )
} 

export default MonCompte;