require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

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
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        res.status(500).send({ message: 'Failed to fetch products' });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (err) {
        res.status(500).send({ message: 'Failed to save product' });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(product);
    } catch (err) {
        res.status(500).send({ message: 'Failed to update product' });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Failed to delete product' });
    }
});

// ---- CART ROUTES ----
app.get('/api/cart', async (req, res) => {
    try {
        const cart = await Cart.find();
        res.send(cart);
    } catch (err) {
        res.status(500).send({ message: 'Failed to fetch cart' });
    }
});

app.post('/api/cart', async (req, res) => {
    try {
        const item = new Cart(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (err) {
        res.status(500).send({ message: 'Failed to add to cart' });
    }
});

app.put('/api/cart/:id', async (req, res) => {
    try {
        const item = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(item);
    } catch (err) {
        res.status(500).send({ message: 'Failed to update cart item' });
    }
});

app.delete('/api/cart/:id', async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.send({ message: 'Item removed from cart' });
    } catch (err) {
        res.status(500).send({ message: 'Failed to remove cart item' });
    }
});

// ---- ORDER ROUTES ----
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.send(orders);
    } catch (err) {
        res.status(500).send({ message: 'Failed to fetch orders' });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
    } catch (err) {
        res.status(500).send({ message: 'Failed to place order' });
    }
});