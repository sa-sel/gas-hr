import { isSameSheet, saveNewData } from '@lib';
import { MemberModel } from '@models';
import { SheetName, sheets, syncedDataSheets } from '@utils/constants';
import { counter, getAllSavedNusps, parseRowToMember, validateNusp } from '@utils/functions';

/** Save the members listed in the "new members" sheet to all synced data sheets. */
export const saveNewMembers = () =>
  saveNewData<MemberModel>({
    newDataSheet: sheets.newMembers,
    targetSheets: syncedDataSheets,
    parseRowToData: parseRowToMember,
    parseDataToRow: (member, sheet) => [
      ...[member.name, member.nickname, member.nUsp],
      ...(isSameSheet(sheet, sheets.mainData) ? [member.phone, member.emphasis, member.email, member.birthday] : []),
    ],
    dataValidatorFactory: newMembers => {
      const oldMembersNusp = getAllSavedNusps();
      const newMembersNusp = counter(newMembers.map(member => member.nUsp));

      return member => member.name && validateNusp(member.nUsp) && !oldMembersNusp.has(member.nUsp) && newMembersNusp[member.nUsp] === 1;
    },
    hooks: {
      afterAppend: sheet => sheet.sort(1),
      success: () => sheets.mainData.activate(),
    },
    invalidDataErrorMessage: `Há membros com nome/nº USP ausentes ou nº USP repetido/inválido na planilha "${SheetName.NewMembers}".`,
  });
