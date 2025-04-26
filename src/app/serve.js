// server.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors(), express.json());

let clients = []; // in-memory; on startup you could load from file or skip
let nextId = 1;

// sync with localStorage? In prod you'd use a DB
app.get('/api/clients', (req, res) => {
  res.json(clients);
});
app.get('/api/clients/:id', (req, res) => {
  const c = clients.find(x => x.id === +req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
});
app.post('/api/clients', (req, res) => {
  const data = req.body;
  const newC = { id: nextId++, createdAt: new Date().toISOString(), ...data };
  clients.push(newC);
  res.status(201).json(newC);
});
app.put('/api/clients/:id', (req, res) => {
  const idx = clients.findIndex(x => x.id === +req.params.id);
  if (idx < 0) return res.status(404).json({ error: 'Not found' });
  clients[idx] = { ...clients[idx], ...req.body };
  res.json(clients[idx]);
});
app.delete('/api/clients/:id', (req, res) => {
  clients = clients.filter(x => x.id !== +req.params.id);
  res.status(204).end();
});

app.listen(3000, () =>
  console.log('Client API running on http://localhost:3000')
);
