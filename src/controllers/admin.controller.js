import College from '../models/college.model.js';

export const createCollege = async (req, res, next) => {
    try {
        const college = new College(req.body);
        await college.save();
        res.json({ success: true, message: 'College added successfully', data: college });
    } catch (error) {
        next(error);
    }
};

export const updateCollege = async (req, res, next) => {
    try {
        const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!college) return res.status(404).json({ success: false, message: 'College not found' });
        res.json({ success: true, message: 'College updated successfully', data: college });
    } catch (error) {
        next(error);
    }
};

export const deleteCollege = async (req, res, next) => {
    try {
        const college = await College.findByIdAndDelete(req.params.id);
        if (!college) return res.status(404).json({ success: false, message: 'College not found' });
        res.json({ success: true, message: 'College deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const searchColleges = async (req, res, next) => {
    try {
        const { q } = req.query;
        const colleges = await College.find({
            $or: [
                { 'College Name': { $regex: q, $options: 'i' } },
                { 'College Code': { $regex: q, $options: 'i' } },
                { 'District': { $regex: q, $options: 'i' } }
            ]
        }).limit(10);
        res.json({ success: true, data: colleges });
    } catch (error) {
        next(error);
    }
};
