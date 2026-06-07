import express from 'express';
import { getColleges, getFilters, getCollegeDetails } from '../controllers/college.controller.js';

const router = express.Router();

router.get('/', getColleges);
router.get('/filters', getFilters);
router.get('/:code/details', getCollegeDetails);

export default router;