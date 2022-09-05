const url = require("url");

module.exports = async function() {
    const arg = process.argv[process.argv.indexOf("-d") + 1];
    if (arg == undefined || arg.includes("node.exe")) return console.log(undefined);
    let inputURL = url.parse(arg);
    if (inputURL.hostname != "open.spotify.com") return console.log("Invalid URL");
    return inputURL;
}