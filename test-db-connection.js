const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function testConnection() {
  try {
    await client.connect();
    console.log("Connected to the database successfully!");
    const res = await client.query("SELECT NOW()");
    console.log("Current time from database:", res.rows[0].now);
  } catch (err) {
    console.error("Error connecting to the database:", err);
  } finally {
    await client.end();
  }
}

testConnection();
