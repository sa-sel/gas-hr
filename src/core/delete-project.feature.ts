import { DialogTitle, GS, input, readDataFromSheet } from '@lib';
import { sheets } from '@utils/constants';

const description = `Qual o nome do projeto que deseja excluir? Ele deve ser exatamente igual aparece na planilha.
Essa operação não pode ser desfeita.
`;

/** Delete a project from all sheets related to them. */
export const deleteProject = () => {
  const projectName = input(
    { title: 'Excluir Projeto', body: description },
    input => readDataFromSheet(sheets.caringProjects, { map: row => row[0] }).includes(input),
    input => `Não foi encontrado o projeto "${input}". Verifique se ele realmente existe.`,
  );

  if (!projectName) {
    GS.ss.toast('Exclusão de projeto cancelada.', DialogTitle.Aborted);

    return;
  }

  sheets.projectMemberships
    .createTextFinder(projectName)
    .findAll()
    .forEach(cell => {
      // delete project column
      if (cell.getRow() === 1 && cell.getColumn() > cell.getSheet().getFrozenColumns()) {
        cell.getSheet().deleteColumn(cell.getColumn());
      }
    });

  sheets.caringProjects
    .createTextFinder(projectName)
    .findAll()
    .forEach(cell => {
      // delete project row
      if (cell.getColumn() === 1 && cell.getRow() > cell.getSheet().getFrozenRows()) {
        cell.getSheet().deleteRow(cell.getRow());
      }
    });

  GS.ss.toast(`Exclusão de projeto concluída: "${projectName}.`, DialogTitle.Success);
};
