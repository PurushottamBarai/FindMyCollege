import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import collegeRoutes from './routes/college.route.js';
import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import adminAuthRoutes from './routes/adminAuth.route.js';
import { requireAdmin } from './middlewares/auth.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serving static files from root public folder (one level up from /src)
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/colleges', collegeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/auth', adminAuthRoutes);

app.use('/api/admin', requireAdmin, adminRoutes);

// Serves the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Global Error Handler
app.use(errorHandler);

export default app;
