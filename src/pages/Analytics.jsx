import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip as ChartTooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { 
  TrendingUp, 
  ArrowUpRight, 
  Filter, 
  Download, 
  PieChart as PieIcon,
  Activity,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

const Analytics = () => {
  const categoryData = [
    { name: 'Housing', value: 45, color: '#3525cd' },
    { name: 'Food', value: 25, color: '#006c49' },
    { name: 'Transport', value: 15, color: '#f59e0b' },
    { name: 'Shopping', value: 10, color: '#ef4444' },
    { name: 'Others', value: 5, color: '#6366f1' },
  ];

  const trendData = [
    { month: 'Jan', spend: 4000, savings: 2400 },
    { month: 'Feb', spend: 3000, savings: 1398 },
    { month: 'Mar', spend: 2000, savings: 9800 },
    { month: 'Apr', spend: 2780, savings: 3908 },
    { month: 'May', spend: 1890, savings: 4800 },
    { month: 'Jun', spend: 2390, savings: 3800 },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-4 py-8 bg-surface-container/20 rounded-3xl border border-outline-variant/10 shadow-sm transition-all hover:shadow-md">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-on-surface tracking-tighter leading-none">Market Intelligence</h1>
          <p className="text-on-surface-variant font-medium text-lg flex items-center gap-3">
             <Activity size={18} className="text-primary/60" /> Deep dives into your spending behavior and <span className="text-primary font-bold">financial health</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn-secondary h-14 px-8 font-bold flex items-center gap-3 group">
             <Filter size={20} className="group-hover:rotate-12 transition-transform" /> Insights
          </button>
          <button className="btn-primary h-14 px-8 font-bold flex items-center gap-3 shadow-xl group">
             <Download size={20} className="group-hover:translate-y-1 transition-transform" /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Category Breakdown */}
        <div className="card shadow-xl p-8 sm:p-10 border border-outline-variant/5 group animate-in fade-in slide-in-from-left-8 duration-700">
           <div className="mb-10 flex items-center justify-between">
              <div>
                 <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Category Breakdown</h2>
                 <p className="text-on-surface-variant font-medium">Distribution of your major expenses by category.</p>
              </div>
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center ring-2 ring-primary/10 shadow-sm">
                 <PieIcon size={24} className="text-primary" />
              </div>
           </div>
           <div className="h-[400px] w-full bg-surface-container-low/30 rounded-3xl p-6 ring-2 ring-white/50 backdrop-blur-sm shadow-inner relative overflow-hidden">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={categoryData}
                   innerRadius={90}
                   outerRadius={120}
                   paddingAngle={10}
                   dataKey="value"
                   strokeOpacity={0}
                 >
                   {categoryData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <ChartTooltip 
                   contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '1rem' }}
                 />
                 <Legend verticalAlign="bottom" height={36}/>
               </PieChart>
             </ResponsiveContainer>
             {/* Center Label */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-center">
                <p className="text-on-surface-variant text-xs font-extrabold uppercase tracking-[0.2em]">Total</p>
                <p className="text-4xl font-extrabold text-on-surface tracking-tighter">$84.2K</p>
             </div>
           </div>
        </div>

        {/* Spending Trends */}
        <div className="card shadow-xl p-8 sm:p-10 border border-outline-variant/5 animate-in fade-in slide-in-from-right-8 duration-700">
           <div className="mb-10 flex items-center justify-between">
              <div>
                 <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Savings vs Spending</h2>
                 <p className="text-on-surface-variant font-medium">Monitoring your financial efficiency over time.</p>
              </div>
              <div className="w-14 h-14 bg-secondary/5 rounded-2xl flex items-center justify-center ring-2 ring-secondary/10 shadow-sm">
                 <TrendingUp size={24} className="text-secondary" />
              </div>
           </div>
           <div className="h-[400px] w-full bg-surface-container-low/30 rounded-3xl p-6 ring-2 ring-white/50 backdrop-blur-sm shadow-inner overflow-hidden">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={trendData}>
                 <defs>
                   <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3525cd" stopOpacity={0.15}/>
                     <stop offset="95%" stopColor="#3525cd" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#006c49" stopOpacity={0.15}/>
                     <stop offset="95%" stopColor="#006c49" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontWeight: 600, fontSize: 13}} dy={15} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontWeight: 600, fontSize: 13}} />
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                 <ChartTooltip contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                 <Area type="monotone" dataKey="spend" stroke="#3525cd" strokeWidth={4} fillOpacity={1} fill="url(#colorSpend)" />
                 <Area type="monotone" dataKey="savings" stroke="#006c49" strokeWidth={4} fillOpacity={1} fill="url(#colorSavings)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Detail Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="card shadow-md p-8 border border-outline-variant/10 transform-gpu transition-all hover:scale-[1.03] hover:shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                   <ArrowUpRight size={22} className="text-primary" />
                </div>
                <h3 className="text-xl font-extrabold text-on-surface tracking-tight">Highest Bill</h3>
            </div>
            <p className="text-3xl font-extrabold text-on-surface tracking-tighter mb-1">$4,500.00</p>
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest leading-none mb-6">Amazon Infrastructure</p>
            <button className="flex items-center gap-2 text-primary font-bold text-sm group">
               View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>

         <div className="card shadow-md p-8 border border-outline-variant/10 transform-gpu transition-all hover:scale-[1.03] hover:shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                   <TrendingDown size={22} className="text-secondary" />
                </div>
                <h3 className="text-xl font-extrabold text-on-surface tracking-tight">Recurring Avg</h3>
            </div>
            <p className="text-3xl font-extrabold text-on-surface tracking-tighter mb-1">$1.2K / mo</p>
            <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest leading-none mb-6">Down by 15% from Feb</p>
            <button className="flex items-center gap-2 text-primary font-bold text-sm group">
               View Patterns <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>

         <div className="card shadow-md p-8 border border-outline-variant/10 transform-gpu transition-all hover:scale-[1.03] hover:shadow-2xl bg-linear-to-br from-surface-container-highest to-surface-container/50">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl shadow-lg">
                   <PieIcon size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-extrabold text-on-surface tracking-tight">Optimize</h3>
            </div>
            <p className="text-on-surface-variant font-medium leading-relaxed mb-6">You could save up to <span className="text-primary font-bold">$450</span> by switching your internet provider.</p>
            <button className="btn-primary py-2.5 w-full font-bold shadow-lg shadow-primary/20 active:scale-95">Analyze Recommendations</button>
         </div>
      </div>
    </div>
  );
};

export default Analytics;
