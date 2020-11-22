import { Injectable } from '@angular/core';
import { Flight } from '../models/flight.interface';

export interface Person {
  heName: string,
  enName: string,
  passpord: number,
  selectedRow?: number,
  selectedSeat?: number
}


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  flight: Flight;
  persons: Person[] = [{ heName: '', enName: '', passpord: null }];

  constructor() { }
}
