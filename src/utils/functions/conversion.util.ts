/**
 * Convert a column number (index) to letter (label).
 * @see http://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter
 */
export const colNumberToLetter = (column: number): string => {
  let letter = '';
  let temp: number;

  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }

  return letter;
};
