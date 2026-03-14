import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Web App', imageUrl: '', link: '', github: '', techStack: ''
  });
  const [editingId, setEditingId] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  
  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let uploadedImageUrl = formData.imageUrl;

    // 1. Upload image if selected
    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append("image", imageFile);
      
      try {
        const uploadRes = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          },
          body: uploadData
        });
        const uploadDataRes = await uploadRes.json();
        if(uploadDataRes.success) {
          uploadedImageUrl = uploadDataRes.imageUrl;
        } else {
          alert("Image upload failed");
          return;
        }
      } catch (err) {
        console.error("Error uploading image", err);
        return;
      }
    }

    // Process optional tech stack
    const techArray = formData.techStack ? formData.techStack.split(',').map(s => s.trim()).filter(Boolean) : [];
    
    const payload = { ...formData, imageUrl: uploadedImageUrl, techStack: techArray };
    try {
      if (editingId) {
        // Assume PUT endpoint exists or just delete and recreate for simplicity in MVP
        await fetch(`http://localhost:5000/api/projects/${editingId}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
      }
      await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(payload)
      });
      
      fetchProjects();
      setIsModalOpen(false);
      setFormData({ title: '', description: '', category: 'Web App', imageUrl: '', link: '', github: '', techStack: '' });
      setImageFile(null);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`http://localhost:5000/api/projects/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const openEdit = (project) => {
    setFormData({ ...project, techStack: project.techStack.join(', ') });
    setEditingId(project._id);
    setIsModalOpen(true);
  };

  const categories = ["Web App", "Mobile App", "Dashboard"];

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Projects</h2>
        <button 
          onClick={() => {
            setFormData({ title: '', description: '', category: 'Web App', imageUrl: '', link: '', github: '', techStack: '' });
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all font-medium"
        >
          <FiPlus /> Add Project
        </button>
      </div>

      <div className="bg-white/5 rounded-2xl shadow-xl border border-white/10 overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-zinc-400 text-sm">
              <th className="p-4 font-medium uppercase tracking-wider">Project</th>
              <th className="p-4 font-medium uppercase tracking-wider">Category</th>
              <th className="p-4 font-medium uppercase tracking-wider">Tech Stack</th>
              <th className="p-4 font-medium uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects.map(project => (
              <tr key={project._id} className="hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white text-[15px]">{project.title}</div>
                  <div className="text-sm text-zinc-500 truncate max-w-xs">{project.description}</div>
                </td>
                <td className="p-4"><span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg text-xs font-medium">{project.category}</span></td>
                <td className="p-4 text-sm text-zinc-400">{project.techStack?.join(', ')}</td>
                <td className="p-4 text-right">
                  <button onClick={() => openEdit(project)} className="text-zinc-400 hover:text-blue-400 p-2 transition-colors"><FiEdit2 /></button>
                  <button onClick={() => handleDelete(project._id)} className="text-zinc-400 hover:text-red-400 p-2 transition-colors"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan="4" className="p-8 text-center text-zinc-500 font-medium">No projects found. Add one!</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f1021] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white text-2xl transition-colors">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Project Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 border border-white/10 rounded-xl bg-black/50 text-white focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 border border-white/10 rounded-xl bg-black/50 text-white focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all [&>option]:bg-[#0f1021]">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Description</label>
                <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 border border-white/10 rounded-xl bg-black/50 text-white focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all resize-none placeholder:text-zinc-600" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Project Image (File or URL)</label>
                  <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full text-sm text-zinc-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20 file:transition-colors file:cursor-pointer cursor-pointer" />
                  <input type="text" placeholder="Or enter image URL..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full p-3 border border-white/10 rounded-xl bg-black/50 text-white focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-600 mt-2 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Live Demo Link</label>
                  <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full p-3 border border-white/10 rounded-xl bg-black/50 text-white focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-600" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">GitHub Link</label>
                  <input type="text" value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full p-3 border border-white/10 rounded-xl bg-black/50 text-white focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Tech Stack (Optional, comma separated)</label>
                  <input type="text" placeholder="React, Node, Tailwind" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="w-full p-3 border border-white/10 rounded-xl bg-black/50 text-white focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-600" />
                </div>
              </div>
              <div className="pt-6 flex justify-end gap-4 border-t border-white/5 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-zinc-300 hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl font-medium transition-all">Cancel</button>
                <button type="submit" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
