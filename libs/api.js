const puppeteer = require('puppeteer');
const express = require("express");
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

let token = null;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.id,
    clientSecret: process.env.secret,
    redirectUri: `http://localhost:9593/callback`,
});

async function openWebServer() {
    return await new Promise(resolve => {
        const app = express()
        app.get("/callback", (req, res) => {
            code = req.query.code;
            res.send(`<html ur="mom"/>`);
            serv.close()
            resolve(code);
        })
        var serv = app.listen(9593);
        webBrowser();
    })
}

async function webBrowser() {
    const authURL = await spotifyApi.createAuthorizeURL(
        [],
        "some-random-state",
        true,
    );
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(authURL);
    await page.type('#login-username', process.env.email);
    await page.type('#login-password', process.env.password);
    await page.click('#login-button');
    await page.waitForSelector('[data-testid="auth-accept"]');
    await page.click('[data-testid="auth-accept"]');
    await page.waitForSelector('[ur="mom"]');
    await browser.close();
}


async function getAccessToken(code) {
    let x = await spotifyApi.authorizationCodeGrant(code)
    return x.body.access_token;
}

async function getClientAccessToken() {
    return await spotifyApi.clientCredentialsGrant()
}


module.exports = async function() {
    if (token == null) {
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
        process.stdout.write("Authenticating...")
            //let x = await openWebServer();
            //token = await getAccessToken(x);
        token = await getClientAccessToken();
        console.log(token)
        process.stdout.clearLine(0)
        process.stdout.cursorTo(0)
    }
    return token.body.access_token
}