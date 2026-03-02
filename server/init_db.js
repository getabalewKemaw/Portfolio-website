import pool from './db.js';

const createTables = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS certifications (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      issuer TEXT NOT NULL,
      image TEXT NOT NULL,
      date TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      github TEXT,
      live TEXT,
      technologies TEXT[],
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS experiences (
      id SERIAL PRIMARY KEY,
      year TEXT NOT NULL,
      role TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    try {
        await pool.query(queryText);
        console.log('Tables created successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error creating tables:', err);
        process.exit(1);
    }
};

createTables();
