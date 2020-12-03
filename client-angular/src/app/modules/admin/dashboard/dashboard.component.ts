import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private service: AdminService,
    private appService: AppService
  ) { }

  flightsDataSource;
  plainsDataSource;
  usersDataSource;
  displayedColumnsOfFlights: string[] = ['number', 'plain_type', 'departure', 'from', 'to', 'distance', 'price'];
  displayedColumnsOfPlains: string[] = ['type', 'speed', 'range', 'number_of_rows', 'seats_to_row', 'actions'];
  displayedColumnsOfUsers: string[] = ['name', 'email', 'phone', 'role', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.updateFlights();
    this.updatePlains();
    this.updateUsers();
  }

  updateFlights() {
    this.service.getAllFlights().subscribe(flights => {
      this.service.flights = flights;
      this.flightsDataSource = new MatTableDataSource(flights);
      this.flightsDataSource.sort = this.sort;
    })
  }

  updatePlains() {
    this.service.getAllPlains().subscribe(plains => {
      this.service.plains = plains;
      this.plainsDataSource = new MatTableDataSource(plains);
      this.plainsDataSource.sort = this.sort;
    });
  }

  updateUsers() {
    this.service.getAllUsers().subscribe(users => {
      this.usersDataSource = new MatTableDataSource(users);
      this.usersDataSource.sort = this.sort;
    });
  }

  deletePlain(type: string) {
    const header = "זהירות!";
    const message = "אתה עומד למחוק את מטוס " + type + ".\nזה יגרום גם למחיקת כל הטיסות שמשתמשות במטוס הזה.\nאתה בטוח שברצונך להמשיך?";
    this.appService.openMessageDialog(message, header, true, true).afterClosed().subscribe(
      res => {
        if (res == 'pass')
          this.service.deletePlain(type).subscribe(
            res2 => {
              this.updatePlains();
              this.updateFlights();
            }
          )
      }
    )
  }


  deleteUser(email: string, name: string) {
    const header = "זהירות!";
    const message = "אתה עומד למחוק את משתמש " + name + ".\nזה יגרום גם למחיקת כל ההזמנות שבוצעו על ידו.\nאתה בטוח שברצונך להמשיך?";
    this.appService.openMessageDialog(message, header, true, true).afterClosed().subscribe(
      res => {
        if (res == 'pass')
          this.service.deleteUser(email).subscribe(
            res2 => this.updateUsers()
          )
      }
    )
  }

}
