export type Sheet = GoogleAppsScript.Spreadsheet.Sheet;
export type Range = GoogleAppsScript.Spreadsheet.Range;

interface InteractWithDataSheet<T> {
  /** Function to map each data element to a row. */
  mapFn: (member: T | any) => (T | any)[];
  /**
   * Number of headers in the sheet.
   * @default 1
   */
  headers?: number;
}

export interface AppendDataToSheetOpts<T> extends InteractWithDataSheet<T> {
  /** Function to map each data element to a row. */
  mapFn: (member: T) => any[];
}

export interface ReadDataFromSheetOpts<T> extends InteractWithDataSheet<T> {
  /** Function to map each row element to a data object. */
  mapFn: (member: any) => T[];
}
