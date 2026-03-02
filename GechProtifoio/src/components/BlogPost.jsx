import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaHeart, FaRegHeart, FaPaperPlane, FaReply, FaCommentDots, FaUserCircle } from 'react-icons/fa';

// Default avatar path provided by user
const DEFAULT_AVATAR = "/images/avatars.png";

const CommentItem = ({ comment, allComments, onReply, activeReplyId, setActiveReplyId, replyData, setReplyData, handleCommentSubmit }) => {
    const replies = allComments.filter(c => c.parent_id === comment.id);
    const isReplying = activeReplyId === comment.id;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
        >
            <div className="glass p-5 rounded-2xl border border-white/5 relative">
                <div className="flex items-start gap-4">
                    <img
                        src={DEFAULT_AVATAR}
                        alt="User"
                        className="w-10 h-10 rounded-full border border-white/10 bg-white/5 p-1"
                    />
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-bold font-space text-cyan-400 text-sm">{comment.author_name}</span>
                            <span className="text-gray-500 text-[10px] font-fira">
                                {new Date(comment.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-300 text-sm font-ibm-plex leading-relaxed mb-3">
                            {comment.content}
                        </p>
                        <button
                            onClick={() => setActiveReplyId(isReplying ? null : comment.id)}
                            className="flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-cyan-400 transition-colors uppercase tracking-widest"
                        >
                            <FaReply /> {isReplying ? 'Cancel' : 'Reply'}
                        </button>
                    </div>
                </div>

                {/* Inline Reply Form */}
                <AnimatePresence>
                    {isReplying && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-4 pt-4 border-t border-white/5"
                        >
                            <form onSubmit={(e) => handleCommentSubmit(e, comment.id)} className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    value={replyData.name}
                                    onChange={(e) => setReplyData({ ...replyData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-400 outline-none"
                                />
                                <textarea
                                    placeholder={`Replying to ${comment.author_name}...`}
                                    required
                                    rows="3"
                                    value={replyData.content}
                                    onChange={(e) => setReplyData({ ...replyData, content: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-400 outline-none"
                                />
                                <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg text-xs flex items-center gap-2 transition-all">
                                    Send Reply <FaPaperPlane />
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Render Replies Recursively */}
            {replies.length > 0 && (
                <div className="ml-8 mt-4 border-l-2 border-white/5 pl-4 space-y-4">
                    {replies.map(reply => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            allComments={allComments}
                            onReply={onReply}
                            activeReplyId={activeReplyId}
                            setActiveReplyId={setActiveReplyId}
                            replyData={replyData}
                            setReplyData={setReplyData}
                            handleCommentSubmit={handleCommentSubmit}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
};

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);

    // Form states
    const [showMainForm, setShowMainForm] = useState(false);
    const [commentData, setCommentData] = useState({ name: '', content: '' });
    const [activeReplyId, setActiveReplyId] = useState(null);
    const [replyData, setReplyData] = useState({ name: '', content: '' });

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const [postRes, commentRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/api/blog/${slug}`),
                    axios.get(`${import.meta.env.VITE_API_URL}/api/blog/${slug}/comments`)
                ]);
                setPost(postRes.data);
                setComments(commentRes.data);
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPostAndComments();
    }, [slug]);

    const handleLike = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/${slug}/like`);
            setPost({ ...post, likes_count: res.data.likes_count });
            setLiked(true);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleCommentSubmit = async (e, parentId = null) => {
        e.preventDefault();
        const data = parentId ? replyData : commentData;
        if (!data.name || !data.content) return;

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/${slug}/comments`, {
                author_name: data.name,
                content: data.content,
                parent_id: parentId
            });
            setComments([...comments, res.data]);

            if (parentId) {
                setReplyData({ name: '', content: '' });
                setActiveReplyId(null);
            } else {
                setCommentData({ name: '', content: '' });
                setShowMainForm(false);
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-[#030712]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
    );

    if (!post) return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#030712] text-white">
            <h2 className="text-2xl font-bold mb-4 font-space uppercase">Story not found</h2>
            <Link to="/blog" className="text-cyan-400 font-fira hover:underline">Return to Blog</Link>
        </div>
    );

    const rootComments = comments.filter(c => !c.parent_id);

    return (
        <div className="min-h-screen bg-[#030712] text-white pb-20 pt-28">
            <div className="max-w-4xl mx-auto px-6">
                <Link to="/blog" className="flex items-center gap-2 text-cyan-400 mb-8 hover:translate-x-[-4px] transition-transform font-bold uppercase text-xs tracking-widest">
                    <FaArrowLeft /> Back to Stories
                </Link>

                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden mb-12"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>

                    <header className="mb-10">
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags?.map((tag, i) => (
                                <span key={i} className="bg-cyan-500/10 text-[10px] px-3 py-1 rounded-full text-cyan-400 border border-cyan-400/20 uppercase font-bold">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold font-space mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-6 text-gray-400 text-xs font-fira uppercase tracking-wider">
                            <span className="flex items-center gap-2"><FaCommentDots className="text-cyan-500" /> {comments.length} Comments</span>
                            <span className="flex items-center gap-2"><FaHeart className="text-red-500" /> {post.likes_count} Likes</span>
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                    </header>

                    <div className="aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
                        <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="markdown-content prose prose-invert max-w-none font-ibm-plex text-gray-300 leading-relaxed text-lg">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    <footer className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all duration-300 transform active:scale-95 ${liked ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'bg-white/5 border-white/10 text-gray-400 hover:border-red-400/50 hover:text-red-400'
                                }`}
                        >
                            {liked ? <FaHeart className="animate-ping" /> : <FaRegHeart />}
                            <span className="font-bold uppercase tracking-widest text-sm">{post.likes_count} Loves</span>
                        </button>
                    </footer>
                </motion.article>

                {/* Discussion Area */}
                <div className="space-y-12">
                    <div className="flex justify-between items-end border-b border-white/10 pb-6">
                        <h3 className="text-3xl font-extrabold font-space uppercase">Discussion</h3>
                        {!showMainForm && (
                            <button
                                onClick={() => setShowMainForm(true)}
                                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-xl text-sm transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                            >
                                Leave a Comment <FaCommentDots />
                            </button>
                        )}
                    </div>

                    {/* Main Comment Form */}
                    <AnimatePresence>
                        {showMainForm && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="glass p-8 rounded-3xl border border-white/10 bg-white/5"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-lg font-bold font-space text-cyan-400 uppercase tracking-widest">New Comment</h4>
                                    <button onClick={() => setShowMainForm(false)} className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest">Cancel</button>
                                </div>
                                <form onSubmit={(e) => handleCommentSubmit(e)} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Display Name"
                                            required
                                            value={commentData.name}
                                            onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none transition-colors"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email Address (Optional)"
                                            value={commentData.email || ''}
                                            onChange={(e) => setCommentData({ ...commentData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none transition-colors"
                                        />
                                    </div>
                                    <textarea
                                        placeholder="What's on your mind? Be kind and respectful..."
                                        rows="5"
                                        required
                                        value={commentData.content}
                                        onChange={(e) => setCommentData({ ...commentData, content: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-6 text-white focus:border-cyan-400 outline-none transition-colors text-lg"
                                    />
                                    <button className="w-fit bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold py-4 px-12 rounded-2xl flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest text-xs">
                                        Post Discussion <FaPaperPlane />
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Comments Listing */}
                    <div className="space-y-8">
                        {rootComments.length > 0 ? (
                            rootComments.map(comment => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                    allComments={comments}
                                    activeReplyId={activeReplyId}
                                    setActiveReplyId={setActiveReplyId}
                                    replyData={replyData}
                                    setReplyData={setReplyData}
                                    handleCommentSubmit={handleCommentSubmit}
                                />
                            ))
                        ) : (
                            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2rem]">
                                <FaCommentDots className="text-4xl text-gray-700 mx-auto mb-4" />
                                <p className="text-gray-500 font-fira tracking-widest uppercase">No comments yet. Start the conversation!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
