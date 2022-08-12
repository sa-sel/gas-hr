import { NamedRange, ss, ui } from '@utils/constants';
import { createNewMembers } from './create-members.feature';

export const onOpen = () => {
  ss.getRangeByName(NamedRange.SearchTarget).clearContent();
  ui.createMenu('Magias').addItem('Salvar Novos Membros', createNewMembers.name).addToUi();
};
