import { DialogTitle, ss } from '@lib/constants';
import { clearSheet, isSameSheet, readDataFromSheet } from '@lib/fuctions';
import { MemberModel } from '@models';
import { SheetName, sheets, syncedDataSheets } from '@utils/constants';
import { appendMembersToSheet, counter, parseRowToMember, validateMember } from '@utils/functions';

/** Save the members listed in the "new members" sheet to all synced data sheets. */
export const saveNewMembers = () => {
  const validNewMembers = [];
  const invalidNewMembers = [];
  const allNewMembers: MemberModel[] = readDataFromSheet(sheets.newMembers, parseRowToMember);

  if (!allNewMembers.length) {
    ss.toast(`Nenhum dado foi encontrado na planilha "${SheetName.NewMembers}".`, DialogTitle.Error);

    return;
  }

  const allNewMembersNusp = counter(allNewMembers.map(member => member.nUsp));

  // validate members
  allNewMembers.forEach(member => {
    const isValid = validateMember(member) && allNewMembersNusp[member.nUsp] === 1;

    (isValid ? validNewMembers : invalidNewMembers).push(member);
  });

  if (validNewMembers.length) {
    ss.toast(`Os membros da planilha "${SheetName.NewMembers}" estão sendo salvos.`, 'Processando...');

    syncedDataSheets.forEach(sheet => {
      appendMembersToSheet(validNewMembers, sheet, m => [
        ...[m.name, m.nickname, m.nUsp],
        ...(isSameSheet(sheet, sheets.mainData) ? [m.phone, m.emphasis, m.email, m.birthday] : []),
      ]);

      sheet.sort(1);
    });

    ss.toast(`Limpando os dados da planilha "${SheetName.NewMembers}".`, 'Finalizando...');
    clearSheet(sheets.newMembers);
  }

  if (invalidNewMembers.length) {
    if (validNewMembers.length) {
      // re-write invalid new members to the `new members` table
      sheets.newMembers
        .getRange(2, 1, invalidNewMembers.length, sheets.newMembers.getMaxColumns())
        .setValues(invalidNewMembers.map(m => [m.name, m.nickname, m.nUsp, m.phone, m.emphasis, m.email, m.birthday]))
        .activate();
    }

    ss.toast(
      `Há membros com nome/nº USP ausentes ou nº USP repetido/inválido na planilha "${SheetName.NewMembers}".`,
      `${DialogTitle.Error} Dados inválidos.`,
    );
  } else {
    sheets.mainData.getRange(1, 1).activate();
    ss.toast('Os membros foram salvos.', DialogTitle.Success);
  }
};
