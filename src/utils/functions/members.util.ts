import { ss, syncedDataSheets } from '@utils/constants';
import { isSameSheet } from './comparison.util';

export const deleteMemberByNusp = (nusp: string) => {
  const occurrences = ss.createTextFinder(nusp).findAll();

  occurrences.forEach(cell => {
    const occurrenceSheet = cell.getSheet();

    if (syncedDataSheets.some(sheet => isSameSheet(sheet, occurrenceSheet))) {
      occurrenceSheet.deleteRow(cell.getRow());
    }
  });
};
