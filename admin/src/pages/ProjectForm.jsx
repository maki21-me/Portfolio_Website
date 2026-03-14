import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiSave, FiCheck, FiX } from 'react-icons/fi';

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
          const res = await fetch(`http://localhost:5001/api/projects`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          const project = data.find(p => p._id === id);
          if (project) {
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
        const uploadRes = await fetch("http://localhost:5001/api/upload", {
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
        await fetch(`http://localhost:5001/api/projects/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
      
      await fetch('http://localhost:5001/api/projects', {
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
            <h2 className="text-3xl font-black text-white tracking-tight">{id ? 'Update Project Core' : 'Initialize New Construct'}</h2>
            <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">{id ? 'Global ID: ' + id.slice(-8) : 'Manual Input Protocol'}</p>
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
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-1">Asset Designation</label>
                <input 
                  required 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  className="w-full p-6 border border-white/5 rounded-3xl bg-black/40 text-white focus:ring-4 focus:ring-blue-600/20 outline-none transition-all placeholder:text-zinc-800 font-bold text-2xl" 
                  placeholder="The Project Name" 
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-1">Classification</label>
                  <select 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})} 
                    className="w-full p-6 border border-white/5 rounded-3xl bg-black/40 text-white focus:ring-2 focus:ring-blue-600/30 outline-none transition-all font-bold text-sm [&>option]:bg-[#0f1021]"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-1">Placement Priority</label>
                  <div className="flex bg-black/40 p-1.5 rounded-3xl border border-white/5 h-[76px]">
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, isFeatured: false})}
                      className={`flex-1 rounded-2xl text-[10px] font-black uppercase transition-all tracking-widest ${!formData.isFeatured ? 'bg-zinc-700 text-white shadow-2xl' : 'text-zinc-600 hover:text-zinc-400'}`}
                    >
                      Library
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, isFeatured: true})}
                      className={`flex-1 rounded-2xl text-[10px] font-black uppercase transition-all tracking-widest ${formData.isFeatured ? 'bg-blue-600 text-white shadow-2xl' : 'text-zinc-600 hover:text-zinc-400'}`}
                    >
                      Home Section
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-1">Deep Architecture Description</label>
                <textarea 
                  required 
                  rows={6} 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  className="w-full p-6 border border-white/5 rounded-3xl bg-black/40 text-white focus:ring-4 focus:ring-blue-600/20 outline-none transition-all resize-none placeholder:text-zinc-800 font-medium text-base leading-relaxed" 
                  placeholder="Explain the technical challenges..." 
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-1">Tech Stack (comma separated)</label>
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
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Visual Core</h4>
                    <span className="text-[9px] text-zinc-600 font-bold uppercase italic">Recommended: 1200 x 800px</span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div className="relative group overflow-hidden rounded-[32px] border-2 border-dashed border-white/10 hover:border-blue-500/50 bg-black/40 transition-all h-64 flex items-center justify-center">
                      <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                      <div className="p-10 flex flex-col items-center justify-center gap-4 text-zinc-600 group-hover:text-blue-400 transition-colors">
                        <FiPlus size={40} className="group-hover:rotate-90 transition-transform duration-500" />
                        <div className="text-xs font-black uppercase tracking-widest text-center">{imageFile ? imageFile.name.slice(0, 30) : 'Click to Upload Media'}</div>
                      </div>
                      {(imageFile || formData.imageUrl) && (
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                           <img src={imageFile ? URL.createObjectURL(imageFile) : formData.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase text-zinc-700 ml-1">External Storage URL</label>
                      <input type="text" placeholder="https://..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full p-4 border border-white/5 rounded-2xl bg-black/40 text-white focus:ring-2 focus:ring-white/20 outline-none transition-all placeholder:text-zinc-800 text-xs" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Global Hub Integration</h4>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase text-zinc-700 ml-1">Live Endpoint</label>
                       <input type="text" placeholder="https://your-site.com" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full p-5 border border-white/5 rounded-2xl bg-black/40 text-white focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-sm font-bold" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase text-zinc-700 ml-1">Source Repository</label>
                       <input type="text" placeholder="https://github.com/..." value={formData.github} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full p-5 border border-white/5 rounded-2xl bg-black/40 text-white focus:ring-2 focus:ring-purple-500/20 outline-none transition-all text-sm font-bold" />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-7 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-800 text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-sm shadow-[0_30px_60px_rgba(59,130,246,0.3)] hover:shadow-[0_40px_80px_rgba(59,130,246,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] border-t border-white/20 disabled:opacity-50"
                >
                  {loading ? 'Processing System...' : (id ? 'Sync Data Updates' : 'Initialize Portfolio Construct')}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
