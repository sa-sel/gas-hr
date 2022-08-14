import { DialogTitle, NamedRange, ss, ui } from '@utils/constants';
import { getMemberData, getTargetNusp, manageMemberSyncedDataSheets } from '@utils/functions';

/** Delete the member searched in the dashboard from all synced data sheets. */
export const deleteTargetMember = () => {
  const nusp = getTargetNusp();

  if (!nusp) {
    return;
  }

  const member = getMemberData(nusp);
  const response = ui.prompt(
    'Excluir Membro',
    `Você tem certeza que deseja excluir ${member.name} (de nº USP "${member.nUsp}")? Essa ação não pode ser desfeita.`,
    ui.ButtonSet.YES_NO,
  );

  switch (response.getSelectedButton()) {
    case ui.Button.YES: {
      manageMemberSyncedDataSheets(nusp, (cell, sheet) => sheet.deleteRow(cell.getRow()));
      ss.getRangeByName(NamedRange.SearchTarget).clearContent();
      ss.toast('Membro excluído.', DialogTitle.Success);
      break;
    }

    default: {
      ss.toast('Exclusão de membro cancelada.', DialogTitle.Aborted);
    }
  }
};
