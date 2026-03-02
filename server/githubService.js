import dotenv from 'dotenv';
dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_PAT;
const API_BASE = 'https://api.github.com';

const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    'User-Agent': 'GechPortfolio-Server',
    Accept: 'application/vnd.github.v3+json',
};

export const getGithubStats = async (username) => {
    try {
        console.log(`Fetching GitHub stats for ${username}...`);

        // 1. Fetch authenticated user profile (includes private repo count)
        const profileRes = await fetch(`${API_BASE}/user`, { headers });
        const profile = await profileRes.json();

        // 2. Fetch all repos (includes private ones with token)
        const allRepos = [];
        let page = 1;
        while (true) {
            const reposRes = await fetch(
                `${API_BASE}/user/repos?per_page=100&page=${page}&sort=updated&affiliation=owner`,
                { headers }
            );
            const repos = await reposRes.json();
            if (!Array.isArray(repos) || repos.length === 0) break;
            allRepos.push(...repos);
            if (repos.length < 100) break;
            page++;
        }

        // 3. Fetch events for contribution activity
        const eventsRes = await fetch(
            `${API_BASE}/users/${username}/events?per_page=100`,
            { headers }
        );
        const events = await eventsRes.json();

        // Process language stats
        const langMap = {};
        allRepos.forEach((r) => {
            if (r.language) {
                langMap[r.language] = (langMap[r.language] || 0) + 1;
            }
        });

        const languages = Object.entries(langMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([name, count]) => ({ name, count }));

        // Process recent activity from events
        const pushEvents = Array.isArray(events)
            ? events.filter((e) => e.type === 'PushEvent').slice(0, 30)
            : [];

        // Build daily activity from push events
        const dailyActivity = {};
        pushEvents.forEach((e) => {
            const date = e.created_at.split('T')[0];
            const commits = e.payload?.commits?.length || 1;
            dailyActivity[date] = (dailyActivity[date] || 0) + commits;
        });

        const activityData = Object.entries(dailyActivity)
            .map(([date, count]) => ({ date, contributionCount: count }))
            .sort((a, b) => a.date.localeCompare(b.date));

        const totalStars = allRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
        const totalForks = allRepos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
        const privateRepos = allRepos.filter((r) => r.private).length;

        const result = {
            name: profile.name || profile.login,
            login: profile.login,
            avatar_url: profile.avatar_url,
            followers: profile.followers,
            following: profile.following,
            publicRepos: profile.public_repos,
            totalRepos: allRepos.length,
            privateRepos,
            totalStars,
            totalForks,
            languages,
            activityData,
            recentRepos: allRepos.slice(0, 10).map((r) => ({
                name: r.name,
                description: r.description,
                language: r.language,
                stars: r.stargazers_count,
                forks: r.forks_count,
                isPrivate: r.private,
                url: r.html_url,
                updatedAt: r.pushed_at,
            })),
        };

        console.log(`Found ${allRepos.length} repos (${privateRepos} private), ${totalStars} stars`);
        return result;
    } catch (error) {
        console.error('Error fetching GitHub stats:', error.message);
        throw error;
    }
};
