import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Plain } from './entities/plain.entity';
import { Flight } from './entities/flight.entity';
import { User } from './entities/user.entity';
import { Ticket } from './entities/ticket.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'test_flys',
            entities: [Plain, Flight, User, Ticket],
            synchronize: true,
            logging: true
        })
    ],
})
export class DbModule { }
