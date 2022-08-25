import { DialogTitle, ss, ui } from '@lib/constants';
import { addColsToSheet, appendDataToSheet } from '@lib/fuctions';
import { sheets } from '@utils/constants';

/** Create a new project in all sheets related to them. */
export const createProject = () => {
  const response = ui.prompt('Criar Projeto', 'Qual o nome do novo projeto?', ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() === ui.Button.CANCEL) {
    ss.toast('Criação de projeto cancelada.', DialogTitle.Aborted);

    return;
  }

  const projectName = response.getResponseText();

  if (!projectName) {
    ss.toast('O nome do projeto não pode ficar vazio.', DialogTitle.Error);

    return;
  }

  // insert the project into the project membership sheet and project caring sheets
  addColsToSheet(sheets.projectMemberships, [projectName]);
  appendDataToSheet([{ projectName }], sheets.caringProjects, ({ projectName }) => [projectName]);

  ss.toast(`Criação de projeto concluída: "${projectName}.`, DialogTitle.Success);

  // select first member's cell in new column
  sheets.projectMemberships.getRange(3, sheets.projectMemberships.getMaxColumns()).activate();
};
