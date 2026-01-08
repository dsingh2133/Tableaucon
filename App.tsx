
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SitemapView from './components/SitemapView';
import SessionLibrary from './components/SessionLibrary';
import AnalyticsView from './components/AnalyticsView';
import GovernanceView from './components/GovernanceView';
import { NavigationTab, Persona } from './types';
import { PERSONA_CONFIG, MOCK_SESSIONS, SITEMAP_DATA } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.OVERVIEW);
  const [persona, setPersona] = useState<Persona>('General');
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tc-persona');
    if (saved) {
      setPersona(saved as Persona);
    } else {
      setShowWelcome(true);
    }
  }, []);

  const handleSetPersona = (newPersona: Persona) => {
    setPersona(newPersona);
    localStorage.setItem('tc-persona', newPersona);
    setShowWelcome(false);
  };

  const personaConfig = PERSONA_CONFIG[persona];

  const getRecommendedSessions = () => {
    if (persona === 'General') return MOCK_SESSIONS.slice(0, 3);
    const config = PERSONA_CONFIG[persona];
    return MOCK_SESSIONS
      .filter(s => config.tracks.includes(s.track) || s.audience === persona)
      .sort((a, b) => (a.audience === persona ? -1 : 1))
      .slice(0, 3);
  };

  const governanceStats = {
    total: SITEMAP_DATA.length,
    live: SITEMAP_DATA.filter(i => i.status === 'Live').length,
    review: SITEMAP_DATA.filter(i => i.status === 'In Review').length,
  };

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.OVERVIEW:
        return (
          <div className="space-y-20 animate-in fade-in duration-700">
            {/* Dynamic Hero Section */}
            <section className="text-center py-24 px-6 bg-slate-950 rounded-[4rem] text-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-indigo-900/30 opacity-70"></div>
              
              <div className="relative z-10 max-w-4xl mx-auto">
                <div className="flex justify-center mb-10">
                  <span className="inline-flex items-center px-5 py-2.5 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 text-blue-200 text-xs font-black uppercase tracking-[0.3em] shadow-2xl">
                    <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-3 animate-pulse"></span>
                    {persona !== 'General' ? `${persona} IA View` : 'Global IA Strategy'}
                  </span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-none drop-shadow-2xl">
                  {personaConfig.heroTitle}
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-300 mb-14 font-medium leading-relaxed max-w-3xl mx-auto opacity-90">
                  {personaConfig.heroSubtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <button 
                    onClick={() => setActiveTab(NavigationTab.SITEMAP)}
                    className="bg-white text-blue-700 px-12 py-6 rounded-3xl font-black text-lg hover:bg-blue-50 transition-all shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)] hover:-translate-y-1 active:scale-95"
                  >
                    View Sitemap
                  </button>
                  <button 
                    onClick={() => setActiveTab(personaConfig.priorityTab)}
                    className="bg-blue-600 text-white px-12 py-6 rounded-3xl font-black text-lg hover:bg-blue-500 transition-all shadow-[0_20px_50px_-10px_rgba(37,99,235,0.3)] hover:-translate-y-1 active:scale-95"
                  >
                    Go to {personaConfig.priorityTab}
                  </button>
                </div>
              </div>
            </section>

            {/* IA Governance Tracker Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                <div className="flex items-end justify-between px-2">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Strategic Path</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Recommended Content for {persona}</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab(NavigationTab.SESSIONS)} 
                    className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline"
                  >
                    View Library &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getRecommendedSessions().map((session, idx) => (
                    <div 
                      key={session.id} 
                      className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl transition-all flex flex-col h-full relative"
                    >
                      <div className="flex gap-2 mb-6">
                         <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-md uppercase tracking-wider">{session.track}</span>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">{session.title}</h3>
                      <p className="text-slate-500 text-xs mb-8 flex-grow leading-relaxed font-bold">{session.abstract}</p>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-auto">TC24 Official</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl space-y-8 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <h3 className="text-2xl font-black text-slate-900 tracking-tighter relative z-10">IA Governance</h3>
                
                <div className="space-y-6 relative z-10">
                  <div className="p-6 bg-slate-50 rounded-3xl space-y-2 border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Progress</p>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-black text-slate-900 tracking-tighter">
                        {Math.round((governanceStats.live / governanceStats.total) * 100)}%
                      </span>
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-100 px-2 py-1 rounded-md uppercase mb-1">Live</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${(governanceStats.live / governanceStats.total) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-3xl border border-blue-100">
                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">In Review</p>
                      <p className="text-2xl font-black text-blue-700 leading-none">{governanceStats.review}</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-3xl border border-amber-100">
                      <p className="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-1">Approved</p>
                      <p className="text-2xl font-black text-amber-700 leading-none">{governanceStats.total - governanceStats.review - governanceStats.live}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab(NavigationTab.GOVERNANCE)}
                  className="w-full py-5 rounded-2xl bg-slate-900 text-white text-sm font-black uppercase tracking-widest hover:bg-slate-800 transition-all mt-auto shadow-xl"
                >
                  Policy Hub
                </button>
              </div>
            </section>
          </div>
        );
      case NavigationTab.SITEMAP:
        return <SitemapView selectedPersona={persona} />;
      case NavigationTab.SESSIONS:
        return <SessionLibrary initialPersona={persona} />;
      case NavigationTab.ANALYTICS:
        return <AnalyticsView />;
      case NavigationTab.GOVERNANCE:
        return <GovernanceView />;
      default:
        return <div className="text-center py-20 text-slate-400">Content Coming Soon</div>;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      selectedPersona={persona} 
      setPersona={handleSetPersona}
    >
      {renderContent()}

      {/* Persona Selection Modal */}
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className="bg-white rounded-[4rem] shadow-2xl max-w-5xl w-full overflow-hidden animate-in zoom-in-95 duration-500 border border-white/20">
             <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 bg-blue-700 p-16 text-white flex flex-col justify-center relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-700 font-black text-3xl mb-12 shadow-2xl">T</div>
                    <h2 className="text-4xl font-black mb-8 leading-none tracking-tighter uppercase">TC IA HUB</h2>
                    <p className="text-blue-100 text-lg font-bold leading-relaxed mb-12 opacity-80">Welcome to the central blueprint for the TC digital experience. Please select your operational perspective.</p>
                  </div>
                </div>
                <div className="md:w-3/5 p-16 bg-slate-50">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {(['Analyst', 'Developer', 'Admin', 'Executive'] as Persona[]).map((p) => (
                        <button
                          key={p}
                          onClick={() => handleSetPersona(p)}
                          className="flex flex-col text-left p-8 bg-white rounded-[2.5rem] border-2 border-transparent hover:border-blue-600 hover:shadow-2xl transition-all group active:scale-[0.97] relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                             <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                               <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                               <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                             </svg>
                          </div>
                          <span className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight uppercase leading-none mb-4">{p}</span>
                          <span className="text-xs text-slate-500 font-bold leading-relaxed">{PERSONA_CONFIG[p].description}</span>
                        </button>
                      ))}
                   </div>
                   <div className="mt-16 pt-10 border-t border-slate-200 flex justify-between items-center">
                      <button 
                        onClick={() => handleSetPersona('General')}
                        className="text-xs font-black text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
                      >
                        Global Strategy View
                      </button>
                      <p className="text-[10px] text-slate-300 uppercase font-black tracking-[0.5em]">blueprint.tc24</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
