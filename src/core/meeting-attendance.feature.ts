import { sheets } from '@utils/constants';

export const trackMeetingAttendance = () => {
  const pos = sheets.meetingAttendance.getLastColumn();

  // insert new column and set it to the current date
  sheets.meetingAttendance
    .insertColumnAfter(pos)
    .getRange(1, pos + 1)
    .setValue(new Date())
    .activate();
};
