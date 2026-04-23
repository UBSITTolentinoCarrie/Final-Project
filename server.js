require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// ---- MODELS ----
const Product = mongoose.model('product', new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    category: String,
    tag: String,
    image: String
}));

const Cart = mongoose.model('cart', new mongoose.Schema({
    productId: String,
    productName: String,
    productImage: String,
    price: Number,
    quantity: Number
}));

const Order = mongoose.model('order', new mongoose.Schema({
    items: Array,
    totalAmount: Number,
    status: String,
    shippingAddress: Object,
    createdAt: String
}));

// ---- PRODUCT ROUTES ----
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

app.post('/api/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
});

app.put('/api/products/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(product);
});

app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: 'Product deleted successfully' });
});

// ---- CART ROUTES ----
app.get('/api/cart', async (req, res) => {
    const cart = await Cart.find();
    res.send(cart);
});

app.post('/api/cart', async (req, res) => {
    const item = new Cart(req.body);
    await item.save();
    res.status(201).send(item);
});

app.put('/api/cart/:id', async (req, res) => {
    const item = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(item);
});

app.delete('/api/cart/:id', async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.send({ message: 'Item removed from cart' });
});

// ---- ORDER ROUTES ----
app.get('/api/orders', async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
});

app.post('/api/orders', async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
});