import { sheets } from '@utils/constants';

export const trackMeetingAttendance = () => {
  const pos = sheets.meetingAttendance.getLastColumn();

  // insert new column and set it to the current date
  sheets.meetingAttendance
    .insertColumnAfter(pos)
    .getRange(1, pos + 1)
    .setValue(new Date());

  // apply header formula to new column
  sheets.meetingAttendance
    .getRange(2, pos)
    .copyTo(sheets.meetingAttendance.getRange(2, pos + 1), SpreadsheetApp.CopyPasteType.PASTE_FORMULA, false);

  // update range in chart
  const meetingAttendanceChart = sheets.meetingAttendanceChart
    .getCharts()
    .pop()
    ?.modify()
    .clearRanges()
    .addRange(sheets.meetingAttendance.getRange(1, sheets.meetingAttendance.getFrozenColumns() + 1, 2, pos + 1))
    .setOption('areaOpacity', 0.5)
    .setOption('trendlines', { 0: { color: 'black', opacity: 0.7 } })
    .setOption('hAxis', { title: 'Data da RG' })
    .setOption('vAxis', { title: 'Número de membros presentes', gridlines: { count: 0 } })
    .build();

  meetingAttendanceChart && sheets.meetingAttendanceChart.updateChart(meetingAttendanceChart);

  // select first member's cell in new column
  sheets.meetingAttendance.getRange(3, pos + 1).activate();
};
