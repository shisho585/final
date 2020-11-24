import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plain } from './entities/plain.entity';
import { Flight } from './entities/flight.entity';
import { Passenger } from './entities/passenger.entity';
import { Ticket } from './entities/ticket.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test_flys',
      entities: [Plain, Flight, User, Passenger, Ticket],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class DbModule { }
