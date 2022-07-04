import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import {
  AdaptedShiftResponse,
  ShiftResponse,
  ShiftService,
} from 'src/app/core/shift.service';
import { User } from 'src/app/modules/auth/models/user.model';
import { UserService } from 'src/app/modules/user/user.service';
import {
  filterThisWeekShifts,
  filterUpcomingShifts,
} from 'src/app/utils/shifts.utils';
import { Shift } from '../../models/shifts.model';

@Component({
  selector: 'app-all-shifts',
  templateUrl: './all-shifts.component.html',
  styleUrls: ['./all-shifts.component.css'],
})
export class AllShiftsComponent implements OnInit {
  shifts!: AdaptedShiftResponse;

  localShifts: AdaptedShiftResponse = [];
  usersShifts: AdaptedShiftResponse = [];

  thisWeekShifts: Shift[] = [];
  upcommingShifts!: Shift[];

  id!: string | undefined;

  user!: User;

  constructor(
    private shiftService: ShiftService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.shiftService.getMyShift().subscribe((getShiftsResponse) => {
      this.shifts = this.adaptResponse(getShiftsResponse);
      console.log('>>>>>>>', getShiftsResponse);
      this.localShifts = this.shifts;
      this.usersShifts = [...this.localShifts];

      console.log(this.usersShifts);

      this.thisWeekShifts = filterThisWeekShifts(this.localShifts);

      this.upcommingShifts = filterUpcomingShifts(this.localShifts);
    });

    if (this.authService.loggedInUserId) {
      this.userService
        .getUserById(this.authService.loggedInUserId)
        .subscribe((data) =>
          Object.values(data).map((value) => {
            this.user = value;
            console.log(this.user);
          })
        );
    }
  }

  profit = (shift: Shift) => {
    let result: number = 0;
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

  adaptResponse = (data: ShiftResponse) =>
    Object.keys(data).map((id) => {
      const currentElement = data[id];
      return {
        ...currentElement,
        id,
      };
    });
}
