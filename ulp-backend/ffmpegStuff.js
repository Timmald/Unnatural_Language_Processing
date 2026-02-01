function checkFileExists(filePath, interval) {
    if (fs.existsSync(filePath)) {
        // You can perform further actions here when the file exists
    } else {
        setTimeout(() => {
            checkFileExists(filePath, interval); // Recursive call
        }, interval);
    }
}
const IPA = process.argv[2]
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);
var command = new ffmpeg();
for(let i = 0; i < IPA.length;i++){
    command.input(`./Voice_Files/Timmald/${IPA.charAt(i)}.wav`);
}
command.mergeToFile(`./output_file/${IPA}.mp3`,'./tmp');
command.on("end",()=>
{
    checkFileExists(`./output_file/${IPA}.mp3`, 200);
})
command.on('error', (err) => {
    console.error('Error:', err);
    //TODO: error popups on page
});
command.output(`./output_file/${IPA}.mp3`);
command.run();
