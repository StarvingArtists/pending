const express = require("express")
const fetch = require("node-fetch")
const app = express()

require('dotenv').config()

const cookie = process.env.COOKIE
const groupId = process.env.GROUP

app.get("/pending", async (req, res) => {
    fetch(`https://develop.roblox.com/v1/places/${groupId}/stats/Revenue?granularity=Hourly`, {
        headers: {
            cookie: `.ROBLOSECURITY=${cookie}`
        }
    })
        .then(result => result.json())
        .then(json => {
            console.log(json)

            return res.json({
                pending: json.data.Total.data
            })
        });
})

app.listen(process.env.PORT || 3030)
