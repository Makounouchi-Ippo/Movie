import React from 'react';

import './Spinner.css';

const spinner = (props) => {
return (
    <div className='position'>
         <p style={{color:"white",textAlign:'center'}}>  {props.text} </p>        
        <div className='Loader' >     
       
        </div>
    </div>
    )
}

export default spinner;
