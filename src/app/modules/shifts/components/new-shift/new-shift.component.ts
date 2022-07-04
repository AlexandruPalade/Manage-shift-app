import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import {
  AdaptedShiftResponse,
  ShiftResponse,
  ShiftService,
} from 'src/app/core/shift.service';

@Component({
  selector: 'app-new-shift',
  templateUrl: './new-shift.component.html',
  styleUrls: ['./new-shift.component.css'],
})
export class NewShiftComponent implements OnInit {
  addNewShiftForm!: FormGroup;

  errorMessage = false;
  shiftExists = false;

  shifts!: AdaptedShiftResponse;
  localShifts: AdaptedShiftResponse = [];
  usersShifts: AdaptedShiftResponse = [];

  constructor(
    private shiftService: ShiftService,
    private authService: AuthService,
    private router: Router
  ) {
    this.addNewShiftForm = new FormGroup({
      shiftName: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      startTime: new FormControl(null, [Validators.required]),
      endTime: new FormControl(null, [Validators.required]),
      pricePerHour: new FormControl(null, [Validators.required]),
      shiftPlace: new FormControl(null, [Validators.required]),
      comments: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.shiftService.getMyShift().subscribe((getShiftsResponse) => {
      this.shifts = this.adaptResponse(getShiftsResponse);
      console.log('>>>>>>>', getShiftsResponse);
      this.localShifts = this.shifts;
      this.usersShifts = [...this.localShifts];

      console.log(this.usersShifts);
    });
  }

  onAddNewShift() {
    if (
      this.addNewShiftForm.value.startTime < this.addNewShiftForm.value.endTime
    ) {
      this.shiftService
        .addNewShift({
          ...this.addNewShiftForm.value,
          userId: this.authService.loggedInUserId,
        })
        .subscribe(() => this.router.navigate(['shifts']));

      return (this.errorMessage = false);
    }
    return (this.errorMessage = true);
  }

  adaptResponse = (data: ShiftResponse) =>
    Object.keys(data).map((id) => {
      const currentElement = data[id];
      return {
        ...currentElement,
        id,
      };
    });
}
