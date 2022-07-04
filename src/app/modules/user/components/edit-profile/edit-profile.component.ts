import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/modules/auth/models/user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editForm!: FormGroup;
  user!: any;
  userToEdit!: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private currentRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.editForm = new FormGroup({
      email: new FormControl(null),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      age: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.user = this.currentRoute.snapshot.params;
    console.log('?????', this.user.id);

    if (this.authService.loggedInUserId) {
      this.userService
        .getUserById(this.authService.loggedInUserId)
        .subscribe((data) => {
          this.userToEdit = Object.values(data)[0];
          console.log(this.userToEdit);
          this.editForm.patchValue({
            email: this.userToEdit.email,
            firstName: this.userToEdit.firstName,
            lastName: this.userToEdit.lastName,
            age: this.userToEdit.age,
          });
        });
    }
  }

  onEditProfile() {
    this.userService
      .editUser(this.user.id, {
        ...this.editForm.value,
      })
      .subscribe(() => this.router.navigate(['/shifts/home']));
  }
}
