import React, {useState, useEffect, useRef} from 'react'
import ReactDom from 'react-dom'
import './User_Input.css'
import "./Voice_Button.css"
import "./Typing_Box.css"
import {ChangeEvent} from "react";
async function send_model_request(eng:string){
    try {
        const response = await fetch('https://ulp-api.timmald.com/api', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'eng': eng
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const resData = await response.json();
        return {ipa: resData.ipa, audio_URL:resData.audio_URL};
    }
    catch(error){
        console.error('Error sending the request:', error);
        throw error;
    }
}
function User_Input(){
    const input_text = useRef();
    const [ipa, setIpa] = useState("");
    const [audioURL, setAudioURL] = useState("");
    const [eng, setEng] = useState("");
    const [output_mode, setOutput] = useState(false); //is it in output mode?
    const [isFileGenerated, setFileGen] = useState(false);
    const handleChange = (event:ChangeEvent) => {
        if(event != null) {
            setEng((event.target as HTMLInputElement).value);
        }
    }
    const submitButton = ()=>{
        //TODO: Check valid input
        let alphabet = 'abcdefghijklmnopqrstuvwxyz ';
        for(let i = 0;i<eng.length;i++){
            if (!(alphabet.includes(eng[i].toLowerCase()))){
                setEng("");
                console.log("BAD INPUT");
                return;
            }
        }
        setOutput(true);
    }
    useEffect(() => {
        const fetch_data = async () => {
            if (output_mode) {
		const clean_eng = eng.replace(" ","").toLowerCase()
                const newData = await send_model_request(clean_eng);
                setIpa(newData.ipa);
                setAudioURL(`https://ulp-api.timmald.com${newData.audio_URL}`);
                setFileGen(true);
            }
        }
        fetch_data();
    }, [output_mode, eng]);//Every time it goes into output mode, run this
    return (
        <g>
            <svg id="Input_Text" xmlns="http://www.w3.org/2000/svg" width="1036" height="129" viewBox="0 0 1036 129" fill="none">
            <path d="M61.8345 1.27152L0.966919 127.689H993.576L1034.38 1.27152H61.8345Z" fill="#5F8C43" stroke="black"/>
            <line id= "Line_Accent" x1="0.860931" y1="7.68874" x2="933.272" y2="7.68874" stroke="black" strokeWidth="14"/>
            </svg>
            <foreignObject id="Typing_Box_Container">
                {output_mode ? (<div id={"output_container"}><div id="output_text">{ipa}</div> {isFileGenerated ? (<audio controls><source src={audioURL} type="audio/mpeg"/>Your Browser does not support the audio tag</audio>):null}</div>):(<input id="Text_Box" type="text" placeholder="Type Text Here..." onChange={handleChange}/>)}
            </foreignObject>
            <foreignObject id="Voice_Button_Container">
                <select id="Voice_Dropdown" className="Voice_Button" defaultValue="select">
                    <option disabled={true} value="select">Select Voice:</option>
                    <option>Timmald</option>
                    <option>Joe Biden</option>
                </select>
                <button className={"Voice_Button"} id={"Voice_Submit"} onClick={submitButton}>
                    Say it
                </button>
            </foreignObject>
        </g>
    )
}
export default User_Input;
//TODO: Back button
//TODO: do u need a.wav? (normal a)
