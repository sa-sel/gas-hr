import { GS } from '@lib';
import { NamedRange } from '@utils/constants';
import { saveNewMembers } from './create-members.feature';
import { createProjectEntry } from './create-project.feature';
import { deleteProject } from './delete-project.feature';
import { editTargetMemberName, editTargetMemberNickname, editTargetMemberNusp } from './edit-member.feature';
import { help } from './help.feature';
import { trackMeetingAttendance } from './meeting-attendance.feature';

export const onOpen = () => {
  GS.ss.getRangeByName(NamedRange.SearchTarget).clearContent();

  GS.ssui
    .createMenu('[Membros]')
    .addItem('Salvar Novos Membros', saveNewMembers.name)
    .addSeparator()
    .addSubMenu(
      GS.ssui
        .createMenu('Editar Membro Buscado (na Home)')
        .addItem('Editar Nome', editTargetMemberName.name)
        .addItem('Editar Apelido', editTargetMemberNickname.name)
        .addItem('Editar nº USP', editTargetMemberNusp.name),
    )
    .addToUi();

  GS.ssui.createMenu('[RGs]').addItem('Marcar Frequência em RG', trackMeetingAttendance.name).addToUi();

  GS.ssui
    .createMenu('[Projetos]')
    .addItem('Criar Novo Projeto', createProjectEntry.name)
    .addItem('Excluir Projeto', deleteProject.name)
    .addToUi();

  GS.ssui.createMenu('[Socorro! Como que usa essa planilha?]').addItem('Clique aqui e descubra!', help.name).addToUi();
};
