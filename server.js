const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDatabase = require('./config/database');
const collegeRoutes = require('./routes/collegeRoutes');

const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/colleges', collegeRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});