import { Controller, Get, Post, Body, ValidationPipe, Param, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { Plain } from './db/entities/plain.entity';
import { Passenger } from './db/entities/passenger.entity';
import { Flight } from './db/entities/flight.entity';
import { Ticket } from './db/entities/ticket.entity';
import { validate, validateOrReject, ValidationError } from 'class-validator';
import { classToPlain, ClassTransformer } from 'class-transformer';
import { User } from './db/entities/user.entity';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('passenger')
  createNewPassenger(@Body(ValidationPipe) newPassenger: Passenger) {
    return Passenger.save(newPassenger);
  }

  @Post('ticket')
  createNewTicket(@Body() ticketsToAdd: Ticket[]) {
    return Ticket.save(ticketsToAdd);
  }

  @Post('user')
  createNewUser(@Body(ValidationPipe) newUser: User) {
    return User.save(newUser);
  }
}
