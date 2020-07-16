import React from 'react'
import classes from './ToggleButton.css'

const togglebutton = (props) => (
    <div className={classes.Togglebutton} onClick={props.click}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default togglebutton;