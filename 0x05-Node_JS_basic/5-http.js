const { createServer } = require('http');
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

const hostname = '127.0.0.1';
const port = 1245;

const app = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  } else if (req.url === '/students' || req.url === '/students/') {
    countStudents(process.argv[2])
      .then((states) => res.write(states))
      .then(() => res.end());
  } else {
    res.statusCode = 200;
    res.end('Not found');
  }
});

app.listen(port);

module.exports = app;
