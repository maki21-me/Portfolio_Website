import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { FiGrid, FiFolder, FiMessageSquare, FiExternalLink, FiLogOut } from 'react-icons/fi';
import ProjectsManager from './ProjectsManager';
import MessagesViewer from './MessagesViewer';
import Dashboard from './Dashboard';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: FiGrid },
    { name: 'Projects', path: '/admin/projects', icon: FiFolder },
    { name: 'Messages', path: '/admin/messages', icon: FiMessageSquare },
  ];

  const handleViewSite = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white flex overflow-hidden">
      {/* Sidebar background glow */}
      <div className="fixed top-0 left-0 w-64 h-full bg-blue-900/5 blur-[80px] pointer-events-none" />
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#05011c] border-r border-white/5 flex flex-col relative z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <FiGrid className="text-white text-lg" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Meklit Admin
          </h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.slice(0, 1).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="text-xl" />
                {item.name}
              </Link>
            )
          })}
          
          <div className="my-4 border-t border-white/5" />
          
          {navItems.slice(1).map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-white/5 text-white border border-white/10' 
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="text-xl" />
                {item.name}
              </Link>
            )
          })}

          <button
            onClick={handleViewSite}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-zinc-500 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <FiExternalLink className="text-xl" />
            View Website
          </button>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl font-medium transition-all"
          >
            <FiLogOut className="text-xl" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 px-10 flex items-center justify-between border-b border-white/5 bg-[#030014]/50 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 text-sm">Welcome back,</span>
            <span className="text-blue-400 font-semibold text-sm">admin</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-blue-500/20">
              AD
            </div>
          </div>
        </header>

        {/* Main Scrolling Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#030014]">
          <div className="py-6 px-10 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<ProjectsManager />} />
              <Route path="/messages" element={<MessagesViewer />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
