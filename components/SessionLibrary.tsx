
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_SESSIONS, TRACKS, AUDIENCES, SKILL_LEVELS, PRODUCTS } from '../constants';
import { Session, Persona } from '../types';
import { generateSessionIdeas } from '../geminiService';

interface SessionLibraryProps {
  initialPersona?: Persona;
}

const SessionLibrary: React.FC<SessionLibraryProps> = ({ initialPersona }) => {
  const [filterTrack, setFilterTrack] = useState<string>('All');
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [filterProduct, setFilterProduct] = useState<string>('All');
  const [filterAudience, setFilterAudience] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [extraSessions, setExtraSessions] = useState<Session[]>([]);

  // Apply initial persona to audience filter if provided
  useEffect(() => {
    if (initialPersona && initialPersona !== 'General') {
      setFilterAudience(initialPersona);
    }
  }, [initialPersona]);

  const filteredSessions = useMemo(() => {
    const combined = [...MOCK_SESSIONS, ...extraSessions];
    return combined.filter(s => {
      const matchTrack = filterTrack === 'All' || s.track === filterTrack;
      const matchLevel = filterLevel === 'All' || s.level === filterLevel;
      const matchProduct = filterProduct === 'All' || s.product === filterProduct || s.product === 'Multiple';
      const matchAudience = filterAudience === 'All' || s.audience === filterAudience;
      const matchSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.abstract.toLowerCase().includes(searchTerm.toLowerCase());
      return matchTrack && matchLevel && matchProduct && matchAudience && matchSearch;
    });
  }, [filterTrack, filterLevel, filterProduct, filterAudience, searchTerm, extraSessions]);

  const handleGenerateIdeas = async () => {
    if (filterTrack === 'All') {
      alert("Please select a specific track to generate ideas for.");
      return;
    }
    setIsGenerating(true);
    try {
      const ideas = await generateSessionIdeas(filterTrack);
      const newSessions: Session[] = ideas.map((idea: any, idx: number) => ({
        id: `gen-${Date.now()}-${idx}`,
        title: idea.title,
        abstract: idea.abstract,
        level: idea.level,
        track: filterTrack,
        speaker: 'AI Expert',
        time: 'TBD',
        audience: filterAudience === 'All' ? 'Analyst' : filterAudience as Persona,
        sessionType: 'Breakout',
        product: filterProduct === 'All' ? 'Multiple' : filterProduct as any,
        industry: 'Cross-industry',
        delivery: 'Virtual'
      }));
      setExtraSessions(prev => [...newSessions, ...prev]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetFilters = () => {
    setFilterTrack('All');
    setFilterLevel('All');
    setFilterProduct('All');
    setFilterAudience('All');
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-4 flex-grow max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-800">Session Discovery</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search sessions by title, abstract or speaker..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={resetFilters}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Reset
          </button>
          <button 
            onClick={handleGenerateIdeas}
            disabled={isGenerating || filterTrack === 'All'}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filterTrack === 'All' 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
            }`}
          >
            {isGenerating ? (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
            <span>AI Ideas for {filterTrack === 'All' ? 'Track' : filterTrack}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase">Track</label>
          <select 
            className="block w-full text-sm border-slate-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={filterTrack}
            onChange={(e) => setFilterTrack(e.target.value)}
          >
            <option value="All">All Tracks</option>
            {TRACKS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase">Skill Level</label>
          <select 
            className="block w-full text-sm border-slate-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
          >
            <option value="All">All Levels</option>
            {SKILL_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase">Product</label>
          <select 
            className="block w-full text-sm border-slate-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
          >
            <option value="All">All Products</option>
            {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase">Audience Persona</label>
          <select 
            className="block w-full text-sm border-slate-200 rounded-md focus:ring-blue-500 focus:border-blue-500 font-medium text-blue-600"
            value={filterAudience}
            onChange={(e) => setFilterAudience(e.target.value)}
          >
            <option value="All">All Personas</option>
            {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      <div className="flex items-center text-sm text-slate-500 px-1">
        Showing <strong>{filteredSessions.length}</strong> matching results
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.length > 0 ? filteredSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all border-l-4 border-l-blue-500 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                session.level === 'Advanced' ? 'bg-red-50 text-red-700' :
                session.level === 'Intermediate' ? 'bg-blue-50 text-blue-700' :
                'bg-emerald-50 text-emerald-700'
              }`}>
                {session.level}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{session.time}</span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{session.title}</h3>
            <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">{session.abstract}</p>
            
            <div className="flex flex-wrap gap-1.5 mb-6">
              <span className="text-[10px] bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded font-bold uppercase">{session.track}</span>
              <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded font-bold uppercase">{session.product}</span>
              <span className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded font-bold uppercase">{session.audience}</span>
            </div>

            <div className="flex items-center pt-4 border-t border-slate-50">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex-shrink-0 mr-3 flex items-center justify-center font-bold text-slate-400 text-xs">
                {session.speaker.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{session.speaker}</p>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">{session.sessionType} Session</p>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300">
             <div className="max-w-xs mx-auto">
               <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <h4 className="text-lg font-bold text-slate-800">No sessions found</h4>
               <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or search keywords to broaden your discovery.</p>
               <button onClick={resetFilters} className="mt-4 text-sm font-bold text-blue-600 hover:underline">Clear all filters</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionLibrary;
