export default function getStudentIdsSum(students) {
  students.reduce((accumulator, item) => accumulator + item.id, 0);
}
