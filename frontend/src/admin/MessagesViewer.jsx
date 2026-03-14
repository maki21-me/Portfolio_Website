import React, { useState, useEffect } from 'react';
import { FiTrash2, FiMail } from 'react-icons/fi';

export default function MessagesViewer() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await fetch(`http://localhost:5000/api/messages/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Contact Messages</h2>
        <span className="text-sm font-medium text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">{messages.length} Total</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.map(msg => (
          <div key={msg._id} className="bg-white/5 p-6 rounded-2xl shadow-xl border border-white/10 flex flex-col backdrop-blur-sm group hover:border-blue-500/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-white text-lg">{msg.name}</h3>
                <a href={`mailto:${msg.email}`} className="text-blue-400 text-sm flex items-center gap-1 mt-1 hover:underline">
                  <FiMail /> {msg.email}
                </a>
              </div>
              <span className="text-xs text-zinc-500 font-medium">
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex-1 bg-black/40 rounded-xl p-4 text-zinc-300 text-sm leading-relaxed mb-6 whitespace-pre-wrap border border-white/5">
              {msg.message}
            </div>

            <div className="flex justify-end pt-4 border-t border-white/5">
              <button 
                onClick={() => handleDelete(msg._id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-20 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
              <FiMail className="text-2xl text-zinc-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No messages yet</h3>
            <p className="text-zinc-400">When someone contacts you, their message will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
