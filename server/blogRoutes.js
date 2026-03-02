import express from 'express';
import pool from './db.js';
import { upload } from './cloudinaryConfig.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Helper: generate slug
const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// --- AUTH MIDDLEWARE ---
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send(JSON.stringify({ error: 'Unauthorized: No credentials provided' }));
    }

    // Expecting "Basic base64(email:password)"
    const authType = authHeader.split(' ')[0];
    if (authType !== 'Basic') {
        return res.status(401).send(JSON.stringify({ error: 'Unauthorized: Invalid auth type' }));
    }

    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('ascii');
    const [email, password] = credentials.split(':');

    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();
    const envEmail = process.env.ADMIN_EMAIL?.trim();
    const envPassword = process.env.ADMIN_PASSWORD?.trim();

    if (trimmedEmail === envEmail && trimmedPassword === envPassword) {
        next();
    } else {
        res.status(401).send(JSON.stringify({ error: 'Unauthorized: Invalid email or password' }));
    }
};

// --- AUTH LOGIN CHECK ENDPOINT ---
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Trim to avoid accidental space issues
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();
    const envEmail = process.env.ADMIN_EMAIL?.trim();
    const envPassword = process.env.ADMIN_PASSWORD?.trim();

    if (trimmedEmail === envEmail && trimmedPassword === envPassword) {
        console.log(`Login success for: ${trimmedEmail}`);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ message: 'Login successful' }));
    } else {
        console.log('--- Login Attempt Failed ---');
        console.log(`Input Email: [${trimmedEmail}]`);
        console.log(`Input Pass: [${trimmedPassword}]`);
        console.log(`Server Email (ENV): [${envEmail || 'UNDEFINED'}]`);
        console.log(`Server Pass (ENV): [${envPassword || 'UNDEFINED'}]`);
        console.log('----------------------------');
        res.status(401).send(JSON.stringify({ error: 'Invalid credentials' }));
    }
});

// ========== POSTS ==========

// GET all published posts with comment count
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT p.id, p.title, p.slug, p.excerpt, LEFT(p.content, 200) as content, p.cover_image, p.tags, p.likes_count, p.created_at,
      (SELECT COUNT(*) FROM blog_comments c WHERE c.post_id = p.id) as comments_count
      FROM blog_posts p 
      WHERE p.published = true 
      ORDER BY p.created_at DESC
    `);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result.rows));
    } catch (err) {
        console.error(err);
        res.status(500).send(JSON.stringify({ error: 'Failed to fetch posts' }));
    }
});

// GET single post by slug
router.get('/:slug', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM blog_posts WHERE slug = $1', [req.params.slug]);
        if (result.rows.length === 0) {
            return res.status(404).send(JSON.stringify({ error: 'Post not found' }));
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result.rows[0]));
    } catch (err) {
        console.error(err);
        res.status(500).send(JSON.stringify({ error: 'Failed to fetch post' }));
    }
});

// CREATE post (PROTECTED)
router.post('/', auth, upload.single('cover_image'), async (req, res) => {
    try {
        const { title, content, excerpt, tags, published } = req.body;
        const slug = slugify(title) + '-' + Date.now();
        const coverImage = req.file ? req.file.path : null;
        const parsedTags = tags ? (typeof tags === 'string' ? JSON.parse(tags) : tags) : [];

        const result = await pool.query(
            `INSERT INTO blog_posts (title, slug, content, excerpt, cover_image, tags, published)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [title, slug, content, excerpt || '', coverImage, parsedTags, published === 'true']
        );

        res.setHeader('Content-Type', 'application/json');
        res.status(201).send(JSON.stringify(result.rows[0]));
    } catch (err) {
        console.error('CREATE POST ERROR:', err);
        res.status(500).send(JSON.stringify({ error: err.message || 'Failed to create post' }));
    }
});

// UPDATE post (PROTECTED)
router.put('/:id', auth, upload.single('cover_image'), async (req, res) => {
    try {
        const { title, content, excerpt, tags, published } = req.body;
        const coverImage = req.file ? req.file.path : undefined;
        const parsedTags = tags ? (typeof tags === 'string' ? JSON.parse(tags) : tags) : [];

        let query, params;
        if (coverImage) {
            query = `UPDATE blog_posts SET title=$1, content=$2, excerpt=$3, cover_image=$4, tags=$5, published=$6, updated_at=CURRENT_TIMESTAMP WHERE id=$7 RETURNING *`;
            params = [title, content, excerpt, coverImage, parsedTags, published === 'true', req.params.id];
        } else {
            query = `UPDATE blog_posts SET title=$1, content=$2, excerpt=$3, tags=$4, published=$5, updated_at=CURRENT_TIMESTAMP WHERE id=$6 RETURNING *`;
            params = [title, content, excerpt, parsedTags, published === 'true', req.params.id];
        }

        const result = await pool.query(query, params);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result.rows[0]));
    } catch (err) {
        console.error('UPDATE POST ERROR:', err);
        res.status(500).send(JSON.stringify({ error: err.message || 'Failed to update post' }));
    }
});

// DELETE post (PROTECTED)
router.delete('/:id', auth, async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).send(JSON.stringify({ error: 'Post not found' }));
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ message: 'Post deleted successfully' }));
    } catch (err) {
        console.error('DELETE POST ERROR:', err);
        res.status(500).send(JSON.stringify({ error: err.message || 'Failed to delete post' }));
    }
});

// UPLOAD media (PROTECTED)
router.post('/:id/media', auth, upload.array('media', 10), async (req, res) => {
    try {
        const urls = req.files.map((f) => f.path);
        await pool.query(
            'UPDATE blog_posts SET media = array_cat(media, $1) WHERE id = $2',
            [urls, req.params.id]
        );
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ urls }));
    } catch (err) {
        console.error(err);
        res.status(500).send(JSON.stringify({ error: 'Failed to upload media' }));
    }
});

// ========== COMMENTS ==========

// GET comments for a post
router.get('/:slug/comments', async (req, res) => {
    try {
        const post = await pool.query('SELECT id FROM blog_posts WHERE slug = $1', [req.params.slug]);
        if (post.rows.length === 0) return res.status(404).send(JSON.stringify({ error: 'Post not found' }));

        const result = await pool.query(
            'SELECT * FROM blog_comments WHERE post_id = $1 ORDER BY created_at ASC',
            [post.rows[0].id]
        );
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result.rows));
    } catch (err) {
        console.error(err);
        res.status(500).send(JSON.stringify({ error: 'Failed to fetch comments' }));
    }
});

// ADD comment to a post
router.post('/:slug/comments', async (req, res) => {
    try {
        const { author_name, author_email, content, parent_id } = req.body;
        const post = await pool.query('SELECT id FROM blog_posts WHERE slug = $1', [req.params.slug]);
        if (post.rows.length === 0) return res.status(404).send(JSON.stringify({ error: 'Post not found' }));

        const result = await pool.query(
            `INSERT INTO blog_comments (post_id, parent_id, author_name, author_email, content)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [post.rows[0].id, parent_id || null, author_name, author_email || '', content]
        );

        res.setHeader('Content-Type', 'application/json');
        res.status(201).send(JSON.stringify(result.rows[0]));
    } catch (err) {
        console.error('COMMENT ERROR:', err);
        res.status(500).send(JSON.stringify({ error: err.message || 'Failed to add comment' }));
    }
});

// ========== LIKES ==========

// LIKE a post
router.post('/:slug/like', async (req, res) => {
    try {
        const post = await pool.query('SELECT id FROM blog_posts WHERE slug = $1', [req.params.slug]);
        if (post.rows.length === 0) return res.status(404).send(JSON.stringify({ error: 'Post not found' }));

        const ip = req.headers['x-forwarded-for'] || req.ip || 'unknown';

        await pool.query(
            'INSERT INTO blog_likes (post_id, ip_address) VALUES ($1, $2) ON CONFLICT DO NOTHING',
            [post.rows[0].id, ip]
        );

        // Update count
        const countResult = await pool.query(
            'SELECT COUNT(*) FROM blog_likes WHERE post_id = $1',
            [post.rows[0].id]
        );
        const newCount = parseInt(countResult.rows[0].count, 10);
        await pool.query('UPDATE blog_posts SET likes_count = $1 WHERE id = $2', [newCount, post.rows[0].id]);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ likes_count: newCount }));
    } catch (err) {
        console.error(err);
        res.status(500).send(JSON.stringify({ error: 'Failed to like post' }));
    }
});

export default router;
