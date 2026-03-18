import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFolder, FiMessageSquare, FiTrendingUp, FiActivity, FiArrowRight } from 'react-icons/fi';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ projects: 0, messages: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const [projRes, msgRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/projects`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${import.meta.env.VITE_API_URL}/messages`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);
        const projects = await projRes.json();
        const messages = await msgRes.json();
        
        setStats({ projects: projects.length, messages: messages.length });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: <FiFolder className="text-3xl text-blue-400" />,
      bg: "from-blue-900/40 to-blue-900/10",
      border: "border-blue-500/30"
    },
    {
      title: "Total Messages",
      value: stats.messages,
      icon: <FiMessageSquare className="text-3xl text-purple-400" />,
      bg: "from-purple-900/40 to-purple-900/10",
      border: "border-purple-500/30"
    },
    {
      title: "Profile Views",
      value: "1,204",
      icon: <FiActivity className="text-3xl text-green-400" />,
      bg: "from-green-900/40 to-green-900/10",
      border: "border-green-500/30",
      trend: "+12% this week"
    },
    {
      title: "Engagement Rate",
      value: "8.5%",
      icon: <FiTrendingUp className="text-3xl text-orange-400" />,
      bg: "from-orange-900/40 to-orange-900/10",
      border: "border-orange-500/30",
      trend: "+2.1% this week"
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Dashboard Overview</h1>
          <p className="text-zinc-500 text-xs">Monitor your portfolio activities and message inquiries</p>
        </div>
        <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg backdrop-blur-md">
          <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold mb-0">Last updated</p>
          <p className="text-xs font-mono text-zinc-400">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="p-4 rounded-xl bg-[#0a061e] border border-white/5 flex items-center gap-4 group hover:border-white/10 transition-all duration-300">
            <div className={`p-3 rounded-lg bg-white/5 border border-white/5 group-hover:scale-105 transition-transform duration-500`}>
              {React.cloneElement(card.icon, { className: 'text-2xl ' + card.icon.props.className.split(' ').filter(c => !c.startsWith('text-3xl')).join(' ') })}
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] font-semibold mb-0.5 uppercase tracking-wider">{card.title.split(' ')[1] || card.title}</p>
              <p className="text-xl font-bold text-white">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0a061e] border border-white/5 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Recent Activity</h3>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
            <p className="text-zinc-600 text-xs italic">No recent activities to show.</p>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-[#0a061e] border border-white/5 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Quick Access</h3>
          
          <div className="w-full space-y-3 pr-1">
            <button 
              onClick={() => navigate('/projects/new')}
              className="w-full p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-600/20 border border-blue-500/20 text-blue-500">
                  <FiFolder className="text-lg" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Add Project</p>
                  <p className="text-[10px] text-zinc-500 line-clamp-1">Create entry</p>
                </div>
              </div>
              <FiArrowRight className="text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
            
            <button 
              onClick={() => navigate('/messages')}
              className="w-full p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-600/20 border border-purple-500/20 text-purple-500">
                  <FiMessageSquare className="text-lg" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Messages</p>
                  <p className="text-[10px] text-zinc-500 line-clamp-1">Check inbox</p>
                </div>
              </div>
              <FiArrowRight className="text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>

            <button 
              onClick={() => window.location.reload()}
              className="w-full p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-600/20 border border-green-500/20 text-green-500">
                  <FiActivity className="text-lg" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Refresh Stats</p>
                  <p className="text-[10px] text-zinc-500 line-clamp-1">Update metrics</p>
                </div>
              </div>
              <FiArrowRight className="text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
