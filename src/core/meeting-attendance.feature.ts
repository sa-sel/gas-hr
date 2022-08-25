import { addColsToSheet } from '@lib/fuctions';
import { sheets } from '@utils/constants';

/** Init tracking for today's meeting. */
export const trackMeetingAttendance = () => {
  addColsToSheet(sheets.meetingAttendance, [new Date()]);

  const nCols = sheets.meetingAttendance.getMaxColumns();
  const nFrozenCols = sheets.meetingAttendance.getFrozenColumns();

  // update range in chart
  const meetingAttendanceChart = sheets.meetingAttendanceChart
    .getCharts()
    .pop()
    ?.modify()
    .clearRanges()
    .addRange(sheets.meetingAttendance.getRange(1, nFrozenCols + 1, 2, nCols - nFrozenCols))
    .setOption('areaOpacity', 0.5)
    .setOption('series', { 0: { color: 'black' } })
    .setOption('trendlines', { 0: { color: 'black', opacity: 0.7 } })
    .setOption('hAxis', { title: 'Data da RG' })
    .setOption('vAxis', { title: 'Número de membros presentes', gridlines: { count: 0 } })
    .build();

  meetingAttendanceChart && sheets.meetingAttendanceChart.updateChart(meetingAttendanceChart);

  // select first member's cell in new column
  sheets.meetingAttendance.getRange(3, nCols).activate();
};
