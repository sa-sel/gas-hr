import { GS } from '@lib/constants';
import { manageDataInSheets, toString } from '@lib/functions';
import { Range } from '@lib/models';
import { MemberModel, MemberUpdateModel } from '@models';
import { NamedRange, sheets, syncedDataSheets } from '@utils/constants';

export const getAllSavedNusps = (): Set<string> => new Set(GS.ss.getRangeByName(NamedRange.AllSavedNusps).getValues().flat());

export const validateNusp = (nusp: string): boolean => /^\d{7,}$/.test(nusp);

export const validateNuspUnique = (nusp: string): boolean => validateNusp(nusp) && !getAllSavedNusps().has(nusp);

export const getTargetNusp = (): string => GS.ss.getRangeByName(NamedRange.TargetNusp).getValue();

export const parseRowToMember = (row: any[]) => ({
  name: toString(row[0]),
  nickname: toString(row[1]),
  nUsp: toString(row[2]),
  phone: toString(row[3]),
  emphasis: row[4],
  email: toString(row[5]),
  birthday: row[6],
});

/** Run a function to manage the member in each synced data sheet. */
export const manageMemberSyncedDataSheets = (nusp: string, fn: (nuspCell: Range) => any) => manageDataInSheets(nusp, syncedDataSheets, fn);

export const editMember = (nusp: string, updates: MemberUpdateModel): void =>
  manageMemberSyncedDataSheets(nusp, cell => {
    ['name', 'nickname', 'nUsp'].forEach((key, i, arr) => {
      if (updates[key] && (key !== 'nUsp' || validateNuspUnique(updates.nUsp))) {
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
