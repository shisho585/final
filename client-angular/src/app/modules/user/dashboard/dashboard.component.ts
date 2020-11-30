import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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
        console.log(data);
        
        this.user = data;
      }
    )

  }

  displayedColumns: string[] = ['number', 'flight_number', 'passenger_hebrew_name', 'passenger_passport', 'row', 'seat'];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }

}
