import { MemberModel } from '@models';
import { SheetName, sheets, ss, syncedDataSheets } from '@utils/constants';
import { appendMembersToSheet, clearSheet, isSameSheet, readDataFromSheet } from '@utils/functions';

export const createNewMembers = () => {
  const validMembers = [];
  const invalidMembers = [];
  const allMembers: MemberModel[] = readDataFromSheet(sheets.newMembers, {
    mapFn: (row: any[]) => ({
      name: row[0],
      nickname: row[1],
      nUsp: row[2],
      phone: row[3],
      emphasis: row[4],
      email: row[5],
      birthday: row[6],
    }),
  });

  if (!allMembers.length) {
    ss.toast(`Nenhum dado foi encontrado na planilha "${SheetName.NewMembers}".`, 'Erro!');

    return;
  }

  allMembers.forEach(member => {
    (!member.name || !member.nUsp ? invalidMembers : validMembers).push(member);
  });

  if (validMembers.length) {
    ss.toast(`Os membros da planilha "${SheetName.NewMembers}" estão sendo salvos.`, 'Processando...');

    syncedDataSheets.forEach(sheet => {
      appendMembersToSheet(validMembers, sheet, m => [
        ...[m.name, m.nickname, m.nUsp],
        ...(isSameSheet(sheet, sheets.mainData) ? [m.phone, m.emphasis, m.email, m.birthday] : []),
      ]);
    });
  }

  if (invalidMembers.length) {
    ss.toast(`Há membros com nome ou nº USP ausentes na planilha "${SheetName.NewMembers}", verifique.`, 'Erro!');
  } else {
    ss.toast('Os membros foram salvos.', 'Sucesso!');
  }

  ss.toast(`Limpando os dados da planilha "${SheetName.NewMembers}".`, 'Finalizando...');
  clearSheet(sheets.newMembers);
};
