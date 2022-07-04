import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { debounceTime, filter, fromEvent } from 'rxjs';
import { DEFAULT_DEBOUNCE } from 'src/app/constants';
import { AuthService } from 'src/app/core/auth.service';

import {
  ShiftService,
  ShiftResponse,
  AdaptedShiftResponse,
} from 'src/app/core/shift.service';
import { User } from 'src/app/modules/auth/models/user.model';
import { UserService } from 'src/app/modules/user/user.service';
import { Shift } from '../../models/shifts.model';

@Component({
  selector: 'app-shifts-home',
  templateUrl: './shifts-home.component.html',
  styleUrls: ['./shifts-home.component.css'],
})
export class ShiftsHomeComponent implements OnInit {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild('start') start!: ElementRef<HTMLInputElement>;
  @ViewChild('end') end!: ElementRef<HTMLInputElement>;

  shifts!: AdaptedShiftResponse;
  localShifts: AdaptedShiftResponse = [];
  usersShifts: AdaptedShiftResponse = [];
  bestDay!: number;

  id!: string | undefined;

  user!: User;

  dateRange!: FormGroup;

  constructor(
    private shiftService: ShiftService,
    private router: Router,
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

    this.dateRange = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });

    console.log(this.dateRange.value.start);
    console.log(this.dateRange.value.end);
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(DEFAULT_DEBOUNCE), filter(Boolean))
      .subscribe((keyupEvent) => {
        const inputTarget = keyupEvent.target as HTMLInputElement;
        this.localShifts = this.shifts;
        this.localShifts = this.shifts.filter((shift) =>
          shift.shiftName.includes(inputTarget.value)
        );
      });
  }

  editShift(id: string) {
    this.router.navigate([`shifts/edit/${id}`]);
  }

  adaptResponse = (data: ShiftResponse) =>
    Object.keys(data).map((id) => {
      const currentElement = data[id];
      return {
        ...currentElement,
        id,
      };
    });

  profit = (shift: Shift) => {
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

  oncClosedDatePicker() {
    this.localShifts = this.shifts;
    const startDate = moment(this.dateRange.value.start);
    const endDate = moment(this.dateRange.value.end);
    this.localShifts = this.shifts.filter((shift) => {
      const dateOnShift = new Date(shift.date);
      return moment(dateOnShift).isBetween(startDate, endDate);
    });
  }

  onClear() {
    this.dateRange.reset();
    this.shiftService.getMyShift().subscribe((getShiftsResponse) => {
      this.shifts = this.adaptResponse(getShiftsResponse);
      console.log('>>>>>>>', getShiftsResponse);
      this.localShifts = this.shifts;
      this.usersShifts = [...this.localShifts];

      console.log(this.usersShifts);
    });
  }
}
