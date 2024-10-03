const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 1245;

const app = createServer((req, res) => {
  res.write('Hello Holberton School!');
  res.end();
});

app.listen(port);

module.exports = app;
