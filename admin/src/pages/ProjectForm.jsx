import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiSave, FiCheck, FiX } from 'react-icons/fi';
import { getApiUrl } from '../utils/api';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web App',
    imageUrl: '',
    link: '',
    github: '',
    techStack: '',
    isFeatured: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        setFetching(true);
        try {
          const res = await fetch(getApiUrl(`/projects/${id}`), {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const project = await res.json();
          
          if (res.ok && project && !project.message) {
            console.log("✅ Project data loaded:", project.title);
            setFormData({
              title: project.title || '',
              description: project.description || '',
              category: project.category || 'Web App',
              imageUrl: project.imageUrl || '',
              link: project.link || '',
              github: project.github || '',
              techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : '',
              isFeatured: !!project.isFeatured
            });
          } else {
            console.error("❌ Failed to load project:", project.message || "Unknown error");
          }
        } catch (error) {
          console.error('Error fetching project:', error);
        } finally {
          setFetching(false);
        }
      };
      fetchProject();
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let uploadedImageUrl = formData.imageUrl;

    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append("image", imageFile);
      try {
        const uploadRes = await fetch(getApiUrl('/upload'), {
          method: "POST",
          headers: { 'Authorization': `Bearer ${token}` },
          body: uploadData
        });
        const uploadDataRes = await uploadRes.json();
        if (uploadDataRes.success) {
          uploadedImageUrl = uploadDataRes.imageUrl;
        } else {
          alert("Image upload failed");
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("Error uploading image", err);
        setLoading(false);
        return;
      }
    }

    const techArray = formData.techStack ? formData.techStack.split(',').map(s => s.trim()).filter(Boolean) : [];
    const payload = { ...formData, imageUrl: uploadedImageUrl, techStack: techArray };

    try {
      if (id) {
        // Since the current backend logic involves delete/re-post or similar, we follow the pattern in ProjectsManager
        await fetch(getApiUrl(`/projects/${id}`), {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
      
      await fetch(getApiUrl('/projects'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      navigate('/projects');
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["Web App", "Mobile App", "Dashboard"];

  if (fetching) return <div className="flex items-center justify-center h-96 text-zinc-500 font-bold animate-pulse">Synchronizing Data...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <div className="flex items-center gap-6">
          <Link to="/projects" className="p-4 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{id ? 'Update Project' : 'Add New Project'}</h2>
            <p className="text-blue-500 text-[9px] font-bold uppercase tracking-[0.3em] mt-1">{id ? 'ID: ' + String(id).slice(-8) : 'New Entry'}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0f1021] border border-white/10 rounded-[50px] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />
        
        <form onSubmit={handleSubmit} className="p-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column */}
            <div className="space-y-10">
              <div className="space-y-3">
                <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Project Title</label>
                <input 
                  required 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  className="w-full p-5 border border-white/5 rounded-2xl bg-black/40 text-white focus:ring-2 focus:ring-blue-600/20 outline-none transition-all placeholder:text-zinc-800 font-bold text-xl" 
                  placeholder="The Project Name" 
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Category</label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})} 
                    className="w-full p-5 border border-white/5 rounded-2xl bg-black/40 text-white focus:ring-2 focus:ring-blue-600/30 outline-none transition-all font-bold text-sm [&>option]:bg-[#0f1021]"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Visibility</label>
                  <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5 h-[64px]">
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, isFeatured: false})}
                      className={`flex-1 rounded-xl text-[9px] font-bold uppercase transition-all tracking-wider ${!formData.isFeatured ? 'bg-zinc-700 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
                    >
                      Library
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, isFeatured: true})}
                      className={`flex-1 rounded-xl text-[9px] font-bold uppercase transition-all tracking-wider ${formData.isFeatured ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}
                    >
                      Featured
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Project Description</label>
                <textarea 
                  required 
                  rows={6} 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  className="w-full p-5 border border-white/5 rounded-2xl bg-black/40 text-white focus:ring-2 focus:ring-blue-600/20 outline-none transition-all resize-none placeholder:text-zinc-800 font-medium text-sm leading-relaxed" 
                  placeholder="Explain the technical challenges..." 
                />
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Tech Stack</label>
                <input 
                  type="text" 
                  value={formData.techStack} 
                  onChange={e => setFormData({...formData, techStack: e.target.value})} 
                  className="w-full p-5 border border-white/5 rounded-2xl bg-black/40 text-white focus:ring-2 focus:ring-white/10 outline-none transition-all placeholder:text-zinc-800 text-sm font-bold" 
                  placeholder="React, Node.js, Tailwind..." 
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-10">
              <div className="bg-white/[0.02] border border-white/5 rounded-[40px] p-10 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-blue-500">Project Image</h4>
                    <span className="text-[9px] text-zinc-600 font-bold uppercase italic">Recommended: 1200 x 800px</span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div className="relative group overflow-hidden rounded-[32px] border-2 border-dashed border-white/10 hover:border-blue-500/50 bg-black/40 transition-all h-64 flex items-center justify-center">
                      <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                      <div className="p-10 flex flex-col items-center justify-center gap-4 text-zinc-600 group-hover:text-blue-400 transition-colors">
                        <FiPlus size={40} className="group-hover:rotate-90 transition-transform duration-500" />
                        <div className="text-[10px] font-bold uppercase tracking-widest text-center">{imageFile ? imageFile.name.slice(0, 30) : 'Click to Upload Media'}</div>
                      </div>
                      {(imageFile || formData.imageUrl) && (
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                           <img src={imageFile ? URL.createObjectURL(imageFile) : formData.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] font-bold uppercase text-zinc-700 ml-1">External Storage URL</label>
                      <input type="text" placeholder="https://..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full p-4 border border-white/5 rounded-2xl bg-black/40 text-white focus:ring-2 focus:ring-white/20 outline-none transition-all placeholder:text-zinc-800 text-xs" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Global Hub Integration</h4>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                       <label className="text-[8px] font-bold uppercase text-zinc-700 ml-1">Live Endpoint</label>
                       <input type="text" placeholder="https://your-site.com" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full p-5 border border-white/5 rounded-2xl bg-black/40 text-white focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-sm font-bold" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[8px] font-bold uppercase text-zinc-700 ml-1">Source Repository</label>
                       <input type="text" placeholder="https://github.com/..." value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full p-5 border border-white/5 rounded-2xl bg-black/40 text-white focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-sm font-bold" />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl hover:shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] border-t border-white/10 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (id ? 'Update Project' : 'Create Project')}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
