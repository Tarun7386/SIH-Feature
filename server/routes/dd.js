const express = require('express');
const router = express.Router();
const { KeyValue } = require('../db/dropdownschema.js');

// Route to get all keys
router.get('/keys', async (req, res) => {
  try {
    const keys = await KeyValue.find().select('key');
    res.json(keys);
  } catch (error) {
    console.error('Error fetching keys:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get value by key
router.get('/value/:key', async (req, res) => {
    const { key } = req.params;
    console.log(`Fetching value for key: '${key}'`); 
    
    try {
     
    const entry = await KeyValue.findOne({ key: key });

      
      if (entry) {
        console.log('Entry found:', entry); 
        res.json({ value: entry.value });
      } else {
        res.status(404).json({ error: 'Key not found' });
      }
    } catch (error) {
      console.error('Error fetching value:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
