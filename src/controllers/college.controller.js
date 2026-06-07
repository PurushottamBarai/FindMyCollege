import College from '../models/college.model.js';

export const getColleges = async (req, res, next) => {
    try {
        const {
            search,
            course,
            district,
            courseType,
            status,
            page = 1,
            limit = 20
        } = req.query;

        const filter = {};
        
        if (district && district !== 'All') {
            filter['District'] = district;
        }
        
        if (course && course !== 'All') {
            if (course === 'Engineering / Technology (B.E / B.Tech)') {
                filter['Course Name'] = { $regex: /Engineering|B\.Tech|B\.E|Technology/i };
            } else if (course === 'Pharmacy (B.Pharm / Pharm.D)') {
                filter['Course Name'] = { $regex: /Pharmacy|B\.Pharm|Pharm\.D/i };
            } else if (course === 'Architecture (B.Arch)') {
                filter['Course Name'] = { $regex: /Architecture|B\.Arch/i };
            } else if (course === 'Planning (B.Plan)') {
                filter['Course Name'] = { $regex: /Planning|B\.Plan/i };
            } else if (course === 'Design (B.Des)') {
                filter['Course Name'] = { $regex: /Design|B\.Des/i };
            } else if (course === 'Management (BBA / BMS / BBM)') {
                filter['Course Name'] = { $regex: /Management|BBA|BMS|BBM/i };
            } else if (course === 'Computer Applications (BCA / MCA Integrated)') {
                filter['Course Name'] = { $regex: /Computer|BCA/i };
            } else if (course === 'Hotel Management (BHMCT)') {
                filter['Course Name'] = { $regex: /Hotel|BHMCT/i };
            } else if (course === 'Agriculture & Allied Sciences (B.Sc Agriculture, Forestry, Horticulture)') {
                filter['Course Name'] = { $regex: /Agriculture|Forestry|Horticulture|B\.Sc\s*Agri/i };
            } else if (course === 'Fisheries / Food Technology') {
                filter['Course Name'] = { $regex: /Fisheries|Food\s*Tech/i };
            } else if (course === 'Education (B.Ed / B.P.Ed / Integrated B.Ed courses)') {
                filter['Course Name'] = { $regex: /Education|B\.Ed|B\.P\.Ed/i };
            } else if (course === 'Law (LLB 3-year / 5-year Integrated)') {
                filter['Course Name'] = { $regex: /Law|LLB/i };
            } else if (course === 'Fine Arts (BFA)') {
                filter['Course Name'] = { $regex: /Fine\s*Arts|BFA/i };
            } else if (course === 'Medical / Allied Health UG (Nursing, Ayurveda, Homeopathy, etc.)') {
                filter['Course Name'] = { $regex: /Medical|Nursing|Ayurveda|Homeopathy/i };
            } else if (course === 'Direct Second Year Engineering (DSE)') {
                filter['Course Name'] = { $regex: /Direct\s*Second\s*Year\s*Engineering|DSE/i };
            } else if (course === 'Direct Second Year Pharmacy (DSP)') {
                filter['Course Name'] = { $regex: /Direct\s*Second\s*Year\s*Pharmacy|DSP/i };
            } else if (course === 'MBA / MMS') {
                filter['Course Name'] = { $regex: /MBA|MMS/i };
            } else if (course === 'MCA') {
                filter['Course Name'] = { $regex: /^MCA$/i };
            } else if (course === 'M.E / M.Tech') {
                filter['Course Name'] = { $regex: /M\.E|M\.Tech/i };
            } else if (course === 'M.Pharm') {
                filter['Course Name'] = { $regex: /M\.Pharm/i };
            } else if (course === 'M.Arch') {
                filter['Course Name'] = { $regex: /M\.Arch/i };
            } else if (course === 'M.Plan') {
                filter['Course Name'] = { $regex: /M\.Plan/i };
            } else if (course === 'MHMCT (Hotel Management PG)') {
                filter['Course Name'] = { $regex: /MHMCT/i };
            } else if (course === 'M.Ed / M.P.Ed') {
                filter['Course Name'] = { $regex: /M\.Ed|M\.P\.Ed/i };
            } else if (course === 'LLM (Law PG)') {
                filter['Course Name'] = { $regex: /LLM/i };
            } else if (course === 'Agriculture PG (M.Sc Agriculture, etc.)') {
                filter['Course Name'] = { $regex: /Agriculture\s*PG|M\.Sc\s*Agri/i };
            } else if (course === 'Nursing PG (M.Sc Nursing)') {
                filter['Course Name'] = { $regex: /Nursing\s*PG|M\.Sc\s*Nursing/i };
            } else if (course === 'Medical / Allied Health PG') {
                filter['Course Name'] = { $regex: /Medical.*PG|Allied.*PG/i };
            } else {
                filter['Course Name'] = course;
            }
        }
        
        if (courseType && courseType !== 'All') {
            filter['Course Type'] = courseType;
        }

        if (status && status !== 'All') {
            if (status === 'Government') {
                filter['Status'] = { $regex: /^Government(,\s*Autonomous)?$/i };
            } else if (status === 'Government Aided') {
                filter['Status'] = { $regex: /Government-Aided/i };
            } else if (status === 'Government Autonomous') {
                filter['Status'] = { $regex: /Government, Autonomous/i };
            } else if (status === 'Private Unaided') {
                filter['Status'] = { $regex: /^Un-Aided$/i };
            } else if (status === 'Private Autonomous') {
                filter['Status'] = { $regex: /Un-Aided, Autonomous/i };
            } else if (status === 'Minority Aided') {
                filter['Status'] = { $regex: /Minority.*Aided|Aided.*Minority|Government-Aided.*Minority/i };
            } else if (status === 'Minority Unaided') {
                filter['Status'] = { $regex: /Minority.*Un-?Aided|Un-?Aided.*Minority/i };
            } else if (status === 'University Departments / University Institutes') {
                filter['Status'] = { $regex: /University|Deemed/i };
            }
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
        
        res.json({
            success: true,
            data: {
                districts: districts.filter(d => d && d !== '' && d !== null).sort(),
                courseTypes: ["Under Graduate", "Post Graduate"],
                ugCourses: [
                    "Engineering / Technology (B.E / B.Tech)",
                    "Pharmacy (B.Pharm / Pharm.D)",
                    "Architecture (B.Arch)",
                    "Planning (B.Plan)",
                    "Design (B.Des)",
                    "Management (BBA / BMS / BBM)",
                    "Computer Applications (BCA / MCA Integrated)",
                    "Hotel Management (BHMCT)",
                    "Agriculture & Allied Sciences (B.Sc Agriculture, Forestry, Horticulture)",
                    "Fisheries / Food Technology",
                    "Education (B.Ed / B.P.Ed / Integrated B.Ed courses)",
                    "Law (LLB 3-year / 5-year Integrated)",
                    "Fine Arts (BFA)",
                    "Medical / Allied Health UG (Nursing, Ayurveda, Homeopathy, etc.)",
                    "Direct Second Year Engineering (DSE)",
                    "Direct Second Year Pharmacy (DSP)"
                ],
                pgCourses: [
                    "MBA / MMS",
                    "MCA",
                    "M.E / M.Tech",
                    "M.Pharm",
                    "M.Arch",
                    "M.Plan",
                    "MHMCT (Hotel Management PG)",
                    "M.Ed / M.P.Ed",
                    "LLM (Law PG)",
                    "Agriculture PG (M.Sc Agriculture, etc.)",
                    "Nursing PG (M.Sc Nursing)",
                    "Medical / Allied Health PG"
                ],
                statuses: [
                    "Government",
                    "Government Aided",
                    "Government Autonomous",
                    "Private Unaided",
                    "Private Autonomous",
                    "Minority Aided",
                    "Minority Unaided",
                    "University Departments / University Institutes"
                ]
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getCollegeDetails = async (req, res, next) => {
    try {
        const { code } = req.params;
        const college = await College.findOne({ "College Code": code }).lean();
        
        if (!college) {
            return res.status(404).json({ success: false, message: 'College not found' });
        }
        
        res.json({
            success: true,
            data: {
                Address: college.Address || college.Location || 'CET Cell Maharashtra',
                Region: college.Region || 'Maharashtra',
                District: college.District || 'N/A',
                Status: college.Status || 'N/A',
                Email: college.Email || `info@college-${code}.edu.in`,
                Website: college.Website || `www.college-${code}.edu.in`,
                Registrar: college.Registrar || 'Registrar Office'
            }
        });
    } catch (error) {
        next(error);
    }
};
