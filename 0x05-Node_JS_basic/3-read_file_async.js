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
  console.log('Number of students:', data.length);
  [...new Set(data.map((e) => e.field))].forEach((field) => {
    const names = data.filter((e) => e.field === field).map((e) => e.firstname);
    console.log(
      `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`,
    );
  });
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

module.exports = countStudents;
