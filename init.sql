CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  name TEXT,
  status TEXT
);

INSERT INTO tasks (name, status) VALUES
('Task 1', 'done'),
('Task 2', 'pending'),
('Task 3', 'pending');
