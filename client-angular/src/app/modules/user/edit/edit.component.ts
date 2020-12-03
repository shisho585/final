import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  user = new User();
  admin: boolean;
  confirmPassword: string;

  constructor(
    private route: ActivatedRoute,
    private service: UserService
  ) { }

  ngOnInit(): void {
    console.log(JSON.parse(atob(localStorage.getItem('loggedInToken').split('.')[1])).email);

    let email;
    if (email = this.route.snapshot.paramMap.get('email')) {
      this.admin = true;
    } else {
      email = JSON.parse(atob(localStorage.getItem('loggedInToken').split('.')[1])).email;
    }

    this.service.getUser(email)
      .subscribe(
        data => this.user = data
      )
  }

  save() {
    this.service.updateUser(this.user).subscribe(
      res => this.service.navigateToHome()
    )
  }

  cancel() {
    this.service.navigateToHome();
  }

}
