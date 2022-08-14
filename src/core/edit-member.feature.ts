import { MemberModel, MemberUpdateModel } from '@models';
import { DialogTitle, NamedRange, ss, ui } from '@utils/constants';
import { editMember, getMemberData, getTargetNusp, validateNusp } from '@utils/functions';

const describeModal = (member: MemberModel, attribute: string) =>
  `
Os dados atuais do membro são:
Nome:    ${member.name}
Apelido: ${member.nickname ?? ''}
nº USP:  ${member.nUsp}

Novo ${attribute}:
`.trim();

/** Propmt the user for the member's new `attribute` and edit it in all synced data sheets. */
const editTargetMember = (attribute: keyof MemberUpdateModel, attributeDescriptor: string, validator?: (attr: string) => boolean) => {
  const nusp = getTargetNusp();

  if (!nusp) {
    ss.toast('Nenhum membro selecionado.', DialogTitle.Error);

    return;
  }

  const response = ui.prompt('Editar Usuário', describeModal(getMemberData(nusp), attributeDescriptor), ui.ButtonSet.OK_CANCEL);

  switch (response.getSelectedButton()) {
    case ui.Button.OK: {
      const newValue = response.getResponseText();
      const searchType = ss.getRangeByName(NamedRange.SearchType).getValue().toLowerCase();

      if (!newValue || (validator && !validator(newValue))) {
        ss.toast(`O ${attributeDescriptor.toLowerCase()} escolhido é inválido: "${newValue}".`, DialogTitle.Error);

        return;
      }

      editMember(nusp, { [attribute]: newValue });

      // if the searched attribute was changed, update it in the dashboard
      if (searchType === attributeDescriptor.toLowerCase()) {
        ss.getRangeByName(NamedRange.SearchTarget).setValue(newValue);
      }

      ss.toast(`Edição de membro concluída, ${attributeDescriptor} atualizado.`, DialogTitle.Success);

      break;
    }

    default: {
      ss.toast('Edição de membro cancelada.', DialogTitle.Aborted);
    }
  }
};

/** Propmt the user for the member's new name and edit it in all synced data sheets. */
export const editTargetMemberName = () => editTargetMember('name', 'nome');

/** Propmt the user for the member's new nickname and edit it in all synced data sheets. */
export const editTargetMemberNickname = () => editTargetMember('nickname', 'apelido');

/** Propmt the user for the member's new nº USP and edit it in all synced data sheets. */
export const editTargetMemberNusp = () => editTargetMember('nUsp', 'nº USP', validateNusp);
