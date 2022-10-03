import { manageDataInSheets, SaDepartment, SaDepartmentAbbreviations, StudentBasicModel } from '@lib';
import { ProjectRole } from '@models';
import { sheets } from '@utils/constants';

export const getDirector = (department: SaDepartment): StudentBasicModel | null => {
  let director: StudentBasicModel = null;

  manageDataInSheets(SaDepartmentAbbreviations[department] ?? department, [sheets.projectMemberships], cell => {
    const col = cell.getColumn();
    const sheet = cell.getSheet();

    if (cell.getRow() === 1 && col > sheet.getFrozenColumns()) {
      const nFrozenRows = sheet.getFrozenRows();
      const departmentCol = sheet.getRange(nFrozenRows, col, sheet.getMaxRows() - nFrozenRows, 1);
      const directorCell = departmentCol.createTextFinder(ProjectRole.Director).findNext();

      if (directorCell) {
        const data: string[] = sheet.getRange(directorCell.getRow(), 1, 1, 3).getValues().flat();

        director = { name: data[0], nickname: data[1], nUsp: data[2] };
      }
    }
  });

  return director;
};
