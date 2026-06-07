import 'dotenv/config';
import connectDatabase from './db/database.js';
import app from './app.js';

// Connect to Database
connectDatabase();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
