// server.js
// TODO: Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const dns = require('dns');
dns.setServers(['8.8.8.8']);
const mongoose = require('mongoose');
const cors = require('cors');

const student = require('./routes/students.js');
const menu = require('./routes/menuItems.js');
const order = require('./routes/orders.js');
const analytics = require('./routes/analytics.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Welcome to the Campus Food API');
}
);

// Routes
app.use('/api/students', student);
app.use('/api/menu', menu);
app.use('/api/orders', order);
app.use('/api/analytics', analytics);   

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}   );


