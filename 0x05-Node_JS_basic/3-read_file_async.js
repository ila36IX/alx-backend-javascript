const { readFile } = require('fs');

// function parseCSV(csv) {
//   const lines = csv.split('\n');
//   const fields = lines[0].split(',');
//   const plainData = lines.slice(1).filter((r) => r.length);
//   const data = [];
//   for (const line of plainData) {
//     const record = {};
//     const recordFields = line.split(',');
//     recordFields.forEach((field, i) => {
//       record[fields[i]] = field;
//     });
//     data.push(record);
//   }
//   console.log('Number of students:', data.length);
//   [...new Set(data.map((e) => e.field))].forEach((field) => {
//     const names = data.filter((e) => e.field === field).map((e) => e.firstname);
//     console.log(
//       `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`,
//     );
//   });
// }
// async function countStudents(path) {
//   const csv = await new Promise((resolve, reject) => {
//     readFile(path, { encoding: 'utf8' }, (err, data) => {
//       if (err) reject(new Error('Cannot load the database'));
//       resolve(data);
//     });
//   });
//   return parseCSV(csv);
// }

function countStudents(fileName) {
  const students = {};
  const fields = {};
  let length = 0;
  return new Promise((resolve, reject) => {
    readFile(fileName, (error, data) => {
      if (error) {
        reject(Error('Cannot load the database'));
      } else {
        const lines = data.toString().split('\n');
        for (let i = 0; i < lines.length; i += 1) {
          if (lines[i]) {
            length += 1;
            const field = lines[i].toString().split(',');
            if (Object.prototype.hasOwnProperty.call(students, field[3])) {
              students[field[3]].push(field[0]);
            } else {
              students[field[3]] = [field[0]];
            }
            if (Object.prototype.hasOwnProperty.call(fields, field[3])) {
              fields[field[3]] += 1;
            } else {
              fields[field[3]] = 1;
            }
          }
        }
        const l = length - 1;
        console.log(`Number of students: ${l}`);
        for (const [key, value] of Object.entries(fields)) {
          if (key !== 'field') {
            console.log(`Number of students in ${key}: ${value}. List: ${students[key].join(', ')}`);
          }
        }
        resolve(data);
      }
    });
  });
}

module.exports = countStudents;
