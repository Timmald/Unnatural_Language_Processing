import React from 'react'
import './Voice_Button.css'

function Voice_Dropdown(){
    return (
            <select id="Voice_Dropdown" className="Voice_Button">
                <option disabled={true} selected={true}>Select Voice:</option>
                <option>Timmald</option>
                <option>Joe Biden</option>
            </select>
    )
}
export default Voice_Dropdown;