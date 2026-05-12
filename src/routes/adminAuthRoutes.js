<<<<<<< HEAD
const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'purush' && password === 'purush2006') {
        return res.json({ success: true, message: 'Admin login successful' });
    }

    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

=======
/*this keeps your server.js file from becoming lengthy. 
Instead of cramming all API endpoints into one file, 
they are neatly organized into separate route files. */

const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'purush' && password === 'purush2006') {
        return res.json({ success: true, message: 'Admin login successful' });
    }

    return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

>>>>>>> cf4589a (Remove duplicated files)
module.exports = router;