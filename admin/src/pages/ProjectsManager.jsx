import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiFolder } from 'react-icons/fi';
import { getApiUrl } from '../utils/api';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  
  const fetchProjects = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(getApiUrl('/projects'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure you want to delete this project?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(getApiUrl(`/projects/${id}`), { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="space-y-12 text-white max-w-[1600px] mx-auto pb-32">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">Project Repository</h2>
          <p className="text-zinc-500 text-sm mt-2 font-medium">Manage your portfolio inventory and determine homepage visibility.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] font-bold uppercase text-blue-400 tracking-widest">
            System Active
          </div>
          <button 
            onClick={() => navigate('/projects/new')}
            className="group flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-2xl font-bold uppercase text-xs hover:bg-blue-600 hover:text-white transition-all shadow-xl hover:shadow-blue-600/20"
          >
            <FiPlus className="text-lg group-hover:rotate-90 transition-transform" /> 
            Add New Project
          </button>
        </div>
      </div>

      {/* PROJECT INVENTORY */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold text-zinc-300 flex items-center gap-3">
            <FiFolder className="text-blue-500" />
            Live Inventory
            <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-zinc-500 ml-2">{projects.length} Total</span>
          </h3>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Homepage Section</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="text-[10px] font-bold text-zinc-500 uppercase">Library Only</span>
            </div>
          </div>
        </div>

        <div className="bg-[#05011c] rounded-[40px] shadow-2xl border border-white/5 overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-zinc-500 text-[9px] uppercase tracking-widest font-bold">
                  <th className="p-8">Details & Identity</th>
                  <th className="p-8 text-center">Category</th>
                  <th className="p-8 text-center">Visibility</th>
                  <th className="p-8 text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map(project => (
                  <tr key={project._id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="p-8">
                      <div className="flex items-center gap-6">
                        <div className="relative shrink-0">
                          {project.imageUrl ? (
                            <img src={project.imageUrl} alt="" className="w-20 h-20 rounded-3xl object-cover border border-white/10 shadow-2xl transition-transform group-hover:scale-105" />
                          ) : (
                            <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-800 font-black italic text-[10px]">No Asset</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white text-lg tracking-tight leading-none mb-2">{project.title}</div>
                          <div className="text-zinc-500 text-xs font-medium line-clamp-1 max-w-sm">{project.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-8 text-center">
                      <span className="px-5 py-2 bg-zinc-500/5 border border-white/5 text-zinc-400 rounded-2xl text-[10px] font-black uppercase tracking-widest">{project.category}</span>
                    </td>
                    <td className="p-8 text-center">
                      {project.isFeatured ? 
                        <div className="flex flex-col items-center gap-1">
                          <span className="px-4 py-1.5 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase rounded-full border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">Homepage</span>
                          <span className="text-[8px] text-zinc-600 font-bold uppercase">Section Active</span>
                        </div> : 
                        <div className="flex flex-col items-center gap-1">
                          <span className="px-4 py-1.5 bg-zinc-500/10 text-zinc-600 text-[10px] font-black uppercase rounded-full border border-zinc-500/10">Library</span>
                          <span className="text-[8px] text-zinc-800 font-bold uppercase">Archive Only</span>
                        </div>
                      }
                    </td>
                    <td className="p-8 text-right">
                      <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <button 
                          onClick={() => navigate(`/projects/edit/${project._id}`)} 
                          className="w-12 h-12 flex items-center justify-center bg-zinc-500/10 text-zinc-400 hover:bg-blue-600 hover:text-white rounded-2xl transition-all border border-white/5"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(project._id)} 
                          className="w-12 h-12 flex items-center justify-center bg-zinc-500/10 text-zinc-400 hover:bg-red-600 hover:text-white rounded-2xl transition-all border border-white/5"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr><td colSpan="4" className="p-32 text-center">
                    <p className="text-zinc-700 font-bold uppercase tracking-widest text-xs animate-pulse">Inventory Empty</p>
                    <p className="text-zinc-800 text-xs mt-4 font-bold italic">Initialize your first piece using the add button</p>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
