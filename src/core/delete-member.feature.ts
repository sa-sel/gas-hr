import { DialogTitle, GS } from '@lib/constants';
import { confirm } from '@lib/functions';
import { NamedRange } from '@utils/constants';
import { getMemberData, getTargetNusp, manageMemberSyncedDataSheets } from '@utils/functions';

/** Delete the member searched in the dashboard from all synced data sheets. */
export const deleteTargetMember = () => {
  const nusp = getTargetNusp();

  if (!nusp) {
    return;
  }

  const member = getMemberData(nusp);

  confirm(
    {
      title: 'Excluir Membro',
      body: `Você tem certeza que deseja excluir ${member.name} (de nº USP "${member.nUsp}")? Essa ação não pode ser desfeita.`,
    },
    () => {
      manageMemberSyncedDataSheets(nusp, cell => cell.getSheet().deleteRow(cell.getRow()));
      GS.ss.getRangeByName(NamedRange.SearchTarget).clearContent();
      GS.ss.toast('Membro excluído.', DialogTitle.Success);
    },
  );
};
