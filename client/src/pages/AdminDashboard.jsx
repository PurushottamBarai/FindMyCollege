import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { adminCreateCollege, adminUpdateCollege, adminDeleteCollege, adminSearchColleges } from '../services/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('add');
  const navigate = useNavigate();

  // Route security guard
  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin-portal-secure-login');
    }
  }, [navigate]);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              Admin Directory Control
            </h1>
            <p className="text-sm text-slate-400 font-medium mt-1">
              Add new entries or manage current listings in the database
            </p>
          </div>

          {/* Quick Tab Selectors */}
          <div className="flex gap-2 p-1 bg-slate-200/50 rounded-xl">
            <button
              onClick={() => setActiveTab('add')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'add' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Add College
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'edit' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Edit College
            </button>
            <button
              onClick={() => setActiveTab('delete')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'delete' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Delete College
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="mt-8">
          {activeTab === 'add' && <AddCollegeTab />}
          {activeTab === 'edit' && <EditCollegeTab />}
          {activeTab === 'delete' && <DeleteCollegeTab />}
        </div>

      </div>
    </div>
  );
}

/* ==========================================================================
   Tab 1: Add College Component
   ========================================================================== */
function AddCollegeTab() {
  const [formData, setFormData] = useState({
    SrNo: '',
    'College Code': '',
    'College Name': '',
    District: '',
    'Course Type': 'Under Graduate',
    'Course Name': '',
    Location: '',
    contactNumber: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      SrNo: parseInt(formData.SrNo, 10) || null
    };

    try {
      const res = await adminCreateCollege(payload);
      if (res.success) {
        alert('College added successfully!');
        setFormData({
          SrNo: '',
          'College Code': '',
          'College Name': '',
          District: '',
          'Course Type': 'Under Graduate',
          'Course Name': '',
          Location: '',
          contactNumber: ''
        });
      } else {
        alert(`Error: ${res.message}`);
      }
    } catch (error) {
      alert(`Error adding college: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 max-w-3xl mx-auto">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        Add New Institution Entry
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Sr No */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sr. No. *</label>
          <input
            type="number"
            name="SrNo"
            value={formData.SrNo}
            onChange={handleChange}
            required
            className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15"
          />
        </div>

        {/* College Code */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">College Code *</label>
          <input
            type="text"
            name="College Code"
            value={formData['College Code']}
            onChange={handleChange}
            required
            className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15"
          />
        </div>

        {/* College Name */}
        <div className="sm:col-span-2 flex flex-col space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">College Name *</label>
          <input
            type="text"
            name="College Name"
            value={formData['College Name']}
            onChange={handleChange}
            required
            className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15"
          />
        </div>

        {/* District */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">District *</label>
          <input
            type="text"
            name="District"
            value={formData.District}
            onChange={handleChange}
            required
            className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15"
          />
        </div>

        {/* Course Type */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Type *</label>
          <select
            name="Course Type"
            value={formData['Course Type']}
            onChange={handleChange}
            required
            className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15 bg-white"
          >
            <option value="Under Graduate">Under Graduate</option>
            <option value="Post Graduate">Post Graduate</option>
          </select>
        </div>

        {/* Course Name */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Name *</label>
          <input
            type="text"
            name="Course Name"
            value={formData['Course Name']}
            onChange={handleChange}
            required
            className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
          <input
            type="text"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15"
          />
        </div>

        {/* Contact Number */}
        <div className="flex flex-col space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15"
          />
        </div>

        <div className="sm:col-span-2 flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm shadow-sm transition-all disabled:opacity-45"
          >
            {loading ? 'Adding...' : 'Add College'}
          </button>
        </div>

      </form>
    </div>
  );
}

/* ==========================================================================
   Tab 2: Edit College Component
   ========================================================================== */
function EditCollegeTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  
  // Edit Form States
  const [editingCollege, setEditingCollege] = useState(null);
  const [editFormData, setEditFormData] = useState({
    _id: '',
    SrNo: '',
    'College Name': '',
    'College Code': '',
    District: '',
    'Course Type': '',
    'Course Name': '',
    Location: '',
    contactNumber: ''
  });
  const [updating, setUpdating] = useState(false);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert('Please enter a search term');
      return;
    }

    setSearching(true);
    try {
      const res = await adminSearchColleges(searchTerm.trim());
      if (res.success) {
        setSearchResults(res.data);
      } else {
        alert(`Error: ${res.message}`);
      }
    } catch (error) {
      alert(`Error searching: ${error.message}`);
    } finally {
      setSearching(false);
    }
  };

  const startEditing = (college) => {
    setEditingCollege(college);
    setEditFormData({
      _id: college._id,
      SrNo: college.SrNo || '',
      'College Name': college['College Name'] || '',
      'College Code': college['College Code'] || '',
      District: college['District'] || '',
      'Course Type': college['Course Type'] || 'Under Graduate',
      'Course Name': college['Course Name'] || '',
      Location: college.Location || '',
      contactNumber: college.contactNumber || ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const payload = {
      ...editFormData,
      SrNo: parseInt(editFormData.SrNo, 10) || null
    };

    try {
      const res = await adminUpdateCollege(editFormData._id, payload);
      if (res.success) {
        alert('College updated successfully!');
        setEditingCollege(null);
        setSearchResults([]);
        setSearchTerm('');
      } else {
        alert(`Error: ${res.message}`);
      }
    } catch (error) {
      alert(`Error updating: ${error.message}`);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Search Block */}
      {!editingCollege && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            Search College to Edit
          </h3>
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by code, name, or district..."
              className="flex-grow px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15"
            />
            <button
              type="submit"
              disabled={searching}
              className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all disabled:opacity-45"
            >
              Search
            </button>
          </form>

          {/* Results List */}
          {searchResults.length > 0 && (
            <div className="divide-y divide-slate-100 border-t border-slate-100 mt-6 pt-4 space-y-4">
              {searchResults.map((college) => (
                <div key={college._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 gap-3">
                  <div>
                    <h4 className="font-bold text-slate-800">{college['College Name']}</h4>
                    <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                      <span>Code: {college['College Code']}</span>
                      <span>District: {college.District}</span>
                      <span>Course: {college['Course Name']}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => startEditing(college)}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-brand-dark hover:bg-brand-purpleHover text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                  >
                    Edit <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Form Block */}
      {editingCollege && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              Edit: {editingCollege['College Name']}
            </h3>
            <button
              onClick={() => setEditingCollege(null)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 focus:outline-none"
            >
              Cancel Edit
            </button>
          </div>

          <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sr. No. *</label>
              <input
                type="number"
                name="SrNo"
                value={editFormData.SrNo}
                onChange={handleEditChange}
                required
                className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">College Code *</label>
              <input
                type="text"
                name="College Code"
                value={editFormData['College Code']}
                onChange={handleEditChange}
                required
                className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">College Name *</label>
              <input
                type="text"
                name="College Name"
                value={editFormData['College Name']}
                onChange={handleEditChange}
                required
                className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">District *</label>
              <input
                type="text"
                name="District"
                value={editFormData.District}
                onChange={handleEditChange}
                required
                className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Type *</label>
              <select
                name="Course Type"
                value={editFormData['Course Type']}
                onChange={handleEditChange}
                required
                className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent bg-white"
              >
                <option value="Under Graduate">Under Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Name *</label>
              <input
                type="text"
                name="Course Name"
                value={editFormData['Course Name']}
                onChange={handleEditChange}
                required
                className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
              <input
                type="text"
                name="Location"
                value={editFormData.Location}
                onChange={handleEditChange}
                className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div className="flex flex-col space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={editFormData.contactNumber}
                onChange={handleEditChange}
                className="px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end pt-4">
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-2.5 bg-brand-dark hover:bg-brand-purpleHover text-white font-bold rounded-xl text-sm shadow-sm transition-all disabled:opacity-45"
              >
                {updating ? 'Updating...' : 'Save Changes'}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}

/* ==========================================================================
   Tab 3: Delete College Component
   ========================================================================== */
function DeleteCollegeTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert('Please enter a search term');
      return;
    }

    setSearching(true);
    try {
      const res = await adminSearchColleges(searchTerm.trim());
      if (res.success) {
        setSearchResults(res.data);
      } else {
        alert(`Error: ${res.message}`);
      }
    } catch (error) {
      alert(`Error searching: ${error.message}`);
    } finally {
      setSearching(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      const res = await adminDeleteCollege(id);
      if (res.success) {
        alert('College deleted successfully!');
        setSearchResults(prev => prev.filter(c => c._id !== id));
      } else {
        alert(`Error: ${res.message}`);
      }
    } catch (error) {
      alert(`Error deleting college: ${error.message}`);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 max-w-3xl mx-auto">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 text-red-500">
        Search College to Delete
      </h3>
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by code, name, or district..."
          className="flex-grow px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
        />
        <button
          type="submit"
          disabled={searching}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all disabled:opacity-45"
        >
          Search
        </button>
      </form>

      {/* Delete Results */}
      {searchResults.length > 0 && (
        <div className="divide-y divide-slate-100 border-t border-slate-100 mt-6 pt-4 space-y-4">
          {searchResults.map((college) => (
            <div key={college._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 gap-3">
              <div>
                <h4 className="font-bold text-slate-800">{college['College Name']}</h4>
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                  <span>Code: {college['College Code']}</span>
                  <span>District: {college.District}</span>
                  <span>Course: {college['Course Name']}</span>
                </div>
              </div>
              <button
                onClick={() => handleDelete(college._id, college['College Name'])}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
