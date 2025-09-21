const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDatabase = require('./config/database');
const collegeRoutes = require('./routes/collegeRoutes');

const app = express();

// Connect to database
connectDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/colleges', collegeRoutes);

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});