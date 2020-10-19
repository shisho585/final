import { Injectable } from '@angular/core';

export interface person {
  heName: string,
  enName: string,
  passpord: number
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  persons: person[];

  constructor() { }
}
