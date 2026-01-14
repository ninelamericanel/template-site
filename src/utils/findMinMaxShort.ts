export function findMinMaxShort(array, fieldName) {
  if (!array || array.length === 0) return { min: null, max: null };

  const values = array
    .map((item) => item[fieldName])
    .filter((value) => typeof value === "number" && !isNaN(value));
  console.log(values);
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
}
