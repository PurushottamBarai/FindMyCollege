const College = require('../models/College');

exports.getColleges = async (req, res) => {
    try {
        const {
            course,
            district,
            courseType,
            search,
            page = 1,
            limit = 20
        } = req.query;

        const filter = {};
        
        if (course && course !== 'All') {
            filter.courseName = course;
        }
        
        if (district && district !== 'All') {
            filter.district = district;
        }
        
        if (courseType && courseType !== 'All') {
            filter.courseType = courseType;
        }
        
        if (search) {
            filter.$or = [
                { collegeName: { $regex: search, $options: 'i' } },
                { district: { $regex: search, $options: 'i' } },
                { courseName: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;
        
        const colleges = await College.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ srNo: 1 });
            
        const total = await College.countDocuments(filter);
        
        res.json({
            success: true,
            data: colleges,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

exports.getFilterOptions = async (req, res) => {
    try {
        const [courses, districts, courseTypes] = await Promise.all([
            College.distinct('courseName'),
            College.distinct('district'),
            College.distinct('courseType')
        ]);
        
        res.json({
            success: true,
            data: {
                courses: courses.sort(),
                districts: districts.sort(),
                courseTypes: courseTypes.sort()
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

exports.getCollegeById = async (req, res) => {
    try {
        const college = await College.findById(req.params.id);
        
        if (!college) {
            return res.status(404).json({
                success: false,
                message: 'College not found'
            });
        }
        
        res.json({
            success: true,
            data: college
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};