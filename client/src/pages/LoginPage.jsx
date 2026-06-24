import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { loginUser } from '../services/api';

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!usernameOrEmail.trim() || !password) {
      setError('Please enter your email/username and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser(usernameOrEmail.trim(), password);
      if (res.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', usernameOrEmail.trim());
        localStorage.setItem('userRole', 'student');
        
        // Notify Navbar of login state change
        window.dispatchEvent(new Event('auth-change'));
        navigate('/search');
      } else {
        setError(res.message || 'Invalid email/username or password.');
      }
    } catch (err) {
      setError('Connection to authentication server failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md border border-slate-200 rounded-2xl shadow-xl p-8 space-y-6 animate-in fade-in duration-200">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center justify-center gap-2">
            Student Login
          </h2>
          <p className="text-sm text-slate-400 font-medium">
            Sign in to explore verified college directories
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email / Username */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email or Username</label>
            <div className="relative">
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Email or username"
                className="w-full pl-4 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15 transition-all"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-4 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15 transition-all"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-dark hover:bg-brand-navy text-white font-bold rounded-xl shadow-md hover:shadow-indigo-500/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-accent font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
