
import React from 'react';

const GovernanceView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">IA & Content Governance</h2>
        <p className="text-slate-500">Standards and owners for the Tableau Conference digital experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Success Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-sm text-slate-600">Avg. Clicks to Session</span>
              <span className="text-sm font-bold text-blue-600">≤ 3 Clicks</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-sm text-slate-600">Search Success Rate</span>
              <span className="text-sm font-bold text-blue-600">≥ 80%</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-sm text-slate-600">CMS Content Reuse</span>
              <span className="text-sm font-bold text-blue-600">≥ 60% YoY</span>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Ownership
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-sm text-slate-600">Sitemap & IA</span>
              <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded">Digital Experience</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-sm text-slate-600">Content Quality</span>
              <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded">Program Team</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-2">
              <span className="text-sm text-slate-600">CMS Publishing</span>
              <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded">Web Ops</span>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-slate-900 rounded-xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-4">Non-Functional Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h4 className="text-blue-400 text-xs font-bold uppercase mb-1">Performance</h4>
                <p className="text-sm text-slate-300">Target load time &lt;2s across global edge nodes. Optimized for mobile first.</p>
              </div>
              <div>
                <h4 className="text-blue-400 text-xs font-bold uppercase mb-1">Accessibility</h4>
                <p className="text-sm text-slate-300">WCAG 2.1 AA Compliance mandatory for all interactive elements and session video players.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-blue-400 text-xs font-bold uppercase mb-1">SEO Strategy</h4>
                <p className="text-sm text-slate-300">Clean URL hierarchy: /program/sessions/{'{track}'}/{'{session-id}'}. SSR for session index.</p>
              </div>
              <div>
                <h4 className="text-blue-400 text-xs font-bold uppercase mb-1">Scalability</h4>
                <p className="text-sm text-slate-300">Multi-year content archival and versioning to support year-over-year growth.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 20 20">
             <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
           </svg>
        </div>
      </div>
    </div>
  );
};

export default GovernanceView;
