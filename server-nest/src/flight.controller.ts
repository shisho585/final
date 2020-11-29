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
        return Flight.find({
            select: ['number', 'departure', 'from_country', 'to_country', 'price'],
            relations: ['tickets', 'plain']
        });
    }

    @Get('light/future')
    async getFuturedFlights() {
        const flights = await this.getAllFlightsLight();
        return flights.filter(flight => {
            const seats = flight.plain.number_of_rows * flight.plain.seats_to_row;
            const freeSeats = seats - flight.tickets.length;
            return flight.departure > new Date() && freeSeats > 0;
        });
    }

    @Get(':flightNumber')
    async getFlight(@Param('flightNumber') flightNumber: string) {
        const flight = await Flight.findOne(flightNumber, { relations: ['plain', 'tickets'] });
        const seats = flight.plain.number_of_rows * flight.plain.seats_to_row;
        const freeSeats = seats - flight.tickets.length;
        return { flight, freeSeats };
    }

    @Post()
    createNewFlight(@Body(ValidationPipe) newFlight: Flight) {
        return Flight.save(newFlight);
    }
}
