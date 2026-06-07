import College from '../models/college.model.js';

export const getColleges = async (req, res, next) => {
    try {
        const {
            search,
            course,
            district,
            courseType,
            page = 1,
            limit = 20
        } = req.query;

        const filter = {};
        
        if (district && district !== 'All') {
            filter['District'] = district;
        }
        
        if (course && course !== 'All') {
            filter['Course Name'] = course;
        }
        
        if (courseType && courseType !== 'All') {
            filter['Course Type'] = courseType;
        }
        
        if (search && search.trim()) {
            filter.$or = [
                { 'College Name': { $regex: search, $options: 'i' } },
                { 'District': { $regex: search, $options: 'i' } },
                { 'Course Name': { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;
        
        const colleges = await College.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        const total = await College.countDocuments(filter);

        res.json({
            success: true,
            data: colleges,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total: total
            }
        });

    } catch (error) {
        next(error);
    }
};

export const getFilters = async (req, res, next) => {
    try {
        const districts = await College.distinct('District');
        const courseNames = await College.distinct('Course Name');
        const courseTypes = await College.distinct('Course Type');
        
        res.json({
            success: true,
            data: {
                districts: districts.filter(d => d && d !== '' && d !== null).sort(),
                courseNames: courseNames.filter(c => c && c !== '' && c !== null).sort(),
                courseTypes: courseTypes.filter(t => t && t !== '' && t !== null).sort()
            }
        });
    } catch (error) {
        next(error);
    }
};
