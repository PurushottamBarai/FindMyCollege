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
        }).limit(10).lean();

        const getSrNo = (c) => {
            if (c.SrNo !== undefined && c.SrNo !== null) return c.SrNo;
            if (c["Sr. No."] !== undefined && c["Sr. No."] !== null) return c["Sr. No."];
            if (c.Sr) {
                const spaceNo = c.Sr[" No"] || c.Sr["No"];
                if (spaceNo !== undefined && spaceNo !== null) {
                    if (typeof spaceNo === 'object') {
                        const nestedVal = spaceNo[""] || Object.values(spaceNo)[0];
                        if (nestedVal !== undefined && nestedVal !== null) return nestedVal;
                    }
                    return spaceNo;
                }
                if (c.Sr.No !== undefined && c.Sr.No !== null) {
                    if (typeof c.Sr.No === 'object') {
                        const nestedVal = c.Sr.No[""] || Object.values(c.Sr.No)[0];
                        if (nestedVal !== undefined && nestedVal !== null) return nestedVal;
                    }
                    return c.Sr.No;
                }
                for (const key of Object.keys(c.Sr)) {
                    const val = c.Sr[key];
                    if (val !== undefined && val !== null) {
                        if (typeof val === 'object') {
                            const nestedVal = val[""] || Object.values(val)[0];
                            if (nestedVal !== undefined && nestedVal !== null) return nestedVal;
                        }
                        return val;
                    }
                }
            }
            return null;
        };

        const mappedColleges = colleges.map(c => ({
            ...c,
            SrNo: getSrNo(c)
        }));

        res.json({ success: true, data: mappedColleges });
    } catch (error) {
        next(error);
    }
};
