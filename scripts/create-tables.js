const mysql = require('mysql2/promise');
const { User, Post, Comment } = require('../models'); // Adjust the path as per your project structure
require('dotenv').config();

async function createTables() {
  try {
    console.log('Connecting to MySQL...');
    console.log('Host:', process.env.DB_HOST);
    console.log('Port:', process.env.DB_PORT);
    console.log('User:', process.env.DB_USER);
    console.log('Password:', process.env.DB_PASSWORD);
    console.log('Database:', process.env.DB_NAME);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await User.sync({ alter: true });
    await Post.sync({ alter: true });
    await Comment.sync({ alter: true });
    console.log('Tables created successfully.');
    await connection.end();
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

createTables();
