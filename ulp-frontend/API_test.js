async function send_model_request(eng){
    try {
        const response = await fetch('http://localhost:3001/api', {
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

send_model_request("timmald").then(console.log,console.error)
