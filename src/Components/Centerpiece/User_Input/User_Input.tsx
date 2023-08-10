import React from 'react'
import './User_Input.css'
import Typing_Box from "./Typing_Box/Typing_Box";
import Voice_Dropdown from "./Voice_Buttons/Voice_Dropdown";
import Voice_Submit from "./Voice_Buttons/Voice_Submit";
function User_Input(){
    return (
        <g>
            <svg id="Input_Text" xmlns="http://www.w3.org/2000/svg" width="1036" height="129" viewBox="0 0 1036 129" fill="none">
            <path d="M61.8345 1.27152L0.966919 127.689H993.576L1034.38 1.27152H61.8345Z" fill="#5F8C43" stroke="black"/>
            <line id= "Line_Accent" x1="0.860931" y1="7.68874" x2="933.272" y2="7.68874" stroke="black" stroke-width="14"/>
            </svg>
            <foreignObject id="Typing_Box_Container">
                <Typing_Box></Typing_Box>
            </foreignObject>
            <foreignObject id="Voice_Button_Container">
                <Voice_Dropdown></Voice_Dropdown>
                <Voice_Submit></Voice_Submit>
            </foreignObject>
        </g>
    )
}
export default User_Input;