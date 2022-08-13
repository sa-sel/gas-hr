import { NamedRange, ss } from '@utils/constants';
import { getTargetNusp, manageMemberSyncedDataSheets } from '@utils/functions';

/** Delete the member searched in the dashboard from all synced data sheets. */
export const deleteTargetMember = () => {
  const nusp = getTargetNusp();

  if (nusp) {
    manageMemberSyncedDataSheets(nusp, (cell, sheet) => sheet.deleteRow(cell.getRow()));
    ss.getRangeByName(NamedRange.SearchTarget).clearContent();
    ss.toast('Membro excluído.', 'Sucesso!');
  }
};
