var ffmpeg = require('fluent-ffmpeg');
const metadata = require("./metadata")
module.exports = async function(tempFileName, songData) {
    var quality;
    if (process.argv.indexOf("-q") + 1 == 0) quality = 5.1
    else quality = process.argv[process.argv.indexOf("-q") + 1]

    if (quality > 10 || quality < 0) {
        quality = 5.1
    }

    quality = 10 - quality;


    ffmpeg(tempFileName)
        .output(`./temp/${songData.name.replaceAll("/","")} - ${songData.artists[0]}-t.mp3`)
        .on('end', async function() {

            return await metadata(songData, `./temp/${songData.name.replaceAll("/","")} - ${songData.artists[0]}-t.mp3`);
        }).on('error', function(e) {
            console.log('error: ', e, e);
            return false;
        }).audioQuality(quality).run();



}