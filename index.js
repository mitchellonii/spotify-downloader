const fs = require("fs");
const fsExtra = require('fs-extra');

async function go() {
    if (!fs.existsSync("./temp")) {
        fs.mkdirSync("./temp")
    }

    fsExtra.emptyDirSync(`./temp/`);

    process.stdout.write("Starting up...")
    let inputURL = await require("./libs/parse")();
    let data = await require("./libs/getVideoData")(inputURL);
    for (let i = 0; i < data.length; i++) {
        require("./libs/download")(data[i]);
    }
}
go()