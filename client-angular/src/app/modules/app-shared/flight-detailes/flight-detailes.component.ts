import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flight-detailes',
  templateUrl: './flight-detailes.component.html',
  styleUrls: ['./flight-detailes.component.scss']
})
export class FlightDetailesComponent implements OnInit {

  @Input() flight;
  @Input() admin = false;
  @Output() whenDelete = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  delete() {
    this.whenDelete.emit();
  }

}
