# Spotify downloader
A fast, multithreaded utility using the Spotify and Youtube api to download albums, tracks, and playlists from Spotify built in nodejs

## Features: 

 - Multithreading, for increased speed
 - Automatic ID3v2 tag addition to downloaded songs
 - Bitrate control
 - Bass boosting
## Installation:
spotify downloader requires the following programs to be installed:
 - [nodejs](https://nodejs.org/en/)
 - [ffmpeg](https://ffmpeg.org/)
[//]: # (Hello)
 after installing nodejs and ffmpeg, spotify downloader may be downloaded using the following:

    `git clone https://github.com/mitchellonii/spotify-downloader`
    `cd spotify downloader`
    `npm i`
## Usage:
To use spotify downloader simply use the following command:
`node . -d <URL>`
replace <UR​L> with a valid spotify album/playlist/track link

### Optional arguments:
|Argument | Usage |  Description  |
|--|--|--|
| -b | -b [1-6] |  Bass boosts the track(s), default: 1  |
|-q |  -q [0-10] | Suggests a bitrate for ffmpeg to encode at, 0 = lowest, 10 = highest
 
