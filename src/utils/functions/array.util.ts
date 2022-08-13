/**
 * Build an object where the keys are elements of `arr` and the
 * values are the number of times that element appears in `arr.`
 */
export const counter = (arr: any[]): Record<any, number> => {
  const counter = {};

  arr.forEach(val => (counter[val] = (counter[val] ?? 0) + 1));

  return counter;
};
