import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getUser(JSON.parse(atob(localStorage.getItem('loggedInToken').split('.')[1])).email).subscribe(
      data => this.user = data
    )
  }

  displayedColumns: string[] = ['number', 'flight_number', 'passenger_hebrew_name', 'passenger_passport', 'row', 'seat'];

  @ViewChild(MatSort) sort: MatSort;


}
