import * as moment from 'moment';
import { ShiftResponse } from '../core/shift.service';
import { Shift } from '../modules/shifts/models/shifts.model';

export const isShiftThisWeek = (currentShiftDate: string) => {
  const weekStart = moment().clone().startOf('isoWeek');
  const weekEnd = moment().clone().endOf('isoWeek');
  const currentShiftMomentTime = moment(currentShiftDate);

  return currentShiftMomentTime.isBetween(weekStart, weekEnd);
};
export const isShiftUpcoming = (currentShiftDate: string) => {
  const currentShiftMomentTime = moment(currentShiftDate);

  return currentShiftMomentTime.isAfter(moment());
};

export const filterThisWeekShifts = (shifts: Shift[]): Shift[] | [] => {
  return shifts.filter((shift) => isShiftThisWeek(shift.date));
};

export const filterUpcomingShifts = (shifts: Shift[]): Shift[] | [] => {
  return shifts.filter((shift) => isShiftUpcoming(shift.date));
};

export const profit = (shift: Shift) => {
  let result = 0;
  const start = new Date();
  const end = new Date();

  const startTime = new Date(`${start.toDateString()} ${shift.startTime}`);
  const endTime = new Date(`${end.toDateString()} ${shift.endTime}`);

  result = Number(
    Math.round(
      ((endTime.valueOf() - startTime.valueOf()) / 1000 / 3600) *
        Number(shift.pricePerHour) *
        100
    ) / 100
  );
  return result;
};

export const adaptResponse = (data: ShiftResponse) =>
  Object.keys(data).map((id) => {
    const currentElement = data[id];
    return {
      ...currentElement,
      id,
    };
  });
