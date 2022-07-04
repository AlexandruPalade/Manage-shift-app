interface IShift {
  shiftName: string;
  userId?: string;
  date: string;
  startTime: string;
  endTime: string;
  pricePerHour: number;
  shiftPlace: string;
  id?: string;
  comments: string;
}

export class Shift implements IShift {
  shiftName = '';
  userId = '';
  date = '';
  startTime = '';
  endTime = '';
  pricePerHour = 0;
  shiftPlace = '';
  comments = '';
}
