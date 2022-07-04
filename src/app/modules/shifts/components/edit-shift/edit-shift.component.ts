import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShiftService } from 'src/app/core/shift.service';
import { Shift } from '../../models/shifts.model';

@Component({
  selector: 'app-edit-shift',
  templateUrl: './edit-shift.component.html',
  styleUrls: ['./edit-shift.component.css'],
})
export class EditShiftComponent implements OnInit {
  editShiftForm!: FormGroup;
  shiftId!: any;
  shiftToEdit!: any;
  errorMessage = false;

  constructor(
    private shiftService: ShiftService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) {
    this.editShiftForm = new FormGroup({
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
    this.shiftId = this.currentRoute.snapshot.params;
    console.log(this.shiftId.shiftId);

    this.shiftService.getShift(this.shiftId.shiftId).subscribe((data) => {
      this.shiftToEdit = data;

      console.log(this.shiftToEdit);
      this.editShiftForm.patchValue({
        shiftName: this.shiftToEdit.shiftName,
        date: this.shiftToEdit.date,
        startTime: this.shiftToEdit.startTime,
        endTime: this.shiftToEdit.endTime,
        pricePerHour: this.shiftToEdit.pricePerHour,
        shiftPlace: this.shiftToEdit.shiftPlace,
        comments: this.shiftToEdit.shiftPlace,
        
      });
    });
  }

  onEditShift() {
    if (this.editShiftForm.value.startTime < this.editShiftForm.value.endTime) {
      this.shiftService
        .editShift(this.shiftId.shiftId, {
          ...this.editShiftForm.value,
        })
        .subscribe(() => this.router.navigate(['shifts/home']));
      return (this.errorMessage = false);
    }

    return (this.errorMessage = true);
  }
}
