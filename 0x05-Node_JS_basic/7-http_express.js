const express = require('express');
const { readFile } = require('fs');

function parseCSV(csv) {
  const lines = csv.split('\n');
  const fields = lines[0].split(',');
  const plainData = lines.slice(1).filter((r) => r.length);
  const data = [];
  for (const line of plainData) {
    const record = {};
    const recordFields = line.split(',');
    recordFields.forEach((field, i) => {
      record[fields[i]] = field;
    });
    data.push(record);
  }
  let resp = '';
  resp += `Number of students: ${data.length} \n`;
  [...new Set(data.map((e) => e.field))].forEach((field) => {
    const names = data.filter((e) => e.field === field).map((e) => e.firstname);
    resp += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
  });
  return resp;
}
async function countStudents(path) {
  const csv = await new Promise((resolve, reject) => {
    readFile(path, { encoding: 'utf8' }, (err, data) => {
      if (err) reject(new Error('Cannot load the database'));
      resolve(data);
    });
  });
  return parseCSV(csv);
}

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  countStudents('./database.csv')
    .then((data) => req.send(`This is the list of our students\n${data}`))
    .catch((e) => req.send(`This is the list of our students\n${e.message}`));
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

module.exports = app;
