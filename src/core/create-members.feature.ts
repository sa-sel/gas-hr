import { MemberModel } from '@models';
import { SheetName, sheets, ss, syncedDataSheets } from '@utils/constants';
import {
  appendMembersToSheet,
  clearSheet,
  counter,
  getAllSavedNusps,
  isSameSheet,
  parseDataAsString,
  readDataFromSheet,
  validateMember,
} from '@utils/functions';

export const createNewMembers = () => {
  const validNewMembers = [];
  const invalidNewMembers = [];
  const allNewMembers: MemberModel[] = readDataFromSheet(sheets.newMembers, {
    mapFn: (row: any[]) => ({
      name: parseDataAsString(row[0]),
      nickname: parseDataAsString(row[1]),
      nUsp: parseDataAsString(row[2]),
      phone: parseDataAsString(row[3]),
      emphasis: row[4],
      email: parseDataAsString(row[5]),
      birthday: row[6],
    }),
  });

  if (!allNewMembers.length) {
    ss.toast(`Nenhum dado foi encontrado na planilha "${SheetName.NewMembers}".`, 'Erro!');

    return;
  }

  const allMembersNusp = getAllSavedNusps();
  const allNewMembersNusp = counter(allNewMembers.map(member => member.nUsp));

  // validate members
  allNewMembers.forEach(member => {
    const isValid = validateMember(member) && !allMembersNusp.has(member.nUsp) && allNewMembersNusp[member.nUsp] === 1;

    (isValid ? validNewMembers : invalidNewMembers).push(member);
  });

  if (validNewMembers.length) {
    ss.toast(`Os membros da planilha "${SheetName.NewMembers}" estão sendo salvos.`, 'Processando...');

    syncedDataSheets.forEach(sheet => {
      appendMembersToSheet(validNewMembers, sheet, m => [
        ...[m.name, m.nickname, m.nUsp],
        ...(isSameSheet(sheet, sheets.mainData) ? [m.phone, m.emphasis, m.email, m.birthday] : []),
      ]);
    });
  }

  ss.toast(`Limpando os dados da planilha "${SheetName.NewMembers}".`, 'Finalizando...');
  clearSheet(sheets.newMembers);

  if (invalidNewMembers.length) {
    ss.toast(
      `Há membros com nome/nº USP ausentes ou nº USP repetido/inválido na planilha "${SheetName.NewMembers}".`,
      'Erro! Dados inválidos.',
    );

    // re-write invalid new members to the `new members` table
    sheets.newMembers
      .getRange(2, 1, invalidNewMembers.length, sheets.newMembers.getMaxColumns())
      .setValues(invalidNewMembers.map(m => [m.name, m.nickname, m.nUsp, m.phone, m.emphasis, m.email, m.birthday]));
  } else {
    ss.toast('Os membros foram salvos.', 'Sucesso!');
  }
};
