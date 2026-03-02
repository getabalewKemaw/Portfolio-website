import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GITHUB_USERNAME = 'getabalewKemaw';
const API_URL = `${import.meta.env.VITE_API_URL}/api/github-stats`;

// Color map for languages
const langColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    Dart: '#00B4AB',
    Kotlin: '#A97BFF',
    PHP: '#4F5D95',
    Go: '#00ADD8',
    Rust: '#dea584',
};

const GithubStats = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Try backend first (includes private repos)
                const res = await fetch(API_URL);
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                    return;
                }
            } catch (e) {
                console.warn('Backend unavailable, falling back to public API');
            }

            // Fallback: public GitHub API
            try {
                const [profileRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
                ]);
                const profile = await profileRes.json();
                const repos = await reposRes.json();

                const langMap = {};
                repos.forEach((r) => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
                const languages = Object.entries(langMap).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, count]) => ({ name, count }));
                const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
                const totalForks = repos.reduce((s, r) => s + (r.forks_count || 0), 0);

                setStats({
                    name: profile.name,
                    login: profile.login,
                    avatar_url: profile.avatar_url,
                    followers: profile.followers,
                    following: profile.following,
                    publicRepos: profile.public_repos,
                    totalRepos: repos.length,
                    privateRepos: 0,
                    totalStars,
                    totalForks,
                    languages,
                    activityData: [],
                    recentRepos: repos.slice(0, 10).map((r) => ({
                        name: r.name, description: r.description, language: r.language,
                        stars: r.stargazers_count, forks: r.forks_count, isPrivate: false,
                        url: r.html_url, updatedAt: r.pushed_at,
                    })),
                });
            } catch (err) {
                console.error('Failed to fetch GitHub data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData().finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!loading && stats) {
            gsap.from('.stat-card', {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            });
        }
    }, [loading, stats]);

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
    );

    if (!stats) return null;

    const maxLangCount = stats.languages.length > 0 ? stats.languages[0].count : 1;

    return (
        <section
            id="github-stats"
            ref={sectionRef}
            className="relative py-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 text-white overflow-hidden"
        >
            <div className="w-full text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-[#06b6d4] font-space tracking-tight uppercase mb-4">
                    Code Activity
                </h2>
                <p className="text-gray-400 font-fira tracking-widest uppercase text-sm">
                    Live from GitHub · Includes Private Repos
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                <div className="stat-card glass p-6 rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group">
                    <span className="text-[10px] text-gray-400 font-fira mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-widest">Repos</span>
                    <span className="text-3xl md:text-4xl font-bold font-space text-white">{stats.totalRepos}</span>
                    {stats.privateRepos > 0 && (
                        <span className="text-[10px] text-cyan-400/60 font-ibm-plex mt-1">{stats.privateRepos} private</span>
                    )}
                </div>

                <div className="stat-card glass p-6 rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-yellow-500/30 transition-all duration-300 group">
                    <span className="text-[10px] text-gray-400 font-fira mb-2 group-hover:text-yellow-400 transition-colors uppercase tracking-widest">Stars</span>
                    <span className="text-3xl md:text-4xl font-bold font-space text-white">{stats.totalStars}</span>
                </div>

                <div className="stat-card glass p-6 rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-purple-500/30 transition-all duration-300 group">
                    <span className="text-[10px] text-gray-400 font-fira mb-2 group-hover:text-purple-400 transition-colors uppercase tracking-widest">Forks</span>
                    <span className="text-3xl md:text-4xl font-bold font-space text-white">{stats.totalForks}</span>
                </div>

                <div className="stat-card glass p-6 rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-green-500/30 transition-all duration-300 group">
                    <span className="text-[10px] text-gray-400 font-fira mb-2 group-hover:text-green-400 transition-colors uppercase tracking-widest">Followers</span>
                    <span className="text-3xl md:text-4xl font-bold font-space text-white">{stats.followers}</span>
                </div>

                <div className="stat-card glass p-6 rounded-3xl flex flex-col items-center justify-center border border-white/5 hover:border-pink-500/30 transition-all duration-300 group">
                    <span className="text-[10px] text-gray-400 font-fira mb-2 group-hover:text-pink-400 transition-colors uppercase tracking-widest">Following</span>
                    <span className="text-3xl md:text-4xl font-bold font-space text-white">{stats.following || 0}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Language Breakdown */}
                <div className="stat-card glass p-6 rounded-3xl border border-white/5">
                    <h3 className="text-xl font-bold mb-6 font-fira text-cyan-400 px-2 uppercase tracking-widest text-sm">Language Distribution</h3>
                    <div className="space-y-4 px-2">
                        {stats.languages.map(({ name, count }) => {
                            const percentage = Math.round((count / stats.totalRepos) * 100);
                            const barWidth = Math.round((count / maxLangCount) * 100);
                            return (
                                <div key={name}>
                                    <div className="flex justify-between text-[11px] mb-1">
                                        <span className="font-fira text-white">{name}</span>
                                        <span className="font-ibm-plex text-gray-400">{count} repos · {percentage}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${barWidth}%`, backgroundColor: langColors[name] || '#06b6d4' }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="stat-card glass p-6 rounded-3xl border border-white/5">
                    <h3 className="text-xl font-bold mb-6 font-fira text-blue-400 px-2 uppercase tracking-widest text-sm">Recent Public Stories</h3>
                    <div className="space-y-3 px-2 max-h-[340px] overflow-y-auto custom-scrollbar">
                        {stats.recentRepos
                            .filter(repo => !repo.isPrivate)
                            .map((repo, i) => (
                                <a
                                    key={i}
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300 group border border-transparent hover:border-white/5"
                                >
                                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: langColors[repo.language] || '#6b7280' }} />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-fira text-sm text-white group-hover:text-cyan-400 transition-colors truncate mb-0.5">
                                            {repo.name}
                                        </p>
                                        <p className="font-ibm-plex text-[10px] text-gray-500 truncate leading-relaxed">{repo.description || 'Continuous development in progress...'}</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] text-gray-500 shrink-0 font-fira">
                                        {repo.stars > 0 && <span className="text-yellow-500/80">★ {repo.stars}</span>}
                                        <span className="bg-white/5 px-2 py-0.5 rounded text-[9px] uppercase">{repo.language || 'Code'}</span>
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            </div>

            {/* Contribution Graph */}
            <div className="stat-card glass p-6 rounded-3xl border border-white/5 mt-8">
                <h3 className="text-xl font-bold mb-6 font-fira text-green-400 px-2">Contribution Graph</h3>
                <div className="w-full overflow-x-auto">
                    <img
                        src={`https://ghchart.rshah.org/06b6d4/${GITHUB_USERNAME}`}
                        alt="GitHub Contribution Graph"
                        className="w-full min-w-[700px] h-auto"
                    />
                </div>
            </div>

            <div className="mt-12 text-center">
                <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 glass rounded-full font-fira text-sm uppercase tracking-wider hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 text-cyan-400"
                >
                    View Full Profile on GitHub →
                </a>
                <p className="text-gray-500 font-ibm-plex italic text-sm mt-4">
                    * Live data from GitHub API · Includes private repository metrics
                </p>
            </div>
        </section>
    );
};

export default GithubStats;
