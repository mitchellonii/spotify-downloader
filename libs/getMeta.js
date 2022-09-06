var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi()


module.exports = async function(arr, isalbum = false, ) {
    const token = await require("./api")()

    spotifyApi.setAccessToken(token);
    let output = []

    if (!isalbum) {
        process.stdout.write(`0/${arr.length}`);
        for (let i = 0; i < arr.length; i++) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(`${i}/${arr.length}`);

            let y = (await spotifyApi.getTrack(arr[i])).body
            let albumArt = (await spotifyApi.getAlbum(y.album.id)).body.images[0].url;
            let artists = []
            let genre = (await spotifyApi.getArtist(y.artists[0].id)).body.genres
            for (let i = 0; i < y.artists.length; i++) {
                artists.push(y.artists[i].name);
            }
            output.push({
                name: y.name,
                artists: artists,
                album: y.album.name,
                number: y.track_number,
                date: y.album.release_date.split("-")[0],
                art: albumArt,
                genre: genre
            })
        }
        process.stdout.write(`\n`);
    } else {
        let album = await spotifyApi.getAlbum((await spotifyApi.getTrack(arr[0].id)).body.album.id);
        let albumArt = album.body.images[0].url;
        let genre = (await spotifyApi.getArtist(album.body.artists[0].id)).body.genres
        for (let i = 0; i < arr.length; i++) {
            let y = arr[i]
            let artists = []
            for (let i = 0; i < y.artists.length; i++) {
                artists.push(y.artists[i].name);
            }
            if (artists.indexOf(album.body.artists[0].name) != 0) {
                artists.unshift(artists.splice(artists.indexOf(album.body.artists[0].name), 1)[0]);
            }
            output.push({
                name: y.name,
                artists: artists,
                album: album.body.name,
                number: y.track_number,
                date: album.body.release_date.split("-")[0],
                art: albumArt,
                genre: genre
            })

        }
    }
    return output;
}