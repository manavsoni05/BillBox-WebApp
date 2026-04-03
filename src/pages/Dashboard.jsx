import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Receipt, 
  Calendar,
  ArrowUpRight,
  Plus,
  ArrowRight,
  Loader2,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import useUserStore from '../store/userStore';
import { getRecentReceipts } from '../services/receiptService';

const Dashboard = () => {
  const { user } = useUserStore();
  const [recentReceipts, setRecentReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for the chart
  const data = [
    { name: 'Mon', total: 4500 },
    { name: 'Tue', total: 3200 },
    { name: 'Wed', total: 5800 },
    { name: 'Thu', total: 2100 },
    { name: 'Fri', total: 8900 },
    { name: 'Sat', total: 4300 },
    { name: 'Sun', total: 2500 },
  ];

  useEffect(() => {
    const fetchRecent = async () => {
      if (user?.uid) {
        try {
          const receipts = await getRecentReceipts(user.uid, 5);
          setRecentReceipts(receipts);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchRecent();
  }, [user]);

  const stats = [
    { label: 'Total Spending', value: '$84,232', change: '+12.5%', isUp: true, icon: DollarSign, color: 'bg-primary/10 text-primary' },
    { label: 'Average Bill', value: '$1,234', change: '-2.1%', isUp: false, icon: Receipt, color: 'bg-secondary/10 text-secondary' },
    { label: 'Total Saved', value: '$45,120', change: '+8.4%', isUp: true, icon: TrendingUp, color: 'bg-amber-500/10 text-amber-600' },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-4 py-8 bg-surface-container/20 rounded-3xl border border-outline-variant/10 shadow-sm transition-all hover:shadow-md">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-on-surface tracking-tighter leading-none">Financial Overview</h1>
          <p className="text-on-surface-variant font-medium text-lg flex items-center gap-3">
            <Clock size={18} className="text-primary/60" /> Your spending trends analyzed for <span className="text-primary font-bold">April 2026</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn-secondary h-14 px-8 font-bold flex items-center gap-3 active:scale-95 group">
             <Calendar size={20} className="group-hover:rotate-6 transition-transform" /> Last 30 Days
          </button>
          <button className="btn-primary h-14 px-8 font-bold flex items-center gap-3 active:scale-95 shadow-xl group">
             <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" /> New Receipt
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="card group relative overflow-hidden ring-1 ring-outline-variant/5 shadow-lg hover:shadow-2xl hover:scale-[1.02] duration-500 transform-gpu">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-6">
                <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center transform transition-transform group-hover:scale-110 duration-500 shadow-xl ring-4 ring-white/50 backdrop-blur-sm`}>
                  <stat.icon size={28} />
                </div>
                <div>
                   <p className="text-on-surface-variant/70 text-sm font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                   <p className="text-4xl font-extrabold text-on-surface tracking-tight leading-none">{stat.value}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm ${stat.isUp ? 'bg-secondary/10 text-secondary' : 'bg-error/10 text-error'}`}>
                 {stat.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                 {stat.change}
              </div>
            </div>
            <div className="mt-8 flex items-center gap-3 text-on-surface-variant/50 text-xs font-bold uppercase tracking-wider group-hover:text-primary transition-colors">
               See detailed breakdown <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Chart Section */}
        <div className="lg:col-span-2 card shadow-xl h-[560px] md:h-[600px] flex flex-col p-8 sm:p-10 border border-outline-variant/5 relative overflow-hidden animate-in fade-in slide-in-from-left-8 duration-700">
           <div className="absolute top-0 right-0 p-8">
              <div className="bg-primary/5 px-4 py-2 rounded-xl border border-primary/10 text-primary font-bold text-sm shadow-sm">Live Updates</div>
           </div>
           <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-2">Weekly Expenditure</h2>
              <p className="text-on-surface-variant font-medium">Monitoring your highest spending days this week.</p>
           </div>
           <div className="flex-1 w-full bg-surface-container-lowest/50 rounded-3xl p-6 ring-1 ring-outline-variant/5 shadow-inner">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 600 }}
                    dy={15}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 13, fontWeight: 600 }}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }} 
                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '1.5rem' }}
                    itemStyle={{ fontWeight: 'bold' }}
                    labelStyle={{ fontWeight: '800', marginBottom: '0.5rem', opacity: 0.5 }}
                  />
                  <Bar dataKey="total" radius={[12, 12, 12, 12]} barSize={40}>
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 4 ? '#3525cd' : '#4f46e520'} 
                        className="transition-all duration-300 hover:fill-primary"
                      />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Recent Transactions */}
        <div className="card shadow-xl p-8 sm:p-10 flex flex-col border border-outline-variant/5 animate-in fade-in slide-in-from-right-8 duration-700">
           <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">Recent Activity</h2>
              <button className="text-primary font-bold text-sm hover:underline flex items-center gap-2 group">
                 View All <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
           </div>
           
           <div className="flex-1 space-y-6">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                   <Loader2 className="animate-spin text-primary w-10 h-10" />
                </div>
              ) : recentReceipts.length > 0 ? (
                recentReceipts.map((receipt, idx) => (
                  <div key={idx} className="flex items-center gap-5 p-5 bg-surface-container-low rounded-3xl transition-all hover:bg-surface-container-high cursor-pointer ring-1 ring-outline-variant/5 shadow-sm transform hover:-translate-y-1">
                    <div className="w-14 h-14 bg-white/80 rounded-2xl flex items-center justify-center shadow-md ring-2 ring-primary/5">
                       <Receipt className="text-primary w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="font-extrabold text-on-surface truncate tracking-tight">{receipt.vendor || 'Unknown Vendor'}</p>
                       <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1 opacity-60">{receipt.category || 'General'}</p>
                    </div>
                    <div className="text-right">
                       <p className="font-extrabold text-on-surface tracking-tighter text-lg">${receipt.amount}</p>
                       <p className="text-[10px] text-on-surface-variant/50 font-bold uppercase tracking-tighter">{receipt.date || 'Today'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8 bg-surface-container-low rounded-3xl border border-dashed border-primary/20">
                   <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center">
                      <Receipt className="text-primary/30 w-8 h-8" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-on-surface font-bold">No recent bills</p>
                      <p className="text-on-surface-variant text-sm">Upload your first receipt to see it here.</p>
                   </div>
                   <button className="btn-primary py-2 px-6 text-sm font-bold shadow-md">Add Now</button>
                </div>
              )}
           </div>

           <div className="mt-10 p-6 bg-linear-to-br from-primary to-primary-container rounded-3xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
              <p className="text-white font-extrabold text-lg mb-2 relative z-10 tracking-tight leading-none">Smart Insights</p>
              <p className="text-white/80 text-sm font-medium relative z-10 leading-relaxed">You saved <span className="text-white font-bold">$120</span> more than last month. Keep up the momentum!</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
