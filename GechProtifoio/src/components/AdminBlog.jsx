import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaPlus, FaCheckCircle, FaSpinner, FaLock, FaUser } from 'react-icons/fa';

const AdminBlog = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loginLoading, setLoginLoading] = useState(false);
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        tags: '',
        published: true
    });
    const [coverImage, setCoverImage] = useState(null);
    const [extraMedia, setExtraMedia] = useState([]);

    useEffect(() => {
        const savedAuth = localStorage.getItem('blog_admin_auth');
        if (savedAuth) {
            setAuthenticated(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setError('');
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/login`, loginData);
            const authString = btoa(`${loginData.email}:${loginData.password}`);
            localStorage.setItem('blog_admin_auth', authString);
            setAuthenticated(true);
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid email or password');
        } finally {
            setLoginLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('blog_admin_auth');
        setAuthenticated(false);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'cover_image') {
            setCoverImage(e.target.files[0]);
        } else {
            setExtraMedia([...e.target.files]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const authHeader = localStorage.getItem('blog_admin_auth');

        try {
            const postData = new FormData();
            postData.append('title', formData.title);
            postData.append('excerpt', formData.excerpt);
            postData.append('content', formData.content);
            postData.append('published', formData.published);

            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            postData.append('tags', JSON.stringify(tagsArray));

            if (coverImage) {
                postData.append('cover_image', coverImage);
            }

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/blog`, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Basic ${authHeader}`
                }
            });

            if (extraMedia.length > 0) {
                const mediaData = new FormData();
                extraMedia.forEach(file => {
                    mediaData.append('media', file);
                });
                await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/${res.data.id}/media`, mediaData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Basic ${authHeader}`
                    }
                });
            }

            setSuccess(true);
            setFormData({ title: '', excerpt: '', content: '', tags: '', published: true });
            setCoverImage(null);
            setExtraMedia([]);
        } catch (error) {
            console.error("Error creating post:", error);
            if (error.response?.status === 401) {
                handleLogout();
                alert("Session expired. Please login again.");
            } else {
                alert("Failed to create post. Check console for details.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass p-8 md:p-12 rounded-[2rem] w-full max-w-md border border-white/5 shadow-2xl relative"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-t-[2rem]"></div>
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-cyan-500/20 shadow-inner">
                            <FaLock className="text-3xl text-cyan-400" />
                        </div>
                        <h2 className="text-3xl font-extrabold font-space uppercase tracking-tighter">Admin Portal</h2>
                        <p className="text-gray-500 text-xs mt-3 font-fira tracking-widest uppercase">Identity Verification Required</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                                <FaUser />
                            </div>
                            <input
                                type="email"
                                placeholder="Admin Email"
                                required
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all font-ibm-plex text-sm"
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                                <FaLock />
                            </div>
                            <input
                                type="password"
                                placeholder="Security Password"
                                required
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all font-ibm-plex text-sm"
                            />
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="text-red-400 text-[10px] text-center font-bold uppercase tracking-wider"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={loginLoading}
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-500/20"
                        >
                            {loginLoading ? <FaSpinner className="animate-spin" /> : 'Enter Dashboard'}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030712] text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-extrabold font-space text-[#06b6d4] uppercase mb-2">Story Editor</h2>
                        <p className="text-gray-400 font-fira tracking-widest uppercase text-xs">Crafting your next masterpiece</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-[10px] bg-white/5 hover:bg-red-500/10 px-5 py-2 rounded-full border border-white/10 text-gray-400 hover:text-red-400 transition-all font-bold uppercase tracking-widest"
                    >
                        Secure Exit
                    </button>
                </div>

                {success && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-500/10 border border-green-500/30 p-5 rounded-2xl mb-10 flex items-center gap-4 text-green-400"
                    >
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <FaCheckCircle className="text-xl" />
                        </div>
                        <span className="font-bold uppercase text-xs tracking-wider">The universe has received your story!</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10 glass p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-50"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-bold font-fira uppercase text-gray-500 mb-3 tracking-widest">Post Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all font-space"
                                    placeholder="The Future of Web 3.0"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold font-fira uppercase text-gray-500 mb-3 tracking-widest">Quick Excerpt</label>
                                <textarea
                                    name="excerpt"
                                    rows="3"
                                    value={formData.excerpt}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all text-sm font-ibm-plex"
                                    placeholder="Summarize your story for the card preview..."
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold font-fira uppercase text-gray-500 mb-3 tracking-widest">Metadata Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all text-sm font-fira"
                                    placeholder="react, tutorial, architecture"
                                />
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <input
                                    type="checkbox"
                                    name="published"
                                    id="published"
                                    checked={formData.published}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 accent-cyan-500 cursor-pointer"
                                />
                                <label htmlFor="published" className="text-xs font-bold text-gray-400 cursor-pointer uppercase tracking-widest">Visible to World</label>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-[10px] font-bold font-fira uppercase text-gray-500 mb-3 tracking-widest">Hero Image</label>
                                <div className="relative group cursor-pointer border-2 border-dashed border-white/10 rounded-[2rem] p-10 hover:border-cyan-500/40 transition-all text-center bg-white/2">
                                    <input
                                        type="file"
                                        name="cover_image"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        accept="image/*"
                                    />
                                    <div className="relative z-0">
                                        <FaUpload className="mx-auto text-4xl text-gray-700 group-hover:text-cyan-400 mb-5 transition-all transform group-hover:-translate-y-1" />
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{coverImage ? coverImage.name : 'Select Cover'}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold font-fira uppercase text-gray-500 mb-3 tracking-widest">Story Gallery</label>
                                <div className="relative group cursor-pointer border-2 border-dashed border-white/10 rounded-[2rem] p-10 hover:border-blue-500/40 transition-all text-center bg-white/2">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        accept="image/*,video/*"
                                    />
                                    <div className="relative z-0">
                                        <FaPlus className="mx-auto text-4xl text-gray-700 group-hover:text-blue-400 mb-5 transition-all transform group-hover:scale-110" />
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{extraMedia.length > 0 ? `${extraMedia.length} Resources Attached` : 'Attach Photos/Videos'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold font-fira uppercase text-gray-500 mb-3 tracking-widest">The Narrative (Markdown)</label>
                        <textarea
                            name="content"
                            required
                            rows="18"
                            value={formData.content}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-8 text-white focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all font-ibm-plex text-[15px] leading-relaxed"
                            placeholder="# Write your heart out..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 transition-all transform active:scale-[0.98] shadow-xl ${loading ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-white hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]'
                            }`}
                    >
                        {loading ? (
                            <><FaSpinner className="animate-spin" /> Transmitting Data...</>
                        ) : (
                            'Establish Publication'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminBlog;
