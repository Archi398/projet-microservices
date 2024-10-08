const express = require("express");
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

let books = [
    { id: 1, tittle: "book 1", authorId: 1, categoryId: 1 },
    { id: 2, tittle: "book 2", authorId: 2, categoryId: 2 },
    { id: 3, tittle: "book 3", authorId: 3, categoryId: 3 },
    { id: 4, tittle: "book 4", authorId: 4, categoryId: 4 },
]

app.get('/books', async (req, res) => {
    res.json(books)
})

app.get('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const book = books.find(book => book.id === id)
    if (book) {
        try {
            const authorResponse = await axios.get(`http://localhost:4000/authors/${book.authorId}`)
            const categoryResponse = await axios.get(`http://localhost:5000/categories/${book.categoryId}`)
            const author = authorResponse.data
            const category = categoryResponse.data

            bookDetails = {
                id: book.id,
                tittle: book.tittle,
                author: author.name,
                category: category.name
            }

            res.json(bookDetails)

        } catch (error) {
            res.status(500).json({ error: "dsfsd" })
        }
    } else {
        res.status(500).json({ error: "dsfffffsd" })
    }
})

app.listen(3000, () => {
    console.log(`Server running at 300`)

})