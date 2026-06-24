import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <p className="text-sm font-semibold text-slate-300">FindMyCollege</p>
            <p className="text-xs mt-1">&copy; {new Date().getFullYear()} FindMyCollege. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/search" className="hover:text-white transition-colors">Find Colleges</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
            <a href="https://www.linkedin.com/in/purushottambarai/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
