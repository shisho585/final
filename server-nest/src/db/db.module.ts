import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plain } from './entities/plain.entity';
import { Flight } from './entities/flight.entity';
import { Passenger } from './entities/passenger.entity';
import { Ticket } from './entities/ticket.entity';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'test_flys',
      entities: [Plain, Flight, User, Order, Ticket, Passenger],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class DbModule { }
