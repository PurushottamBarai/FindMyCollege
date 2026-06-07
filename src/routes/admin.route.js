import express from 'express';
import { createCollege, updateCollege, deleteCollege, searchColleges } from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/colleges', createCollege);
router.put('/colleges/:id', updateCollege);
router.delete('/colleges/:id', deleteCollege);
router.get('/colleges/search', searchColleges);

export default router;