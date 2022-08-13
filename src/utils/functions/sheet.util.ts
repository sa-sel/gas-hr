import { AppendDataToSheetOpts, ReadDataFromSheetOpts, Sheet } from '@models';

export const isSameSheet = (a: Sheet, b: Sheet): boolean => a.getSheetId() === b.getSheetId();

/** Clear all empty rows in the `sheet`, leaving at least one row (empty or not) left. */
export const clearEmptyRows = (sheet: Sheet) => {
  /** All non-empty data rows in the sheet. */
  const sheetData = sheet
    .getDataRange()
    .getValues()
    .filter(row => row.every(cell => cell));

  // delete a number of rows equal to the number of empty
  // rows and restore the sheet data on the remaining ones
  sheet.deleteRows(sheetData.length + 1, sheet.getMaxRows() - sheetData.length);
  sheet.getRange(1, 1, sheetData.length, sheetData[0].length).setValues(sheetData);
};

export const appendDataToSheet = <T>(members: T[], sheet: Sheet, { mapFn, headers }: AppendDataToSheetOpts<T>) => {
  if (!members.length) {
    return;
  }

  const prevNRows = sheet.getMaxRows();
  const newRowsData = members.map(mapFn);
  const nColsNewRows = newRowsData[0].length;
  const firstRow = sheet.getRange(1 + (headers ?? 1), 1, 1, newRowsData.length);

  // if the first row is empty, insert a member in it
  if (!firstRow.getValues()[0].reduce((acc, cur) => acc || cur)) {
    firstRow.setValues([newRowsData.pop()]);
  }

  // append remaining members to the sheet
  sheet
    .insertRowsAfter(prevNRows, newRowsData.length)
    .getRange(prevNRows + 1, 1, newRowsData.length, nColsNewRows)
    .setValues(newRowsData);

  const nColsNotWritten = sheet.getMaxColumns() - nColsNewRows;

  // restore formulas on columns in which no data was written (if there is any)
  if (nColsNotWritten) {
    /** Range of empty columns in which no data was written, to the right of the new rows. */
    const newEmptyColsRange = sheet.getRange(prevNRows + 1, nColsNewRows + 1, newRowsData.length, nColsNotWritten);

    sheet
      .getRange(prevNRows, nColsNewRows + 1, 1, nColsNotWritten)
      .copyTo(newEmptyColsRange, SpreadsheetApp.CopyPasteType.PASTE_FORMULA, false);

    const formulas = newEmptyColsRange.getFormulas();

    newEmptyColsRange.clearContent().setFormulas(formulas);
  }
};

/**
 * Read all non-empty rows from the `sheet` and convert them (via `mapFn`) to a list of objects (of type `T`).
 * Header rows (`headers`) will be ignored.
 */
export const readDataFromSheet = <T>(sheet: Sheet, { mapFn, headers }: ReadDataFromSheetOpts<T>): T[] =>
  sheet
    .getRange(1 + (headers ?? 1), 1, sheet.getMaxRows(), sheet.getMaxColumns())
    .getValues()
    .reduce((acc, cur) => {
      if (cur.some(cell => cell)) {
        acc.push(mapFn(cur));
      }

      return acc;
    }, []);

export const clearSheet = (sh: Sheet, headers = 1) => sh.getRange(1 + headers, 1, sh.getMaxRows(), sh.getMaxColumns()).clearContent();

export const parseDataAsString = (data: any) => `${data}`.trim().trimEnd();
