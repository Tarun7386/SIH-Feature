const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;
const path=require('path');

const ddRouter=require('./routes/dd');
app.use(cors());
app.use(express.json());
console.log(path.join(__dirname))
app.use("/dd", ddRouter)
console.log(path.join(__dirname))
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/DropDown" , {
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); 
  });
  app.get('/', (req, res) => {
    res.send('Welcome to the home page!');
  });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
