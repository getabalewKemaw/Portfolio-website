import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import pool from './db.js';
import { getGithubStats } from './githubService.js';
import blogRoutes from './blogRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Manual CORS middleware (Express 5 compatible)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(morgan('dev'));
app.use(express.json());

// --- ROUTES ---

// Health check
app.get('/', (req, res) => {
    res.send(JSON.stringify({ message: 'Welcome to GechPortfolio API' }));
});

// GET GitHub stats (main feature)
app.get('/api/github-stats', async (req, res) => {
    try {
        const stats = await getGithubStats('getabalewKemaw');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(stats));
    } catch (err) {
        console.error('GitHub stats error:', err.message);
        res.status(500);
        res.send(JSON.stringify({ error: 'Failed to fetch GitHub statistics' }));
    }
});

// GET all certifications
app.get('/api/certifications', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM certifications ORDER BY created_at DESC');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result.rows));
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send(JSON.stringify({ error: 'Server error' }));
    }
});

// GET all projects
app.get('/api/projects', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result.rows));
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send(JSON.stringify({ error: 'Server error' }));
    }
});

// GET all experiences 
app.get('/api/experiences', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM experiences ORDER BY created_at DESC');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result.rows));
    } catch (err) {
        console.error(err);
        res.status(500);
        res.send(JSON.stringify({ error: 'Server error' }));
    }
});

// Blog routes
app.use('/api/blog', blogRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please kill the process using it.`);
    } else {
        console.error('Server error:', err);
    }
});
