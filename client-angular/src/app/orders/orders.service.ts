import { Injectable } from '@angular/core';

export interface Person {
  heName: string,
  enName: string,
  passpord: number,
  selectedRow?: number,
  selectedSeat?: number
}

export interface Flight {
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
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  flight: Flight;
  persons: Person[] = [{ heName: '', enName: '', passpord: null }];

  constructor() { }
}
