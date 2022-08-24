import { ss, ui } from '@lib/constants';
import { NamedRange } from '@utils/constants';
import { saveNewMembers } from './create-members.feature';
import { createProject } from './create-project.feature';
import { deleteProject } from './delete-project.feature';
import { editTargetMemberName, editTargetMemberNickname, editTargetMemberNusp } from './edit-member.feature';
import { help } from './help.feature';
import { trackMeetingAttendance } from './meeting-attendance.feature';

export const onOpen = () => {
  ss.getRangeByName(NamedRange.SearchTarget).clearContent();

  ui.createMenu('[Membros]')
    .addItem('Salvar Novos Membros', saveNewMembers.name)
    .addSeparator()
    .addSubMenu(
      ui
        .createMenu('Editar Membro Buscado (na Home)')
        .addItem('Editar Nome', editTargetMemberName.name)
        .addItem('Editar Apelido', editTargetMemberNickname.name)
        .addItem('Editar nº USP', editTargetMemberNusp.name),
    )
    .addToUi();

  ui.createMenu('[RGs]').addItem('Marcar Frequência em RG', trackMeetingAttendance.name).addToUi();

  ui.createMenu('[Projetos]').addItem('Criar Novo Projeto', createProject.name).addItem('Excluir Projeto', deleteProject.name).addToUi();

  ui.createMenu('[Socorro! Como que usa essa planilha?]').addItem('Clique aqui e descubra!', help.name).addToUi();
};
