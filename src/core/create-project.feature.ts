import { addColsToSheet, appendDataToSheet, DialogTitle, GS } from '@lib';
import { ProjectMemberModel, ProjectRole } from '@models';
import { NamedRange, sheets } from '@utils/constants';

/** Create a new project with its members.*/
export const createProject = (name: string, members: ProjectMemberModel[]) => {
  const newColData = [[name]];

  if (members.length) {
    const allMembersNusp = GS.ss.getRangeByName(NamedRange.AllSavedNusps).getValues().flat();
    const projectRoleByNusp: Record<string, ProjectRole> = {};
    const projetMembersNusp = new Set(
      members.map(member => {
        projectRoleByNusp[member.nUsp] = member.role;

        return member.nUsp;
      }),
    );

    allMembersNusp.forEach(nUsp => {
      newColData.push([projetMembersNusp.has(nUsp) ? projectRoleByNusp[nUsp] : undefined]);
    });
  }

  addColsToSheet(sheets.projectMemberships, newColData);
  appendDataToSheet([{ projectName: name }], sheets.caringProjects, ({ projectName }) => [projectName]);
};

/** Create a new project in all sheets related to them, reading input from user. */
export const createProjectEntry = () => {
  const response = GS.ssui.prompt('Criar Projeto', 'Qual o nome do novo projeto?', GS.ssui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() === GS.ssui.Button.CANCEL) {
    GS.ss.toast('Criação de projeto cancelada.', DialogTitle.Aborted);

    return;
  }

  const projectName = response.getResponseText();

  if (!projectName) {
    GS.ss.toast('O nome do projeto não pode ficar vazio.', DialogTitle.Error);

    return;
  }

  // insert the project into the project membership sheet and project caring sheets
  createProject(projectName, []);

  GS.ss.toast(`Criação de projeto concluída: "${projectName}.`, DialogTitle.Success);

  // select first member's cell in new column
  sheets.projectMemberships.getRange(3, sheets.projectMemberships.getMaxColumns()).activate();
};
