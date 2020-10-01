import React from 'react';
import {Spinner} from 'react-bootstrap';

const MySpinner = () => {
    return (
        <div style={{minHeight:'100vh',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
            <Spinner animation="border" style={{height:'200px',width:'200px'}}/>
            <p style={{marginTop:'30px'}}> Veuillez patienter , paiement en cours</p>
        </div>   
    )
}

export default MySpinner; 