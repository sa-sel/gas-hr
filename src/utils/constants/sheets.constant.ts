import { GS } from '@lib';

export const enum SheetName {
  CaringMembers = 'Acompanhamento - Membros',
  CaringProjects = 'Acompanhamento - Diretorias/Projetos',
  Dashboard = 'Home',
  MainData = 'Controle Geral',
  MeetingAttendance = 'Chamada RG',
  MeetingAttendanceChart = 'Gráfico (RGs)',
  NewMembers = 'Novos Membros',
  ProjectMemberships = 'Diretorias e Projetos',
}

export const sheets = {
  caringMembers: GS.ss.getSheetByName(SheetName.CaringMembers),
  caringProjects: GS.ss.getSheetByName(SheetName.CaringProjects),
  dashboard: GS.ss.getSheetByName(SheetName.Dashboard),
  mainData: GS.ss.getSheetByName(SheetName.MainData),
  meetingAttendance: GS.ss.getSheetByName(SheetName.MeetingAttendance),
  meetingAttendanceChart: GS.ss.getSheetByName(SheetName.MeetingAttendanceChart),
  newMembers: GS.ss.getSheetByName(SheetName.NewMembers),
  projectMemberships: GS.ss.getSheetByName(SheetName.ProjectMemberships),
};

/** Sheets that contain data for each member and must be kept synced. */
export const syncedDataSheets = [sheets.caringMembers, sheets.mainData, sheets.meetingAttendance, sheets.projectMemberships];
