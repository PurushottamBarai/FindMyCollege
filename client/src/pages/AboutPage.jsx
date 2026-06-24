import React from 'react';
import { Compass, ShieldCheck, CheckCircle2, BookmarkCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Hero */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-navy">FindMyCollege</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            FindMyCollege is a dynamic, student-centric platform designed to simplify the college exploration and search process for undergraduate and postgraduate aspirants in Maharashtra.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { value: '900+', label: 'Colleges Indexed' },
            { value: '28+', label: 'Academic Courses' },
            { value: '100%', label: 'Free Directory' },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <span className="block text-3xl font-extrabold text-brand-dark">{stat.value}</span>
              <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="text-brand-accent" size={22} /> Our Mission
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We believe that choosing where to study is one of the most critical decisions in a student's academic life. Our mission is to make this journey transparent, accurate, and completely stress-free by providing comprehensive, structured directories, seats capacity statistics, and detailed regional directories at the click of a button.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Compass className="text-brand-accent animate-spin-slow" size={22} /> Key Search Features
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-2">
              The platform incorporates dynamic, multi-filter query options to narrow down your choices instantly:
            </p>
            <ul className="space-y-2">
              {[
                'Filter by study level: Under Graduate and Post Graduate',
                'Filter by specific academic courses and programs',
                'Filter by regions and districts across Maharashtra',
                'Filter by college statuses: Government, Private, Autonomous, and more',
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-600">
                  <CheckCircle2 className="text-brand-navy mt-0.5 flex-shrink-0" size={14} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
