const mongoose = require('mongoose');
const orderItemSchema = new mongoose.Schema({
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true, min: 1 },
}, { _id: false });

const orderSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'placed', 'completed', 'cancelled'], default: 'placed' },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;