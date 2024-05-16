const { randomUUID } = require('crypto');
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Read notes from db.json
router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes from database.' });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

// Save a new note to db.json
router.post('/notes', (req, res) => {
  const newNote = req.body;
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes from database.' });
    }
    const notes = JSON.parse(data);
    newNote.id = randomUUID();
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to save note to database.' });
      }
      res.json(newNote);
    });
  });
});

// Delete a note by ID
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to read notes from database.' });
      }
      let notes = JSON.parse(data);
      notes = notes.filter(note => note.id !== noteId);
      fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2), err => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to delete note from database.' });
        }
        res.status(204).send(); // No content
      });
    });
  });
  

module.exports = router;
