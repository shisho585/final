import { Injectable } from '@nestjs/common';
import { Passenger } from './db/entities/passenger.entity';

@Injectable()
export class AppService {
  getHello() {
    return Passenger.find();
  }
}
