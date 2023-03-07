const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid')
const { readAndAppend, readFromFile, writeToFile } = require('../helper/fsUtils')

notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

notes.post('/notes', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
        const newNotes = {
            title,
            text,
            note_id: uuidv4(),
        };

        readAndAppend(newNotes, './db/db.json');

        const response = {
            status: 'success',
            body: newNotes,
        };

        res.json(response);
    } else {
        res.json('Error in displaying note');
    }
})

module.exports = notes