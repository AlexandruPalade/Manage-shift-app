import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Shift } from '../modules/shifts/models/shifts.model';
import { AuthService } from './auth.service';

export type ShiftResponse = {
  [id: string]: Shift & { id: string };
};

export type AdaptedShiftResponse = (Shift & { id: string })[];

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  BASE_URL =
    ' https://shift-app-7c7c7-default-rtdb.europe-west1.firebasedatabase.app/shifts';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getShiftByUserId(userId: string) {
    return this.httpClient.get<ShiftResponse>(this.BASE_URL, {
      params: new HttpParams()
        .append('orderBy', '"userId"')
        .append('equalTo', `"${userId}"`),
    });
  }

  getShift(id: string) {
    return this.httpClient.get(this.BASE_URL + '/' + id);
  }

  getMyShift() {
    if (this.authService.loggedInUserId) {
      return this.getShiftByUserId(this.authService.loggedInUserId);
    }
    return of({});
  }

  addNewShift(newShift: Shift) {
    return this.httpClient.post(this.BASE_URL, newShift);
  }

  editShift(shiftId: string, editedShift: Shift) {
    return this.httpClient.patch(this.BASE_URL + '/' + shiftId, editedShift);
  }
}
