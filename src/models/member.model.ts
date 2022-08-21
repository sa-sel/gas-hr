import { CourseEmphasis } from '@lib/models';

export interface MemberModel {
  name: string;
  nickname?: string;
  nUsp: string;
  phone?: string;
  emphasis?: CourseEmphasis;
  email?: string;
  birthday?: Date;
}

export interface MemberUpdateModel {
  name?: string;
  nickname?: string;
  nUsp?: string;
}
