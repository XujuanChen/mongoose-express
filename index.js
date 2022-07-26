const express = require('express');
const path = require ('path');
const app = express();
const Product = require('./models/Product');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand')
.then(console.log("mongoose connected!"))
.catch(error => console.error(error));

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    // console.log(products);
    // res.send("PRODUCT PAGE")
    res.render('products/index', { products });
})

app.get('/products/new', (req, res) => {
    res.render('products/new');
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product })
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000");
})

