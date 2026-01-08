
import React, { useState } from 'react';
import { NavigationTab, Persona } from '../types';
import { PERSONA_CONFIG, SITEMAP_DATA } from '../constants';

interface LayoutProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectedPersona: Persona;
  setPersona: (persona: Persona) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ 
  activeTab, 
  setActiveTab, 
  selectedPersona, 
  setPersona, 
  children 
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const personaConfig = PERSONA_CONFIG[selectedPersona];

  const searchResults = searchQuery.length > 1 
    ? SITEMAP_DATA.flatMap(item => [
        { label: item.level1, parent: null },
        ...(item.subItems?.map(sub => ({ label: sub.level3, parent: item.level1 })) || [])
      ]).filter(res => res.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:bg-blue-700 transition-colors shadow-sm" 
                onClick={() => setActiveTab(NavigationTab.OVERVIEW)}
              >
                T
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-slate-900 hidden sm:inline leading-none">
                  TC DIGITAL HUB
                </span>
                <span className="text-[10px] font-bold text-blue-600 hidden sm:inline leading-none">
                  IA & GOVERNANCE
                </span>
              </div>
            </div>
            
            <nav className="hidden xl:flex space-x-2">
              {Object.values(NavigationTab).map((tab) => {
                const isPriority = personaConfig.priorityTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                      activeTab === tab 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {tab}
                    {isPriority && selectedPersona !== 'General' && (
                      <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <button 
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                {searchOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="Search sitemap nodes..." 
                      className="w-full p-4 text-sm border-b focus:outline-none focus:ring-0"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="max-h-60 overflow-y-auto">
                      {searchResults.map((res, i) => (
                        <div 
                          key={i} 
                          className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0"
                          onClick={() => { setActiveTab(NavigationTab.SITEMAP); setSearchOpen(false); }}
                        >
                          <p className="text-sm font-bold text-slate-800">{res.label}</p>
                          {res.parent && <p className="text-[10px] text-slate-400 uppercase font-black">{res.parent}</p>}
                        </div>
                      ))}
                      {searchQuery.length > 1 && searchResults.length === 0 && (
                        <div className="p-4 text-center text-xs text-slate-400">No nodes found</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end border-l pl-6 border-slate-100">
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none">Role</span>
                <div className="flex items-center gap-1 group cursor-pointer">
                   <select 
                    className="text-sm font-black text-blue-600 bg-transparent border-none focus:ring-0 cursor-pointer text-right p-0 appearance-none hover:text-blue-800 transition-colors"
                    value={selectedPersona}
                    onChange={(e) => setPersona(e.target.value as Persona)}
                  >
                    <option value="General">General</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Developer">Developer</option>
                    <option value="Admin">Admin</option>
                    <option value="Executive">Executive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* IA Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab(NavigationTab.OVERVIEW)}>IA HUB</span>
            <span className="mx-2">/</span>
            <span className="text-slate-900">{activeTab}</span>
          </div>
        </div>
      </div>
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      <footer className="bg-slate-950 text-slate-500 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6 grayscale brightness-150">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">T</div>
                <span className="text-xl font-black tracking-tight text-white uppercase">TC HUB</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                The definitive information architecture hub for the Tableau Conference digital platform. Managed by Global Marketing Ops and UX Strategy.
              </p>
            </div>
            <div>
              <h3 className="text-white font-black mb-6 text-xs uppercase tracking-[0.2em]">IA Resources</h3>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Component Library</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Taxonomy Guide</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">CMS Blueprint</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-black mb-6 text-xs uppercase tracking-[0.2em]">Contact</h3>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-400 transition-colors">IA Strategy Team</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Web Ops Jira</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Slack #tc-digital</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-900 text-[10px] font-bold uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-4">
            <span>&copy; 2024 Tableau Conference Digital. IA Design Proprietary.</span>
            <div className="flex gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Sitemap Status: 92% Approved
              </span>
              <span>v2.4.0-Stable</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
