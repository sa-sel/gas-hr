export type Sheet = GoogleAppsScript.Spreadsheet.Sheet;
export type Range = GoogleAppsScript.Spreadsheet.Range;

// * @default (member) => [member.name, member.nickname, member.nUsp]

export interface AppendDataToSheetOpts<T> {
  /** Function to map each data element to a row. */
  mapFn: (member: T) => any[];
  /**
   * Number of headers in the sheet.
   * @default 1
   */
  headers?: number;
}
