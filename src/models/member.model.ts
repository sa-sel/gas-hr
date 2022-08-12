export const enum CourseEmphasis {
  Automation = 'Automação',
  Electronics = 'Eletrônica',
}

export interface MemberModel {
  name: string;
  nickname?: string;
  nUsp: string;
  phone?: string;
  emphasis?: CourseEmphasis;
  email?: string;
  birthday?: Date;
}
