import { Controller, Get, Post, Body, ValidationPipe, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Plain } from './db/entities/plain.entity';
import { User } from './db/entities/user.entity';
import { Flight } from './db/entities/flight.entity';
import { Ticket } from './db/entities/ticket.entity';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('plain/type')
  getAllPlainTypes() {
    return Plain.find({ select: ['type'] });
  }

  @Get('flight')
  getAllFlights() {
    return Flight.find();
  }

  @Get('flight/light')
  getAllFlightsLight() {
    return Flight.find({ select: ['number', 'departure', 'from_country', 'to_country', 'price'] });
  }

  @Get('flight/:flightNumber')
  getFlight(@Param('flightNumber') flightNumber: number) {
    return Flight.findOne(flightNumber, { relations: ['plain', 'tickets'] });
  }

  @Post('plain')
  createNewPlain(@Body(ValidationPipe) newPlain: Plain) {
    return Plain.save(newPlain);
  }

  @Post('user')
  createNewUser(@Body(ValidationPipe) newUser: User) {
    return User.save(newUser);
  }

  @Post('flight')
  createNewFlight(@Body(ValidationPipe) newFlight: Flight) {
    return Flight.save(newFlight);
  }

  @Post('ticket')
  createNewTicket(@Body(ValidationPipe) newTicket: Ticket) {
    return Ticket.save(newTicket);
  }
}
