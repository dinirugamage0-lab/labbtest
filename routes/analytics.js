const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const router = express.Router();

async function calculateTotalPrice(items) {
    let total = 0;
    for (const item of items) {
        const menuItem = await  MenuItem.findById(item.menuItem);   
        if (!menuItem) {
            throw new Error(`Menu item not found: ${item.menuItem}`);
        }   
        total += menuItem.price * item.quantity;
    }   
    return total;
}   
router.post('/', async (req, res) => {
try {const { student, items } = req.body;
if (!student || !items || !Array.isArray(items) || items.length === 0) {
return res.status(400).json({ error: 'Student and items are required' });
}
const totalPrice = await calculateTotalPrice(items);
const order = new Order({ student, items, totalPrice });
const saved = await order.save();
res.status(201).json(saved);
}
catch (err) {
console.error('Error creating order:', err.message);
res.status(400).json({ error: err.message });
}   
});
router.get('/', async (req, res) => {
try {   
const orders = await Order.find().populate('student').populate('items.menuItem');
res.json(orders);
}catch (err) {
console.error('Error fetching orders:', err.message);
res.status(500).json({ error: 'Server error' });
}   
});
router.get('/:id', async (req, res) => {
try {const order = await Order.findById(req.params.id).populate('student').populate('items.menuItem');
if (!order) {
return res.status(404).json({ error: 'Order not found' });
}   
res.json(order);
}
catch (err) {   
console.error('Error fetching order:', err.message);
res.status(400).json({ error: 'Invalid order ID' });
}   
});
router.patch('/:id/status', async (req, res) => {
try {const { status } = req.body;
if (!['pending', 'placed', 'completed', 'cancelled'].includes(status)) {
return res.status(400).json({ error: 'Invalid status value' });
}   
const order = await Order.findById(req.params.id);
if (!order) {
return res.status(404).json({ error: 'Order not found' });
}
order.status = status;
const updated = await order.save();
res.json(updated);
}catch (err) {
console.error('Error updating order status:', err.message);
res.status(400).json({ error: err.message });
}
});
router.delete('/:id', async (req, res) => {
try {const order = await Order.findByIdAndDelete(req.params.id);
if (!order) {
return res.status(404).json({ error: 'Order not found' });
}
res.json({ message: 'Order deleted successfully' });
}catch (err) {
console.error('Error deleting order:', err.message);
res.status(400).json({ error: 'Invalid order ID' });
}   
});
module.exports = router;