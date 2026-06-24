import React, { useState, useEffect } from 'react';
import { Search, MapPin, Landmark, ArrowLeft, ArrowRight, Award, Compass, AlertCircle } from 'lucide-react';
import { fetchColleges, fetchFilters } from '../services/api';
import CollegeDetailsModal from '../components/CollegeDetailsModal';

export default function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInputValue, setPageInputValue] = useState('1');
  
  // Filters State
  const [filterOptions, setFilterOptions] = useState({
    districts: [],
    courseTypes: ["Under Graduate", "Post Graduate"],
    ugCourses: [],
    pgCourses: [],
    statuses: []
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseType, setSelectedCourseType] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  
  // Dynamic course list based on course type
  const [coursesList, setCoursesList] = useState([]);

  // Selected College Code for details modal
  const [selectedCollegeCode, setSelectedCollegeCode] = useState(null);

  // Load filter options on mount
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await fetchFilters();
        if (res.success && res.data) {
          setFilterOptions(res.data);
          // Set initial courses
          const ug = res.data.ugCourses || [];
          const pg = res.data.pgCourses || [];
          setCoursesList([...ug, ...pg]);
        }
      } catch (err) {
        console.error('Error loading filters:', err);
      }
    };
    loadFilters();
  }, []);

  // Update course dropdown options when selectedCourseType changes
  useEffect(() => {
    setSelectedCourse('All');
    if (selectedCourseType === 'Under Graduate') {
      setCoursesList(filterOptions.ugCourses || []);
    } else if (selectedCourseType === 'Post Graduate') {
      setCoursesList(filterOptions.pgCourses || []);
    } else {
      const ug = filterOptions.ugCourses || [];
      const pg = filterOptions.pgCourses || [];
      setCoursesList([...ug, ...pg]);
    }
  }, [selectedCourseType, filterOptions]);

  // Perform search query
  const performSearch = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 30, // Updated page limit
      };
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (selectedCourse !== 'All') params.course = selectedCourse;
      if (selectedDistrict !== 'All') params.district = selectedDistrict;
      if (selectedCourseType !== 'All') params.courseType = selectedCourseType;
      if (selectedStatus !== 'All') params.status = selectedStatus;

      const res = await fetchColleges(params);
      if (res.success) {
        setColleges(res.data);
        setPagination(res.pagination);
        setCurrentPage(res.pagination.current);
        setPageInputValue(res.pagination.current.toString());
      } else {
        alert('Error fetching colleges');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(1);
  };

  // Pagination navigations
  const handlePrevPage = () => {
    if (currentPage > 1) {
      performSearch(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagination.pages) {
      performSearch(currentPage + 1);
    }
  };

  // Page Jump handling
  const handlePageJump = () => {
    let target = parseInt(pageInputValue, 10);
    const maxPages = pagination.pages > 0 ? pagination.pages : 1;
    
    if (isNaN(target) || target < 1) {
      target = 1;
    } else if (target > maxPages) {
      target = maxPages;
    }

    setPageInputValue(target.toString());
    if (target !== currentPage) {
      performSearch(target);
    }
  };

  const handlePageInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handlePageJump();
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Search Header */}
      <section className="bg-white border-b border-slate-200 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearchSubmit} className="space-y-6">
            
            {/* Search Input Box */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search colleges by name, district, or course..."
                className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-2xl shadow-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15 transition-all text-base font-medium"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Course Type */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Type</label>
                <select
                  value={selectedCourseType}
                  onChange={(e) => setSelectedCourseType(e.target.value)}
                  className="px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-700 text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15 transition-all"
                >
                  <option value="All">All Course Types</option>
                  {filterOptions.courseTypes.map((type, i) => (
                    <option key={i} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Course */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Name</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-700 text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15 transition-all max-w-full truncate"
                >
                  <option value="All">All Courses</option>
                  {coursesList.map((course, i) => (
                    <option key={i} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-700 text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15 transition-all"
                >
                  <option value="All">All Districts</option>
                  {filterOptions.districts.map((dist, i) => (
                    <option key={i} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-700 text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15 transition-all"
                >
                  <option value="All">All Statuses</option>
                  {filterOptions.statuses.map((status, i) => (
                    <option key={i} value={status}>{status}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Search Trigger Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="px-8 py-3 bg-brand-dark hover:bg-brand-navy text-white font-bold rounded-xl shadow-md hover:shadow-indigo-500/10 transition-all hover:-translate-y-0.5"
              >
                Search Directory
              </button>
            </div>

          </form>
        </div>
      </section>

      {/* Results Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-accent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Querying Maharashtra Colleges Database...</p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Info / Count Bar */}
            {pagination.total > 0 && (
              <div className="flex items-center gap-1.5 text-slate-500 text-sm font-semibold">
                <Compass size={16} className="text-brand-accent animate-spin-slow" />
                Found <span className="text-slate-800 font-bold">{pagination.total.toLocaleString()}</span> colleges
              </div>
            )}

            {colleges.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm space-y-3">
                <AlertCircle className="mx-auto text-slate-400" size={44} />
                <h3 className="text-lg font-bold text-slate-800">No Colleges Found</h3>
                <p className="text-slate-500 max-w-sm mx-auto text-sm">
                  Adjust your search keyword or set filters to discover available institutions.
                </p>
              </div>
            ) : (
              <>
                {/* Responsive College Table */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm text-slate-600">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-800 uppercase font-bold text-[11px] tracking-wider">
                        <th className="px-6 py-4">SR. NO.</th>
                        <th className="px-6 py-4">COLLEGE CODE</th>
                        <th className="px-6 py-4">DISTRICT</th>
                        <th className="px-6 py-4">COLLEGE NAME</th>
                        <th className="px-6 py-4">STATUS</th>
                        <th className="px-6 py-4">TOTAL INTAKE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {colleges.map((college, index) => (
                        <tr key={college._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">{college.SrNo || 'N/A'}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setSelectedCollegeCode(college['College Code'])}
                              className="text-brand-accent hover:text-brand-purple font-bold underline transition-colors focus:outline-none"
                            >
                              {college['College Code'] || 'N/A'}
                            </button>
                          </td>
                          <td className="px-6 py-4 flex items-center gap-1.5 mt-2.5">
                            <MapPin size={14} className="text-slate-400" />
                            {college['District'] || 'N/A'}
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-800 max-w-md break-words">
                            {college['College Name'] || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-light text-brand-accent">
                              {college['Status'] || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold">{college['Total Intake'] !== null ? college['Total Intake'] : 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8">
                    
                    {/* Previous Button */}
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage <= 1}
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-semibold text-slate-600 focus:outline-none"
                    >
                      <ArrowLeft size={16} /> Previous
                    </button>

                    {/* Page Jump Input */}
                    <div className="flex items-center gap-1 px-4 py-2 bg-slate-200/50 rounded-xl text-slate-600 text-sm font-semibold">
                      Page 
                      <input
                        type="number"
                        value={pageInputValue}
                        onChange={(e) => setPageInputValue(e.target.value)}
                        onBlur={handlePageJump}
                        onKeyDown={handlePageInputKeyDown}
                        className="w-14 mx-1.5 py-1 border border-slate-300 rounded-lg text-center font-bold text-slate-800 focus:outline-none focus:border-brand-accent bg-white transition-all"
                        min="1"
                        max={pagination.pages}
                      />
                      of <span className="text-slate-800 font-bold ml-1">{pagination.pages}</span>
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage >= pagination.pages}
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-semibold text-slate-600 focus:outline-none"
                    >
                      Next <ArrowRight size={16} />
                    </button>

                  </div>
                )}
              </>
            )}

          </div>
        )}

      </div>

      {/* College Details Popup Modal */}
      {selectedCollegeCode && (
        <CollegeDetailsModal
          code={selectedCollegeCode}
          onClose={() => setSelectedCollegeCode(null)}
        />
      )}

    </div>
  );
}
