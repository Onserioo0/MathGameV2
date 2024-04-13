// "StAuth10244: I Marmik Gelani, 000884216 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else."

// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const redis = require('redis');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});
client.connect();

client.on('error', (err) => {
  console.log('Redis error: ', err);
});

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

app.post('/update', async (req, res) => {
  const { username, result } = req.body;

  try {
    if (result === "correct") {
      await client.lPush("correctAnswers", username);
      await client.lTrim("correctAnswers", -10, -1);
    }

    const leaders = await client.lRange("correctAnswers", -10, -1);

    res.json({ leaders });
  } catch (err) {
    console.error('Error updating/retrieving leaderboard:', err);
    res.status(500).send('Error interacting with the leaderboard');
  }
});



app.post('/updateLeaderboard', async (req, res) => {
  const { username, result } = req.body;

  if (result === 'correct') {
    await client.zIncrBy('leaderboard', 1, username);
    try {
      const leaders = await client.zRange('leaderboard', 0, 9, 'WITHSCORES');

      const formattedLeaders = [];
      for (let i = 0; i < leaders.length; i += 2) {
        formattedLeaders.push({ username: leaders[i], score: parseInt(leaders[i + 1]) });
      }

      res.json({ status: 'success', leaderboard: formattedLeaders });
    } catch (err) {
      console.error('Error retrieving leaderboard:', err);
      res.json({ status: 'failure', message: 'Error retrieving leaderboard' });
    }
  } else {
    res.json({ status: 'failure', message: 'Only correct answers update the leaderboard' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
