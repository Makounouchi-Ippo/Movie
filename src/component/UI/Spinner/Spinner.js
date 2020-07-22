import React from 'react';

import classes from './Spinner.css';

const spinner = (props) => {
return (
    <div className={classes.position}>
         <p style={{color:"white",textAlign:'center'}}>  {props.text} </p>        
        <div className={classes.Loader} >     
       
        </div>
    </div>
    )
}

export default spinner;
