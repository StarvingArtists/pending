const express = require("express")
const fetch = require("node-fetch")
const app = express()

require('dotenv').config()

const cookie = process.env.COOKIE
const groupId = process.env.GROUP

app.get("/users/:userId", async (req, res) => {
    fetch(`https://firestore.googleapis.com/v1beta1/projects/starving-artists/databases/(default)/documents/users/${req.params.userId}`)
        .then(result => result.json())
        .then(json => {
            return res.json({
                art: json
            })
        });
})
console.log("hi");
app.get("/art/:artId", async (req, res) => {
    console.log("ay");
    console.log(req.params.artId);
    fetch(`https://firestore.googleapis.com/v1beta1/projects/starving-artists/databases/(default)/documents:runQuery`, {
        "body": {
            "structuredQuery": {
                "where": {
                    "fieldFilter": { 
                        "field": {
                            "fieldPath": "artIds"
                        },
                        "op": "ARRAY_CONTAINS", 
                        "value": {
                            "stringValue": req.params.artId
                        }
                    }
                },
                "from": [
                    {
                        "collectionId": "users"
                    }
                ]
            }
        },
        headers: {
    "Content-Type": "application/json"
  },
  method: "post"
          })
        .then(result => result.json())
        .then(json => {
            return res.json({
                art: json
            })
        });
})

app.listen(process.env.PORT || 3030)
