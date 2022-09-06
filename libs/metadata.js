var ffmetadata = require("ffmetadata");
var ffmpeg = require('fluent-ffmpeg');
var fs = require("fs")
const colors = require("colors")
const filter = require("./filterFilename");
let metaprogress = 0;

module.exports = async function(songData, songTempPath) {
    var data = {
        artist: songData.artists.join(', '),
        title: songData.name,
        album: songData.album,
        track: songData.number,
        date: songData.date,
        album_artist: songData.artists[0],
        genre: songData.genre
    };
    ffmetadata.write(songTempPath, data, {}, function(err) {
        if (err) {
            console.error(`Error writing metadata for ${songData.name} - ${songData.artists[0]}`);
        } else {
            var dir = `./output/${filter(songData.artists[0])}/${filter(songData.album)}/`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {
                    recursive: true
                });
            }
            ffmpeg()
                .on('error', err => {
                    console.error(`Error writing metadata for ${songData.name} - ${songData.artists[0]}\n${err}`);
                })
                .on('end', () => {
                    return true;

                })
                .input(songTempPath)
                .addOutputOptions(
                    '-i',
                    songData.art,
                    '-map',
                    '0:0',
                    '-map',
                    '1:0',
                    '-c',
                    'copy',
                    '-id3v2_version',
                    '3',
                )
                .save(dir + filter(`${songData.name}`) + ".mp3");
            metaprogress++;
            console.log(`[${metaprogress}] Completed `.yellow + (`${songData.name} - ${songData.artists[0]}`))
        }
    });
}