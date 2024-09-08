const express = require('express');
const router = express.Router();
const { CategoryCollection } = require('../db/dropdownschema.js');


router.get('/categories', async (req, res) => {
  try {
    const categories = await CategoryCollection.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
});

router.get('/values/:key', async (req, res) => {
  try {
    const key = req.params.key;
    const category = await CategoryCollection.findOne({ key });
    if (category) {
      res.json(category.values);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching values', error });
  }
});
  router.post('/submit', (req, res) => {
    const { selectedValue } = req.body;
    console.log('Submitted value:', selectedValue);
    
    res.send('Value received');
  });
module.exports = router;
