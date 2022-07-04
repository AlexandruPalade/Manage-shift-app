import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsHomeComponent } from './components/shifts-home/shifts-home.component';
import { ShiftRoutingModule } from './shift-routing.module';
import { FormsModule } from '@angular/forms';
import { NewShiftComponent } from './components/new-shift/new-shift.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { EditShiftComponent } from './components/edit-shift/edit-shift.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AllShiftsComponent } from './components/all-shifts/all-shifts.component';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [
    ShiftsHomeComponent,
    NewShiftComponent,
    LandingPageComponent,
    EditShiftComponent,
    AllShiftsComponent,
  ],
  imports: [
    CommonModule,
    ShiftRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextFieldModule,
  ],
})
export class ShiftModule {}
