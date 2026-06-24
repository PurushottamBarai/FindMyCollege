import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard, Compass } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = () => {
    const logged = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    const admin = localStorage.getItem('isAdmin') === 'true';
    
    setIsLoggedIn(logged);
    setUserEmail(email);
    setIsAdmin(admin);
  };

  useEffect(() => {
    checkAuth();
    // Watch for custom auth events or state changes
    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
  }, []);

  // Also check auth on route transitions
  useEffect(() => {
    checkAuth();
    setIsOpen(false);
    setShowDropdown(false);
  }, [location]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('isAdmin');
      
      setIsLoggedIn(false);
      setUserEmail('');
      setIsAdmin(false);
      
      // Dispatch event so other components know about logout
      window.dispatchEvent(new Event('auth-change'));
      navigate('/');
    }
  };

  const getProfileInitial = () => {
    if (isAdmin) return 'A';
    if (userEmail) return userEmail.trim().charAt(0).toUpperCase();
    return 'U';
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-brand-accent' : 'text-gray-500 hover:text-brand-dark';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/imgs/cap.png" alt="FindMyCollege Logo" className="h-11 w-auto mt-1 text" />
              <span className="text-xl font-bold text-brand-dark tracking-tight flex items-center">
                Find<span className="text-[#3154ac]">My</span>College
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className={`text-md font-medium transition-colors ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/search" className={`text-md font-medium transition-colors ${isActive('/search')}`}>
              Find Colleges
            </Link>
            <Link to="/about" className={`text-md font-medium transition-colors ${isActive('/about')}`}>
              About
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold border border-slate-200 shadow-sm focus:outline-none hover:bg-brand-navy transition-colors"
                >
                  {getProfileInitial()}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-100 shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        Logged in as
                      </p>
                      <p className="text-sm font-bold text-slate-700 truncate">
                        {isAdmin ? 'System Admin' : userEmail}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        alert(`Profile Details:\nEmail: ${userEmail || 'admin@college.edu'}\nRole: ${isAdmin ? 'Administrator' : 'Student'}`);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <User size={16} /> View Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-100"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-4 py-2 border border-slate-200 text-sm font-semibold rounded-full text-brand-dark bg-white transition-all hover:-translate-y-[1px]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-full text-white bg-brand-dark transition-all hover:-translate-y-[1px]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-dark hover:text-brand-navy p-2 rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 px-4 space-y-3 z-50 flex flex-col w-full items-center justify-center">
          <Link
            to="/"
            className="block text-base font-semibold py-2 text-slate-600 hover:text-brand-dark"
          >
            Home
          </Link>
          <Link
            to="/search"
            className="block text-base font-semibold py-2 text-slate-600 hover:text-brand-dark"
          >
            Find Colleges
          </Link>
          <Link
            to="/about"
            className="block text-base font-semibold py-2 text-slate-600 hover:text-brand-dark"
          >
            About
          </Link>

          {isLoggedIn ? (
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="px-2 py-1">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Logged in as
                </p>
                <p className="text-sm font-bold text-slate-700 truncate">
                  {isAdmin ? 'System Admin' : userEmail}
                </p>
              </div>
              <button
                onClick={() => alert(`Profile Details:\nEmail: ${userEmail || 'admin@college.edu'}\nRole: ${isAdmin ? 'Administrator' : 'Student'}`)}
                className="w-full text-left px-2 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2 rounded-lg"
              >
                <User size={18} /> View Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-lg border-t border-slate-100"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <Link
                to="/login"
                className="inline-flex justify-center items-center px-4 py-2 border border-slate-200 text-sm font-semibold rounded-full text-brand-dark bg-white hover:bg-slate-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-full text-white bg-brand-dark hover:bg-brand-navy"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
