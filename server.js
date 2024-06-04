const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let users = {}; // In-memory storage for demonstration

// Save tasks for a user
app.post('/saveTasks', (req, res) => {
    const { username, tasks } = req.body;
    users[username] = tasks;
    res.sendStatus(200);
});

// Load tasks for a user
app.post('/loadTasks', (req, res) => {
    const { username } = req.body;
    const tasks = users[username] || [];
    res.json({ tasks });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
