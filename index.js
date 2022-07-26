const express = require('express');
const path = require ('path');
const app = express();
const Product = require('./models/Product');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));

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

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const products = await Product.findByIdAndDelete(id)
    res.redirect(`/products`)
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000");
})

