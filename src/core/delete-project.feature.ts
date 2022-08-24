import { DialogTitle, ss, ui } from '@lib/constants';
import { sheets } from '@utils/constants';

const description = `Qual o nome do projeto que deseja excluir? Ele deve ser exatamente igual aparece na planilha.
Essa operação não pode ser desfeita.
`;

/** Delete a project from all sheets related to them. */
export const deleteProject = () => {
  const response = ui.prompt('Excluir Projeto', description, ui.ButtonSet.OK_CANCEL);
  const projectName = response.getResponseText();

  if (response.getSelectedButton() === ui.Button.CANCEL || !projectName) {
    ss.toast('Exclusão de projeto cancelada.', DialogTitle.Aborted);

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

  ss.toast(`Exclusão de projeto concluída: "${projectName}.`, DialogTitle.Success);
};
