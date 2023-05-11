const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

let books = [];
let idCounter = 1;

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const { title, author, publishedDate } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }

    const newBook = {
        id: idCounter++,
        title,
        author,
        publishedDate
    };

    books.push(newBook);
    res.json(newBook);
});

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === bookId);

    if (index === -1) {
        res.status(404).json({ message: 'Book not found' });
    } else {
        books.splice(index, 1);
        res.json({ message: `Book with ID ${bookId} was successfully deleted` });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});