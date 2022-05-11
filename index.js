const express = require("express")
const fetch = require("node-fetch")
const app = express()

require('dotenv').config()

const cookie = process.env.COOKIE
const groupId = process.env.GROUP

app.get("/users/:userId", async (req, res) => {
    fetch(`https://firestore.googleapis.com/v1beta1/projects/starving-artists/databases/(default)/documents/${req.params.userId}`, {
        
    })
        .then(result => result.json())
        .then(json => {
            console.log(json)

            return res.json({
                pending: json
            })
        });
})

app.listen(process.env.PORT || 3030)
