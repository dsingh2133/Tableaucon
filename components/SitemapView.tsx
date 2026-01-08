
import React, { useState, useMemo } from 'react';
import { SITEMAP_DATA, PERSONA_CONFIG } from '../constants';
import { SitemapItem, Persona, IAStatus } from '../types';

interface SitemapViewProps {
  selectedPersona: Persona;
}

// Fixed 'key' prop error by moving NodeCard outside and typing as React.FC.
// This also avoids unnecessary component remounts during parent re-renders.
const NodeCard: React.FC<{ 
  item: SitemapItem;
  expanded: string[];
  toggleExpand: (label: string) => void;
  recommended: boolean;
  getStatusColor: (status: IAStatus) => string;
}> = ({ item, expanded, toggleExpand, recommended, getStatusColor }) => {
  return (
    <div 
      className={`bg-white rounded-3xl border transition-all flex flex-col group overflow-hidden ${
        recommended 
          ? 'border-blue-500 ring-4 ring-blue-50' 
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div 
        className={`p-5 flex items-start justify-between cursor-pointer transition-colors ${expanded.includes(item.level1) ? 'bg-slate-50/50' : 'bg-white'}`}
        onClick={() => toggleExpand(item.level1)}
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border uppercase tracking-wider ${getStatusColor(item.status)}`}>
              {item.status}
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.contentType}</span>
          </div>
          <h3 className={`text-xl font-black tracking-tight ${recommended ? 'text-blue-700' : 'text-slate-900'}`}>
            {item.level1}
          </h3>
          <p className="text-[10px] font-medium text-slate-500 line-clamp-1">{item.purpose}</p>
        </div>
        <div className={`p-1.5 rounded-lg transition-all ${expanded.includes(item.level1) ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {expanded.includes(item.level1) && (
        <div className="p-5 pt-0 space-y-3 animate-in slide-in-from-top-2 duration-300">
          <div className="grid grid-cols-1 gap-2">
            {item.subItems?.map((sub, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-xl border border-slate-100 bg-white hover:border-blue-200 transition-all flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(sub.status).split(' ')[0].replace('-100', '-500')}`} />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{sub.level3}</p>
                    {sub.level2 !== item.level1 && (
                       <p className="text-[8px] text-slate-400 uppercase font-bold tracking-tighter">{sub.level2}</p>
                    )}
                  </div>
                </div>
                <span className="text-[8px] font-black bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded uppercase">{sub.contentType}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl mt-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500 uppercase">
                {item.owner.split(' ').map(n => n[0]).join('')}
              </div>
              <p className="text-[9px] font-bold text-slate-600 truncate max-w-[120px]">{item.owner}</p>
            </div>
            <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

const SitemapView: React.FC<SitemapViewProps> = ({ selectedPersona }) => {
  const [expanded, setExpanded] = useState<string[]>(['Program', 'Venue & Travel']);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<IAStatus | 'All'>('All');
  
  const personaConfig = PERSONA_CONFIG[selectedPersona];

  const filteredData = useMemo(() => {
    return SITEMAP_DATA.filter(item => {
      const matchesSearch = item.level1.toLowerCase().includes(search.toLowerCase()) || 
                          item.subItems?.some(sub => sub.level3.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const toggleExpand = (label: string) => {
    setExpanded(prev => 
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  const getStatusColor = (status: IAStatus) => {
    switch (status) {
      case 'Live': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Approved': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'In Review': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Draft': return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  const isModuleRecommended = (label: string) => personaConfig.highlightedModules.includes(label);

  const coreModules = filteredData.filter(i => ['Home', 'Program', 'Speakers', 'Sponsors', 'Register'].includes(i.level1));
  const enablementModules = filteredData.filter(i => ['Learn', 'Community', 'Expo', 'Blog'].includes(i.level1));
  const strategyModules = filteredData.filter(i => ['Venue & Travel', 'About', 'Legal'].includes(i.level1));

  const Section = ({ title, items }: { title: string, items: SitemapItem[] }) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-6 pt-8 first:pt-0">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(item => (
            <NodeCard 
              key={item.level1} 
              item={item} 
              expanded={expanded}
              toggleExpand={toggleExpand}
              recommended={isModuleRecommended(item.level1)}
              getStatusColor={getStatusColor}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Information Architecture</h2>
          <p className="text-slate-500 font-medium text-sm">Comprehensive sitemap inventory following the TC24 digital strategy.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
             <input 
              type="text" 
              placeholder="Search architecture nodes..." 
              className="pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-xs font-medium w-64 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
             />
             <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </div>
          <select 
            className="px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="All">All Statuses</option>
            <option value="Live">Live</option>
            <option value="Approved">Approved</option>
            <option value="In Review">In Review</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="space-y-12 divide-y divide-slate-100">
        <Section title="Core Experience" items={coreModules} />
        <Section title="Enablement & Community" items={enablementModules} />
        <Section title="Strategy & Logistics" items={strategyModules} />
      </div>

      {filteredData.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No results match your filters.</p>
        </div>
      )}
    </div>
  );
};

export default SitemapView;
