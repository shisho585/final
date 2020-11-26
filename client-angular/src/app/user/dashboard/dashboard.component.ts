import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user = new User();

  constructor(private http: HttpClient) {
    http.get<User>('http://localhost:3000/api/user/' + JSON.parse(atob(localStorage.getItem('loggedInToken').split('.')[1])).email).subscribe(
      data => {
        this.user = data
      }
    )
  }

  ngOnInit(): void {
  }

}
