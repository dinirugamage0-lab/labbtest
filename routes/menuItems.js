const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();
// POST /menu-items – create menu item
router.post('/', async (req, res) => {
try {const menuItem = new MenuItem(req.body);
const saved = await menuItem.save();
res.status(201).json(saved);
} catch (err) {
console.error('Error creating menu item:', err.message);
res.status(400).json({ error: err.message });
}   
});
// GET /menu-items – list all menu items
router.get('/', async (req, res) => {
try {
const menuItems = await MenuItem.find();            
res.json(menuItems);
} catch (err) {
console.error('Error fetching menu items:', err.message);
res.status(500).json({ error: 'Server error' });
}
});
router.get('/search', async (req, res) => {
try {const { name, category } = req.query;
const filter = {};
if (name) {
filter.name = new RegExp(name, 'i'); // case-insensitive search
}
if (category) {
filter.category = category;
}
const menuItems = await MenuItem.find(filter);
res.json(menuItems);
} catch (err) {
console.error('Error searching menu items:', err.message);
res.status(500).json({ error: 'Server error' });
}       
});
module.exports = router;