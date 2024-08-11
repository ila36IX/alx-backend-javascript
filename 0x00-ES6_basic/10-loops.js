export default function appendToEachArrayValue(array, appendString) {
  let i = 0;
  for (const value of array) {
    array[i] = appendString + value;
    i += 1;
  }
  return array;
}
