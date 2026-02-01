const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const cors = require("cors")

var corsOptions = {
  origin: 'https://ulp.timmald.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

async function get_IPA(eng){
    //Takes an english word and sends a request to the tensorflow server to find the IPA transcription, then returns it
    const ipa_vocab = '\0æɐɑβɓçɕðʒɖɗəɚɵɛɜɝɠɡɢħɦɥɧʜɨɪʝɟɫɭɬʟɮɱŋɲɳɴɔœɒøɸɾɹʁʀɻɽʃʂθʈʊʉʌʋɯʍχɣʎʏɤʐʑʔʕabcdefghijklmnopqrstuvwxyz';
    eng = eng.padEnd(10,'\0');
    let idxArr = [];
    for(let i = 0; i < eng.length;i++){
        idxArr.push(ipa_vocab.indexOf(eng[i]));
    }
    let requestInstances = [idxArr];
    let requestData = {
        instances:requestInstances
    }
    try {
        const response = await fetch('http://ulp-model.timmald.com/v1/models/realEmbedding.model:predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        let predictionsArr = await response.json();
        let predictions = predictionsArr.predictions[0];
        let charIdxs = [];
        for(let i = 0; i < predictions.length; i++){
            let maxIdx=0;
            let value = predictions[i];
            for (let a = 0; a < ipa_vocab.length; a++) {
                if(value[a] > value[maxIdx]){
                    maxIdx = a;
                }
            }
            charIdxs.push(maxIdx);
        }
        let IPA = charIdxs.map((idx)=>ipa_vocab[idx]).join('');
        let unpadded = `${IPA.replace('\0','')}`
        let indexThing = 0;
        for(let i = 0; i < unpadded.length; i++){
            if(unpadded.codePointAt(i) !=0) {
                let curChar = unpadded[i];
                indexThing=i;
            }
        }
        return unpadded.substring(0,indexThing+1);
    }
    catch(error){
        console.error('Error Generating IPA:', error);
        throw error;
    }

}

async function generate_audio(IPA){
    //TODO: ɔ.wav
    //Takes IPA and returns URL to audio file
    let forkedProcess = new Promise((resolve, reject) => {
        let process = child_process.fork('./ffmpegStuff.js',[IPA]);
        process.on('exit', code => resolve(code));
        process.on('error', err => reject(err));
    });
    await forkedProcess;
    return `/file/${IPA}.mp3`;
}

async function get_next_page_info(eng){
    console.log(`English Received: ${eng}`)
    let IPA = await get_IPA(eng);
    console.log(`IPA is: ${IPA}`);
    let audio_url = await generate_audio(IPA);
    console.log(`Generated File ${IPA}.mp3`);
    return {
        ipa:IPA,
        audio_URL:audio_url
    };
}


const express = require("express");
const child_process = require("child_process");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors(corsOptions))
app.get("/api", cors(corsOptions), async (req,res)=>{
 res.json(await get_next_page_info(req.get("eng")));
});
app.use('/file', cors(corsOptions), express.static('output_file'));
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})
