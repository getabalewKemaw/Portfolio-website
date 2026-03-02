import dotenv from 'dotenv';
dotenv.config();

const token = process.env.GITHUB_PAT;
console.log('Token found:', !!token, 'Length:', token?.length);

// Test user/repos endpoint with the token
const res = await fetch('https://api.github.com/user/repos?per_page=5&sort=updated&affiliation=owner', {
    headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'GechPortfolio',
        Accept: 'application/vnd.github.v3+json',
    },
});

console.log('Status:', res.status);
const data = await res.json();
if (res.ok) {
    console.log('SUCCESS! Got', data.length, 'repos');
    data.forEach(r => {
        console.log(`  ${r.private ? '🔒' : '🌐'} ${r.name} (${r.language || 'N/A'})`);
    });
} else {
    console.log('ERROR:', data.message);
}
