import { NamedRange, ss, ui } from '@utils/constants';

export * from './core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onOpen = () => {
  ss.getNamedRanges()
    .find(range => range.getName() === NamedRange.SearchTarget)
    .getRange()
    .clearContent();

  ui.createMenu('Magias').addItem('Incluir Novos Membros', 'includeMembers').addToUi();
};
