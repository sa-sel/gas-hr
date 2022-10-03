import { DialogTitle, getNamedValue, GS, input } from '@lib';
import { MemberModel, MemberUpdateModel } from '@models';
import { NamedRange } from '@utils/constants';
import { editMember, getMemberData, getTargetNusp, validateNuspUnique } from '@utils/functions';

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
    GS.ss.toast('Nenhum membro selecionado.', DialogTitle.Error);

    return;
  }

  const newValue = input(
    { title: 'Editar Usuário', body: describeModal(getMemberData(nusp), attributeDescriptor) },
    input => !validator || validator(input),
    input => `O ${attributeDescriptor.toLowerCase()} escolhido é inválido: "${input}".`,
  );

  if (!newValue) {
    GS.ss.toast('Edição de membro cancelada.', DialogTitle.Aborted);

    return;
  }

  editMember(nusp, { [attribute]: newValue });

  // if the searched attribute was changed, update it in the dashboard
  if (getNamedValue(NamedRange.SearchType).toLowerCase() === attributeDescriptor.toLowerCase()) {
    GS.ss.getRangeByName(NamedRange.SearchTarget).setValue(newValue);
  }

  GS.ss.toast(`Edição de membro concluída, ${attributeDescriptor} atualizado.`, DialogTitle.Success);
};

/** Propmt the user for the member's new name and edit it in all synced data sheets. */
export const editTargetMemberName = () => editTargetMember('name', 'nome');

/** Propmt the user for the member's new nickname and edit it in all synced data sheets. */
export const editTargetMemberNickname = () => editTargetMember('nickname', 'apelido');

/** Propmt the user for the member's new nº USP and edit it in all synced data sheets. */
export const editTargetMemberNusp = () => editTargetMember('nUsp', 'nº USP', validateNuspUnique);
