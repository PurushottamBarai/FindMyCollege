import React, { useState, useEffect } from 'react';
import { X, MapPin, Mail, Globe, User, Landmark, Info } from 'lucide-react';
import { fetchCollegeDetails } from '../services/api';

export default function CollegeDetailsModal({ code, onClose }) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;
    
    const loadDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchCollegeDetails(code);
        if (res.success && res.data) {
          setDetails(res.data);
        } else {
          setError(res.message || 'Failed to load details from CET cell.');
        }
      } catch (err) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [code]);

  if (!code) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-lg rounded-2xl border border-slate-100 shadow-2xl p-6 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all"
        >
          <X size={20} />
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-brand-accent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-500">Loading live data from CET Cell...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 font-medium mb-4">{error}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-sm transition-colors"
            >
              Close
            </button>
          </div>
        ) : details ? (
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-brand-accent bg-brand-light px-2.5 py-1 rounded-full">
                Code: {code}
              </span>
              <h3 className="text-xl font-bold text-slate-800 mt-3 flex items-center gap-2">
                <Landmark size={22} className="text-brand-dark" /> Institute Details
              </h3>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Address</p>
                  <p className="text-sm font-medium text-slate-700">{details.Address}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Landmark size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Region</p>
                    <p className="text-sm font-medium text-slate-700">{details.Region}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">District</p>
                    <p className="text-sm font-medium text-slate-700">{details.District}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Info size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</p>
                  <p className="text-sm font-medium text-slate-700">{details.Status}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</p>
                  <a
                    href={`mailto:${details.Email}`}
                    className="text-sm font-semibold text-brand-accent hover:text-brand-purple hover:underline"
                  >
                    {details.Email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Website</p>
                  <a
                    href={details.Website?.startsWith('http') ? details.Website : `http://${details.Website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-brand-accent hover:text-brand-purple hover:underline break-all"
                  >
                    {details.Website}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User size={18} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registrar</p>
                  <p className="text-sm font-medium text-slate-700">{details.Registrar}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
