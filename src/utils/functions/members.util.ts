import { MemberModel, Sheet } from '@models';
import { ss, syncedDataSheets } from '@utils/constants';
import { appendDataToSheet, isSameSheet } from './sheet.util';

export const deleteMemberByNusp = (nusp: string) => {
  const occurrences = ss.createTextFinder(nusp).findAll();

  occurrences.forEach(cell => {
    const occurrenceSheet = cell.getSheet();

    if (syncedDataSheets.some(sheet => isSameSheet(sheet, occurrenceSheet))) {
      occurrenceSheet.deleteRow(cell.getRow());
    }
  });
};

export const appendMembersToSheet = (
  members: MemberModel[],
  sheet: Sheet,
  mapFn = (m: MemberModel) => [m.name, m.nickname, m.nUsp] as any[],
) => appendDataToSheet(members, sheet, { mapFn });
