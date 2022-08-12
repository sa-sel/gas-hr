// funçao de incluir membros nas tres planilhas

import { allSheets, newMembers } from './globals';

const includeMembers = () => {
  const membros = getNewMembersDB();

  appendToMasterSheet(membros);
  allSheets.forEach(sheet => appendToSheet(membros, sheet));
};

const getNewMembersDB = () => {
  // pega os dados dos novos membros
  const membros = newMembers
    .getRange('A2:G')
    .getValues()
    .filter(m => m.reduce((acc, cur) => acc || cur))
    .map(membro => ({
      name: membro[0],
      nickname: membro[1],
      uspNumber: membro[2],
      zapNumber: membro[3],
      emphasis: membro[4],
      email: membro[5],
      birthday: membro[6],
    }));

  // caso a lista de novos membros esteja vazia
  if (!membros.length) {
    ui.alert('Erro!', 'Não há nenhum dado na planilha "Novos Membros".', ui.ButtonSet.OK);

    return None;
  }
  // checa se todos os membros possuem dados válidos
  try {
    membros.forEach(membro => {
      // se algum membro possuir um dado inválido, acusa um erro
      if (!membro.name || !membro.uspNumber) {
        throw new Error('[ERRO] Por favor, verifique se todos os membros possuem os dados mínimos para entrar na planilha (nome e N°USP).');
      }
    });
  } catch (e) {
    // caso algum erro tenha sido acusado ao pegar os dados dos membros, alerta o usuário e retorna None
    ui.alert(
      'Erro!',
      'Ocorreu um erro com os dados dos novos membros. Por favor, confira se todos possuem: nome, email, N°USP e zap. (erro 01)',
      ui.ButtonSet.OK,
    );

    return None;
  }

  return membros;
};

const appendToMasterSheet = membros => {
  const master = membersMasterSheet;
  const noRows = master.getMaxRows();
  const noCols = master.getMaxColumns();
  const emptyRows = [];

  for (let i = 1; i <= noRows; i++) {
    const isEmpty = !master
      .getRange(i, 1, 1, noCols)
      .getValues()[0]
      .reduce((acc, cur) => acc || cur);

    if (isEmpty) {
      emptyRows.push(i);
    }
  }
  emptyRows.forEach((i, qty) => {
    if (i > 2) {
      master.deleteRow(i - qty);
    }
  });
  const firstRow = master.getRange('A2:G2');
  const values = membros.map(membro => [
    membro.name,
    membro.nickname,
    membro.uspNumber,
    membro.zapNumber,
    membro.emphasis,
    membro.email,
    membro.birthday,
  ]);

  let maxRows = master.getMaxRows();
  // Caso a primeira linha da planilha principal esteja vazia, insere o primeiro bixo nela
  if (!firstRow.getValues()[0].reduce((acc, cur) => acc || cur)) {
    firstRow.setValues([values[0]]);
    values.splice(0, 1);
    master.getRange('A2').check().uncheck();
  }
  // Insere os valores na planilha principal
  master
    .insertRowsAfter(maxRows++, values.length)
    .getRange(`A${maxRows}:G`)
    .setValues(values);
  // limpa a aba "Novos Membros"
  clearNewMembers();
};

const clearNewMembers = () => newMembers.getRange('A2:G').clearContent();
