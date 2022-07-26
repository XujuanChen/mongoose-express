const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/farmStand')
.then(console.log("mongoose connected!"))
.catch(error => console.error(error));

const p = new Product ({
    name: 'Grapefruit',
    price: 1,
    category: 'fruit'
})

p.save();
