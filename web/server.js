const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const users = [{"name": "userA"}];

app.use(bodyParser.json());

app.get('/api/patch', (req, res) => {
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
    res.send('App Works !!!!');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
