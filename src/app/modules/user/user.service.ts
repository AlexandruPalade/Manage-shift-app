import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  BASE_URL =
    'https://shift-app-7c7c7-default-rtdb.europe-west1.firebasedatabase.app/users';

  createNewUser(userDetails: Partial<User>) {
    console.log('???????????????');
    return this.httpClient.post(this.BASE_URL, userDetails);
  }

  editUser(userId: string, editedUser: User) {
    return this.httpClient.patch(this.BASE_URL + '/' + userId, editedUser);
  }

  getUserById(userId: string) {
    return this.httpClient.get(this.BASE_URL, {
      params: new HttpParams()
        .append('orderBy', '"id"')
        .append('equalTo', `"${userId}"`),
    });
  }
}
