const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabase() {
  try {
    // helpful for debug to make sure .env file has correct formatting / syntax
    console.log('Connecting to MySQL...');
    console.log('Host:', process.env.DB_HOST);
    console.log('Port:', process.env.DB_PORT);
    console.log('User:', process.env.DB_USER);
    console.log('Password:', process.env.DB_PASSWORD);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    const databaseName = process.env.DB_NAME;
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
    console.log('Database created successfully.');
    await connection.end();
  } catch (error) {
    console.error('Error creating database:', error);
  }
}

createDatabase();