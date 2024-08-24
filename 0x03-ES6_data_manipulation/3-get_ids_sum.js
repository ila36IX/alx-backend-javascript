export default function getStudentIdsSum(students) {
  students.reduce((accumulator, item) => accumulator + item, 0);
}
