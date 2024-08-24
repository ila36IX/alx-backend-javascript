export default function getStudentsByLocation(students, city) {
  return students.map((item) => item.location === city);
}
