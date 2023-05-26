const express = require("express");
const axios = require('axios')
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.json())

let authors = [
    { id: 1, name: "author 1" },
    { id: 2, name: "author 2" },
    { id: 3, name: "author 3" },
    { id: 4, name: "author 4" },
]

app.get('/authors', async (req, res) => {
    res.json(authors)
})

app.get('/authors/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const author = authors.find(author => author.id === id)

    if (author) {
        res.json(author)
    } else {
        res.status(404).json({ error: "not found" })
    }
})

app.listen(4000, () => {
    console.log(`Server running at 4000`)
})