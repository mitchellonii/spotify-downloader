const getTrackMeta = require("./getMeta")
const YoutubeMusicApi = require('youtube-music-api');
const ytAPI = new YoutubeMusicApi();
const fetch = require("node-fetch");
const fs = require('fs');
const colors = require("colors");
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi()
const filter = require("./filterFilename");

module.exports = async function(argURL) {
    return ytAPI.initalize().then(async function() {
        return await main(argURL)
    })
}

async function main(argURL) {
    spotifyApi.setAccessToken(await require("./api")());
    var trackIDS = []

    let songs;

    if (argURL.pathname.startsWith("/track")) {
        trackIDS.push(argURL.pathname.split("/")[2])
        process.stdout.write(`Fetching song ${argURL.pathname.split("/")[2].green}\n`)

        songs = await getTrackMeta(trackIDS);
    }
    if (argURL.pathname.startsWith("/album")) {
        process.stdout.write(`Fetching songs in album ${argURL.pathname.split("/")[2].green}\n`)

        let tracks = (await spotifyApi.getAlbumTracks(argURL.pathname.split("/")[2], {
            offset: 0,
            limit: 50,
            fields: 'items',
        })).body.items
        for (let i = 0; i < tracks.length; i++) {
            trackIDS.push(tracks[i].id);
        }
        songs = await getTrackMeta(tracks, true);

    }
    if (argURL.pathname.startsWith("/playlist")) {
        process.stdout.write(`Fetching songs in playlist ${argURL.pathname.split("/")[2].green}\nThis may take a while...\n`)
        let x = (await spotifyApi.getPlaylistTracks(argURL.pathname.split("/")[2])).body.items;
        x.forEach(song => {
            trackIDS.push(song.track.id);
        })

        songs = await getTrackMeta(trackIDS);



    }
    if (trackIDS.length == 0) return console.log("No tracks found");




    amount = 0;
    return await new Promise(resolve => {
        for (let i = 0; i < songs.length; i++) {
            ytAPI.search(`${songs[i].name} by ${songs[i].artists[0]}`, "song").then(async(r) => {
                amount++;
                fetch(songs[i].art)
                    .then(res => {
                        dlpath = `./temp/${filter(songs[i].name)} - ${filter(songs[i].artists[0])}.png`

                        res.body.pipe(fs.createWriteStream(dlpath));
                        songs[i].art = dlpath
                        if (amount == songs.length) resolve(songs);
                    })
                songs[i].videoID = r.content[0].videoId;
            })
        }
    })
}