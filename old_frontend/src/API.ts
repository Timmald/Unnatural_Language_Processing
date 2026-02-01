import * as ffmpeg from 'fluent-ffmpeg';
async function get_IPA(eng:string):Promise<string>{
    //Takes an english word and sends a request to the tensorflow server to find the IPA transcription, then returns it
    let ipa_vocab = '\0æɐɑβɓçɕðʒɖɗəɚɵɛɜɝɠɡɢħɦɥɧʜɨɪʝɟɫɭɬʟɮɱŋɲɳɴɔœɒøɸɾɹʁʀɻɽʃʂθʈʊʉʌʋɯʍχɣʎʏɤʐʑʔʕabcdefghijklmnopqrstuvwxyz'
    eng.padEnd(10,'\0')
    let engArr = eng.split("");
    engArr.forEach(ipa_vocab.indexOf);
    let requestInstances = [engArr];
    let requestData = {
        instances:requestInstances
    }
    try {
        const response = await fetch('localhost:8501/v1/models/pronouncer:predict', {
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
        let predictions = predictionsArr[0];
        let charIdxs:number[] = predictions.map((value:number[])=> {
            let maxIdx:number=0;
            for (let i = 0; i < ipa_vocab.length; i++) {
                if(value[i] < value[maxIdx]){
                    maxIdx = i;
                }
            }
            return maxIdx;
        });
        let IPA = "";
        for(let i = 0; i < charIdxs.length; i++){
            IPA.concat(ipa_vocab[charIdxs[i]]);
        }
        return IPA
    }
    catch(error){
        console.error('Error sending the request:', error);
        throw error;
    }

}

async function generate_audio(IPA:string):Promise<string>{
    let audio_paths = new Array<string>(IPA.length);
    //Takes IPA and returns URL to audio file
    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    ffmpeg.setFfmpegPath(ffmpegPath);
    let command = new ffmpeg.FfmpegCommand();
    for(let i = 0; i < IPA.length; i++){
        let curChar = IPA[i];
        command.input(`./Voice_Files/Timmald/${curChar}.wav`);
    }
    command.mergeToFile(`../public/${IPA}.mp3`,'..');
    return Promise.resolve(`/${IPA}.mp3`);
}

function get_next_page_info(eng:string){
    let IPA = get_IPA(eng);
    let audio_URL = IPA.then(generate_audio);
    return {
        ipa:IPA,
        audio_URL:audio_URL
    };
}
export default get_next_page_info;

//TODO: .then setstate, store promise in state