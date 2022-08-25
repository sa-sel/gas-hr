import { ss } from '@lib/constants';

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
  caringMembers: ss.getSheetByName(SheetName.CaringMembers),
  caringProjects: ss.getSheetByName(SheetName.CaringProjects),
  dashboard: ss.getSheetByName(SheetName.Dashboard),
  mainData: ss.getSheetByName(SheetName.MainData),
  meetingAttendance: ss.getSheetByName(SheetName.MeetingAttendance),
  meetingAttendanceChart: ss.getSheetByName(SheetName.MeetingAttendanceChart),
  newMembers: ss.getSheetByName(SheetName.NewMembers),
  projectMemberships: ss.getSheetByName(SheetName.ProjectMemberships),
};

/** Sheets that contain data for each member and must be kept synced. */
export const syncedDataSheets = [sheets.caringMembers, sheets.mainData, sheets.meetingAttendance, sheets.projectMemberships];
