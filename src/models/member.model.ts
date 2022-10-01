import { StudentBasicModel, StudentDataModel } from '@lib/models';

export type MemberModel = StudentDataModel;
export type MemberUpdateModel = Partial<StudentBasicModel>;
