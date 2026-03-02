import pool from './db.js';

const seedBlog = async () => {
    try {
        const post = {
            title: "My First Modern Portfolio Blog",
            slug: "my-first-modern-portfolio-blog",
            content: "# Welcome to my blog!\n\nThis is a **modern** blog post with markdown support. I can share my journey as a developer here.\n\n### Features:\n- 3D Backgrounds\n- Real-time GitHub Stats\n- Dynamic Blog System\n\nHope you like it!",
            excerpt: "Sharing my journey as a developer with this new modern portfolio system.",
            cover_image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
            tags: ["React", "Node", "Portfolio"],
            published: true
        };

        const result = await pool.query(
            `INSERT INTO blog_posts (title, slug, content, excerpt, cover_image, tags, published)
       VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (slug) DO NOTHING RETURNING *`,
            [post.title, post.slug, post.content, post.excerpt, post.cover_image, post.tags, post.published]
        );

        if (result.rows.length > 0) {
            const postId = result.rows[0].id;
            // Add a sample comment
            await pool.query(
                `INSERT INTO blog_comments (post_id, author_name, content)
             VALUES ($1, $2, $3)`,
                [postId, "GK Fans", "This looks amazing! Cant wait to see more posts."]
            );
            console.log('Blog seeded successfully!');
        } else {
            console.log('Post already exists, skipping seed.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error seeding blog:', err);
        process.exit(1);
    }
};

seedBlog();
