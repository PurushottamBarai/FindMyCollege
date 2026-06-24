import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Compass, GraduationCap, Award } from 'lucide-react';

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  return (
    <div className="relative overflow-hidden bg-slate-50 min-h-[calc(100vh-4rem)] flex items-center">
      
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-light/40 rounded-full blur-3xl -z-10 animate-pulse duration-[6s]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-light/40 rounded-full blur-3xl -z-10 animate-pulse duration-[8s]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-light text-brand-dark text-xs font-semibold tracking-wide uppercase">
              <Compass size={14} className="text-brand-accent animate-spin-slow" /> Discover Maharashtra's College Network
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-none">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-navy">Dream College</span>
            </h1>
            
            <p className="text-lg text-slate-500 max-w-xl mx-auto lg:mx-0">
              Easily explore, search, and compare colleges across Maharashtra. Filter by district, course type, status, and view intake statistics instantaneously.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                to="/search"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-brand-dark hover:bg-[#1a357a] text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all hover:-translate-y-0.5 gap-2"
              >
                <Search size={18} /> Find Colleges Now
              </Link>
              {!isLoggedIn && (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all hover:-translate-y-0.5"
                >
                  Create Account
                </Link>
              )}
            </div>

            {/* Feature lists */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-200/65 max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <GraduationCap className="text-brand-accent" size={20} />
                <span className="text-sm font-semibold text-slate-600">900+ Colleges</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-brand-accent" size={20} />
                <span className="text-sm font-semibold text-slate-600">Verified DTE Data</span>
              </div>
            </div>
          </div>

          {/* Graphical/Image Grid */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4 items-center">
              
              <div className="col-span-5 space-y-4">
                <div className="overflow-hidden rounded-2xl shadow-md transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg"
                    alt="Campus"
                    className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-lg text-center transform rotate-3">
                  <span className="text-3xl font-extrabold text-brand-dark">30+</span>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Districts</p>
                </div>
              </div>

              <div className="col-span-7 space-y-4">
                <div className="overflow-hidden rounded-2xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="/imgs/college.nda.png"
                    alt="Students in Library"
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-md transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="/imgs/college.student.webp"
                    alt="Graduation"
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
