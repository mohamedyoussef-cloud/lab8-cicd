const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks');
  const tasks = result.rows;

  tasks.push({ id: 999, name: 'Tea', status: 'pending' });

  res.json(tasks);
});
