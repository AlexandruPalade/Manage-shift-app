import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  id = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.authService.loggedInUserId) {
      this.userService
        .getUserById(this.authService.loggedInUserId)
        .subscribe((data) =>
          Object.keys(data).map((value) => {
            this.id = value;
            console.log(this.id);
          })
        );
    }
  }

  editUser(id: string) {
    this.router.navigate([`user/edit-profile/${id}`]);
  }
}
