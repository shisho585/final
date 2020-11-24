import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { Flight } from './db/entities/flight.entity';

@Controller('api/flight')
export class FlightController {
    @Get()
    getAllFlights() {
        return Flight.find();
    }

    @Get('light')
    getAllFlightsLight() {
        return Flight.find({ select: ['number', 'departure', 'from_country', 'to_country', 'price'] });
    }

    @Get(':flightNumber')
    getFlight(@Param('flightNumber') flightNumber: number) {
        return Flight.findOne(flightNumber, { relations: ['plain', 'tickets'] });
    }

    @Post()
    createNewFlight(@Body(ValidationPipe) newFlight: Flight) {
        return Flight.save(newFlight);
    }
}
