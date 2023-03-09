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
            id: uuidv4(),
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

notes.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
    })
})

notes.get('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            return result.length > 0
            ? res.json(result)
            : res.json('No note with that ID')
        })
})

module.exports = notes