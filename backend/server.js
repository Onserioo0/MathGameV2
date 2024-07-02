const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());

// In-memory scores object
const scores = {};

// ... (keep your existing database setup code)
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQLite database.');
});

db.run('CREATE TABLE users(id INTEGER PRIMARY KEY, username TEXT , password TEXT)', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Users table created.');
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";

  db.run(query, [username, password], function (err) {
    if (err) {
      res.status(500).json({ status: "failure", message: err.message });
      return;
    }
    res.json({ status: "success" });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT id FROM users WHERE username = ? AND password = ?";

  db.get(query, [username, password], (err, row) => {
    if (err) {
      res.status(500).json({ status: "failure", message: err.message });
      return;
    }
    if (row) {
      res.json({ status: "success" });
    } else {
      res.json({ status: "failure", message: "Invalid credentials" });
    }
  });
});

app.post('/update', (req, res) => {
  const { username, result } = req.body;
  console.log(`Received update request for user: ${username}, result: ${result}`);

  if (result === "correct") {
    // Increment score for the user
    scores[username] = (scores[username] || 0) + 1;
    
    // Create leaderboard with scores
    const leaderboard = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([username, score]) => ({ username, score }));

    console.log('Current scores:', scores);
    console.log('Leaderboard:', leaderboard);

    res.json({ status: 'success', leaders: leaderboard });
  } else {
    // For incorrect answers, return current leaderboard without updating
    const leaderboard = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([username, score]) => ({ username, score }));

    res.json({ status: 'success', message: 'Incorrect answer', leaders: leaderboard });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});