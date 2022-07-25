const express = require('express');
const path = require ('path');
const app = express();

app.set('views', path.join('__dirname', 'views'));
app.set('view engine', 'ejs')

const mongoose = require('mongoose');
const { allowedNodeEnvironmentFlags } = require('process');
mongoose.connect('mongodb://localhost:27017/movieApp')
.then(console.log("mongoose connected!"))
.catch(error => console.error(error));

app.get('/dog', (req, res) => {
    res.send("WOOF!")
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000");
})