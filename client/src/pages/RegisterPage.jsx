import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { registerUser } from '../services/api';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Email Validation Regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    // Password Validation Regex: at least 6 chars, contain uppercase, lowercase and a number
    const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!emailRegex.test(email)) {
      setError('Invalid email address.');
      return;
    }
    if (!pwRegex.test(password)) {
      setError('Password must be at least 6 characters, and contain uppercase, lowercase, and a number.');
      return;
    }

    setLoading(true);
    try {
      const res = await registerUser(email, password);
      if (res.success) {
        setSuccess('Registration successful! Redirecting you to login...');
        setEmail('');
        setPassword('');
        setTimeout(() => {
          navigate('/login');
        }, 1800);
      } else {
        setError(res.message || 'Registration failed.');
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
            Create Account
          </h2>
          <p className="text-sm text-slate-400 font-medium">
            Join to browse and details explore college listings
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 size={16} className="flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-4 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15 transition-all"
                disabled={loading || success}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-4 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/15 transition-all"
                disabled={loading || success}
              />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              Must be ≥ 6 characters with uppercase, lowercase, and a number.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3 bg-brand-dark text-white font-bold rounded-xl shadow-md hover:shadow-indigo-500/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-accent font-bold hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
