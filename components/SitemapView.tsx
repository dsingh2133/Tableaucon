
import React, { useState, useMemo } from 'react';
import { SITEMAP_DATA, PERSONA_CONFIG } from '../constants';
import { SitemapItem, Persona, IAStatus } from '../types';

interface SitemapViewProps {
  selectedPersona: Persona;
}

const SitemapView: React.FC<SitemapViewProps> = ({ selectedPersona }) => {
  const [expanded, setExpanded] = useState<string[]>(['Program']);
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

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 pb-8 border-b border-slate-200">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Sitemap Inventory</h2>
            {selectedPersona !== 'General' && (
              <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-blue-200">
                Persona Optimized
              </span>
            )}
          </div>
          <p className="text-slate-500 font-medium max-w-xl leading-relaxed">
            The master information architecture for TC24. Filter by status to track governance progress or use persona-based highlighting to focus on relevant modules.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative w-full sm:w-64">
             <input 
              type="text" 
              placeholder="Filter nodes..." 
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm font-medium transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
             />
             <svg className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </div>
          <select 
            className="px-4 py-3 rounded-2xl bg-white border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:outline-none text-sm font-bold text-slate-700"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredData.map((item) => {
          const recommended = isModuleRecommended(item.level1);
          return (
            <div 
              key={item.level1} 
              className={`bg-white rounded-3xl border transition-all flex flex-col group overflow-hidden ${
                recommended 
                  ? 'border-blue-500 ring-8 ring-blue-50/50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div 
                className={`p-6 flex items-start justify-between cursor-pointer transition-colors ${expanded.includes(item.level1) ? 'bg-slate-50/50' : 'bg-white'}`}
                onClick={() => toggleExpand(item.level1)}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-md border uppercase tracking-wider ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.contentType}</span>
                  </div>
                  <h3 className={`text-2xl font-black tracking-tight ${recommended ? 'text-blue-700' : 'text-slate-900'}`}>
                    {item.level1}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 line-clamp-1">{item.purpose}</p>
                </div>
                <div className={`p-2 rounded-xl transition-all ${expanded.includes(item.level1) ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {expanded.includes(item.level1) && (
                <div className="p-6 pt-0 space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.subItems?.map((sub, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all cursor-default"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`w-2 h-2 rounded-full mt-1.5 ${getStatusColor(sub.status).split(' ')[0].replace('-100', '-500')}`} />
                          <span className="text-[9px] font-black bg-slate-50 text-slate-400 px-1.5 py-0.5 rounded uppercase">{sub.contentType}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-800">{sub.level3}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">{sub.status}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl mt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                        {item.owner.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Ownership</p>
                        <p className="text-xs font-bold text-slate-700">{item.owner}</p>
                      </div>
                    </div>
                    <button className="text-xs font-black text-blue-600 hover:underline uppercase tracking-widest">View Details</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredData.length === 0 && (
        <div className="py-24 text-center">
          <div className="max-w-xs mx-auto space-y-4 opacity-40">
            <svg className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-xl font-black tracking-tight text-slate-900">No architectural nodes match your filters.</p>
            <button onClick={() => {setSearch(''); setStatusFilter('All');}} className="text-sm font-bold text-blue-600 hover:underline">Reset Sitemap View</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SitemapView;
