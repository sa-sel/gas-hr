import { MemberModel, MemberUpdateModel, Range, Sheet } from '@models';
import { NamedRange, sheets, ss, syncedDataSheets } from '@utils/constants';
import { appendDataToSheet, isSameSheet, parseDataAsString } from './sheet.util';

export const getAllSavedNusps = (): Set<string> => new Set(ss.getRangeByName(NamedRange.AllSavedNusps).getValues().flat());

export const validateNusp = (nusp: string): boolean => /^\d{7,}$/.test(nusp);

export const validateMember = (member: MemberModel): boolean => member.name && validateNusp(member.nUsp);

export const getTargetNusp = (): string => ss.getRangeByName(NamedRange.TargetNusp).getValue();

export const parseRowToMember = (row: any[]) => ({
  name: parseDataAsString(row[0]),
  nickname: parseDataAsString(row[1]),
  nUsp: parseDataAsString(row[2]),
  phone: parseDataAsString(row[3]),
  emphasis: row[4],
  email: parseDataAsString(row[5]),
  birthday: row[6],
});

export const appendMembersToSheet = (
  members: MemberModel[],
  sheet: Sheet,
  mapFn = (m: MemberModel) => [m.name, m.nickname, m.nUsp] as any[],
): void => appendDataToSheet(members, sheet, { mapFn });

/** Run a function to manage the member in each synced data sheet. */
export const manageMemberSyncedDataSheets = (nusp: string, fn: (nuspCell: Range, sheet: Sheet) => any): void => {
  const occurrences = ss.createTextFinder(nusp).findAll();

  occurrences.forEach(cell => {
    const occurrenceSheet = cell.getSheet();

    if (syncedDataSheets.some(sheet => isSameSheet(sheet, occurrenceSheet))) {
      fn(cell, occurrenceSheet);
    }
  });
};

export const editMember = (nusp: string, updates: MemberUpdateModel): void =>
  manageMemberSyncedDataSheets(nusp, cell => {
    ['name', 'nickname', 'nUsp'].forEach((key, i, arr) => {
      if (updates[key] && (key !== 'nUsp' || validateNusp(updates.nUsp))) {
        cell.offset(0, i + 1 - arr.length).setValue(updates[key]);
      }
    });
  });

export const getMemberData = (nusp: string): MemberModel => {
  const occurrences = sheets.mainData.createTextFinder(nusp).findAll();

  if (occurrences.length !== 1) {
    throw new RangeError('Member not found/duplicate members found.');
  }

  const rowIndex = occurrences.pop().getRow();
  const row = sheets.mainData.getRange(rowIndex, 1, 1, sheets.mainData.getLastColumn()).getValues().flat();

  return parseRowToMember(row);
};
