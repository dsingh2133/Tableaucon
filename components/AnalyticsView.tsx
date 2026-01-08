
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';

const TRACK_DISTRIBUTION = [
  { name: 'Analytics', value: 45 },
  { name: 'Data Prep', value: 25 },
  { name: 'AI/ML', value: 20 },
  { name: 'Governance', value: 15 },
  { name: 'Dev', value: 12 },
];

const AUDIENCE_STATS = [
  { name: 'Analysts', count: 4200 },
  { name: 'Admins', count: 1800 },
  { name: 'Devs', count: 2400 },
  { name: 'Execs', count: 1100 },
];

const REGISTRATION_TREND = [
  { month: 'Jan', count: 400 },
  { month: 'Feb', count: 900 },
  { month: 'Mar', count: 2200 },
  { month: 'Apr', count: 4500 },
  { month: 'May', count: 7800 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Conference Performance Dashboard</h2>
        <p className="text-slate-500">Real-time tracking of IA success metrics and content distribution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Sessions', value: '450+', change: '+12%', color: 'text-blue-600' },
          { label: 'Speaker Score', value: '4.8/5', change: '+2%', color: 'text-emerald-600' },
          { label: 'Avg. Clicks', value: '2.4', change: '-15%', color: 'text-amber-600' },
          { label: 'CMS Reuse', value: '68%', change: '+8%', color: 'text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-baseline mt-2">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <span className="ml-2 text-xs font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Audience Composition</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={AUDIENCE_STATS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Track Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={TRACK_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {TRACK_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Registration Velocity</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REGISTRATION_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
