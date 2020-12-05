import { Controller, Post, Body, ValidationPipe, Get, Headers, BadRequestException, Param } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { Passenger } from './db/entities/passenger.entity';
import { Ticket } from './db/entities/ticket.entity';
import { User } from './db/entities/user.entity';
import { Order } from './db/entities/order.entity';
import bcrypt = require('bcrypt');
import { ApiTags } from '@nestjs/swagger';

@Controller('api')
export class AppController {

  constructor(private jwtService: JwtService) { }

  @ApiTags('authenticate')
  @Get('login')
  async login(@Headers() user_data) {
    let user: User;
    try {
      user = await User.findOneOrFail({ email: user_data.email }, { select: ['name', 'email', 'role', 'hashed_password'] });
      if (bcrypt.compareSync(user_data.password, user.hashed_password))
        return this.jwtService.sign({ name: user.name, email: user.email, role: user.role })
      throw new Error("pass incorrect");
    } catch (error) {
      if (error.message.includes("entity of type \"User\""))
        error.message = "user not found";
      throw new BadRequestException(error.message);
    }
  }

  @ApiTags('authenticate')
  @Get('authenticate')
  async authenticate(@Headers() user_data) {
    try {
      return this.jwtService.verify(user_data.authorization).role;
    } catch (error) {
      return 'fail';
    }
  }

  @ApiTags('passengers')
  @Get('passenger/:passport')
  getPassenger(@Param('passport') passport: number) {
    return Passenger.findOne({ passport });
  }

  @ApiTags('passengers')
  @Post('passenger')
  createNewPassenger(@Body(ValidationPipe) newPassenger: Passenger) {
    return Passenger.save(newPassenger);
  }

  @ApiTags('tickets')
  @Post('ticket')
  createNewTicket(@Body() ticketsToAdd: Ticket[]) {
    return Ticket.save(ticketsToAdd);
  }

  @ApiTags('orders')
  @Post('order')
  createNewOrder(@Body(ValidationPipe) newOrder: Order) {
    return Order.saveOrder(newOrder);
  }
}
