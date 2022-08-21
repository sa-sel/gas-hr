import { ss } from '@lib/constants';

export const enum SheetName {
  CaringMembers = 'Acompanhamento - Membros',
  CaringProjects = 'Acompanhamento - Projetos/Diretorias',
  Dashboard = 'Home',
  MainData = 'Controle Geral',
  MeetingAttendance = 'Chamada RG',
  NewMembers = 'Novos Membros',
  ProjectMemberships = 'Diretorias e Projetos',
}

export const sheets = {
  caring: ss.getSheetByName(SheetName.CaringMembers),
  dashboard: ss.getSheetByName(SheetName.Dashboard),
  mainData: ss.getSheetByName(SheetName.MainData),
  meetingAttendance: ss.getSheetByName(SheetName.MeetingAttendance),
  newMembers: ss.getSheetByName(SheetName.NewMembers),
  projectMemberships: ss.getSheetByName(SheetName.ProjectMemberships),
};

/** Sheets that contain data for each member and must be kept synced. */
export const syncedDataSheets = [sheets.caring, sheets.mainData, sheets.meetingAttendance, sheets.projectMemberships];
