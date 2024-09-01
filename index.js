const express = require('express');
const path = require('path');
const app = express();

let db = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/create', (req, res) => {
    const { title, description, img } = req.body;

    if (!title || !description || !img) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const data = {
        id: Date.now(),
        title,
        description,
        img
    };

    db.push(data);
    res.redirect('/');
});

app.get('/news', (req, res) => {
    res.status(200).json(db);
});

app.listen(8090, () => {
    console.log(`Server listening on port http://localhost:8090`);
});