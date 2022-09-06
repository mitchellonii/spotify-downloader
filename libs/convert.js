var ffmpeg = require('fluent-ffmpeg');
const metadata = require("./metadata");
const filter = require("./filterFilename");
module.exports = async function(tempFileName, songData) {
    var quality;
    if (process.argv.indexOf("-q") + 1 == 0) quality = 5.1
    else quality = process.argv[process.argv.indexOf("-q") + 1]

    if (quality > 10 || quality < 0) {
        quality = 5.1
    }

    quality = 10 - quality;

    var bassLVL;
    if (process.argv.indexOf("-b") + 1 == 0) bassLVL = 1
    else bassLVL = process.argv[process.argv.indexOf("-b") + 1]

    if (bassLVL > 6 || bassLVL < 1) {
        bassLVL = 2;
    }

    //todo put quality and bassLVL functions in parse, maybe require("parse").basslvl()?
    //in that case, maybe rename parse to parse-args? 

    ffmpeg(tempFileName)
        .output(`./temp/${filter(songData.name)} - ${filter(songData.artists[0])}-t.mp3`)
        .on('end', async function() {

            return await metadata(songData, `./temp/${filter(songData.name)} - ${filter(songData.artists[0])}-t.mp3`);
        }).on('error', function(e) {
            console.log('error: ', e, e);
            return false;
        }).outputOptions(`-af bass=g=${bassLVL}`).audioQuality(quality).run();



}