import { NamedRange, ss } from '@utils/constants';
import { deleteMemberByNusp } from '@utils/functions';

/** Delete the member searched in the dashboard from the spreadsheet. */
export const deleteTargetMember = () => {
  const nusp: string = ss.getRangeByName(NamedRange.TargetNusp).getValue();

  deleteMemberByNusp(nusp);
  ss.getRangeByName(NamedRange.SearchTarget).clearContent();
  ss.toast('Membro excluído.', 'Sucesso!');
};
