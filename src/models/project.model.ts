import { StudentBasicModel } from '@lib/models';

export const enum ProjectRole {
  Coordinator = 'Coordenador',
  Director = 'Diretor',
  Manager = 'Gerente',
  Member = 'Membro',
}

export type ProjectMemberModel = StudentBasicModel & { role: ProjectRole };
