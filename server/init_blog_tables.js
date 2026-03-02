import pool from './db.js';

const createBlogTables = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      cover_image TEXT,
      media TEXT[] DEFAULT '{}',
      tags TEXT[] DEFAULT '{}',
      likes_count INT DEFAULT 0,
      published BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS blog_comments (
      id SERIAL PRIMARY KEY,
      post_id INT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
      parent_id INT REFERENCES blog_comments(id) ON DELETE CASCADE,
      author_name TEXT NOT NULL,
      author_email TEXT,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS blog_likes (
      id SERIAL PRIMARY KEY,
      post_id INT NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
      ip_address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(post_id, ip_address)
    );

    CREATE INDEX IF NOT EXISTS idx_comments_post_id ON blog_comments(post_id);
    CREATE INDEX IF NOT EXISTS idx_likes_post_id ON blog_likes(post_id);
    CREATE INDEX IF NOT EXISTS idx_posts_slug ON blog_posts(slug);
  `;

    try {
        await pool.query(queryText);
        console.log('Blog tables created successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error creating blog tables:', err);
        process.exit(1);
    }
};

createBlogTables();
