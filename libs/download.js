const fs = require('fs');
const ytdl = require('ytdl-core');
const colors = require('colors');

const convert = require("./convert")

let downloadprogress = 0;
let processprogress = 0;
module.exports = async function(songData) {
    let stream = ytdl(`http://www.youtube.com/watch?v=${songData.videoID}`, {
        quality: 'highestaudio',
    })
    let bufs = [];
    let downloaded = 0;
    let total;
    stream.on('info', (info, format) => {
        total = format.contentLength;
    })
    stream.on('data', async function(chunk) {
        bufs.push(chunk)
        downloaded += chunk.length;
        let percent = downloaded / total * 100;
        if (percent == 100) {
            let buffer = Buffer.concat(bufs);
            processprogress++;
            fs.writeFileSync(`./temp/${songData.videoID}.webm`, buffer);
            console.log(`[${processprogress}] Processing `.cyan + (`${songData.name} - ${songData.artists[0]}`));
            return await convert(`./temp/${songData.videoID}.webm`, songData);
        }
    });
    downloadprogress++;
    console.log(`[${downloadprogress}] Downloading `.green + (`${songData.name} - ${songData.artists[0]}`));


}