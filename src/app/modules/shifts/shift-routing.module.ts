import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AllShiftsComponent } from './components/all-shifts/all-shifts.component';
import { EditShiftComponent } from './components/edit-shift/edit-shift.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NewShiftComponent } from './components/new-shift/new-shift.component';
import { ShiftsHomeComponent } from './components/shifts-home/shifts-home.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      { path: '', component: ShiftsHomeComponent },
      { path: 'work', component: AllShiftsComponent },
      { path: 'home', component: ShiftsHomeComponent },
      { path: 'new', component: NewShiftComponent },
      { path: 'edit/:shiftId', component: EditShiftComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftRoutingModule {}
