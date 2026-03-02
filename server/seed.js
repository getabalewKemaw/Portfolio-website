import pool from './db.js';

const seedData = async () => {
    try {
        // 1. Seed Certifications
        const certifications = [
            {
                title: "Software Engineering Certification",
                issuer: "Debre Berhan University",
                image: "/images/certefications/Getabalewkemaw.jpg",
                date: "2025"
            },
            {
                title: "Data Science Specialization",
                issuer: "DataCamp",
                image: "/images/certefications/datacamp.png",
                date: "2024"
            },
            {
                title: "Hackathon Winner - Innovation Award",
                issuer: "DBU Hackathon",
                image: "/images/certefications/dbuhackaton.png",
                date: "2024"
            }
        ];

        for (const cert of certifications) {
            await pool.query(
                'INSERT INTO certifications (title, issuer, image, date) VALUES ($1, $2, $3, $4)',
                [cert.title, cert.issuer, cert.image, cert.date]
            );
        }

        // 2. Seed Projects (Example subset)
        const projects = [
            {
                title: "Meshebesha Design",
                description: "Enterprise E-Commerce Platform",
                image: "/images/meshebesha.png",
                github: "https://github.com/getabalewKemaw/...",
                live: "#",
                technologies: ["Next.js", "TypeScript", "Express.js"]
            }
        ];

        for (const project of projects) {
            await pool.query(
                'INSERT INTO projects (title, description, image, github, live, technologies) VALUES ($1, $2, $3, $4, $5, $6)',
                [project.title, project.description, project.image, project.github, project.live, project.technologies]
            );
        }

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedData();
