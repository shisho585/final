import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private appService: AppService,
  ) { }

  admin: boolean;

  ngOnInit(): void {
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

  delete() {
    const header = "זהירות!";
    const message = "אתה עומד למחוק את משתמש " + name + ".\nזה יגרום גם למחיקת כל ההזמנות שבוצעו על ידו.\nאתה בטוח שברצונך להמשיך?";
    this.appService.openMessageDialog(message, header, true, true).afterClosed().subscribe(
      res => {
        if (res == 'pass')
          this.service.deleteUser(this.user.email).subscribe(
            res2 => {
              console.log(res2);
              
              this.appService.navigateToHome();
              this.appService.authenticate();
            }
          )
      }
    )
  }

}
