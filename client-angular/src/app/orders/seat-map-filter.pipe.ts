import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seatMapFilter'
})
export class SeatMapFilterPipe implements PipeTransform {

  transform(seat: boolean[]): number[] {
    return seat != null ? seat.map((seat, index) => index).filter(seatIndex => !seat[seatIndex]) : null;
  }

}
