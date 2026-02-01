import React from 'react';
import './Centerpiece.css';
import Slogan_Blurb from './Slogan_Blurb/Slogan_Blurb';
import User_Input from "./User_Input/User_Input";
function Centerpiece(){
    return (
        <svg id="Centerpiece" xmlns="http://www.w3.org/2000/svg" width="1420" height="406" viewBox="0 0 1420 406" fill="none">
            <path d="M84.5205 1L1 405H1363.03L1419.01 1H84.5205Z" fill="url(#paint0_linear_4_9)" stroke="black"/>
            <defs>
                <linearGradient id="paint0_linear_4_9" x1="710.007" y1="1" x2="710.007" y2="405" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A05FC9"/>
                    <stop offset="1" stopColor="#EF9039"/>
                </linearGradient>
            </defs>
            <foreignObject>
                <Slogan_Blurb></Slogan_Blurb>
            </foreignObject>
            <User_Input></User_Input>
        </svg>
    )
}

export default Centerpiece;
