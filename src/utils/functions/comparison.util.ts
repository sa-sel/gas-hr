import { Sheet } from '@models';

export const isSameSheet = (a: Sheet, b: Sheet): boolean => a.getSheetId() === b.getSheetId();
