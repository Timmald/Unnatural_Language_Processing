import React from 'react'
import './Voice_Button.css'

function Voice_Dropdown(){
    return (
            <select id="Voice_Dropdown" className="Voice_Button" defaultValue="select">
                <option disabled={true} value="select">Select Voice:</option>
                <option>Timmald</option>
                <option>Joe Biden</option>
            </select>
    )
}
export default Voice_Dropdown;
