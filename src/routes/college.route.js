import express from 'express';
import { getColleges, getFilters } from '../controllers/college.controller.js';

const router = express.Router();

router.get('/', getColleges);
router.get('/filters', getFilters);

export default router;