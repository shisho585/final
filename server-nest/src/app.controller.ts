import { Controller, Post, Body, ValidationPipe, Get, Headers, BadRequestException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { Passenger } from './db/entities/passenger.entity';
import { Ticket } from './db/entities/ticket.entity';
import { User } from './db/entities/user.entity';

@Controller('api')
export class AppController {

  constructor(private jwtService: JwtService) { }

  @Get('login')
  async login(@Headers() user_data) {
    let user: User;
    try {
      user = await User.findOneOrFail({ name: user_data.user_name, hashed_password: user_data.password });
      return this.jwtService.sign({ 'name': user.name })
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('authenticate')
  async authenticate(@Headers() user_data) {
    try {
      this.jwtService.verify(user_data.authorization);
      return 'pass';
    } catch (error) {
      return 'fail';
    }
  }

  @Get('user')
  getAllUsers() {
    return User.find({ relations: ['tickets', 'tickets.flight', 'tickets.passenger'] })
  }

  @Post('passenger')
  createNewPassenger(@Body(ValidationPipe) newPassenger: Passenger) {
    return Passenger.save(newPassenger);
  }

  @Post('ticket')
  createNewTicket(@Body() ticketsToAdd: Ticket[]) {
    return Ticket.save(ticketsToAdd);
  }

  @Post('user')
  async createNewUser(@Body(ValidationPipe) newUser: User) {
    try {
      await User.insert(newUser);
      return this.jwtService.sign({ 'name': newUser.name })
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
