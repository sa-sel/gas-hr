import { ss, ui } from '@lib/constants';
import { NamedRange } from '@utils/constants';
import { saveNewMembers } from './create-members.feature';
import { editTargetMemberName, editTargetMemberNickname, editTargetMemberNusp } from './edit-member.feature';
import { trackMeetingAttendance } from './meeting-attendance.feature';

export const onOpen = () => {
  ss.getRangeByName(NamedRange.SearchTarget).clearContent();

  const targetMemberOperations = ui
    .createMenu('Editar Membro Buscado (na Home)')
    .addItem('Editar Nome', editTargetMemberName.name)
    .addItem('Editar Apelido', editTargetMemberNickname.name)
    .addItem('Editar nº USP', editTargetMemberNusp.name);

  ui.createMenu('Magias')
    .addItem('Salvar Novos Membros', saveNewMembers.name)
    .addItem('Marcar Frequência em RG', trackMeetingAttendance.name)
    .addSeparator()
    .addSubMenu(targetMemberOperations)
    .addToUi();
};
