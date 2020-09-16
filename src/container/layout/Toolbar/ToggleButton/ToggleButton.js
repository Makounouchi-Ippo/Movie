import React from 'react'
import './ToggleButton.css'

const togglebutton = (props) => (
    <div className='Togglebutton' onClick={props.click}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default togglebutton;