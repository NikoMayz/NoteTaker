const express = require('express');
const path = require('path');

const router = express.Router();

//Landing Page Route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public.index.html'));
});

// Notes Page Route
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
  
  module.exports = router;