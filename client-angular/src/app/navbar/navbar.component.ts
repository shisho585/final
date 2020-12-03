import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('loggedInToken');
    this.appService.authenticate().finally(
      () => {
        this.appService.navigateToHome()
      }
    );
  }

}
