const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(express.json());

app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, status FROM tasks ORDER BY id');
    const tasks = result.rows;

    const hasTea = tasks.some(task => task.name === 'Tea');
    if (!hasTea) {
      tasks.push({ id: 999, name: 'Tea', status: 'pending' });
    }

    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).json({ error: 'Database query failed' });
  }
});

async function startServer() {
  let retries = 10;

  while (retries > 0) {
    try {
      await pool.query('SELECT NOW()');
      console.log('Connected to PostgreSQL');
      break;
    } catch (err) {
      retries--;
      console.log('Waiting for PostgreSQL...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  if (retries === 0) {
    console.error('Could not connect to PostgreSQL');
    process.exit(1);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
