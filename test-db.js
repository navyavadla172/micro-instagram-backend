const db = require('./src/config/db');

async function testConnection() {
  try {
    const [rows, fields] = await db.execute('SELECT 1 + 1 AS result');
    console.log('DB Connection Test Result:', rows);
  } catch (error) {
    console.error('Error connecting to DB:', error);
  }
}

testConnection();
