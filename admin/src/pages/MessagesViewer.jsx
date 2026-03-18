import React, { useState, useEffect } from 'react';
import { FiTrash2, FiMail, FiSend, FiCheckCircle, FiRotateCw, FiMessageSquare, FiCalendar, FiArrowRight, FiActivity } from 'react-icons/fi';

export default function MessagesViewer() {
  const [messages, setMessages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState('all'); // all, pending, replied
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure you want to delete this message?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/messages/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleReply = async (id) => {
    if (!replyText.trim()) return;
    setSending(true);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/messages/reply/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ replyText })
      });
      
      if (res.status === 404) {
        throw new Error("Reply endpoint not found. Please verify backend routes.");
      }

      const data = await res.json();
      if (data.success) {
        setReplyText('');
        setReplyingTo(null);
        fetchMessages();
      } else {
        alert(data.message || "Failed to send response.");
      }
    } catch (error) {
      console.error('Reply Error:', error);
      alert(error.message);
    } finally {
      setSending(false);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'pending') return !msg.isReplied;
    if (filter === 'replied') return msg.isReplied;
    return true;
  });

  return (
    <div className="space-y-6 text-white max-w-5xl mx-auto pb-20 animate-in fade-in duration-500">
      {/* Header - Compact */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Messages</h2>
          <p className="text-zinc-500 text-xs mt-1">Manage client communications</p>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 backdrop-blur-sm">
          {['all', 'pending', 'replied'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${filter === f ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-4">
           <FiRotateCw className="text-2xl text-blue-500 animate-spin" />
           <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Loading incoming transmissions...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredMessages.map((msg) => (
            <div key={msg._id} className="bg-[#0c0d1b] border border-white/5 rounded-2xl overflow-hidden shadow-xl transition-all hover:border-white/10">
              
              {/* Card Header */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-lg font-bold text-white uppercase">
                    {msg.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      {msg.name}
                      {msg.isReplied && <FiCheckCircle className="text-blue-500 text-[10px]" />}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] mt-0.5">
                      <FiMail className="opacity-50" />
                      <span>{msg.email}</span>
                      <span className="opacity-10">|</span>
                      <FiCalendar className="opacity-50" />
                      <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => handleDelete(msg._id)}
                  className="p-2.5 rounded-lg bg-red-500/5 text-red-500/30 hover:bg-red-500/20 hover:text-red-400 transition-all border border-red-500/5"
                  title="Delete message"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-6">
                <div className="text-zinc-300 text-sm leading-relaxed border-l-2 border-blue-500/20 pl-4 py-1">
                  {msg.message}
                </div>

                {/* Reply Section */}
                {msg.isReplied ? (
                  <div className="pt-4 border-t border-white/5 bg-white/[0.005] -mx-6 px-6 -mb-6 pb-6">
                    <div className="flex items-center gap-2 mb-3">
                       <FiArrowRight className="text-blue-500 text-xs" />
                       <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Your Response</span>
                    </div>
                    <div className="text-zinc-500 text-xs italic leading-relaxed">
                      "{msg.replyContent}"
                    </div>
                  </div>
                ) : (
                  <div className="pt-2">
                    {replyingTo === msg._id ? (
                      <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                        <textarea 
                          autoFocus
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all resize-none min-h-[120px] text-sm"
                          placeholder="Type your response..."
                        />
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => { setReplyingTo(null); setReplyText(''); }} 
                            className="px-4 py-2 rounded-lg text-[10px] font-bold uppercase text-zinc-500 hover:text-white transition-colors"
                          >
                            Cancel
                          </button>
                          <button 
                            disabled={sending || !replyText.trim()}
                            onClick={() => handleReply(msg._id)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg text-[10px] font-bold uppercase shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50"
                          >
                            {sending ? <FiRotateCw className="animate-spin text-xs" /> : <FiSend className="text-xs" />}
                            {sending ? 'Sending...' : 'Send Reply'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setReplyingTo(msg._id)}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-lg text-[10px] font-bold uppercase border border-white/5 transition-all"
                      >
                        <FiSend /> Reply
                      </button>
                    ) }
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredMessages.length === 0 && (
            <div className="py-20 text-center bg-white/[0.01] rounded-2xl border border-dashed border-white/5">
              <FiMail className="text-4xl text-zinc-800 mx-auto mb-4 opacity-20" />
              <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">No messages found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
