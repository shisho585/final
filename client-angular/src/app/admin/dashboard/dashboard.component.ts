import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
  landingTime: Date;
  arrivalTime: Date;
  sourceCountry: string;
  sourceTerminal: string;
  targetCountry: string;
  targetTerminal: string;
  distance: number;
  estimatedTime: number;
  plainType: string;
  seats: boolean[][];
  cost: number;
  id: string;
  freeSeats?: number;
}

const ELEMENT_DATA_BASE: PeriodicElement[] = [
  {
    landingTime: new Date(2020, 1, 11, 20), arrivalTime: new Date(2020, 1, 13, 0, 15), sourceCountry: 'ישראל', sourceTerminal: 'TLV',
    targetCountry: 'ארה"ב', targetTerminal: 'NYS', distance: 25350, estimatedTime: 1340, plainType: 'airbus',
    seats: new Array(30).fill([false, true, true, false, false, false])
    , cost: 2060, id: 'FX5366'
  },
  {
    landingTime: new Date(2020, 0, 13, 22, 15), arrivalTime: new Date(2020, 0, 14, 0, 15), sourceCountry: 'ישראל', sourceTerminal: 'TLV',
    targetCountry: 'איטליה', targetTerminal: 'ITL', distance: 2520, estimatedTime: 120, plainType: 'airbus', seats: new Array(30).fill(new Array(6).fill(false)), cost: 400, id: 'DW6624'
  },
  {
    landingTime: new Date(2020, 4, 1), arrivalTime: new Date(2020, 4, 1, 2, 35), sourceCountry: 'ישראל', sourceTerminal: 'TLV',
    targetCountry: 'יוון', targetTerminal: 'WSX', distance: 2715, estimatedTime: 155, plainType: 'airbus', seats: new Array(30).fill(new Array(6).fill(false)), cost: 500, id: 'PL9277'
  }
];

@Component({
  selector: 'app-main',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {
    if (localStorage.getItem('loggedIn') == undefined) {
      router.navigate(['admin', 'login']);
    }
    ELEMENT_DATA_BASE.forEach(ELEMENT_DATA => {
      ELEMENT_DATA.freeSeats = ELEMENT_DATA.seats.map<number>(row => row.filter(seat => !seat).length).reduce((a, b) => a + b);
    });
  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['id', 'plainType', 'landingTime', 'arrivalTime', 'source',
    'target', 'distance', 'estimatedTime', 'cost', 'freeSeats'];
  dataSource = new MatTableDataSource(ELEMENT_DATA_BASE);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
