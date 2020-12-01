import { Body, Controller, Delete, Get, Param, Post, SetMetadata, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
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
        return Flight.findOneWithRelations(flightNumber);
    }

    @UseGuards(AuthGuard)
    @SetMetadata('role', 'admin')
    @Post()
    createNewFlight(@Body(ValidationPipe) newFlight: Flight) {
        return Flight.save(newFlight);
    }

    @UseGuards(AuthGuard)
    @SetMetadata('role', 'admin')
    @Delete(':flightNumber')
    deleteFlight(@Param('flightNumber') flightNumber: string) {
        return Flight.delete(flightNumber);
    }
}
