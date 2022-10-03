import { StudentBasicModel, StudentDataModel } from '@lib';

export type MemberModel = StudentDataModel;
export type MemberUpdateModel = Partial<StudentBasicModel>;
