import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaRegComment, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

/**
 * BlogSection - A compact version for the home page or a full listing.
 * @param {boolean} featuredOnly - If true, only shows the latest 3 posts.
 */
const Blog = ({ featuredOnly = false }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog`);
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
    );

    const displayedPosts = featuredOnly ? posts.slice(0, 3) : posts;

    return (
        <section id="blog" className="py-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#06b6d4] font-space tracking-tight uppercase mb-4">
                    {featuredOnly ? "Latest Stories" : "All Insights"}
                </h2>
                <p className="text-gray-400 font-fira tracking-widest uppercase text-sm">
                    {featuredOnly ? "Recent thoughts and tutorials" : "Deep dives into tech and my journey"}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedPosts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="glass group rounded-3xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-500 flex flex-col h-full"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={post.cover_image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            {post.tags && post.tags.length > 0 && (
                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                    {post.tags.slice(0, 2).map((tag, i) => (
                                        <span key={i} className="bg-cyan-500/80 backdrop-blur-md text-[10px] px-2 py-1 rounded-full text-white uppercase font-bold">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center text-gray-400 text-xs mb-3 font-fira">
                                <FaCalendarAlt className="mr-2" />
                                {new Date(post.created_at).toLocaleDateString()}
                            </div>
                            <h3 className="text-xl font-bold mb-3 font-space group-hover:text-cyan-400 transition-colors line-clamp-2">
                                {post.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-6 line-clamp-3 font-ibm-plex flex-grow">
                                {post.excerpt || (post.content && post.content.substring(0, 150) + '...')}
                            </p>

                            <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                                <div className="flex items-center gap-4 text-gray-500 text-sm">
                                    <span className="flex items-center gap-1 group/like hover:text-red-400 transition-colors">
                                        <FaRegHeart /> {post.likes_count}
                                    </span>
                                    <span className="flex items-center gap-1 group/comment hover:text-cyan-400 transition-colors">
                                        <FaRegComment /> {post.comments_count || 0}
                                    </span>
                                </div>
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="text-cyan-400 text-sm font-bold uppercase tracking-wider hover:underline flex items-center gap-2"
                                >
                                    Read Full <FaArrowRight className="text-[10px]" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {featuredOnly && posts.length > 3 && (
                <div className="mt-16 text-center">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/50 rounded-full text-cyan-400 font-bold uppercase tracking-widest transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                        View All Posts <FaArrowRight />
                    </Link>
                </div>
            )}

            {posts.length === 0 && (
                <div className="text-center py-20 glass rounded-3xl border border-white/5">
                    <p className="text-gray-400 font-fira tracking-widest uppercase">No stories published yet. Stay tuned!</p>
                </div>
            )}
        </section>
    );
};

export default Blog;
