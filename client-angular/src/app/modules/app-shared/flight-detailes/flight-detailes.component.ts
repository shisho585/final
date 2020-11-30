import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flight-detailes',
  templateUrl: './flight-detailes.component.html',
  styleUrls: ['./flight-detailes.component.scss']
})
export class FlightDetailesComponent implements OnInit {

  @Input() flight;
  @Input() admin = false

  constructor() { }

  ngOnInit(): void {
  }

}
