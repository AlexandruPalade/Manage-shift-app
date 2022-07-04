import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { User } from 'src/app/modules/auth/models/user.model';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user!: User;
  email!: string;
  id!: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.loggedInUserId) {
      this.userService
        .getUserById(this.authService.loggedInUserId)
        .subscribe((data) => {
          console.log(data)
          this.email = Object.values(data)[0].email;
        });
    }
  }

  logOut() {
    console.log(localStorage.getItem('currentSession'));
    localStorage.removeItem('currentSession');
    this.router.navigate(['../auth/login']);
  }

  editUser(id: string) {
    this.router.navigate([`user/edit-profile/${id}`]);
  }
}
